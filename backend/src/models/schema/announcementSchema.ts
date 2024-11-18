import mongoose from 'mongoose'

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true, trim: true },
  },
  { timestamps: true },
)

export default announcementSchema
