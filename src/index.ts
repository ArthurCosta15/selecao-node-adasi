import express from 'express'
import { AppDataSource } from './data-source'


AppDataSource.initialize().then(async () => {
        const app = express()
        
        app.use(express.json())

        return app.listen(process.env.PORT || 3000, () => console.log('Server is running!'))
    })