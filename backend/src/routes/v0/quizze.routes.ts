import { Router } from 'express'
import QuizzeController from '../../controllers/quizze.controller'

import protectAuth from '../../middlewares/protectAuth.middleware'
import permissionMiddleware from '../../middlewares/permission.middleware'
import { UserRole } from '../../constants'
import validationMiddleware from '../../middlewares/validation.middleware'
import { zodQuizzeSchema } from '../../Helpers/validation/quizze.validation'

const routes = Router()

routes
  .route('/')
  // @protectAuth  @GET /
  .get(protectAuth, QuizzeController.getAll)
  // @protectAuth @permission [admin , instructor]  @POST /
  .post(
    protectAuth,
    validationMiddleware(zodQuizzeSchema),
    permissionMiddleware(UserRole.admin, UserRole.instructor),
    QuizzeController.create,
  )
routes
  .route('/:id')
  // @protectAuth  @GET /:id
  .get(protectAuth, QuizzeController.getById)
  // @protectAuth @permission [admin , instructor]  @PATCH /:id
  .patch(
    protectAuth,
    validationMiddleware(zodQuizzeSchema),
    permissionMiddleware(UserRole.admin, UserRole.instructor),
    QuizzeController.updateById,
  )
  // @protectAuth @permission [admin , instructor]  @DELETE /:id
  .delete(
    protectAuth,
    permissionMiddleware(UserRole.admin, UserRole.instructor),
    QuizzeController.deleteById,
  )

export default routes
