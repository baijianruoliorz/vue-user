//封装axios
import axios from 'axios'
import cookie from 'js-cookie'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:9001', // api的base_url  以前是写在dev啥的。。现在直接写这里
  timeout: 20000 // 请求超时时间
})

//拦截器：为什么写在request里面：因为这里封装了很多方法
service.interceptors.request.use( //这里表示每次请求中使用拦截器，在axios里面
  //http拦截器
  config=>{
    //debugger    加上你自己设置的名称
    if(cookie.get('guli_token')){ //如果这个值存在，放到header
      config.headers['token']=cookie.get('guli_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  }
)
export default service
