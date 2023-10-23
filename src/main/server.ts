import express, { Request, Response } from 'express'
import user_router from './routes/user-routes'

const app = express()
app.use(express.json())

app.use('/users', user_router)

app.listen(4000, () => console.log('Server rodando de boaça'))