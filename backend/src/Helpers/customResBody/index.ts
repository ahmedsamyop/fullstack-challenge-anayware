import ResBody from '../../interfaces/resBody.interface'

function customeResBody(
  data: [] | {} | any,
  message: string = 'Operation completed successfully.',
  status_code: number = 200,
  success: boolean = true,
): ResBody {
  return { success, message, status_code, data }
}

export default customeResBody
