import { Request, Response } from "express"
import { TasksRepositories } from "../repositories/TasksRepositories"

export class TasksController {
    async create(req: Request, res: Response) {
        const { name } = req.body

        if (!name) {
            return res.status(400).json({ message: 'O nome da tarefa é obrigatório' })
        }

        try {
            const newTask = TasksRepositories.create({ name })

            await TasksRepositories.save(newTask)

            return res.status(201).json(newTask)
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Ocorreu um erro ao criar a Tarefa' })
        }
    }

    async updateTask(req: Request, res: Response) {
        const { id } = req.params
        const { name } = req.body

        try {
            const task = await TasksRepositories.findOneBy({ id: id })
            if (!task) {
                return res.status(404).json({ message: 'Tarefa não encontrada' })
            }
            task.name = name
            await TasksRepositories.save(task)
            return res.status(200).json(task)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Ocorreu um erro ao atualizar a Tarefa' })
        }
    }

    async getAllTasks(req: Request, res: Response) {
        const tasks = await TasksRepositories.find()
        return res.status(200).json(tasks)
    }

    async getTaskById(req: Request, res: Response) {
        const { id } = req.params
        const task = await TasksRepositories.findOneBy({ id: id })
        return res.status(200).json(task)
    }

    async deleteTask(req: Request, res: Response) {
        const { id } = req.params
        await TasksRepositories.delete(id)
        return res.status(200).json({ message: 'Tarefa excluída com sucesso' })
    }
}