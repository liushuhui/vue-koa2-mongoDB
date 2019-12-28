<style lang="less">
    @import './index.less';
</style>

<template>
   <div class="shopingMall">
       <div class="search-bar">
        <van-row class="row">
            <van-col span="3">
                <img class="icon" style="height: 2rem" :src="iconUrl" alt="ss" width="100%">
            </van-col>
            <van-col span="16">
                <input type="text" class="search-input">
            </van-col>
            <van-col span="5">
                <van-button size="mini">查找</van-button>
            </van-col>
        </van-row>
       </div>
       <div class="swiper-area">
           <van-swipe :autoplay="1000">
               <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
                   <img :src="banner.imgSrc" alt="" width="100%">
               </van-swipe-item>
           </van-swipe>
       </div>
   </div> 
</template>
<script>
import axios from 'axios';
export default {
    name: "shopingMall",
    data() {
        return {
            iconUrl: require('@/assets/img/dingwei.png'),
            bannerPicArray: [
                {imgSrc: require('@/assets/img/banner1.jpg')},
                {imgSrc: require('@/assets/img/banner2.jpg')},
                {imgSrc: require('@/assets/img/banner3.jpg')},
            ]
        }
    },
    created() {
        axios({
            url: 'https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/index',
            method: 'get'
        })
        .then(res => {
            console.log(res)
        })
    }
}
</script>