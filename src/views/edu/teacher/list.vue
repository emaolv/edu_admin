<template>
  <!-- 组件模板 -->
  <div class="app-container">
    <!-- 查询表单 inline 横向表单-->
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="讲师" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.level" clearable placeholder="头衔">
          <el-option label="高级讲师" value="1" />
          <el-option label="首席讲师" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.joinDateBegin"
          placeholder="入驻时间"
          value-format="yyyy-MM-dd"
        /></el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.joinDateEnd"
          placeholder="结束时间"
          value-format="yyyy-MM-dd"
        /></el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>
    <!-- :data用于绑定数据 -->
    <el-table :data="list" border stripe>
      <el-table-column
        label="编号"
        width="50"
      >
        <!-- 自定义 scope除了去当前行之外 还有可以取固定的index索引 -->
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>

      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="90">
        <!-- 通过scope 获取当前行中所有的数据 -->
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === 1" type="success" size="mini">高级讲师</el-tag>
          <el-tag v-if="scope.row.level === 2" size="mini">首席讲师</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="简介" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column prop="joinDate" label="入驻时间" width="160" />
    </el-table>
    <!-- @current-change="changeCurrentPage" 是方法引用 不是方法调用
    组件内部定义的事件，应用该事件的方法引用 而不是方法调用
    方法引用是从内部获取参数 而方法调用是我们给调用的方法传递参数 -->
    <el-pagination
      background
      layout="sizes, prev, pager, next"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20]"
      :current-page="page"
      style="padding-top: 20px, 0px; text-align: center"
      @current-change="changeCurrentPage"
      @size-change="changePageSize"
    />
  </div>
</template>
<script>
import teacher from '@/api/teacher'
export default {
  // 定义数据模型
  data() {
    return {
      // 讲师列表数据模型
      list: [],
      // 总记录数
      total: 0,
      // 页面
      page: 1,
      // 每页记录数
      limit: 5,
      // 查询表单数据
      searchObj: {}
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
      teacher.pageList(this.page, this.limit, this.searchObj).then(
        // 参数 表达式
        response => {
          this.list = response.data.rows
          this.total = response.data.total
        })
    },
    // 改变页码
    changeCurrentPage(page) {
      // 为page赋值
      this.page = page
      this.fetchData()
    },
    // 改变记录数
    changePageSize(limit) {
      this.limit = limit
      this.fetchData()
    },
    // 重置表单
    resetData() {
      this.searchObj = {}
      this.fetchData()
    }
  }
}
</script>

