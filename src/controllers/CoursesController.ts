import { Request, Response } from "express";
import { CoursesRepositories } from "../repositories/CoursesRepositories";

export class CoursesController {
    async create(req: Request, res: Response) {
        const { name } = req.body

        if (!name) {
            return res.status(400).json({ message: 'O nome do curso é obrigatório' })
        }

        try {
            const newCourse = CoursesRepositories.create({ name })

            await CoursesRepositories.save(newCourse)

            return res.status(201).json(newCourse)
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Ocorreu um erro ao criar o curso' })
        }
    }

    async updateCourse(req: Request, res: Response) {
        const { id } = req.params
        const { name } = req.body

        try {
            const course = await CoursesRepositories.findOneBy({ id: id })
            if (!course) {
                return res.status(404).json({ message: 'Curso não encontrado' })
            }
            course.name = name
            await CoursesRepositories.save(course)
            return res.status(200).json(course)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Ocorreu um erro ao atualizar o curso' })
        }
    }

    async getAllCourses(req: Request, res: Response) {
        const courses = await CoursesRepositories.find()
        return res.status(200).json(courses)
    }

    async getCourseById(req: Request, res: Response) {
        const { id } = req.params
        const course = await CoursesRepositories.findOneBy({ id: id })
        return res.status(200).json(course)
    }

    async deleteCourse(req: Request, res: Response) {
        const { id } = req.params
        await CoursesRepositories.delete(id)
        return res.status(200).json({ message: 'Curso excluído com sucesso' })
    }
}
