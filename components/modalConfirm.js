import { Modal } from 'iview'

const prefixCls = 'ivu-modal-confirm';
/**
 * Modal.confirm 增加 icon 字段，用于自定义icon图标 
 */
const baseModal = (_props)=>{
    let iconType = ''
    switch (_props.icon) {
        case 'info':
            iconType = 'information-circled';
            break;
        case 'success':
            iconType = 'checkmark-circled';
            break;
        case 'warning':
            iconType = 'android-alert';
            break;
        case 'error':
            iconType = 'close-circled';
            break;
        case 'confirm':
            iconType = 'help-circled';
            break;
        default:
            iconType = ''
            break
    }
    Modal.confirm({
        ..._props,
        render: function(h){
            return h('div',[
                _props.icon?
                h('div', {
                    class: `${prefixCls}-body-icon ${prefixCls}-body-icon-${_props.icon}`
                }, [
                    iconType ? h('i', {
                        class: `ivu-icon ivu-icon-${iconType}`
                    }):''
                ]):'',
                h('div',{
                    class: 'ivu-modal-confirm-body'
                }, (_props.render && typeof _props.render === 'function') ? [ _props.render(h) ] : _props.content)
            ])
        }
    })
}

export { baseModal }