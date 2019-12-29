const Router = require('koa-router');
const mongoose = require('mongoose');
let router = new Router();
// 首页
router.get('/', async(ctx) => {
    ctx.body = "this is user home"
})
// 注册接口--操作数据库插入数据
router.post('/register', async(ctx) => {
    let user = mongoose.model('User');
    let newUser = new user(ctx.request.body);
    console.log('---user----', user);
    console.log('---newUser---', newUser);
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            msg: '注册成功'
        }
    }).catch((err) => {
        ctx.body = {
            code: 500,
            msg: err
        }
    })
})
// 登陆接口--查询数据库判断登陆的密码和用户名
router.post('/login', async(ctx) => {
    let loginUser = ctx.request.body;
    console.log('loginUser', loginUser);
    let userName = loginUser.userName;
    let password = loginUser.password;

    const user = mongoose.model('User');
    await user.findOne({userName: userName}).exec().then(async(result) => {
        console.log('result', result);
        if (result) {
            let newUser = new user();
            await newUser.comparePassword(password, result.password)
                        .then(isMath => {
                            ctx.body = {code: 200, msg: isMath}
                        })
                        .catch(err => {
                            ctx.body = {code: 500, msg: err}
                        })
        } else {
            ctx.body = { code: 500, msg: '用户不存在'}
        }
    })
})
module.exports = router;