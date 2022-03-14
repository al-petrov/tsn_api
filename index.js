const express = require('express')
const userRouter = require('./routes/user.routes')
const postsRouter = require('./routes/posts.routes')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 8080

const app = express()

const cors = require('cors');

app.use(cors({
    credentials: true,
    origin: 'http://barabulka.site'
}))
app.use(cookieParser())
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', postsRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))