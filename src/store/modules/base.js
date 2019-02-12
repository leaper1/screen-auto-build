import _ from 'lodash'
import { EDIT_CONTEXTMENU, PUSH_COPYDATA, BLUR_COPYDATA } from '../mutation-types'

const state = {
  scale: 100,
  contextMenu: {
    show: false,
    axios: {
      x: null,
      y: null
    },
    menulists: []
  },
  copyData: {
    empty: true,
    data: {}
  }
}

const getters = {
  scale: state => state.scale / 100,
  contextMenuData: state => state.contextMenu,
  copyItem: state => state.copyData
}

const mutations = {
  updateScale (state, scale) {
    state.scale = scale
  },
  [EDIT_CONTEXTMENU] (state, menuData) {
    state.contextMenu = _.cloneDeep(menuData)
  },
  [PUSH_COPYDATA] (state, item) {
    state.copyData.data = _.cloneDeep(item)
    state.copyData.empty = false
  },
  [BLUR_COPYDATA] (state) {
    state.copyData = {
      empty: true,
      data: {}
    }
  }
}

export default {
  state,
  getters,
  mutations
}
