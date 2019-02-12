import axios from 'axios'

export const fileUpload = params => {
  var CancelToken = axios.CancelToken
  params.fileItem.abort = CancelToken.source()
  return axios({
    url: '/file',
    method: 'post',
    data: params.data,
    cancelToken: params.fileItem.abort.token,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Content-MD5': params.md5,
      'Content-SHA256': params.sha256
    },
    onUploadProgress: function (progressEvent) {
      if (progressEvent.lengthComputable) {
        params.callback && params.callback(progressEvent, params.fileItem)
      }
    }
  }).then(res => res.data)
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        params.abrot && params.abrot(thrown.message, params.fileItem)
      }
    })
}
