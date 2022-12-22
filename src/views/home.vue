<template>
    <div style="height: 900px; overflow-y: auto;">
      <p style="display: flex;justify-content: space-between;">
        <span>轮播图</span>
        <el-button type="primary" size="small" @click="add(1, 1)">新增</el-button>
      </p>
      <el-table :data="b">
        <el-table-column prop="resource_url" label="地址"></el-table-column>
        <el-table-column prop="detail" label="详情"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row, 1)">编辑</el-button>
          <el-button link type="primary" danger size="small" @click="delete1(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <p style="display: flex;justify-content: space-between;">
        <span>Logo</span>
        <el-button type="primary" size="small" @click="add(1, 2)">新增</el-button>
      </p>
      <el-table :data="c">
        <el-table-column prop="resource_url" label="地址"></el-table-column>
        <el-table-column prop="detail" label="详情"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row, 1)">编辑</el-button>
          <el-button link type="primary" danger size="small" @click="delete1(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <p style="display: flex;justify-content: space-between;">
        <span>视频</span>
        <el-button type="primary" size="small" @click="add(1, 4)">新增</el-button>
      </p>
      <el-table :data="d">
        <el-table-column prop="resource_url" label="地址"></el-table-column>
        <el-table-column prop="detail" label="详情"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row, 1)">编辑</el-button>
          <el-button link type="primary" danger size="small" @click="delete1(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <p style="display: flex;justify-content: space-between;">
        <span>新闻</span>
        <el-button type="primary" size="small" @click="add(1, 3)">新增</el-button>
      </p>
      <el-table :data="news">
        <el-table-column prop="resource_url" label="地址"></el-table-column>
        <el-table-column prop="detail" label="详情"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row, 1)">编辑</el-button>
          <el-button link type="primary" danger size="small" @click="delete1(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <p style="display: flex;justify-content: space-between;">
        <span>产品</span>
        <el-button type="primary" size="small" @click="add(1, 3)">新增</el-button>
      </p>
      <el-table :data="products">
        <el-table-column prop="resource_url" label="地址"></el-table-column>
        <el-table-column prop="detail" label="详情"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row, 1)">编辑</el-button>
          <el-button link type="primary" danger size="small" @click="delete1(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <p style="display: flex;justify-content: space-between;">
        <span>关于我们</span>
        <el-button type="primary" size="small" @click="add(1, 4)">新增</el-button>
      </p>
      <el-table :data="intro">
        <el-table-column prop="resource_url" label="地址"></el-table-column>
        <el-table-column prop="detail" label="详情"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row, 1)">编辑</el-button>
          <el-button link type="primary" danger size="small" @click="delete1(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <p style="display: flex;justify-content: space-between;">
        <span>公司介绍</span>
        <el-button type="primary" size="small" @click="add(1, 5)">新增</el-button>
      </p>
      <el-table :data="about">
        <el-table-column prop="resource_url" label="地址"></el-table-column>
        <el-table-column prop="detail" label="详情"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row, 1)">编辑</el-button>
          <el-button link type="primary" danger size="small" @click="delete1(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>

      <el-dialog v-model="e" :title="state === 'add' ? '新增' : '修改'">
        <el-form :model="g" label-width="120px">
          <el-form-item label="地址">
            <el-input v-model="g.resource_url" />
          </el-form-item>
          <el-form-item label="详情">
            <el-input v-model="g.detail" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import axios from '../api'
const b = ref([])
const c = ref([])
const d = ref([])
const e = ref(false)
const g = reactive({
  id: '',
  resource_url: '',
  detail: ''
})
const key = ref('')
const type = ref('')
const state = ref('add') // add edit 

const news = ref([])
const products = ref([])
const intro = ref([])
const about = ref([])

function add(k, t) {
  key.value = k
  type.value = t
  state.value = 'add'
  e.value = true
}

function confirm() {
  axios.post('/xkgw/ht/save', Object.assign(g, { key: key.value, type: type.value })).then(res => {
      if (res.retCode === 0) {
        ElMessage.success('操作成功！')
        a()
        cancel()
      }
    })
}

function edit(row, k, t) {
  g.detail = row.detail
  g.resource_url = row.resource_url
  g.id = row.id
  state.value = 'edit'
  e.value = true
}

function delete1(row) {
  ElMessageBox.confirm('删除后不可恢复，确认删除吗?', '确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    axios.post('/xkgw/ht/delete', { key: 1, id: row.id }).then(res => {
      if (res.retCode === 0) {
        ElMessage.success('删除成功！')
        a()
      }
    })
  })
}
function cancel() {
  f.value = 1
  g.resource_url = ''
  g.detail = ''
  g.id = ''
  e.value = false
}
function a() {
  axios.post('/xkgw/qt/getInformationBybutton', { key: '1' }).then(r => {
    b.value = r.data.topImages
    c.value = r.data.topLogos
    d.value = r.data.topVideos
  })
}

onMounted(() => {
  a()

  axios.post('/xkgw/qt/getInformationBybutton', { key: 2 }).then(r => {
    console.log(r, 1)
    news.value = r.data.news
  })
  axios.post('/xkgw/qt/getInformationBybutton', { key: 3 }).then(r => {
    console.log(r, 2)
    products.value = r.data.products
  })
  axios.post('/xkgw/qt/getInformationBybutton', { key: 4 }).then(r => {
    console.log(r, 3)
    about.value = r.data.about
  })
  axios.post('/xkgw/qt/getInformationBybutton', { key: 5 }).then(r => {
    console.log(r, 4)
    intro.value = r.data.intro
  })
})
</script>
<style lang='scss' scoped>

</style>