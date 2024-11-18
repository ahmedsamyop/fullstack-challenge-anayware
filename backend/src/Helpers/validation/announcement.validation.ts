import { z } from 'zod'

const zodAnnouncementSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
})

export { zodAnnouncementSchema }
