import Error from '../../interfaces/error.interface'

function customError(err: Error) {
  // new Error keyword
  const error: Error = Error(err.message)
  error.success = false
  error.status_code = err.status_code || 500
  error.error = err.error || 'Oops! Something went wrong.'
  //@TODO: error stack only displayed when config.appMode == 'dev
  error.stack = err.stack || undefined
  error.details = err.details || undefined
  return error
}

export default customError
