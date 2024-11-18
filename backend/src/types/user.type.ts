type User = {
  _id?: string
  name?: string
  email?: string
  password?: string
  createdAt?: string
  updatedAt?: string
  role?: 'user' | 'admin' | 'instructor'
}

export default User
