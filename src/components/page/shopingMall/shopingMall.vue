<style lang="less">
@import "./index.less";
</style>

<template>
  <div class="shopingMall">
    <div class="search-bar">
      <van-row class="row">
        <van-col span="3">
          <img class="icon" style="height: 2rem" :src="iconUrl" alt="ss" width="100%" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img :src="banner.image" alt width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div v-for="(cate, index) in category" :key="index">
        <img :src="cate.image" alt="jiazai" width="90%" />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <div>
      <img :src="addBanner" width="100%" />
    </div>
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor :floorData="floor1" :floorTitle="floorName.floor1"></floor>
    <floor :floorData="floor2" :floorTitle="floorName.floor2"></floor>
    <floor :floorData="floor3" :floorTitle="floorName.floor3"></floor>
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item , index) in hotGoods" :key="index">
              <goods-info
                :goodsId="item.goodsId"
                :goodsImage="item.image"
                :goodsName="item.name"
                :goodsPrice="item.price"
              ></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import url from "@/serviceApi.config";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floor from "../../component/floor";
import goodsInfo from "../../component/goodsInfo";
import { tomoney } from "@/filter/moneyFilter";
export default {
  name: "shopingMall",
  components: {
    swiper,
    swiperSlide,
    floor,
    goodsInfo
  },
  data() {
    return {
      iconUrl: require("@/assets/img/dingwei.png"),
      category: [],
      bannerPicArray: [],
      addBanner: "",
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [],
      swiperOption: {
        slidesPerView: 3
      }
    };
  },
  filters: {
    moneyFilter(money) {
      return tomoney(money);
    }
  },
  created() {
    axios({
      url: url.getShopingMallInfo,
      method: "get"
    }).then(res => {
      let resData = res.data.data;
      this.bannerPicArray = resData.slides;
      this.category = resData.category;
      this.addBanner = resData.advertesPicture.PICTURE_ADDRESS;
      this.recommendGoods = resData.recommend;
      this.floor1 = resData.floor1;
      this.floor2 = resData.floor2;
      this.floor3 = resData.floor3;
      this.floorName = resData.floorName;
      this.hotGoods = resData.hotGoods;
    });
  }
};
</script>