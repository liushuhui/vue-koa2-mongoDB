const BASEURL = "static/json/home.json"
const LOCATIONURL = 'http://localhost:3000/';

const URL = {
    getShopingMallInfo : BASEURL,    //首页所有信息
    registerUser: LOCATIONURL + 'user/register',
    login: LOCATIONURL + 'user/login',
    goods: LOCATIONURL + 'goods/getGoods', //获取商品信息
    getCategory: LOCATIONURL + 'goods/getCategory', //获取左侧类别
    getCategorySub: LOCATIONURL + 'goods/getCategorySub', //获取右侧类别
    getCategorySubDetail: LOCATIONURL + 'goods/getCategorySubDetail', //获取右侧类别
}
module.exports = URL;