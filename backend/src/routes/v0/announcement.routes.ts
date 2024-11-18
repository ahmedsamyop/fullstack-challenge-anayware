import { Router } from 'express'
import AnnouncementController from '../../controllers/announcement.controller'

import protectAuth from '../../middlewares/protectAuth.middleware'
import permissionMiddleware from '../../middlewares/permission.middleware'
import { UserRole } from '../../constants'
import validationMiddleware from '../../middlewares/validation.middleware'
import { zodAnnouncementSchema } from '../../Helpers/validation/announcement.validation'

const routes = Router()

routes
  .route('/')
  // @protectAuth  @GET /
  .get(protectAuth, AnnouncementController.getAll)
  // @protectAuth @permission [admin , instructor]  @POST /
  .post(
    protectAuth,
    validationMiddleware(zodAnnouncementSchema),
    permissionMiddleware(UserRole.admin, UserRole.instructor),
    AnnouncementController.create,
  )
routes
  .route('/:id')
  // @protectAuth  @GET /:id
  .get(protectAuth, AnnouncementController.getById)
  // @protectAuth @permission [admin , instructor]  @PATCH /:id
  .patch(
    protectAuth,
    validationMiddleware(zodAnnouncementSchema),
    permissionMiddleware(UserRole.admin, UserRole.instructor),
    AnnouncementController.updateById,
  )
  // @protectAuth @permission [admin , instructor]  @DELETE /:id
  .delete(
    protectAuth,
    permissionMiddleware(UserRole.admin, UserRole.instructor),
    AnnouncementController.deleteById,
  )

export default routes
