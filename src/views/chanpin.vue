<template>
  <div>
    <p style="display: flex; justify-content: space-between">
      <span>产品</span>
      <el-button type="primary" size="small" @click="add(3)">新增</el-button>
    </p>
    <el-table :data="products">
      <el-table-column prop="resourceUrl" label="地址"></el-table-column>
      <el-table-column prop="detail" label="详情"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="edit(scope.row, 3)"
            >编辑</el-button
          >
          <el-button
            link
            type="primary"
            danger
            size="small"
            @click="del(scope.row, 3)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="visible" :title="state === 'add' ? '新增' : '修改'">
      <el-form :model="form" label-width="120px">
        <el-form-item label="地址">
          <el-input v-model="form.resourceUrl" />
          <el-upload
            :action="null"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button style="margin-top: 5px;">上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="form.detail" type="textarea" />
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

const products = ref([])
const state = ref('add')
const visible = ref(false)
const form = reactive({
  resourceUrl: '',
  detail: ''
})
const row = ref(null)
const key = ref(3)
const type = ref(3)

function beforeUpload(file) {
  const formData = new FormData()
  formData.append('file', file)
  axios.post('/xkgw/image/uploadImage', formData).then((res) => {
    if (res.retCode === 0) {
      form.resourceUrl = res.data
    }
  })

  return false
}

function list() {
  axios.post('/xkgw/qt/getInformationBybutton', { key: key.value }).then((res) => {
    if (Array.isArray(res.data.products)) {
      products.value = res.data.products.map(n => (n.resourceUrl = n.resource_url, n))
    }
  })
}

function edit(r, t) {
  state.value = 'edit'
  row.value = r
  type.value = t
  form.detail = r.detail
  form.resourceUrl = r.resourceUrl
  visible.value = true
}
function del(r, t) {
  row.value = r
  type.value = t
  ElMessageBox.confirm('删除后不可恢复，确认删除吗?', '确认', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    axios.post('/xkgw/ht/delete', { key: key.value, id: r.id }).then((res) => {
      if (res.retCode === 0) {
        ElMessage.success('删除成功！')
        list()
      }
    })
  })
}
function add(t) {
  state.value = 'add'
  visible.value = true
  type.value = t
}

function confirm() {
  const data = {}
  if (state.value === 'edit') {
    data.id = row.value.id
  }
  axios
    .post('/xkgw/ht/save', Object.assign(data, form, { key: key.value, type: type.value }))
    .then((res) => {
      if (res.retCode === 0) {
        ElMessage.success('操作成功！')
        list()
        cancel()
      }
    })
}

function cancel() {
  form.resourceUrl = ''
  form.detail = ''
  state.value = 'add'
  visible.value = false
  row.value = null
}

onMounted(() => {
  list()
})
</script>
