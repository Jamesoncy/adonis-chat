const express = require('express')
const app = express()
const path = require('path')
const key = process.env.NODE_ENV
const env = require('dotenv').load({ path: `.${key}.env` }).parsed

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname))
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => res.render('index.html', {
    API_URL: env.API_URL,
    APP_NAME: env.APP_NAME,
}))

app.listen(env.APP_PORT, () => console.log(`${env.APP_NAME} listening on port ${env.APP_PORT}!`))