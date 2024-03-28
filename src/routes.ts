import { Router } from "express"
import { CoursesController } from "./controllers/CoursesController"
import { StudentsController } from "./controllers/StudentsController"
import { TasksController } from "./controllers/TasksController"

const routes = Router()

// Rotas dos Cursos
routes.post('/courses', new CoursesController().create)
routes.get('/courses', new CoursesController().getAllCourses)
routes.get('/courses/:id', new CoursesController().getCourseById)
routes.put('/courses/:id', new CoursesController().updateCourse)
routes.delete('/courses/:id', new CoursesController().deleteCourse)


// Rotas dos Estudantes
routes.post('/students', new StudentsController().create)
routes.get('/students', new StudentsController().getAllStudents)
routes.get('/students/:cpf', new StudentsController().getStudentById)
routes.put('/students/:cpf', new StudentsController().updateStudent)
routes.delete('/students/:cpf', new StudentsController().deleteStudent)

// Rotas das Tarefas
routes.post('/tasks', new TasksController().create)
routes.get('/tasks', new TasksController().getAllTasks)
routes.get('/tasks/:id', new TasksController().getTaskById)
routes.put('/tasks/:id', new TasksController().updateTask)
routes.delete('/tasks/:id', new TasksController().deleteTask)


export default routes