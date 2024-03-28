import { AppDataSource } from "../data-source"
import { Student } from "../entities/students"

export const StudentsRepositories = AppDataSource.getRepository(Student)