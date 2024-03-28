import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Student } from './students'
import { Task } from './tasks' // Assuming a separate Task entity

@Entity()
export class Activity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type : 'date' })
  data: Date

  @Column({ nullable: false })
  hora_agendamento_inicio: string 

  @Column({ nullable: false })
  hora_agendamento_termino: string

  @Column({ nullable: true })
  hora_inicio?: string

  @Column({ nullable: true })
  hora_termino?: string

  @ManyToOne(() => Task, (task) => task.activities)
  @JoinColumn({ name: 'task_id' })
  tarefa: Task

  @ManyToOne(() => Student, (student) => student.activities)
  @JoinColumn({ name: 'student_cpf' })
  estudante: Student
}
