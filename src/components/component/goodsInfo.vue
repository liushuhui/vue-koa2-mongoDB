<template>
  <div @click="goGoodsPage()">
    <div class="goods-image">
      <img :src="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
  </div>
</template>

<script>
import  {tomoney}  from "@/filter/moneyFilter";
export default {
  data() {
    return {};
  },
  props: ["goodsImage", "goodsName", "goodsPrice", "goodsId"],
  filters: {
    moneyFilter(money) {
      //   console.log('toMoney', toMoney(money));
      return tomoney(money);
    }
  },
  methods: {
    goGoodsPage() {
        this.$router.push({path: '/goods', query: {goodsId: this.goodsId}})
    }
  }
};
</script>

<style lang="less" scoped>
</style>