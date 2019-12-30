/**
 * created by zipai at 2018-01-25
 *
 * 通用 modal框 提示框
 * 不依赖其他js，各种框架通用
 * ------------------------
 *
 */
const _body = document.getElementsByTagName('body')[0]
let _modalMask
let _modalWrap
let _title
let _content
let _sure
let _cancel

let _messageMask
let _text
let lastTime = 0
function createModal() {
  if (!document.getElementById('modalMask')) {
    const modalMask = document.createElement('div')
    modalMask.setAttribute('class', 'modal-mask')
    modalMask.setAttribute('id', 'modalMask')
    modalMask.innerHTML = `
        <div class="modal-wrap" id="modalWrap">
            <div class="modal-top">
                <span class="modal-title" id="title"></span>
            </div>
            <div class="modal-content">
                <span class="modal-text" id="content"></span>    
            </div>
            <div class="modal-bottom">
                <button class="modal-btn" id="cancel">取消</button>
                <button class="modal-btn" id="sure">确定</button>
            </div>
        </div>`
    const messageMask = document.createElement('div')
    messageMask.setAttribute('class', 'message-mask animated fadeInDown')
    messageMask.setAttribute('id', 'messageMask')
    messageMask.innerHTML = `<div class="message-wrap"><span id="text"></span></div>`
    _body.appendChild(modalMask)
    _body.appendChild(messageMask)
    _modalMask = document.getElementById('modalMask')
    _modalWrap = document.getElementById('modalWrap')
    _title = document.getElementById('title')
    _content = document.getElementById('content')
    _sure = document.getElementById('sure')
    _cancel = document.getElementById('cancel')

    _messageMask = document.getElementById('messageMask')
    _text = document.getElementById('text')
  }
}
export default {
  notic(e) {
    createModal()
    if (e) {
      _body.style.overflow = 'hidden'
      _modalMask.style.display = 'block'
      _modalWrap.style.display = 'block'
      _title.innerText = e.title
      _content.innerText = e.content
      _sure.onclick = function() {
        _modalMask.style.display = 'none'
        _modalWrap.style.display = 'none'
        if (e.onOk && typeof e.onOk === 'function') {
          e.onOk()
        }
        _body.style.overflow = 'auto'
      }
      _cancel.onclick = function() {
        _modalMask.style.display = 'none'
        _modalWrap.style.display = 'none'
        _body.style.overflow = 'auto'
      }
    }
  },
  message(e) {
    createModal()
    const currentTime = new Date()
    if (e && currentTime - lastTime >= 300) {
      _messageMask.style.display = 'block'
      _messageMask.style.top = (e.top || 100) + 'px'
      if (typeof e === 'string') {
        _text.innerText = e
      } else {
        _text.innerText = e.content
      }
      const duration = e.duration || 1500
      setTimeout(function() {
        _messageMask.style.display = 'none'
        _messageMask.style.top = -100 + 'px'
        lastTime = new Date()
      }, duration)
    }
  }
}
