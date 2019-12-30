/**
 * Created by zyj on 2018/4/13.
 */
export default {
    show(content, time = 2000) {
        let dom = document.getElementsByClassName('error-toast')
        if (dom && dom.length) {
            dom[0].classList.remove('hide');
            dom[0].innerText = content
        }
        else {
            let para = document.createElement("div")
            let node = document.createTextNode(content)
            para.className = 'error-toast'
            para.appendChild(node)
            document.body.appendChild(para)
        }
        
        if (typeof time === 'number' && time > 0) {
            setTimeout(function () {
                dom[0].classList.add('hide')
            }, time)
        }
    }
}