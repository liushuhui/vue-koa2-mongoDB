<style lang="less">
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
}
.detail {
  font-size: 0px;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}

.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
</style>
<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%">
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格 ：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">评论制作中</van-tab>
      </van-tabs>
    </div>

    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceApi.config";
import { Toast } from "vant";
import {tomoney} from '@/filter/moneyFilter'
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: []
    };
  },
  filters: {
      moneyFilter(price) {
          return tomoney(price)
      }
  },
  created() {
    this.goodsId = this.$route.query.goodsId || this.$route.query.params.goodsId;
    this.getGoodsInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    addGoodsToCart() {},
    getGoodsInfo() {
      this.$axios
        .post(url.goods, {
          params: {
            goodsId: this.goodsId
          }
        })
        .then(res => {
          if(res.data.code === 200&&res.data.data) {
              this.goodsInfo = res.data.data;
          } else {
              Toast.fail('获取数据失败')
          }
        })
        .catch(err => {
          console.log("err", err);
        });
      // axios({
      //     url: url.goods,
      //     method: 'post',
      //     data:{
      //         goodsId: this.goodsId
      //     }
      // }).then(res => {
      //     console.log('res:',res)
      // }).catch(err => {
      //     console.log('err:', err)
      // })
    }
  }
};
</script>