<template>
  <div class="cotent">
    <div class="logo"></div>
    <a-tabs default-active-key="1" tab-position="top" class="my_tabs" @change="changeTabs">
      <a-tab-pane key="1" tab="账号密码登录">
        <a-form :form="form1">
          <a-form-item>
            <a-input
              v-decorator="[
                  'username',
                  {
                    rules: [
                      { required: true, message: '请输入账号!' },
                      { validator:handleValidator }
                    ]
                  }
                ]"
              placeholder="Username-admin"
            >
              <!--  { rules: [{  validator:validator }] } -->
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
              v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入密码!' }] }
              ]"
              placeholder="Password"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input-password>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="手机号登录">
        <a-form :form="form2">
          <a-form-item>
            <a-input
              v-decorator="[
                'phone',
                {
                  rules: [
                    { required: true, message: '请输入手机号!' },
                    { validator:handleValidator }
                  ]
                }
              ]"
              placeholder="手机号"
            >
              <!-- { rules: [{  validator:validator }] } -->
              <svg
                slot="prefix"
                style="color: rgba(0,0,0,.25)"
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="tablet"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M800 64H224c-35.3 0-64 28.7-64 64v768c0 35.3 28.7 64 64 64h576c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64zm-8 824H232V136h560v752zM472 784a40 40 0 1080 0 40 40 0 10-80 0z"
                />
              </svg>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-row :gutter="16">
              <a-col :span="15">
                <a-input
                  v-decorator="[
                    'verify',
                    { rules: [{ required: true, message: '请输入验证码!' }] }
                  ]"
                  type="verify"
                  placeholder="验证码"
                >
                  <svg
                    slot="prefix"
                    style="color: rgba(0,0,0,.25)"
                    viewBox="64 64 896 896"
                    focusable="false"
                    data-icon="mail"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"
                    />
                  </svg>
                </a-input>
              </a-col>
              <a-col :span="9">
                <a-button @click="checkPhone">获取验证码</a-button>
              </a-col>
            </a-row>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
    <div style="width:300px;margin:0 auto;">
      <a-row>
        <a-col :span="8">
          <a-checkbox :checked="remembe_login">自动登录</a-checkbox>
        </a-col>
        <a-col :span="8" :offset="8">
          <a class="login-form-forgot" href>忘记密码</a>
        </a-col>
      </a-row>
      <a-button type="primary" html-type="submit" class="login-form-button" @click="login">确定</a-button>
    </div>
  </div>
</template>

<script>
// import { login as loginFun, getInfo } from '../../api/index'

const formRules = {
  username: (value, callback) => {
    if (!value) callback()
    let err = '请确认账号格式!'
    if (!/^1[3-9]\d{9}$/.test(value)) callback(err)
    callback()
  },
  phone: (value, callback) => {
    if (!value) callback()
    let err = '请输入正确手机!'
    if (!/^1[3-9]\d{9}$/.test(value)) callback(err)
    callback()
  }
}

export default {
  name: 'login',
  data () {
    return {
      form1: this.$form.createForm(this, { name: 'form1' }),
      form2: this.$form.createForm(this, { name: 'form2' })
    }
  },
  created () {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        this.login()
      }
    })
  },
  computed: {
    remembe_login () {
      return Number(localStorage.getItem('remembe_login')) === 1
    }
  },
  methods: {
    handleValidator (rule, value, callback) {
      formRules[rule.field](value, callback)
    },
    // 验证表单
    handleSubmit (index) {
      this['form' + index].validateFieldsAndScroll((err, values) => {
        if (!err) {
          // 成功
          this.$store.dispatch('Login', this['form' + index].getFieldsValue()).then((res) => {
            // console.log(res)
            this.$store.dispatch('GetInfo').then((info) => {
              // console.log(this.$store.state.user.roles)
              this.$router.push({ path: '/' })
            })
          })
          // loginFun(this['form' + index].getFieldsValue()).then(res => {
          //   localStorage.setItem('access_token', res.result.token)
          //   getInfo().then(info => {
          //     this.$store.dispath('')
          //     // .dispatch('Logout')
          //     this.$router.push({path: '/'})
          //   })
          // })
        } else {
          // 失败
          console.log('Received values of form: ', values, err)
        }
      })
    },
    // 获取验证码
    getVerify () {
      console.log('发送验证码')
      // axios({
      //   url: '111111',
      //   data: {
      //     phone: ''
      //   },
      //   type: 'POST',
      //   dataType: 'JSON',
      //   success () {},
      //   err () {},
      // })
    },
    checkPhone () {
      // this.form2.getFieldsValue(phone)
      // console.log(this.form2.getFieldsValue())
      // console.log(this.form2.getFieldsValue(['phone']))
      // let phone = this.form2.getFieldsValue(['phone']).phone
      this.form2.validateFields(['phone'], (err, values) => {
        // 校验某个值
        if (!err) {
          this.getVerify(values.phone)
        }
      })
    },
    // 监听登录方式切换
    changeTabs (e) {
      this.changeTabsIndex = e
    },
    // 点击登录
    login () {
      let changeTabsIndex = this.changeTabsIndex || 1
      this.handleSubmit(changeTabsIndex)
    }
  }
}
</script>

<style>
.cotent {
  height: 100%;
  background: #f0f2f5 url("../../assets/login_bg.svg") no-repeat 50%;
  background-size: 100%;
}
.login-form-button {
  width: 100%;
  margin-top: 15px;
}
.my_tabs {
  width: 300px;
  margin: 0 auto;
  padding-top: 220px;
}
.my_tabs .ant-tabs-bar {
  border: none;
}
.my_tabs .ant-tabs-nav {
  left: 50%;
  transform: translateX(-50%);
}
.login-form-forgot {
  width: 100%;
  text-align: right;
  display: block;
}
</style>
