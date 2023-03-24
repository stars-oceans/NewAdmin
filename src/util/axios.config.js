import axios from 'axios';

// axios 拦截器
// 请求发出之前的拦截器
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


//请求得到响应之前的拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response.headers);
  const { authorization } = response.headers
  // console.log(authorization);
  // 如果有就存起来
  if (authorization) {
    localStorage.setItem('token', authorization)
  }
  return response;
}, function (error) {
  let { status } = error.response

  localStorage.removeItem('token')
  if (status === 401) {
    console.log(status);
    window.location.href = "#/login";
  }
  return Promise.reject(error);
});