import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Student } from './students'
import { Task } from './tasks' // Assuming a separate Task entity

@Entity()
export class Activity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type : 'date' })
  data: Date

  @Column({ type : 'time' })
  hora_agendamento_inicial: Date

  @Column({ type : 'time' })
  hora_agendamento_final: Date

  @Column({ type : 'time', nullable: true })
  hora_inicio?: Date

  @Column({ type : 'time' , nullable: true })
  hora_termino?: Date

  @ManyToOne(() => Task, (task) => task.activities)
  @JoinColumn({ name: 'task_id' })
  tarefa: Task

  @ManyToOne(() => Student, (student) => student.activities)
  @JoinColumn({ name: 'student_cpf' })
  estudante: Student
}
