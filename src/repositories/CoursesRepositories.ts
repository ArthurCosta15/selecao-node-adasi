import { AppDataSource } from "../data-source";
import { Course } from "../entities/courses";

export const CoursesRepositories = AppDataSource.getRepository(Course)