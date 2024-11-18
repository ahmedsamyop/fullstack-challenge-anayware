import { Router } from 'express'
import userRouter from './v0/user.routes'
import quizzeRouter from './v0/quizze.routes'
import announcementRouter from './v0/announcement.routes'

const routes = Router()

// All routes for application
routes.use('/users', userRouter)
routes.use('/quizzes', quizzeRouter)
routes.use('/announcements', announcementRouter)

export default routes
