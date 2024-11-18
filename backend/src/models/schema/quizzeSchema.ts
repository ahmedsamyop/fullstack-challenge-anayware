import mongoose from 'mongoose'

const quizzeSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    quiz: { type: String, required: true, trim: true },
    solutions: {
      type: [
        {
          id: { type: String, required: true },
          body: { type: String, required: true },
        },
      ],
    },
    correctSolution: { type: String, required: true, trim: true },
    // @TODO: add userRef attribute feature
  },
  { timestamps: true },
)

export default quizzeSchema
