import 'dotenv/config'

import { PrismaClient } from '@prisma/client'
import express, { Response } from 'express'

const app = express()

app.get('/', async (_, res: Response) => {
  const prisma = new PrismaClient()

  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error })
  } finally {
    await prisma.$disconnect()
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
