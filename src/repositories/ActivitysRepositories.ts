import { AppDataSource } from "../data-source";
import { Activity } from "../entities/activitys";

export const ActivitysRepository = AppDataSource.getRepository(Activity)