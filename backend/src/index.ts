import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import config from './config'
import routes from './routes'
import errorRouteMiddleware from './middlewares/errorRoute.middleware'
import errorMiddleware from './middlewares/error.middleware'
// Express Application
const app = express()
const port: number = config.port || 3005

// Middleware

// HTTP Security Headers
app.use(helmet())
// Allow Access
app.use(cors())
// Express parse incoming JSON data from HTTP requests
app.use(express.json())
// Application Routes
app.use('/api/v0', routes)
// Error Middleware Application Routes
app.use(errorMiddleware)
// Error Middleware routes not defined
app.use(errorRouteMiddleware)

// // application runing
app.listen(port, () => console.log(`Server listening on port : ${port}`))
