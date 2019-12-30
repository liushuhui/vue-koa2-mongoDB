<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            activePath: '' //当前路径
        }
    },
    created() {
        this.changeTabbarActive();
    },
    methods: {
        changeTabbarActive() {
            this.activePath = this.$route.path;
            console.log('this.activePath', this.activePath);
            if(this.activePath == '/cart') {
                this.active = 2;
            }
        },
        changeTabbar(active) {
            console.log('active', active);
            switch(active) {
                case 0:
                    this.$router.push({name: 'shopingMall'})
                    break;
                case 1:
                    this.$router.push({name: 'categoryList'})
                    break;
                case 2:
                    this.$router.push({name: 'cart'})
                    break;
                case 3:
                    this.$router.push({name: 'member'})
                    break;
            }
        }
    }
};
</script>

<style lang="less">
</style>