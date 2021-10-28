<template>
  <!-- 组件模板 -->
  <div class="app-container">
    <el-table :data="list" border stripe>
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === 1" type="success" size="mini">高级讲师</el-tag>
          <el-tag v-if="scope.row.level === 2" size="mini">首席讲师</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="简介" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column prop="joinDate" label="入驻时间" width="160" />
    </el-table>
  </div>
</template>
<script>
import teacher from '@/api/teacher'
export default {
  // 定义数据模型
  data() {
    return {
      // 讲师列表数据模型
      list: []
    }
  },
  // 页面加载后立即显示数据
  created() {
    this.fetchData()
  },
  // 调用方法
  methods: {
    // 调用远程API 加载远程列表
    fetchData() {
      // then 成功回调定义
      teacher.getAllInfo().then(
        // 参数 表达式
        response => {
          this.list = response.data.items
        })
    }
  }
}
</script>

