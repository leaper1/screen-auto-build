import * as t from './mutation-types'
import _ from 'lodash'

const makeAction = (type) =>
  ({ commit }, payload) => commit(type, payload)

const makeActions = mutations => (
  Object.keys(mutations).reduce((actions, type) => {
    actions[type] = makeAction(normalMutations[type])
    return actions
  }, {})
)

// 可以简单处理的 mutation
const normalMutations = {
  addRenderItem: t.ADD_RENDER_ITEM,
  editRenderItem: t.EDIT_RENDER_ITEM,
  editDragModule: t.EDIT_DRAG_MODULE,
  blurRenderItem: t.BLUR_RENDER_ITEM,
  editDraging: t.EDIT_DRAGING,
  editRenderData: t.EDIT_RENDER_DATA,
  editRenderWh: t.EDIT_RENDER_WH,
  editModuleData: t.EDIT_MODULE_DATA,
  resetRenderState: t.RESET_RENDER_STATE,
  backupRenderItem: t.BACKUP_RENDER_ITEM,
  recallRenderItem: t.RECALL_RENDER_ITEM,
  nextRenderItem: t.NEXT_RENDER_ITEM,
  initRenderItem: t.INIT_RENDER_ITEM,
  // base
  editContextMenu: t.EDIT_CONTEXTMENU,
  pushCopyData: t.PUSH_COPYDATA,
  blurCopyData: t.BLUR_COPYDATA
}

const activeRenderItem = ({ commit }, event) => {
  commit(t.ACTIVE_RENDER_ITEM, getDragInfo(event))
}

// 复制控件
const pasteRenderItem = ({ state, commit }, event) => {
  let scale = state.base.scale / 100
  let module = _.cloneDeep(state.base.copyData.data)
  let { dragTag, offset } = getDragInfo(event)

  if (dragTag) {
    let data = module.data || null

    // module.alias = module.alias
    module.data.basic.left = Math.round(offset.left / scale - data.basic.width / 2)
    module.data.basic.top = Math.round(offset.top / scale - data.basic.height / 2)

    commit(t.ADD_RENDER_PASTE_ITEM, {
      type: module.type,
      module: module,
      parentKey: dragTag
    })
  }

  return dragTag
}

// 放置控件
const dropRenderItem = ({ state, commit }, event) => {
  let scale = state.base.scale / 100
  let module = state.render.dragModule
  let { dragTag, offset } = getDragInfo(event)

  if (dragTag) {
    let data = module.data || null

    module.data.basic.left = Math.round(offset.left / scale - data.basic.width / 2)
    module.data.basic.top = Math.round(offset.top / scale - data.basic.height / 2)

    commit(t.ADD_RENDER_ITEM, {
      type: module.type,
      module: module,
      parentKey: dragTag
    })
  }

  return dragTag
}

/**
 * 获得拖拽元素标签和应该出现的位置
 * @param event
 * @returns {{dragTag: string, position: string}}
 */
function getDragInfo (event) {
  let dragTarget = getDragTarget(event.target)
  let dragTag = dragTarget && dragTarget.getAttribute('drag-tag')
  let position = getDragPosition(event, dragTarget)

  return {
    dragTag,
    ...position
  }
}

/**
 * 获得拖拽元素的标签名
 * @param target
 * @returns {string}
 */
function getDragTarget (target) {
  let currentNode = target

  while (currentNode) {
    if (currentNode.getAttribute && currentNode.getAttribute('drag-tag')) {
      return currentNode
    }

    currentNode = currentNode.parentNode
  }
}

/**
 * 判断拖拽元素应该出现的位置
 * @param event
 * @param dragTarget
 * @returns {string}
 */
function getDragPosition (event, dragTarget) {
  if (dragTarget) {
    let rect = dragTarget.getBoundingClientRect()
    let offset = {
      left: event.clientX - rect.left,
      top: event.clientY - rect.top
    }
    return {
      offset
    }
  }
}

export default {
  ...makeActions(normalMutations),
  activeRenderItem,
  dropRenderItem,
  pasteRenderItem
}
