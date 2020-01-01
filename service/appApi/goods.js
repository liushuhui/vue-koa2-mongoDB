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

router.get('/insertAllCategory', async(ctx) => {
    fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
        let count = 0;
        let Data = JSON.parse(data);
        console.log('Data---',Data)
        let schema = mongoose.model('category');
        Data.RECORDS.map((value) => {
            count++;
            let newSchema = schema(value);
            newSchema.save().then(() => {
                console.log('insertAllCategory success' +count)
            }).catch(err => {
                console.log('insertAllCategory failed '+err);
            })
        })
    })
    ctx.body = 'insertAllCategory-----';
})
router.get('/insertAllCategorySub', async(ctx) => {
    fs.readFile('./data_json/category_sub.json', 'utf8', (err,data) => {
        let Data = JSON.parse(data);
        let count = 0;
        let CategorySub = mongoose.model('categorySub');
        Data.RECORDS.map(value => {
            count++;
            let newCategorySub = new CategorySub(value);
            newCategorySub.save().then(() =>{
                console.log('insertAllCategorySub success:'+ count)
            }).catch((err) => {
                console.log('insertAllCategorySub fail:'+ err)
            })
        })
    })
    ctx.body = 'insertAllCategorySub----'
})
router.post('/getGoods', async(ctx) => {
    //一般写法
    // let goodsId = ctx.request.body.goodsId || ctx.request.body.params.goodsId;
    // console.log('ctx.reuquest.body', ctx.request.body)
    // const goodsSchema = mongoose.model('goods');
    // await goodsSchema.findOne({ID: goodsId}).then((result) => {
    //     ctx.body = { code: 200, data: result}
    // }).catch(err => {
    //     ctx.body = {code: 500, msg: err}
    // })
    //更好的写法
    try {
        let goodsId = ctx.request.body.goodsId;
        console.log('ctx.reuquest.body', ctx.request.body)
        const goodsSchema = mongoose.model('goods');
        let result = await goodsSchema.findOne({ID: goodsId}).exec();
        ctx.body = {code: 200, data: result};
    } catch(err) {
        ctx.body = {code: 500, msg: err}
    }
})

// 获取左侧列表接口
router.get('/getCategory', async(ctx) => {
    try {
        const getCategorySechma = mongoose.model('category');
        let result = await getCategorySechma.find().exec();
        ctx.body = {code: 200, data: result}
    } catch (error) {
        ctx.body = {code:500, msg: err}
    }

})

//点击获取右侧tab
router.post('/getCategorySub', async(ctx) => {
    try {
        let categoryId = ctx.request.body.params.categoryId;
        console.log('categoryId', categoryId)
        const CategorySub = mongoose.model('categorySub');
        let result = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec();
        ctx.body = {code: 200, data: result}
    }catch(err) {
        ctx.body = {code: 500, data: err}
    }
})

// 获取商品详细信息
router.post('/getCategorySubDetail', async(ctx) => {
    try {
        let categorySubId = ctx.request.body.params.categorySubId;
        console.log(ctx.request.body)
        const subGoods = mongoose.model('goods');
        let result = await subGoods.find({SUB_ID:categorySubId}).exec();
        ctx.body = {code: 200, data: result}
    } catch (error) {
        ctx.body = {code: 500, data: error}
    }
})
module.exports = router;