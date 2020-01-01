<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表"></van-nav-bar>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li v-for="(cate, index) in categoryArr" 
                            :key="index" @click="clickLeftNavLi(index, cate.ID)"
                            :class="{categoryActice: active===index}"
                            >
                            {{cate.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="activeIndex" @click="onClickCategorySub">
                            <van-tab v-for="(item, index) in categorySubArr" :key="index" :title="item.MALL_SUB_NAME">

                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-list>
                            <div class="list-item" v-for="(item, index) in goodsList" :key="index">
                                <div class="list-item-img">
                                    <img :src="item.IMAGE1" width="100%">
                                </div>
                                <div class="list-item-text">
                                    <div>{{item.NAME}}</div>
                                    <div>￥{{item.ORI_PRICE}}</div>
                                </div>
                            </div>
                        </van-list>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import url from '@/serviceApi.config'
    export default {
        data() {
            return {
                categoryArr: [],
                categorySubArr: [],
                goodsList: [],
                activeIndex: 0,
                active: '',
                categoryId: '',
                categorySubId: ''

            }
        },
        created() {
            this.getCategory();
        },
        mounted() {
            let winHeigh = document.documentElement.clientHeight;
            document.getElementById('leftNav').style.height = winHeigh - 46 - 50 + 'px';
        },
        methods: {
            getCategory() {
                this.$axios.get(url.getCategory).then(res => {
                    if (res.data.code === 200 && res.data.data) {
                        this.categoryArr = res.data.data;
                        this.clickLeftNavLi(0, this.categoryArr[0].ID);
                    }
                }).catch(err => {
                    console.log('---err', err)
                })
            },
            onClickCategorySub(index) {
                let categorySubId = this.categorySubArr[index].ID;
                console.log('categorySubId', categorySubId);
                this.$axios.post(url.getCategorySubDetail, {params: {categorySubId: categorySubId}})
                    .then(res => {
                        if(res.data.code && res.data.data) {
                            this.goodsList = res.data.data;
                            console.log(res.data.data)
                        } else {
                            console.log('err2---', res)
                        }
                    }).catch(err => {
                        console.log('errrra', err)
                    })
            },
            clickLeftNavLi(index, id) {
                this.active = index;
                this.$axios.post(url.getCategorySub, {params: {categoryId: id}})
                .then(res => {
                    if(res.data.code ===200 && res.data.data) {
                        this.categorySubArr = res.data.data;
                    } else {
                        console.log('errrr')
                    }
                }).catch(err => {
                    console.log('errorrr', err)
                })
            }
        }
    }
</script>

<style lang="less">
    #leftNav{
        background-color: aliceblue;
    }
    #leftNav ul li {
        line-height: 2rem;
        border-bottom: 1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    }
    .categoryActice{
        background-color: #fff;
    }


    .list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }

</style>