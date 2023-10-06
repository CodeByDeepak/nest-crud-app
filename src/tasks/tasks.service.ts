import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  create(task: Task): Task {
    task.id = Date.now();
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: number, updatedTask: Task): Task | undefined {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
      return this.tasks[taskIndex];
    }

    return undefined;
  }

  delete(id: number): boolean {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      return true;
    }
    return false;
  }
}
