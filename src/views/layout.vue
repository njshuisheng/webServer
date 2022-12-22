<template>
  <div class="common-layout">
    <el-container>
      <el-header height="50px">
        <div class="header-layout">
          <el-avatar :size="40" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
          <el-button type="primary" link @click="onRouter('/')">退出登录</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="1"
            text-color="#fff"
          >
        <el-menu-item index="1" @click="onRouter('/home')">
          <span>首页</span>
        </el-menu-item>
      </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function onRouter(path) {
  if (path === '/') {
    localStorage.removeItem('__login__')
  }
  router.push(path)
}
</script>
<style>
.el-header {
  background-color: #303133;
}
.header-layout {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
}
.el-aside {
  height: calc(100vh - 50px);
  background-color: #545c64;
}
</style>