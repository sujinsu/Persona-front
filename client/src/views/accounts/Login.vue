<template>

<div>   
  <v-app>        
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">            
      <div>                
        <v-tabs show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>                    
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>                    
          <v-tab class="fs-3 fw-bold">                        
            <v-icon large>mdi-account</v-icon>                        
            <div class="caption py-1">Login</div>                    
          </v-tab>                    
          <v-tab-item>                        
            <v-card class="px-4">                            
              <v-card-text>                                
                <v-form ref="loginForm" v-model="valid" lazy-validation>                                  
                  <v-row>                                        
                    <v-col cols="12">
                      <v-text-field v-model="loginUsername" :rules="loginUsernameRules" label="Username" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">  
                      <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" 
                        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" 
                        name="input-10-1" label="Password" hint="At least 8 characters" counter 
                        @click:append="show1 = !show1">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="close"
                >Close</v-btn>
                <v-btn
                  text
                  @click="validate"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
  </v-app>
</div>



</template>

<script>
import axios from 'axios'

// const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Login',
  data: function () {
    return {
      dialog: true,
      valid: true,
      loginPassword: "",
      loginUsername: "",
      loginUsernameRules: [
        v => !!v || "Required",
      ],
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => (v && v.length >= 8) || "Min 8 characters"
      }
    }
  },
  methods: {
    close:function (){
      this.dialog = false
      this.$router.push({name:'Home'}).catch(()=>{})
    },
    setToken:function(){
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization:`JWT ${token}`
      }
      return config
    },
    // 해당 유저의 상세 정보 조회
    GetMyProfile:function(){
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/accounts/profile/',
        headers:this.setToken() // JWT token
      })
      .then(res => {
        console.log(res.data)
        localStorage.setItem('nickname',res.data[0].nickname)
      })
      .catch(err => {
        console.log(err)
      })
    },
    login: function () {
      const credentials = {
        username: this.loginUsername,
        password: this.loginPassword,
      }
      axios({
        method:'post',
        url:'http://127.0.0.1:8000/accounts/api-token-auth/',
        data: credentials
      })
      .then(res=>{
        console.log(res)
        localStorage.setItem('jwt',res.data.token)
        this.$store.dispatch('login')
        this.GetMyProfile()
        this.$router.push({name:'Home'}).catch(()=>{})
      })
      .catch(err=>{
        console.log(err)
      })
    },
    isSuperuser: function () {
      const credentials = {
        username: this.loginUsername,
        password: this.loginPassword,
      }
      axios({
        method: 'post',
        url:'http://127.0.0.1:8000/accounts/superuser/',
        data: credentials
      })
      .then(res=>{
        console.log(res)
        localStorage.setItem('superuser', res.data)
        this.$store.dispatch('isSuperuser', res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
        this.isSuperuser()
        this.login()
      } 
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
}
</script>