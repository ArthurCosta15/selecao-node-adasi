import { Request, Response } from 'express'
import { ActivitysRepositories } from '../repositories/ActivitysRepositories'
import { StudentsRepositories } from '../repositories/StudentsRepositories'
import { TasksRepositories } from '../repositories/TasksRepositories'
export class ActivitiesController {
  async create(req: Request, res: Response) {
    try {
      const { tarefaId, estudanteCpf, data, horaAgendamentoInicio, horaAgendamentoTermino } = req.body
      
      const requiredFields = ['tarefaId', 'estudanteCpf', 'data', 'horaAgendamentoInicio', 'horaAgendamentoTermino']
      if (requiredFields.some(field => !req.body[field])) {
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

      const existingActivity = await ActivitysRepositories.findOneBy({
        tarefa: { id: tarefaId },
        estudante: { cpf: estudanteCpf },
      })
      if (existingActivity) {
        return res.status(400).json({ message: 'Estudante já possui uma atividade agendada para esta tarefa.' })
      }

      if (horaAgendamentoTermino < horaAgendamentoInicio) {
        return res.status(400).json({ message: ' A atividade não pode terminar antes de começar.' })
      }

      const startDate = new Date(`${data}T${horaAgendamentoInicio}`)
      const endDate = new Date(`${data}T${horaAgendamentoTermino}`)
      const durationInMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60)

      if (durationInMinutes > 6 * 60) {
        return res.status(400).json({ message: 'A duração da atividade não pode ultrapassar 6 horas.' })
    }
    
      const newActivity = ActivitysRepositories.create({
        tarefa,
        estudante: student,
        data,
        hora_agendamento_inicial: horaAgendamentoInicio,
        hora_agendamento_final: horaAgendamentoTermino,
      })

      await ActivitysRepositories.save(newActivity)

      return res.status(201).json(newActivity)
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar atividade.' })
    }
  }

  async getAllActivities(req: Request, res: Response) {
    try {
      const activities = await ActivitysRepositories.find()
      return res.status(200).json(activities)
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar atividades.' })
    }
  }

  async getActivityById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const activity = await ActivitysRepositories.findOneBy({ id })
      return res.status(200).json(activity)
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar atividade por ID.' })
    }
  }

  async deleteActivity(req: Request, res: Response) {
    try {
      const { id } = req.params
      await ActivitysRepositories.delete(id)
      return res.status(200).json({ message: 'Atividade excluída com sucesso.' })
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir atividade.' })
    }
  }

  async startActivity(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { horaInicio } = req.body

        const activity = await ActivitysRepositories.findOneBy({ id })
        if (!activity) {
            return res.status(404).json({ message: 'Atividade não encontrada.' })
        }

        if (activity.hora_inicio || activity.hora_termino) {
            return res.status(400).json({ message: 'A atividade já foi iniciada ou finalizada.' })
        }

        const startDateTime = new Date(`${activity.data}T${horaInicio}`)
        const now = new Date()
        const tolerance = 15 * 60 * 1000 // 15 minutos em milissegundos
        const timeDifference = Math.abs(now.getTime() - startDateTime.getTime())

        if (timeDifference > tolerance) {
            return res.status(400).json({ message: 'A atividade só pode ser iniciada com uma tolerância de 15 minutos para mais ou para menos.' })
        }

        activity.hora_inicio = horaInicio
        await ActivitysRepositories.update(id, activity)

        return res.status(200).json({ message: 'Atividade iniciada com sucesso.', activity })
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao iniciar atividade.' })
        }
}

  async finishActivity(req: Request, res: Response) {
      try {
          const { id } = req.params
          const { horaTermino } = req.body

          const activity = await ActivitysRepositories.findOneBy({ id })
          if (!activity) {
              return res.status(404).json({ message: 'Atividade não encontrada.' })
          }

          if (!activity.hora_inicio || activity.hora_termino) {
              return res.status(400).json({ message: 'A atividade ainda não foi iniciada ou já foi finalizada.' })
          }

          const finishDateTime = new Date(`${activity.data}T${horaTermino}`)
          const startDateTime = new Date(`${activity.data}T${activity.hora_inicio}`)

          if (finishDateTime <= startDateTime) {
              return res.status(400).json({ message: 'Data e hora de término não podem ser anteriores à data e hora de início.' })
          }

          activity.hora_termino = horaTermino
          await ActivitysRepositories.update(id, activity)

          return res.status(200).json({ message: 'Atividade finalizada com sucesso.', activity })
          } catch (error) {
              return res.status(500).json({ message: 'Erro ao finalizar atividade.' })
          }
  }

  async updateActivity(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { tarefaId, estudanteCpf, data, horaAgendamentoInicio, horaAgendamentoTermino } = req.body

        if (!tarefaId || !estudanteCpf || !data || !horaAgendamentoInicio || !horaAgendamentoTermino) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' })
        }

        const activity = await ActivitysRepositories.findOneBy({ id })
        if (!activity) {
            return res.status(404).json({ message: 'Atividade não encontrada.' })
        }

        if (activity.hora_inicio || activity.hora_termino) {
            return res.status(400).json({ message: 'Não é possível atualizar uma atividade que já foi iniciada ou finalizada.' })
        }

        const startDate = new Date(`${data}T${horaAgendamentoInicio}`)
        const endDate = new Date(`${data}T${horaAgendamentoTermino}`)

        if (endDate <= startDate) {
            return res.status(400).json({ message: 'Data ou hora de término inválida.' })
        }

        const durationInMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60)
        if (durationInMinutes > 6 * 60) {
            return res.status(400).json({ message: 'A duração da atividade não pode ultrapassar 6 horas.' })
        }

        activity.tarefa = tarefaId
        activity.estudante = estudanteCpf
        activity.data = data
        activity.hora_agendamento_inicial = horaAgendamentoInicio
        activity.hora_agendamento_final = horaAgendamentoTermino

        await ActivitysRepositories.update(id, activity)

        return res.status(200).json({ message: 'Atividade atualizada com sucesso.', activity })
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar atividade.' })
        }
      }
}
