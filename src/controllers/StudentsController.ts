import { Request, Response } from "express"
import { StudentsRepositories } from "../repositories/StudentsRepositories"
export class StudentsController {
    async create(req: Request, res: Response) {
        const { cpf, name, matrícula } = req.body

        if (!cpf || !name || !matrícula) {
            return res.status(400).json({ message: 'CPF, nome e matrícula do estudante são obrigatórios' })
        }

        try {
            const existingStudent = await StudentsRepositories.findOneBy({ cpf: cpf })
            if (existingStudent) {
                return res.status(400).json({ message: 'Já existe um estudante com este CPF' })
            }

            const existingMatricula = await StudentsRepositories.findOneBy({ matrícula: matrícula })
            if (existingMatricula) {
                return res.status(400).json({ message: 'Já existe um estudante com esta matricula' })
            }

            const newStudent = StudentsRepositories.create({ cpf, name, matrícula })

            await StudentsRepositories.save(newStudent)

            return res.status(201).json(newStudent)

        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Ocorreu um erro ao criar o estudante' })
        }
    }
    async updateStudent(req: Request, res: Response) {
        const { cpf } = req.params
        const { name, matricula } = req.body
    
        try {
            const student = await StudentsRepositories.findOneBy({ cpf: cpf })
            if (!student) {
                return res.status(404).json({ message: 'Estudante não encontrado' })
            }
            student.name = name
            student.matrícula = matricula

            await StudentsRepositories.save(student)
            return res.status(200).json(student)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Ocorreu um erro ao atualizar o estudante' })
        }
    }

    async getAllStudents(req: Request, res: Response) {
        const students = await StudentsRepositories.find()
        return res.status(200).json(students)
    }

    async getStudentById(req: Request, res: Response) {
        const { cpf } = req.params
        const student = await StudentsRepositories.findOneBy({ cpf: cpf })
        return res.status(200).json(student)
    }

    async deleteStudent(req: Request, res: Response) {
        const { cpf } = req.params
        await StudentsRepositories.delete(cpf)
        return res.status(200).json({ message: 'Estudante excluído com sucesso' })
    }
    
}
