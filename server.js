const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const cors = require('cors')

const indexRouter = require('./routes')

app.set('port', process.env.PORT || 3333)

app.set('view engine', 'html')
nunjucks.configure('views', {
    express : app,
    watch : true
})

app.use(bodyParser.urlencoded({extended : true}))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use(cors())

app.use(session({
    httpOnly : true,
    resave : false,
    secret : 'geugageu',
    store : new fileStore()
}))

app.use('/', indexRouter)

app.listen(app.get('port'), () => {
    console.log('Listening at port '+app.get('port'))
})