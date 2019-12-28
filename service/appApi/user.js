const Router = require('koa-router');
const mongoose = require('mongoose');
let router = new Router();

router.get('/', async(ctx) => {
    ctx.body = "this is user home"
})

router.post('/register', async(ctx) => {
    let user = mongoose.model('User');
    let newUser = new user(ctx.request.body);
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