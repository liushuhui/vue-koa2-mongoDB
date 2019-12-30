const BASEURL = "static/json/home.json"
const LOCATIONURL = 'http://localhost:3000/';

const URL = {
    getShopingMallInfo : BASEURL,    //首页所有信息
    registerUser: LOCATIONURL + 'user/register',
    login: LOCATIONURL + 'user/login'
}
module.exports = URL;