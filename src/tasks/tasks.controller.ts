import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { TaskService } from './tasks.service';

@Controller('/tasks')
export class TaskController {
    tasksService: TaskService;

    constructor(tasksService:TaskService) {
        this.tasksService = tasksService;
    }

    @Get()
    getAllTasks() {
       return this.tasksService.getTasks(); 
    }

    @Post()
    createTask() {
        return this.tasksService.createTask();
    }

    @Put()
    updateTask() {
        return this.tasksService.updateTask();        
    }

    @Delete()
    deleteTask() {
        return this.tasksService.deleteTask();
    }

    @Patch()
    patchTask() {
        return this.tasksService.patchTask();
    }
    
}