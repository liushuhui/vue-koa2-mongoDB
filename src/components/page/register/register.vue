<style lang="less">
.register-panner{
     width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:80px;
    }
    .register-button{
        padding-top:10px;
    }
</style>
<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="register-panner">
      <van-field
        v-model="userName"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="userName=''"
        :error-message="usernameErrorMsg"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary" @click="registerAction" size="large" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import url from '@/serviceApi.config.js';
import {Toast} from 'vant';

export default {
  name: "register",
  data() {
    return {
      userName: "",
      usernameErrorMsg: "",
      password: '',
      passwordErrorMsg: '',
      openLoading: false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerAction() {
        this.checkForm() && this.axiosRegisterUser();
    },
    axiosRegisterUser() {
        this.openLoading = true;
        axios({
            url: url.registerUser,
            method: 'post',
            data: {
                userName: this.userName,
                password: this.password
            }
        })
        .then(res => {
            console.log('response', res);
            if (res.data.code === 200) {
                Toast.success(res.data.msg);
                this.$router.push('/shopingMall');
            } else {
                this.openLoading = false;
                Toast.fail(res.data.msg.errmsg);
            }
        })
        .catch(err => {
            console.log('err---', err);
            this.openLoading = false;
            Toast.fail(res.data.msg);
        })
    },
    checkForm() {
        let isOk = true;
        if (this.userName.length < 5) {
            this.usernameErrorMsg = '用户名不能小于5';
            isOk = false;
        } else {
            this.usernameErrorMsg = '';
        }
        if (this.password.length < 6) {
            this.passwordErrorMsg = '密码不能小于6位';
            isOk = false;
        } else {
            this.passwordErrorMsg = '';
        }
        return isOk;
    }
  }
};
</script>