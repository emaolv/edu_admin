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
      // params 是表单传输方式
      params: searchObj
    })
  },
  removeById(id) {
    return request({
      url: `/admin/edu/teacher/remove/${id}`,
      method: 'delete'
    })
  },
  // 新建teacher
  save(teacher) {
    return request({
      url: `/admin/edu/teacher/save`,
      method: 'post',
      // 后端requestbody 前端 data data是json传输方式
      data: teacher
    })
  },
  // 根据ID获取teacher信息
  getById(id) {
    return request({
      url: `/admin/edu/teacher/get/${id}`,
      method: 'get'
    })
  }
}
