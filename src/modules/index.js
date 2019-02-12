import Txt from './components/Txt.vue'
import Poster from './components/Poster.vue'
import Vdo from './components/Vdo.vue'
import Lottie from './components/LottieAnima.vue'
import Carousel from './components/Carousel.vue'
import BarCode from './components/BarCode.vue'
import QrCode from './components/QrCode.vue'

export const modules = [
  {
    alias: '文本',
    type: 'Txt',
    icon: 'text',
    data: {
      basic: {
        left: 0,
        top: 0,
        width: 150,
        height: 60,
        rotate: 0
      },
      value: 'Synron是一家智慧型公司',
      style: {
        padding: '3px',
        textAlign: 'left', // left right center
        fontSize: '22px',
        fontWeight: '', // bold
        fontStyle: '', // 斜体：italic
        textDecoration: '', // underline overline
        // textTransform: '', // 首字母大写： capitalize， 全大写： uppercase， 全小写： lowercase
        color: '',
        backgroundColor: ''
      }
    }
  },
  {
    alias: '条形码',
    type: 'BarCode',
    icon: 'txcode',
    data: {
      basic: {
        left: 0,
        top: 0,
        width: 200,
        height: 50,
        rotate: 0
      },
      value: null,
      coverUrl: require('../assets/txcode.png') // 前端用
    }
  },
  {
    alias: '二维码',
    type: 'QrCode',
    icon: 'qrcode',
    data: {
      basic: {
        left: 0,
        top: 0,
        width: 150,
        height: 150,
        rotate: 0
      },
      value: [],
      coverUrl: require('../assets/qrcode.png')
    }
  },
  {
    alias: '图片',
    type: 'Poster',
    icon: 'image',
    data: {
      basic: {
        left: 100,
        top: 0,
        width: 200,
        height: 150,
        rotate: 0
      },
      value: [{
        type: 'img',
        fileName: 'image.jpg',
        value: require('../assets/image.jpg')
      }],
      coverUrl: require('../assets/image.jpg')
    }
  },
  {
    alias: '视频',
    type: 'Vdo',
    icon: 'video',
    data: {
      basic: {
        left: 0,
        top: 0,
        width: 200,
        height: 150,
        rotate: 0
      },
      value: [],
      coverUrl: require('../assets/video.gif')
    }
  },
  {
    alias: '动画',
    type: 'Lottie',
    icon: 'gif',
    data: {
      basic: {
        left: 0,
        top: 0,
        width: 250,
        height: 150,
        rotate: 0
      },
      style: {
        fileName: '',
        // rendererSettings: {},
        loop: true, // 循环
        speed: 1 // 速度
      },
      value: null // json 文件
    }
  },
  {
    alias: '轮播',
    type: 'Carousel',
    icon: 'carousel',
    data: {
      basic: {
        left: 0,
        top: 0,
        width: 250,
        height: 150,
        rotate: 0
      },
      style: {
        interval: 3000, // 轮播时间
        autoplay: true, // 自动播放
        loop: true // 循环
      },
      // 可以是图片，视频，动画
      value: [{
        type: 'img',
        fileName: '轮播1.jpg',
        value: require('../assets/carousel1.jpg')
      }, {
        type: 'lottie',
        fileName: 'pinjump.json',
        animationData: require('../assets/pinjump.json'),
        // rendererSettings: {},
        loop: true,
        speed: 1
      }],
      coverUrl: require('../assets/carousel1.jpg')
    }
  }
]

export const components = {
  Txt, Poster, Vdo, Lottie, Carousel, BarCode, QrCode
}
