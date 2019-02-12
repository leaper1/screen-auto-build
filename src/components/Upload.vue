<template>
  <div class="cus-upload" @click="handleClick">
    <slot></slot>
    <input @change="handleChange($event)" :multiple="multiple" ref="input" type="file" name="file" class="dn"/>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import SparkMD5 from 'spark-md5'
import { fileUpload } from '../api/api.js'
export default {
  name: 'CusUpload',
  data () {
    return {
      defaultAttr: {
        fileName: 'fileName',
        fileSize: 'fileSize',
        fileType: 'fileType',
        imgUrl: 'imgUrl'
      }
    }
  },
  props: {
    attr: Object,
    limit: Number,
    fileList: Array, // 上传列表
    disabled: Boolean,
    multiple: Boolean,
    data: Number, // 自定义字段（上传完成原样返回）
    onSuccess: Function, // 上传成功 function(response, file, fileList, data) fileList 和 data 可选
    onError: Function, // 上传错误
    beforeUpload: Function, // 限制上传类型
    onExceed: Function, // 是否限制个数
    onProgress: Function, // 是否显示进度条
    abrot: Function
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$refs.input.value = null
        this.$refs.input.click()
      }
    },
    handleChange (ev) {
      const files = ev.target.files
      if (!files) return
      this.uploadFiles(files)
    },
    uploadFiles (files) {
      if (this.limit && this.fileList.length + files.length > this.limit) {
        return this.onExceed && this.onExceed(files, this.fileList)
      }

      let postFiles = Array.prototype.slice.call(files)
      if (!this.multiple) { postFiles = postFiles.slice(0, 1) }

      if (postFiles.length === 0) { return }

      postFiles.forEach((rawFile) => {
        const before = !this.beforeUpload || this.beforeUpload(rawFile)
        if (before) {
          this.computeFile(rawFile, this.post)
        }
      })
    },

    // 计算文件MD5值和sha256
    computeFile (rawFile, callback) {
      let imgUrl = rawFile.type.indexOf('image') !== -1 ? URL.createObjectURL(rawFile) : require('../assets/document.png')
      const fileItem = {
        percentage: 0,
        loading: false,
        readPercent: 0,
        reading: false,
        speed: '0',
        predict: '',
        preLoad: '0',
        abort: null,
        complete: false,
        [this.defaultAttr['fileType']]: rawFile.type,
        [this.defaultAttr['fileName']]: rawFile.name,
        [this.defaultAttr['fileSize']]: this.getfilesize(rawFile.size),
        [this.defaultAttr['imgUrl']]: imgUrl
      }

      if (this.fileList) {
        this.fileList.push(fileItem)
      }

      // 声明必要的变量
      let fileReader = new FileReader()
      // 文件分割方法
      let blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice
      // 文件每块分割2M，计算分割详情
      let chunkSize = 2097152
      let chunks = Math.ceil(rawFile.size / chunkSize)
      let currentChunk = 0

      let spark = new SparkMD5.ArrayBuffer()
      // const digestMd5 = CryptoJS.algo.MD5.create()
      const digestSha256 = CryptoJS.algo.SHA256.create()

      // 每块文件读取完毕之后的处理
      fileReader.onload = function (e) {
        const buffer = e.target.result
        // 每块交由sparkMD5进行计算
        spark.append(buffer)
        currentChunk++

        const array = new Uint8Array(buffer)
        const content = CryptoJS.lib.WordArray.create(array)
        // digestMd5.update(content)
        digestSha256.update(content)

        // 如果文件处理完成计算MD5，如果还有分片继续处理
        if (currentChunk < chunks) {
          loadNext()
        } else {
          fileItem.reading = false
          // let md5 = digestMd5.finalize().toString(CryptoJS.enc.Hex)
          let sha256 = digestSha256.finalize().toString(CryptoJS.enc.Hex)
          let md5 = spark.end()
          callback(rawFile, md5, sha256, fileItem)
        }
      }
      fileReader.onerror = function () {
        console.warn('oops, something went wrong.')
      }

      function loadNext () {
        let start = currentChunk * chunkSize
        let end = start + chunkSize >= rawFile.size ? rawFile.size : start + chunkSize
        fileReader.readAsArrayBuffer(blobSlice.call(rawFile, start, end))
        let progress = Math.ceil((currentChunk / chunks) * 100)
        fileItem.reading = true
        fileItem.readPercent = progress
      }
      loadNext()
    },

    // 文件大小转换
    getfilesize (size) {
      if (!size) { return '' }

      var num = 1024.00 // byte

      if (size < num) { return size + 'B' }
      if (size < Math.pow(num, 2)) { return (size / num).toFixed(2) + 'K' } // kb
      if (size < Math.pow(num, 3)) { return (size / Math.pow(num, 2)).toFixed(2) + 'M' } // M
      if (size < Math.pow(num, 4)) { return (size / Math.pow(num, 3)).toFixed(2) + 'G' } // G
      return (size / Math.pow(num, 4)).toFixed(2) + 'T' // T
    },

    // 上传文件
    post (rawFile, MD5Hash, sha256, fileItem) {
      let startTime = (new Date()).getTime()
      let preTime = (new Date()).getTime()

      fileItem.startTime = startTime
      fileItem.preTime = preTime

      let param = new FormData()
      param.append('file', rawFile)
      let params = {
        data: param,
        md5: MD5Hash,
        sha256: sha256,
        fileItem: fileItem,
        callback: this.postLoading,
        abrot: this.abrot
      }

      fileItem.loading = true
      fileUpload(params).then(res => {
        fileItem.complete = true
        fileItem.loading = false
        if (res.code !== 1) {
          // if (this.fileList) {
          //   const index = this.fileList.findIndex(item => item === fileItem)
          //   this.fileList.splice(index, 1)
          // }
          this.onError(res, rawFile, fileItem)
        } else {
          this.onSuccess(res, rawFile, fileItem)
        }
      })
    },

    // 上传中回调
    postLoading (evt, fileItem) {
      let nowTime = (new Date()).getTime()
      let nowLoad = evt.loaded
      let total = evt.total

      let percentage = Math.round(nowLoad / total * 100)

      let timeDelay = (nowTime - fileItem.preTime) / 1000
      let loadedDelay = nowLoad - fileItem.preLoad

      // b/s
      let speed = parseInt(loadedDelay / timeDelay)
      let preTime = Math.round((total - nowLoad) / speed)

      this.$nextTick(() => {
        fileItem.percentage = percentage
        fileItem.speed = this.setSpeed(speed)
        fileItem.predict = this.setPredict(preTime)

        if (this.onProgress) {
          this.onProgress(evt, fileItem)
        }
      })
      fileItem.preTime = nowTime
      fileItem.preLoad = nowLoad
    },

    setSpeed (value) {
      if (value > 1000) {
        value = (value / 1000 / 1024).toFixed(2) + 'M/s'
      } else {
        value = value + 'K/s'
      }
      return value
    },
    setPredict (value) {
      var m = parseInt(value / 60)
      var s = value % 60
      return '预计剩余：' + m + '分 ' + s + '秒'
    }
  },
  mounted () {
    if (this.attr) {
      for (const key in this.attr) {
        if (this.attr.hasOwnProperty(key)) {
          this.defaultAttr[key] = this.attr[key]
        }
      }
    }
  }
}
</script>
