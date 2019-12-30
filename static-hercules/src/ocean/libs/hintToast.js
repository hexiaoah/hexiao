/**
 * Created by zyj on 2018/4/13.
 */
/**
 * 动态添加css
 * @param code css样式
 * */
const _loadCssCode = function(code) {
  let style = document.createElement('style')
  style.type = 'text/css'
  style.rel = 'stylesheet'
  style.appendChild(document.createTextNode(code))
  let head = document.getElementsByTagName('head')[0]
  head.appendChild(style)
}
export default {
  show(content) {
    let dom = document.getElementsByClassName('hint-toast')
    if (dom && dom.length) {
      // dom[0].classList.remove('hide')
      document.body.removeChild(dom[0])
    } else {
      let para = document.createElement('div')
      para.innerHTML = `
      <div class="mask"></div>
      <div class="main">
        <div class="title">提示</div>
        <div class="content">${content}</div>
        <button class="btn">确定</button>
       </div> `
      para.className = 'hint-toast'
      para.getElementsByTagName('button')[0].onclick = () => {
        //   dom[0].classList.add('hide')
        document.body.removeChild(dom[0])
      }
      para.querySelector('.mask').onclick = () => {
        //   dom[0].classList.add('hide')
        document.body.removeChild(dom[0])
      }
      _loadCssCode(`.hint-toast .mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5); }

.hint-toast .main {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 13PX;
  width: 270PX;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -72PX;
  margin-left: -135PX;
  text-align: center; 
  }
  .hint-toast .main .title {
    font-size: 15PX;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: 20PX;
    margin-top: 20PX;
     }
  .hint-toast .main .content {
    font-size: 13PX;
    color: #666666;
    letter-spacing: 0;
    text-align: center;
    line-height: 18PX;
    min-height: 40px;
    padding: 0 15PX;
    margin-top: 15PX; 
    margin-bottom: 5PX;
    }
  .hint-toast .main .btn {
    display: block;
    border: 0;
    background: transparent;
    font-size: 15px;
    color: #0088FF;
    letter-spacing: 0;
    text-align: center;
    line-height: 44PX;
    border-top: 1px solid #C8C7CC;
    width: 100%;
     }
`)
      document.body.appendChild(para)
    }
  }
}
