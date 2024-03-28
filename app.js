const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const app = new Koa();
app.use(bodyParser());
app.use(controller());

app.listen(5200,()=>{
    console.log('app start at port 5200!' );
});

