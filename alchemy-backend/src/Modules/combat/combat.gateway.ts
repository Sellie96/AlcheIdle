import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ConnectedSocket, WebSocketServer } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';
import { UsersService } from 'src/user/users.service';
import { MonsterService } from './monster/monster.service';

@WebSocketGateway({ cors: true })
export class CombatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    users: number = 0;
    sendResponse: boolean = true;
    private clientFightInProgress = new Map<string, boolean>();
    private playerInterval: any;
    private monsterInterval: any;

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private monsterService: MonsterService
    ) { }

    async handleConnection(@ConnectedSocket() client: Socket) {
        try {
            const decodedToken = await this.authService.verifyJwt(client.handshake.headers.authorization.slice(7));
            const user = await this.usersService.findOneByUsername(decodedToken.username);
            if (!user) {
                //disconnect user
                client.disconnect();
            } else {
                console.log('combat connected');
                this.getPlayerData(user, client);

                this.getMonsterListData(client);
            }
        } catch {
            console.log('combat connect error');
        }
    }

    async handleDisconnect(@ConnectedSocket() client: Socket) {
        try {
            const decodedToken = await this.authService.verifyJwt(client.handshake.headers.authorization.slice(7));
            console.log(decodedToken);
            const user = await this.usersService.findOneByUsername(decodedToken.username);
            if (!user) {
                //disconnect user
                client.disconnect();
            } else {
                console.log('combat disconnected');
                clearInterval(this.playerInterval);
                clearInterval(this.monsterInterval);
                this.clientFightInProgress.set(client.id, false);
                client.disconnect();
            }
        } catch {
            console.log('combat disconnect error');
        }
    }

    @SubscribeMessage('startMonsterCombat')
    async handleFight(@ConnectedSocket() client: Socket, @MessageBody() monsterId: String): Promise<void> {

        if (this.clientFightInProgress.get(client.id)) {
            console.log('client already in fight');
            return;
        }

        this.clientFightInProgress.set(client.id, true);

        // get player data
        const decodedToken = await this.authService.verifyJwt(client.handshake.headers.authorization.slice(7));
        const player = await this.usersService.findOneByUsername(decodedToken.username);
        // get monster data
        const monster = await this.monsterService.getMonsterData(monsterId);

        this.server.to(client.id).emit('fightResult', monster);

        // Calculate attack interval based on player's attack speed
        const playerAttackInterval = 1000 * 5; // attack every 1000ms * player's attack speed

        // Calculate attack interval based on monster's attack speed
        const attackInterval = 1000 * 4; // attack every 1000ms * monster's attack speed

        // Set up interval to perform combat every attackInterval milliseconds
       this.playerInterval = setInterval(async () => {
        console.log('player interval');
            // calculate damage, update health, determine outcome
            const result = this.calculateMonsterHealth(player, monster);
            // send result back to client
            this.server.to(client.id).emit('fightResult', result);

            // Check if either player or monster has run out of health
            if (player.character.combatStats.stats.health <= 0 || monster.health <= 0) {
                // Clear interval and end combat
                clearInterval(this.playerInterval);
                clearInterval(this.monsterInterval);
                this.clientFightInProgress.set(client.id, false);
            }
        }, playerAttackInterval);


        this.monsterInterval = setInterval(async () => {
            // calculate damage, update health, determine outcome
            const result = this.calculatePlayerHealth(player, monster);
            // send result back to client
            this.usersService.updateOne(result);

            this.server.to(client.id).emit('getPlayerData', result);

            // Check if either player or monster has run out of health
            if (player.character.combatStats.stats.health <= 0 || monster.health <= 0) {
                // Clear interval and end combat
                clearInterval(this.playerInterval);
                clearInterval(this.monsterInterval);
                this.clientFightInProgress.set(client.id, false);
            }
        }, attackInterval);
    }

    @SubscribeMessage('flee')
    async handleFlee(@ConnectedSocket() client: Socket) {
        this.clientFightInProgress.set(client.id, false);
        clearInterval(this.playerInterval);
        clearInterval(this.monsterInterval);
        this.server.to(client.id).emit('flee');

    }


    @SubscribeMessage('getPlayerData')
    async getPlayerData(@MessageBody() playerData: User, @ConnectedSocket() client: Socket) {
        this.server.to(client.id).emit('getPlayerData', playerData);
    }

    calculatePlayerHealth(player: User, monster: any) {
        // Calculate monster's damage
        player.character.combatStats.stats.health -= monster.attack;
        return player;
    }

    calculateMonsterHealth(player: User, monster: any) {
        // Calculate player's damage
        const playerDamage = player.character.combatStats.stats.strength;
        monster.health -= playerDamage;
        return monster;
    }

    @SubscribeMessage('getMonsterListData')
    async getMonsterListData(@ConnectedSocket() client: Socket) {
        const monsterList = await this.monsterService.getMonsterListData();
        this.server.to(client.id).emit('getMonsterListData', monsterList);
    }
}

