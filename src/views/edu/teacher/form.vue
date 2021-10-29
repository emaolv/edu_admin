<template>
  <div class="app-container">

    <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
      <el-form-item label="头像">
        <!-- action属性定义后台接口地址 :on-success 钩子函数-->
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8120/admin/oss/file/upload?module=avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>

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
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
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
      saveBtnDisabled: false,
      imageUrl: ''
    }
  },
  created() {
    // 从路由获取teacher ID
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },
  methods: {
    saveOrUpdate() {
      // 防止表单重复提交
      this.saveBtnDisabled = true
      if (this.teacher.id) {
        this.updateTeacherInfo()
      } else {
        this.saveTeacherInfo()
      }
    },

    // 数据保存
    saveTeacherInfo() {
      teacher.save(this.teacher).then(
        response => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      )
        .then(response => {
          this.$router.push({ path: '/teacher/list' })
        })
        .catch(response => {
          return this.message({
            type: 'error',
            message: '保存失败'
          })
        })
    },
    fetchDataById(id) {
      teacher.getById(id).then(response => {
        this.teacher = response.data.item
      })
    },
    // 更新讲师信息
    updateTeacherInfo() {
      teacher.updateById(this.teacher).then(response => {
        // 弹出成功提示
        this.$message({
          message: '更新成功',
          type: 'success'
        })
      })
        .then(response => {
          this.$router.push({ path: '/teacher/list' })
        })
        .catch(response => {
          this.message({
            type: 'error',
            message: '更新失败'
          })
        })
    },
    // 文件上传成功
    handleAvatarSuccess(response) {
      if (response.success) {
        this.teacher.avatar = response.data.url
        this.$forceUpdate()
      } else {
        this.$message.error('上传失败！（非20000）')
      }
    },
    // 文件上传失败（http）
    handleAvatarError() {
      this.$message.error('上传失败！（http）')
    },
    // 文件上传前的校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

