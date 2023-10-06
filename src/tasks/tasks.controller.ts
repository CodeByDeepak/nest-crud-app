// src/tasks/tasks.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TaskDto } from './task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() taskDto: TaskDto): Task {
    const task = new Task();
    task.title = taskDto.title;
    task.description = taskDto.description;
    return this.tasksService.create(task);
  }

  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Task | undefined {
    return this.tasksService.findById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedTaskDto: TaskDto,
  ): Task | undefined {
    const updatedTask = new Task();
    updatedTask.title = updatedTaskDto.title;
    updatedTask.description = updatedTaskDto.description;
    return this.tasksService.update(+id, updatedTask);
  }

  @Delete(':id')
  delete(@Param('id') id: string): boolean {
    return this.tasksService.delete(+id);
  }
}
