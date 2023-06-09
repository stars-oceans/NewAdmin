// 提交文件的 封装的 上传函数

import axios from 'axios';
function upload( path, Form) {
  // 因为有文件所以需要 创建一个 FormData() 对象
  let params = new FormData()
  // 然后追加进去
  for (let i in Form) {
    params.append(i, Form[i])
  }
  // console.log(params);
  return axios.post(path, params, {
    // 配置响应头 因为有文件传输 
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}

export default upload