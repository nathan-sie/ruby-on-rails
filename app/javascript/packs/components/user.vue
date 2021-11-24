<template>
  <div>
  <div class="background" style="width: 100%; height: 100vh; overflow: hidden">
    <div class="containbox" style="width: 550px; margin: 150px auto">
      <div style="width: 400px; margin: 100px auto">
        <div style="color: #cccccc; font-size: 30px; text-align: center; padding: 30px 0">SignIn</div>
        <el-form @submit.prevent="signin" :rules="rules">
          <div v-if="error">{{ error }}</div>
          <el-form-item prop="email">
            <el-input prefix-icon="el-icon-user-solid" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item style="margin: 0px auto; text-align: center">
            <el-button style="width: 100%; float: inside;" type="primary" @click="signin">登 录</el-button>
          </el-form-item>
          <!-- <el-link href="register" style="padding-top: 10px; color: #cccccc">没有账户？注册</el-link> -->\
          <div style="padding-bottom: 45px"></div>
        </el-form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name:"user",
  data() {
    return {
      form: {},
      rules: {
        email: [
          {required: true, message: "请输入邮箱", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"}
        ]
      },
      error: ''
    }
  },
  // created () {
  //   this.checkSignIn()
  // },
  updated () {

  },
  methods: {
    // initialize(){
    //   return axios
    //       .get("users")
    //       .then(response => {
    //         console.log(response.data);
    //         this.desserts = response.data;
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       });
    // },
    // signin() {
    //   this.$http.plain.post('/signin', { email: this.form.email, password: this.form.password }).then(
    //       response => this.signinSuccesful(response)
    //   ).catch(
    //       error => this.signinFailed(error)
    //   )
    // },
    signin(){
      axios
        .post('/signin',{ email : this.form.email, password : this.form.password}).then(
            response=>this.signinSuccesful(response))
      .catch(
          error => this.signinFailed(error)
      )
    },
    signinSuccesful ( response ) {
      if (response.status === 0) {
        this.signinFailed(response)
        return
      }

      console.log(response.data)
      this.$router.replace('/home')
    },
    signinFailed ( error ) {
      console.log(error)
      // this.error = (error.response && error.response.data && error.response.data.error) || ''
    },
    checkSignedIn () {
      if ( localStorage.signedIn ) {
        this.$router.replace('/home')
      }
    }
  }
}

</script>

<style scoped>

.background{
  /*background-image: url("");*/
  position: fixed;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: page;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
}
.containbox{
  background-color: rgba(0,0,0,.5);
  border-radius: 20px;
  backdrop-filter: blur(3px);
}

</style>