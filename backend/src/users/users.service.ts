import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
}

@Injectable()
export class UsersService {
    private users: User[] = [];
    
    getUsers() {
        return this.users;      
    }

    createUser(user: CreateUserDto) {
        this.users.push({
            ...user,
            id: this.users.length + 1,
        });
        return user;
    }
}
