import { AppDataSource } from "../data-source";
import { Activity } from "../entities/activitys";

export const ActivitysRepositories = AppDataSource.getRepository(Activity)