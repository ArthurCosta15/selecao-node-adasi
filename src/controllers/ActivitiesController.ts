import { Request, Response } from 'express'
import { ActivitysRepository } from '../repositories/ActivitysRepositories'
import { StudentsRepositories } from '../repositories/StudentsRepositories'
import { TasksRepositories } from '../repositories/TasksRepositories'
export class ActivitiesController {
    async create(req: Request, res: Response) {
        const { tarefaId, estudanteCpf, data, horaAgendamentoInicio, horaAgendamentoTermino } = req.body
    
        if (!tarefaId || !estudanteCpf || !data || !horaAgendamentoInicio || !horaAgendamentoTermino) {
          return res.status(400).json({ message: 'Todos os campos são obrigatórios.' })
        }

        const student = await StudentsRepositories.findOneBy({ cpf: estudanteCpf })
        if (!student) {
          return res.status(404).json({ message: 'Estudante não encontrado.' })
        }

        const tarefa = await TasksRepositories.findOneBy({ id: tarefaId })
        if (!tarefa) {
          return res.status(404).json({ message: 'Tarefa não encontrada.' })
        }

        const existingActivity = await ActivitysRepository.findOneBy({
          tarefa: { id: tarefaId },
          estudante: { cpf: estudanteCpf },
        })
        if (existingActivity) {
          return res.status(400).json({ message: 'Estudante já possui uma atividade agendada para esta tarefa.' })
        }

        const newActivity = ActivitysRepository.create({
          tarefa,
          estudante: student,
          data,
          hora_agendamento_inicial: horaAgendamentoInicio,
          hora_agendamento_final: horaAgendamentoTermino,
        })

        await ActivitysRepository.save(newActivity)

        return res.status(201).json(newActivity)
      }

  async getAllActivities(req: Request, res: Response) {
    const activities = await ActivitysRepository.find()
    return res.status(200).json(activities)
  }

  async getActivityById(req: Request, res: Response) {
    const { id } = req.params
    const activity = await ActivitysRepository.findOneBy({ id })
    return res.status(200).json(activity)
  }

  async deleteActivity(req: Request, res: Response) {
    const { id } = req.params
    await ActivitysRepository.delete(id)
    return res.status(200).json({ message: 'Atividade excluída com sucesso.' })
  }

  async startActivity(req: Request, res: Response) {
    const { id } = req.params
    const { horaInicio } = req.body

 
    const activity = await ActivitysRepository.findOneBy({ id })
    if (!activity) {
      return res.status(404).json({ message: 'Atividade não encontrada.' })
    }

    activity.hora_inicio = horaInicio

    await ActivitysRepository.update(id, activity)

    return res.status(200).json({ message: 'Atividade iniciada com sucesso.', activity })
  }

  async finishActivity(req: Request, res: Response) {
    const { id } = req.params
    const { horaTermino } = req.body

    const activity = await ActivitysRepository.findOneBy({ id })
    if (!activity) {
      return res.status(404).json({ message: 'Atividade não encontrada.' })
    }

    activity.hora_termino = horaTermino

    await ActivitysRepository.update(id, activity)

    return res.status(200).json({ message: 'Atividade finalizada com sucesso.', activity })
  }

  async updateActivity(req: Request, res: Response) {
    const { id } = req.params
    const { tarefaId, estudanteCpf, data, horaAgendamentoInicio, horaAgendamentoTermino } = req.body

    if (!tarefaId || !estudanteCpf || !data || !horaAgendamentoInicio || !horaAgendamentoTermino) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' })
    }

    if (new Date(data) < new Date()) {
      return res.status(400).json({ message: 'A data deve ser posterior à data atual.' })
    }

    if (new Date(horaAgendamentoTermino) < new Date(horaAgendamentoInicio)) {
      return res.status(400).json({ message: 'A hora de término deve ser posterior à hora de início.' })
    }

    const activity = await ActivitysRepository.findOneBy({ id })
    if (!activity) {
      return res.status(404).json({ message: 'Atividade não encontrada.' })
    }

    activity.tarefa = tarefaId
    activity.estudante = estudanteCpf
    activity.data = data
    activity.hora_agendamento_inicial = horaAgendamentoInicio
    activity.hora_agendamento_final = horaAgendamentoTermino

    await ActivitysRepository.update(id, activity)

    return res.status(200).json({ message: 'Atividade atualizada com sucesso.', activity })
  }
}
