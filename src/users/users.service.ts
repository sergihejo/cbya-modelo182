import { Injectable } from '@nestjs/common';
import { promiseHooks } from 'v8';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            phone: '555-555-5555',
        },
        {
            id: 2,
            name: 'Jane Doe',
            phone: '333-333-3333',
        },
    ];
    
    getUsers() {
        return this.users;      
    }
}
