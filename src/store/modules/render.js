import _ from 'lodash'
// import { pick, cloneDeep, flow } from 'lodash/fp'
import {
  ACTIVE_RENDER_ITEM,
  EDIT_RENDER_ITEM,
  ADD_RENDER_ITEM,
  BLUR_RENDER_ITEM,
  EDIT_DRAG_MODULE,
  EDIT_DRAGING,
  EDIT_RENDER_DATA,
  EDIT_RENDER_WH,
  // EDIT_MODULE_DATA,
  RESET_RENDER_STATE,
  BACKUP_RENDER_ITEM,
  RECALL_RENDER_ITEM,
  NEXT_RENDER_ITEM,
  INIT_RENDER_ITEM,
  // 黏贴
  ADD_RENDER_PASTE_ITEM
} from '../mutation-types'

// const defaultItems = {
//   key: 'root_key',
//   direction: 'horizontal', // horizontal水平排列  vertical垂直排列
//   type: 'Containter',
//   bg: '#ffffff',
//   data: {
//     w: 800,
//     h: 480
//   },
//   components: [],
//   children: []
// }
const createDefaultState = (data) => {
  data.items = {}
  data.current = {}
  data.dragInfo = {}
  data.dragModule = {}
  data.draging = false
  data.rollbackData = []
  data.step = 0
  data.addTypeCount = {
    'Txt': 0,
    'Poster': 0,
    'Vdo': 0,
    'Lottie': 0,
    'Carousel': 0,
    'BarCode': 0,
    'QrCode': 0
  }
}

const state = {}
createDefaultState(state)

const getters = {
  activeModule: state => state.dragInfo,
  currentModule: state => state.current,
  dragInfo: state => state.dragInfo,
  draging: state => state.draging,
  dragModule: state => state.dragModule,
  render: state => state,
  renderItems: state => state.items,
  rollbackData: state => state.rollbackData,
  step: state => state.step
}

const mutations = {
  [ADD_RENDER_PASTE_ITEM] (state, {
    module,
    parentKey
  }) {
    let newItem = _.cloneDeep(module)
    newItem._timestamp = Date.now()

    let findItem = function (obj, key) {
      if (obj.key === key) {
        // 复制的空间命名
        let aliasList = []
        obj.components.forEach(item => {
          if (item.alias.indexOf(newItem.alias) !== -1) {
            aliasList.push(item.alias)
          }
        })
        for (let i = 2; i < 100; i++) {
          let alias = `${newItem.alias}(${i})`
          if (aliasList.indexOf(alias) === -1) {
            newItem.alias = alias
            break
          }
        }
        obj.components.push(newItem)
      } else {
        obj.children.forEach(el => {
          findItem(el, key)
        })
      }
    }
    findItem(state.items, parentKey)

    // 添加组件-备份
    backupData(state)

    // 添加完成，重置拖动信息为空
    state.current = newItem
    state.dragInfo = {}
  },

  [ADD_RENDER_ITEM] (state, {
    module,
    parentKey
  }) {
    let newItem = _.cloneDeep(module)
    newItem._timestamp = newItem._timestamp || Date.now()

    let findItem = function (obj, key) {
      if (obj.key === key) {
        state.addTypeCount[newItem.type]++
        newItem.alias = newItem.alias + state.addTypeCount[newItem.type]
        obj.components.push(newItem)
      } else {
        obj.children.forEach(el => {
          findItem(el, key)
        })
      }
    }
    findItem(state.items, parentKey)

    // 添加组件-备份
    backupData(state)

    // 添加完成，重置拖动信息为空
    state.current = newItem
    state.dragInfo = {}
  },

  [EDIT_RENDER_ITEM] (state, item) {
    state.current = item
  },

  // [EDIT_MODULE_DATA] (state, item) {
  //   let index = state.items.indexOf(item)
  //   if (index !== -1) state.items.splice(index, 1, item)
  // },

  // 初始化数据
  [EDIT_RENDER_DATA] (state, render) {
    if (render) {
      state.items = _.cloneDeep(render)
    }
  },

  [EDIT_DRAG_MODULE] (state, dragModule) {
    state.dragModule = dragModule
  },

  [EDIT_DRAGING] (state, draging) {
    state.draging = draging
  },

  // 拖动后设置宽高
  [EDIT_RENDER_WH] (state) {
    let setHw = function (node, obj) {
      let percent = node.percent
      if (obj.direction === 'vertical') {
        node.data.w = parseInt(obj.width * (percent / 100))
        node.data.h = obj.height
      } else {
        node.data.w = obj.width
        node.data.h = parseInt(obj.height * (percent / 100))
      }
      node.children.forEach(item => {
        let subObj = {
          width: node.data.w,
          height: node.data.h,
          direction: node.direction
        }
        setHw(item, subObj)
      })
    }
    let parentObj = {
      width: state.items.data.w,
      height: state.items.data.h,
      direction: state.items.direction
    }
    state.items.children.forEach(item => {
      setHw(item, parentObj)
    })
  },

  // 拖动控件
  [ACTIVE_RENDER_ITEM] (state, dragInfo) {
    state.dragInfo = dragInfo
  },

  [BLUR_RENDER_ITEM] (state) {
    state.current = {}
  },

  [RESET_RENDER_STATE] (state) {
    createDefaultState(state)
  },

  // 备份数据
  [BACKUP_RENDER_ITEM] (state) {
    backupData(state)
  },
  // 后退操作
  [RECALL_RENDER_ITEM] (state) {
    state.items = _.cloneDeep(state.rollbackData[state.step - 1].data)
    state.step--
  },
  // 前进操作
  [NEXT_RENDER_ITEM] (state) {
    state.items = _.cloneDeep(state.rollbackData[state.step + 1].data)
    state.step++
  },
  // 初始化
  [INIT_RENDER_ITEM] (state) {
    let data = _.cloneDeep(state.items)
    state.rollbackData.push({
      step: 0,
      data: data
    })
  }
}

// 备份数据
function backupData (state) {
  let len = state.rollbackData.length
  let currentStep = state.step
  let data = _.cloneDeep(state.items)
  if (currentStep === len - 1) {
    state.rollbackData.push({
      step: currentStep + 1,
      data: data
    })
  } else if (currentStep < len - 1) { // 执行了后退操作之后后续动作执行了add的操作，则清空currentStep索引之后的数据重新添加
    state.rollbackData.splice(currentStep + 1, len - currentStep)
    state.rollbackData.push({
      step: currentStep + 1,
      data: data
    })
    state.step = currentStep
  }
  state.step++
}

export default {
  state,
  getters,
  mutations
}
