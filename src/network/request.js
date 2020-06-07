import axios from 'axios'

export function request(config){
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })
//axios 拦截器
//拦截请求数据
instance.interceptors.request.use(config =>{
  // console.log(config)
  //拦截之后还要返回出去
  return config

}, err =>{
  console.log('拦截器，Error')
})

//拦截响应数据
instance.interceptors.response.use(res =>{
  //打印响应结果data
  // console.log(res.data)
  return res.data

}, err =>{
  console.log(err)
})

  return instance(config)
}

