import { Injectable } from '@nestjs/common';

enum TaskStatus {
    OPEN = 'Open',
    IN_PROGRESS = 'In Progress',
    DONE = 'Done',
}

export interface Task {
    id: number;
    name: string;
    description: string;
    status: TaskStatus;
}

@Injectable()
export class TaskService {
    getTasks() : Task[] {
        return [
            {
                id: 1,
                name: 'Task 1',
                description: 'Description 1',
                status: TaskStatus.OPEN,
            },
            {
                id: 2,
                name: 'Task 2',
                description: 'Description 2',
                status: TaskStatus.IN_PROGRESS,
            },
            {
                id: 3,
                name: 'Task 3',
                description: 'Description 3',
                status: TaskStatus.DONE,
            },
        ]; 
    }

    createTask() {
        return 'Creating a task';
    }

    updateTask() {
        return 'Updating a task';
    }

    deleteTask() {
        return 'Deleting a task';
    }

    patchTask() {
        return 'Patching a task';
    }
}