const changeTheme = function (themeValue) {
  /**
   * 切换主题函数
   */
  // 切换主题导航背景色
  // switch (themeValue) {
  //   case 'Blue':
  //   /* eslint-disable */
  //     $('.navbar').css('background-color', '#409eff')
  //     break
  //   case 'Green':
  //     $('.navbar').css('background-color', '#009a61')
  //     break
  //   case 'Red':
  //     $('.navbar').css('background-color', '#f44336')
  //     break
  //   case 'Purple':
  //     $('.navbar').css('background-color', '#7B7DE5')
  //     break
  //   default:
  //     $('.navbar').css('background-color', '#21baa9')
  //     break
  // }

  // 需要移到单独的文件存放
  let localPath = process.env.BASE_URL + 'theme/'
  var itemPath = localPath + themeValue + '/' + 'index.css'

  loadCss(itemPath)

  localStorage.setItem('themeValue', themeValue)

  function loadCss (path) {
    var head = document.getElementsByTagName('head')[0]
    var link = head.querySelector('link[type="text/css"][data-key="theme"]')
    link.href = path
  }
}

export default changeTheme
