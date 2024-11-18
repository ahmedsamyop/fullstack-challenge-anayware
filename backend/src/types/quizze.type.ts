type Solution = {
  id?: string
  body?: string
}

type Quizze = {
  _id?: string
  topic?: string
  title?: string
  quiz?: string
  solutions?: Solution[]
  correctSolution?: string
  createdAt?: string
  updatedAt?: string
}

export default Quizze
