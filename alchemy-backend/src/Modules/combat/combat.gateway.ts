import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';
import { UsersService } from 'src/user/users.service';
import { CombatService } from './combat.service';
import { MonsterService } from './monster/monster.service';

@WebSocketGateway({ cors: true })
export class CombatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  users: number = 0;
  sendResponse: boolean = true;
  private clientFightInProgress = new Map<string, boolean>();
  private playerInterval: any;
  private monsterInterval: any;

  private player: User;
  private combatInterval: NodeJS.Timeout;
  private combatIntervalMonster: NodeJS.Timeout;

  private ongoingCombatPlayers: string[] = [];

  private currentClient: Socket;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private monsterService: MonsterService,
    private combatService: CombatService,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const authToken = client.handshake.headers.authorization?.slice(7);
      if (!authToken) {
        throw new Error('Authorization token not found');
      }

      const decodedToken = await this.authService.verifyJwt(authToken);
      this.player = await this.usersService.findOneByUsername(
        decodedToken.username,
      );

      if (!this.player) {
        console.log(`User with username ${decodedToken.username} not found`);
        client.disconnect();
        return;
      }

      this.getPlayerData(client);
      this.clientFightInProgress.set(client.id, false);
      this.getMonsterListData(client);

      this.currentClient = client;
    } catch (error) {
      console.error(`Error while handling connection: ${error.message}`);
      client.disconnect();
    }
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    try {
      const authToken = client.handshake.headers.authorization?.slice(7);
      if (!authToken) {
        throw new Error('Authorization token not found');
      }

      const decodedToken = await this.authService.verifyJwt(authToken);

      if (!this.player) {
        console.log(`User with username ${decodedToken.username} not found`);
      } else {
        clearInterval(this.playerInterval);
        clearInterval(this.monsterInterval);
        this.clientFightInProgress.set(client.id, false);
      }
    } catch (error) {
      console.error(`Error while handling disconnect: ${error.message}`);
    } finally {
      client.disconnect();
    }
  }

 @SubscribeMessage('startMonsterCombat')
async startMonsterCombat(client: Socket, monsterId: string) {
  // Authenticate the user
  const decodedToken = await this.authService.verifyJwt(client.handshake.headers.authorization.slice(7));
  this.player = await this.usersService.findOneByUsername(decodedToken.username);

  // Check if the player is already engaged in a combat
  if (this.ongoingCombatPlayers.includes(this.player.username)) {
    client.emit('combatError', { message: `You are already engaged in a combat` });
    return;
  }

  // Add the player to the list of ongoing combat players
  this.ongoingCombatPlayers.push(this.player.username);

  // Find the monster by its ID
  let monster = await this.findMonsterById(monsterId);
  if (!monster) {
    client.emit('combatError', { message: `Monster with ID ${monsterId} not found` });
    return;
  }

  // Emit the initial data to the client
  client.emit('updateMonster', { monster: monster });
  client.emit('fightResult', { player: this.player, monster: monster });

  // Start combat intervals for the player and the monster
  this.combatInterval = setInterval(async () => {
    // Update the monster's health
    this.player = await this.usersService.findOneByUsername(decodedToken.username);
    monster = this.combatService.calculateMonsterHealth(this.player, monster);

    if (monster.health <= 0) {
      monster.health = 0;
    }
    client.emit('updateMonster', { monster: monster });

    // If the monster is dead, update the player's loot and reset the fight
    if (monster.health <= 0) {
      const loot = 0;
      const gold = 5;
      const xp = 5;
      this.player = this.combatService.updatePlayerLoot(gold, xp, this.player, monster);
      client.emit('monsterDeath', { loot, gold, xp });
      this.resetFight(client, monsterId);
      const index = this.ongoingCombatPlayers.indexOf(this.player.username);
      if (index > -1) {
        this.ongoingCombatPlayers.splice(index, 1);
      }
    }

    // Update the player's data on the client side
    this.getPlayerData(client);
  }, this.player.character.combatStats.combat.attackSpeed * 1000);

  this.combatIntervalMonster = setInterval(async () => {

    this.player = await this.usersService.findOneByUsername(decodedToken.username);

    // Update the player's health
    this.player = this.combatService.calculatePlayerHealth(this.player, monster);

    console.log(this.player.character.combatStats.stats.health);
    client.emit('updatePlayer', {player: this.player});

    // If the player is dead, end the fight and remove them from the list of ongoing combat players
    if (this.player.character.combatStats.stats.health <= 0) {
      this.playerDied(client)
    }

    this.usersService.updateOne(this.player);
    // Update the player's data on the client side
    this.getPlayerData(client);

  }, monster.attackSpeed * 1000);
}

  @SubscribeMessage('getMonsterListData')
  async getMonsterListData(@ConnectedSocket() client: Socket) {
    this.server
      .to(client.id)
      .emit(
        'getMonsterListData',
        await this.monsterService.getMonsterListData(),
      );
  }

  @SubscribeMessage('flee')
  async handleFlee(@ConnectedSocket() client: Socket) {
    if (this.player) {
      const index = this.ongoingCombatPlayers.indexOf(this.player.username);
      if (index > -1) {
        this.ongoingCombatPlayers.splice(index, 1);
      }
      clearInterval(this.combatInterval);
      clearInterval(this.combatIntervalMonster);
    }
  }

  @SubscribeMessage('getPlayerData')
  async getPlayerData(@ConnectedSocket() client: Socket) {

    this.server.to(client.id).emit('getPlayerData', this.player);
  }

  @SubscribeMessage('updatePlayer')
  async updatePlayer(@ConnectedSocket() client: Socket) {

    let updatedData = await this.usersService.findOneByUsername(
      this.player.username,
    );

    this.server.to(client.id).emit('updatePlayer', updatedData);
  }

  // Helper method to reset the fight
  private resetFight(client, monsterId) {
    clearInterval(this.combatInterval);
    clearInterval(this.combatIntervalMonster);

    // Remove the player from the list of ongoing combats
    const index = this.ongoingCombatPlayers.indexOf(this.player.username);
    if (index > -1) {
      this.ongoingCombatPlayers.splice(index, 1);
    }

    this.startMonsterCombat(client, monsterId);
  }

  // Helper method to find a monster by ID
  private async findMonsterById(id: string): Promise<any> {
    // Assuming there is a service to find monsters by ID
    return await this.monsterService.getMonsterData(id);
  }

  playerDied(client){
    client.emit('playerDeath');
      clearInterval(this.combatInterval);
      clearInterval(this.combatIntervalMonster);
      const index = this.ongoingCombatPlayers.indexOf(this.player.username);
      if (index > -1) {
        this.ongoingCombatPlayers.splice(index, 1);
      }
  }
}
