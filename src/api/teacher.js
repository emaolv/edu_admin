import request from '@/utils/request'

// 统一导出
export default {
  getAllInfo() {
    // 返回请求的数据
    return request(
      {
        // 远程接口地址
        url: '/admin/edu/teacher/getAllInfo',
        method: 'get'
      }
    )
  }
}
