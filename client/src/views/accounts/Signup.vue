<template>
<div>   
  <v-app>        
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">            
      <div>                
        <v-tabs v-model="tab" show-arrows background-color="deep-purple accent-4" icons-and-text dark grow>                    
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>                    
          <v-tab>                        
            <v-icon large>mdi-account-outline</v-icon>                        
            <div class="caption py-1">Signup</div>                    
          </v-tab>                    
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="firstName" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6"> 
                      <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field> 
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="username" :rules="[rules.required]" label="Username" maxlength="20" required></v-text-field>    
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="nickname" :rules="[rules.required]" label="Nickname" maxlength="20" required></v-text-field>    
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>    
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" 
                        label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                        :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" 
                        label="Confirm Password" counter @click:append="show1 = !show1">
                      </v-text-field>   
                    </v-col>
                    <v-spacer></v-spacer> 
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
                  </v-row>
                </v-form>
              </v-card-text>
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

export default {
  name: 'Login',
  data: function () {
    return {
      dialog: true,
      valid: true, 
      firstName: "",
      lastName: "",
      username: "",
      nickname: null,
      email: "",
      password: "",
      verify: "",
      emailRules: [
        v => !!v || "Required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
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
      this.$router.push({name: 'Home'}).catch(()=>{})
    },
    signup: function () {
      const credentials = {
        first_name: this.firstName,
        last_name: this.lastName,
        username: this.username,
        password: this.password,
        email: this.email,
        nickname: this.nickname,
      }
      axios({
        method:'post',
        url:'http://127.0.0.1:8000/accounts/signup/',
        data: credentials
      })
      .then((res)=>{
        if (res.data.err) {
          alert('중복된 username 입니다.')
        }
        else {
        this.$router.push({name:'Login'}).catch(()=>{})
        // console.log(res)
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
    validate() {
      if (this.$refs.registerForm.validate()) {
        // submit form to server/API here...
        this.signup()
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  }
}
</script>
