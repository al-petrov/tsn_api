const express = require('express')
const userRouter = require('./routes/user.routes')
const postsRouter = require('./routes/posts.routes')

const PORT = process.env.PORT || 8080

const app = express()

const cors = require('cors');

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', postsRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))