import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

export interface Task {
    id: number;
    name: string;
    description: string;
    status: boolean;
}

@Injectable()
export class TaskService {
    private tasks: Task[] = [];
    getTasks() : Task[] {
      return this.tasks; 
    }

    getTask(id: number) {
        const taskFound = this.tasks.find(task => task.id === id);

        if (!taskFound) {
            return new NotFoundException(`Task with ID ${id} not found`);
        }

        return taskFound;
    }

    createTask(task: CreateTaskDto) {
        // console.log(task);
        this.tasks.push({
            ...task,
            id: this.tasks.length + 1,
        });
        return task;
    }

    updateTask(task: UpdateTaskDto) {
        console.log(task);
        return 'Updating a task';
    }

    deleteTask() {
        return 'Deleting a task';
    }

    patchTask() {
        return 'Patching a task';
    }
}