<template>
  <div class="app-container">
    <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="入驻时间">
        <el-input v-model="teacher.joinDate" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" :min="0" />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level">
          <!-- :value 动态绑定的值 确保数据是number -->
          <el-option label="高级讲师" :value="1" />
          <el-option label="首席讲师" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历 ">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介 ">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from '@/api/teacher'

export default {
  data() {
    return {
      // 讲师对象
      teacher: {
        sort: 0,
        level: 1
      },
      // 默认按钮可用
      saveBtnDisabled: false
    }
  },
  methods: {
    saveOrUpdate() {
      console.log(this.teacher)
      // 防止表单重复提交
      this.saveBtnDisabled = true
      // 新增讲师信息
      this.saveTeacherInfo()
    },

    // 数据保存
    saveTeacherInfo() {
      teacher.save(this.teacher).then(
        response => {
          this.$message({
            message: response.message,
            type: 'success'
          })
            .then(response => {
              this.$router.push({ path: '/teacher/list' })
            })
            .catch(response => {
              return this.message({
                type: 'error',
                message: '保存失败'
              })
            })
        }
      )
    }
  }
}
</script>

