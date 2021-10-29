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
      <!-- 工具条 -->
      <div style="margin-bottom: 10px">
        <el-button type="danger" size="mini" @click="batchRemove()">
          批量删除
        </el-button>
      </div>
    </el-form>
    <!-- :data用于绑定数据 -->
    <el-table
      :data="list"
      border
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
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
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini">修改</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="removeById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
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
      searchObj: {},
      // 共享数据 批量选中额记录列表
      multipleSelection: []
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
    },
    removeById(id) {
      this.$confirm('此操作将永久删除该记录,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除记录
        return teacher.removeById(id)
      }).then(response => {
        // 刷新页面
        this.fetchData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch((err) => {
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      }
      )
    },
    // 当表格中多选项发生变化的时候触发
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },
    // 批量删除
    batchRemove() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除记录'
        })
        return
      }
      this.$confirm('此操作将永久删除所选记录,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 获取idList
        const idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })

        // 删除记录
        return teacher.batchRemove(idList)
      }).then(response => {
        // 刷新页面
        this.fetchData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch((err) => {
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      }
      )
    }
  }
}
</script>

