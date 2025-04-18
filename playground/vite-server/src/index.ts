import express from 'express'
import xxx from './api/xxxRouter'
import yyy from './api/yyyRouter'

const app = express()

app.get('/', (req, res) => {
    console.log(req)
    res.send('ok2222')
})

app.use('/xxx', xxx)
app.use('/yyy', yyy)

app.listen(3000)
