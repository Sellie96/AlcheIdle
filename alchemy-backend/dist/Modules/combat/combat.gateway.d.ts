import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/user.entity';
import { UsersService } from 'src/user/users.service';
import { MonsterService } from './monster/monster.service';
export declare class CombatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    private usersService;
    private monsterService;
    server: Server;
    users: number;
    sendResponse: boolean;
    private clientFightInProgress;
    private playerInterval;
    private monsterInterval;
    constructor(authService: AuthService, usersService: UsersService, monsterService: MonsterService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleFight(client: Socket, monsterId: String): Promise<void>;
    handleFlee(client: Socket): Promise<void>;
    getPlayerData(playerData: User, client: Socket): Promise<void>;
    calculatePlayerHealth(player: User, monster: any): User;
    calculateMonsterHealth(player: User, monster: any): any;
    getMonsterListData(client: Socket): Promise<void>;
}
