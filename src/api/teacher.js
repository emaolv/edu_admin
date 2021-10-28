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
  },
  // 分页 数据从页面端传入
  pageList(page, limit, searchObj) {
    return request({
      url: `/admin/edu/teacher/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  removeById(id) {
    return request({
      url: `/admin/edu/teacher/remove/${id}`,
      method: 'delete'
    })
  }
}
