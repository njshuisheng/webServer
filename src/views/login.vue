<template>
  <div class="wrapper">
    <div class="login-text">
      <span>登录平台</span>
    </div>
    <el-form
      ref="formRef"
      :model="dynamicValidateForm"
      label-width="80px"
      class="demo-dynamic"
    >
      <el-form-item
        prop="username"
        label="账号"
        :rules="[
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          },
          {
            type: 'username',
            message: '请输入账号',
            trigger: ['blur', 'change']
          }
        ]"
      >
        <el-input size="large" v-model="dynamicValidateForm.username" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }"
      >
        <el-input size="large" v-model="dynamicValidateForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button size="large" style="width: 100%" type="primary" @click="submitForm(formRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from '../api'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const formRef = ref()
const dynamicValidateForm = reactive({
  username: 'hello',
  password: '123456'
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios.post('/xkgw/ht/login/userLogin', dynamicValidateForm).then((res) => {
        if (res.retCode === 0) {
          localStorage.setItem('__login__', 'abc')
          router.push('/shouye')
        } else {
          ElMessage.warning(res.message)
        }
      })
    } else {
      return false
    }
  })
}
</script>
<style scoped>
.wrapper {
  padding: 50px;
  width: 700px;
  margin: 0 auto;
  margin-top: 400px;
  background-color: #F0F2F5;
}
.login-text {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
}
</style>