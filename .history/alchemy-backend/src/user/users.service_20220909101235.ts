import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({id});
    }

    findOneByUsername(username: string): Promise<User> {
        return this.usersRepository.findOneBy({ username: username });
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async create(): Promise<User> {
        let user: User = {
            id: 1,
            username: "test",
            password: await bcrypt.hash("test", 10),
            asActive: true,
            character: {
                id: 1,
                characterName: "test",
                characterAlignment: "test",
                currencies: {
                    gold: 1,
                    energy: 1,
                    lifeForce: 1,
                    gems: 1
                },
                skills: {
                    agility: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                    alchemy: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                    cooking: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                    crafting: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                    firemaking: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                    fishing: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                    fletching: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                    herblore: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                    mining: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                    runecrafting: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                    smithing: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                    thieving: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                    woodcutting: {
                        level: 1,
                        xpMax: 1,
                        xpCurrent: 1
                    },
                },
                backpack: [],
                equipment: [],
            }
                

        }
        return this.usersRepository.save(user);
    }
}