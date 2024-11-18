import { Router } from 'express'
import UserController from '../../controllers/user.controller'

import protectAuth from '../../middlewares/protectAuth.middleware'
import permissionMiddleware from '../../middlewares/permission.middleware'
import { UserRole } from '../../constants'
import validationMiddleware from '../../middlewares/validation.middleware'
import {
  zodAuthUserSchema,
  zodCreateUserSchema,
  zodUpdateUserSchema,
} from '../../Helpers/validation/user.validation'

const routes = Router()

routes
  .route('/')
  // @protectAuth @permission [admin , instructor]  @GET /
  .get(
    protectAuth,
    permissionMiddleware(UserRole.admin, UserRole.instructor),
    UserController.getAll,
  )
  // @Public  @POST /
  .post(validationMiddleware(zodCreateUserSchema), UserController.create)
routes
  .route('/:id')
  // @protectAuth @permission [admin , instructor, user]  @GET /:id
  .get(
    protectAuth,
    permissionMiddleware(UserRole.admin, UserRole.instructor, UserRole.user),
    UserController.getById,
  )
  // @protectAuth @permission [admin , user]  @PATCH /:id
  .patch(
    protectAuth,
    validationMiddleware(zodUpdateUserSchema),
    permissionMiddleware(UserRole.admin, UserRole.user),
    UserController.updateById,
  )
  // @protectAuth @permission [admin , user]  @DELETE /:id
  .delete(
    protectAuth,
    permissionMiddleware(UserRole.admin, UserRole.user),
    UserController.deleteById,
  )
// @public @POST /auth
routes.route('/auth').post(validationMiddleware(zodAuthUserSchema), UserController.authenticate)

export default routes
