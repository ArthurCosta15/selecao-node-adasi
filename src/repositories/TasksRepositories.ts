import { AppDataSource } from "../data-source"
import { Task } from "../entities/tasks"

export const TasksRepositories = AppDataSource.getRepository(Task)