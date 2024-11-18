import User from './user.type'

type Announcement = {
  _id?: string
  title?: string
  content?: string
  createdAt?: string
  updatedAt?: string
  userRef?: string | User // user id  for reference to the user object
}

export default Announcement
