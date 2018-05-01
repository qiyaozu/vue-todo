const sha1 = require('sha1')
const axios = require('axios')
const className = 'todos'
const request = axios.create({
  baseURL: 'https://d.apicloud.com/mcm/api'
})
const createError = (code, response) => {
  const err = new Error(response.message)
  err.code = code
  return err
}
// 处理接口返回的数据
const haddleRequest = ({ status, data, ...rest }) => {
  if (status === 200) {
    return data
  } else {
    throw createError(status, rest)
  }
}
// https://docs.apicloud.com/Cloud-API/data-cloud-api
module.exports = (appId, appKey) => {
  const getHeaders = () => {
    const now = Date.now()
    return {
      'X-APICloud-AppId': appId,
      'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
    }
  }
  return {
    async getTodos () {
      return haddleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    },
    async addTodo (data) {
      return haddleRequest(await request.post(
        `/${className}`,
        data,
        { headers: getHeaders() }
      )
      )
    },
    async updateTodo (id, body) {
      return haddleRequest(await request.put(
        `/${className}/${id}`,
        body,
        { headers: getHeaders() }
      )
      )
    },
    async delTodo (id) {
      return haddleRequest(await request.delete(
        `/${className}/${id}`,
        { headers: getHeaders() }
      )
      )
    },
    async deleteCompleted (ids) {
      // https://docs.apicloud.com/Cloud-API/data-cloud-api 搜索批量处理
      const requests = ids.map(id => {
        return {
          method: 'DELETE',
          path: `/mcm/api/${className}/${id}`
        }
      })
      return haddleRequest(await request.post(
        '/batch',
        { requests },
        { headers: getHeaders() }
      ))
    }
  }
}
