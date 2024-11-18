import { z } from 'zod'

const solutionSchema = z.object({
  id: z.string().min(1, 'Id is required'),
  body: z.string().min(1, 'Body is required'),
})

const zodQuizzeSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
  title: z.string().min(1, 'Title is required'),
  quiz: z.string().min(1, 'Quiz is required'),
  solutions: z.array(solutionSchema),
  correctSolution: z.string().min(1, 'Correct Solution is required'),
})

export { zodQuizzeSchema }
