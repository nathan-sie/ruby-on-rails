<template>
  <div>
  <div class="background" style="width: 100%; height: 100vh; overflow: hidden">
    <div class="containbox" style="width: 550px; margin: 150px auto">
      <div style="width: 400px; margin: 100px auto">
        <div style="color: #cccccc; font-size: 30px; text-align: center; padding: 30px 0">SignIn</div>
        <el-form  :rules="rules" :model="signinform" ref="login"> 
          <!-- @submit.prevent="signin" -->
          <div v-if="errorinfo">{{ errorinfo }}</div>
          <el-form-item label = "Email" prop="email">
            <el-input style="margin-left:28px ;width:91%" v-model="signinform.email">:</el-input>
          </el-form-item>
          <el-form-item label = "Password" prop="password">
            <el-input  v-model="signinform.password" show-password>:</el-input>
          </el-form-item>
          <el-form-item style="margin: 0px auto; text-align: center">
            <el-button style="width: 100%; float: inside;" type="primary" @click="submitForm">登 录</el-button>
          </el-form-item>
          <!-- <el-link href="register" style="padding-top: 10px; color: #cccccc">没有账户？注册</el-link> -->\
          <div style="padding-bottom: 45px"></div>
        </el-form>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {useRouter} from 'vue-router';
import { reactive,ref,toRef,unref } from 'vue';
  name:"user"
    const login = ref(null)
    const router = useRouter();
    const errorinfo = ref(null)
    const signinform = reactive({
      email: '',
      password:''  
    })
    const rules = ref({
        email: [
          {required: true, message: "请输入邮箱", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"}
        ]
    })
    const submitForm = async ()=>{
      login.value.validate((valid)=>{
        if(valid){
          console.log(signinform.email + " " + signinform.password)
            axios.post('/signin',{ email : signinform.email, password :signinform.password}).then(response=>{
                  var status = response.status
                  var message = response.message
                  // let id = response.data.id
                  let id = response.data.data.id
                  if(status === 0){
                    errorinfo = message
                  }else{
                    // console.log(response.data.data.id)
                    router.push({path:'/home',query:{
                      id : id
                    }})
                  }
                })
                
        }
      })
      }
    // {
    //   const form = unref(formInfo)
    //   if(!form) return
    //   try {
    //           await form.validate()
    //           const {email,password} = toRef(signinform)
    //           console.log(email + "  " + password)
    //           axios
    //             .post('/signin',{ email : signinform.email, password :signinform.password}).then(
    //                 response=>signinSuccesful(response))
    //             .catch(
    //                 error => signinFailed(error)
    //   )
    //         } catch (error) {
    //         } 
    // }
    // const signinSuccesful=async(response) =>{
    //   if (response.status === 0) {
    //     this.signinFailed(response)
    //     return
    //   }
    //   console.log(response.data)
    //   router.push('/home')
    // }

    // const signinFailed=async(error)=>{
    //   console.log(error)
    //   // this.error = (error.response && error.response.data && error.response.data.error) || ''
    // }
    // const checkSignedIn=()=>{
    //   if ( localStorage.signedIn ) {
    //     this.$router.replace('/home')
    //   }
    // }
  
  // data() {
  //   return {
  //     form: {
  //       email :'',
  //       password :''
  //     },
  //     rules: {
  //       email: [
  //         {required: true, message: "请输入邮箱", trigger: "blur"}
  //       ],
  //       password: [
  //         {required: true, message: "请输入密码", trigger: "blur"}
  //       ]
  //     },
  //     error: ''
  //   }
  // },

  // created () {
  //   this.checkSignIn()
  // },
  // updated () {
  // },
  // methods: {
  //   initialize(){
  //     return axios
  //         .get("users")
  //         .then(response => {
  //           console.log(response.data);
  //           this.desserts = response.data;
  //         })
  //         .catch(e => {
  //           console.log(e);
  //         });
  //   },
  //   signin(){
  //     axios
  //       .post('/signin',{ email : this.form.email, password : this.form.password}).then(
  //           response=>this.signinSuccesful(response))
  //     .catch(
  //         error => this.signinFailed(error)
  //     )
  //   },
  //   signinSuccesful ( response ) {
  //     if (response.status === 0) {
  //       this.signinFailed(response)
  //       return
  //     }

  //     console.log(response.data)
  //     this.$router.replace('/home')
  //   },
  //   signinFailed ( error ) {
  //     console.log(error)
  //     // this.error = (error.response && error.response.data && error.response.data.error) || ''
  //   },
  //   // checkSignedIn () {
  //   //   if ( localStorage.signedIn ) {
  //   //     this.$router.replace('/home')
  //   //   }
  //   // }
  // }

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