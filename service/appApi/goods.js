const mongoose = require('mongoose');
const Router = require('koa-router');
const fs = require('fs');
let router = new Router();

router.get('/insertAllGoodsInfo', async(ctx) => {
    fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
        let count = 0;
        let Data = JSON.parse(data);
        const goods = mongoose.model('goods');
        Data.map((value) => {
            let newGoods = new goods(value);
            console.log('newGoods', newGoods);
            newGoods.save().then(() => {
                count++;
                console.log('插入数据成功'+ count);
            }).catch((err) => {
                console.log('insert fail'+ err)
            })

        })
    })
    ctx.body = '插入数据中'
})
module.exports = router;