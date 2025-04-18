import { Router } from 'express'

const router = Router()

const sendHtml = `<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <h1>RESTApiget localhost:3000/xxx</h1>
    </body>
</html>
`

router.get('/', (req, res) => {
    res.send(sendHtml)
})

router.get('/aa', (req, res) => {
    res.send('xxxx aa')
})

export default router
