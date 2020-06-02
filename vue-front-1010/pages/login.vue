<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">

        <el-form-item class="input-prepend restyle" prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="手机号" v-model="user.mobile"/>
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="user.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'
  import cookie from 'js-cookie'
  import loginApi from "../api/login";
  export default {
    layout: 'sign',

    data () {
      return {
        user:{
          mobile:'',
          password:''
        },
        loginInfo:{}
      }
    },

    methods: {
      submitLogin(){
        loginApi.submitLoginUser(this.user)
         .then(response=>{
           //获取token字符串  ,三个参数分别是token名字（自己命名，token值，作用范围，这里表示只有在localhost ip时才能传递
           cookie.set('guli_token', response.data.data.token,{domain:'localhost'})
             //调用接口，判断是否有token信息，为了首页面显示
           loginApi.getLoginUserInfo()
                    .then(response=>{
                      //获取用户信息，放入cookie
                      this.loginInfo=response.data.data.userInfo
                      cookie.set('guli_ucenter',response.data.data.userInfo,{domain:'localhost'})

                      //跳转到首页面,也可以this.$router.push
                      window.location.href="/";
                    })
         })
      },
      //登录和登录成功之后首页面实现数据实现过程分析
      //1.调用接口返回token
      //2、把token放进cookie中
      //3.创建前端的一个拦截器，判断cookie里面是否有token字符串
      //4.把cookie中的token 放进requestHeader
      //5.根据token值调用接口，获得用户信息，进行页面显示，用户信息也是放在cookie中
      //6.在首页面中显示用户信息
      checkPhone (rule, value, callback) {
        //debugger
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      }
    }
  }
</script>
<style>
   .el-form-item__error{
    z-index: 9999999;
  }
</style>
