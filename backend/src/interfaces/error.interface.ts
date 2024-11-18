interface Error {
  success?: boolean
  status_code?: number
  error?: string
  message: string
  stack?: string
  details?: {} // make interface error details feature
}

export default Error
