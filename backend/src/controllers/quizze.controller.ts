import type { NextFunction, Request, Response } from 'express'
import type Quizze from '../types/quizze.type'

import QuizzeModel from '../models/quizze.model'
import customeResBody from '../Helpers/customResBody'

class QuizzeController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await QuizzeModel.getAll()
      const resBody = customeResBody(
        response,
        response.length ? 'Display all Quizzes successfully' : 'Quizzes are not available now',
      )
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const response = await QuizzeModel.getById(id)
      const resBody = customeResBody(response, 'Display quizze successfully')
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const quizze: Quizze = {
        topic: req.body.topic,
        title: req.body.title,
        quiz: req.body.quiz,
        solutions: req.body.solutions,
        correctSolution: req.body.correctSolution,
      }
      const response = await QuizzeModel.create(quizze)
      const resBody = customeResBody(response, 'Quizze created successfully', 201)
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
  static async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const quizze: Quizze = {
        topic: req.body.topic,
        title: req.body.title,
        quiz: req.body.quiz,
        solutions: req.body.solutions,
        correctSolution: req.body.correctSolution,
      }
      const response = await QuizzeModel.updateById(id, quizze)
      const resBody = customeResBody(response, 'Quizze updated successfully')
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
  static async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      await QuizzeModel.deleteById(id)
      const resBody = customeResBody(null, 'Quizze deleted successfully')
      res.status(resBody.status_code).json(resBody)
    } catch (error) {
      next(error)
    }
  }
}

export default QuizzeController
