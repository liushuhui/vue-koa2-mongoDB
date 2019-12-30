const Koa = require('koa');
const app = new Koa();
const {connect, initSchema} = require('./database/init.js');
const mongoose = require('mongoose');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

app.use(bodyParser())
app.use(cors())

let user = require('./appApi/user.js');
let home = require('./appApi/home.js');
let goods = require('./appApi/goods.js');

//装载所有子路由
let router = new Router();
router.use('/user',user.routes());
router.use('/home',home.routes());
router.use('/goods',home.routes());

//加载路由中间件

app.use(router.routes());
app.use(router.allowedMethods());

(async() => {
   await connect();
    initSchema();
//     const user = mongoose.model('User');
//     let oneUser = new user({userName: 'marryhs', password: '13131'});
//     oneUser.save().then(() => {
//         console.log('插入成功');
//     });
//     let findReslut = await user.find().exec();
//     console.log(`----${findReslut}----`)
})()

app.use(async(ctx) => {
    ctx.body = 'hello sss';
});

app.listen(3000, () => {
   console.log( '[Server] starting at port 3000');
});