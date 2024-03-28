import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Course } from './courses'

@Entity()
export class Student {
  @Column({ unique: true, primary: true })
  cpf: string

  @Column()
  name: string

  @Column({ unique: true })
  matrícula: string

  @ManyToOne(() => Course, (course) => course.students)
  @JoinColumn({ name: 'course_id' })
  course: Course
  activities: any
}
