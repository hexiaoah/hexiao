import React from 'react';
import { Radio } from 'antd';
import { DesignEditor, ControlGroup } from '@src/container/visualConfig/views/design/editor/DesignEditor';
import style from './TmpEditor.css'

export default class AdEditor extends DesignEditor {
  state = {
    defaultImg: 'https://assets.2dfire.com/frontend/071bac5b44ade2005ad9091d1be18db6.png'
  };

  ChangeGroup = (str, e) => {
    const { value, onChange } = this.props;
    const {config} =  value

    onChange(value, {config: {
      ...config,
      [str]: e.target.value
    }})
  }

  render(){
    const { value, prefix, validation } = this.props;
    const { config } = value;

    return (
      <div className={`${prefix}-design-component-config-editor`}>
        <div className={style.componentConfigEditor}>
          <ControlGroup
            label="选择模板:"
            error={validation.hasPadding}
            className={style.groupLabel}
          >
          </ControlGroup>
          <Radio.Group value={config.mode} buttonStyle="solid" className={style.controlGroupControl} onChange={(e) => this.ChangeGroup('mode', e)}>
              <Radio.Button value="单图" name='mode' className={style.imgType}>
                <img src={value.config.mode == '单图' ? 'https://assets.2dfire.com/frontend/d777e5330a31b209352eff0db2fe568e.png':'https://assets.2dfire.com/frontend/3bc532d72c77bcabc0bc8602d9a26249.png'} />
              </Radio.Button>
              <Radio.Button value="轮播图" name='mode' className={style.imgType}>
                <img src={config.mode == '轮播图' ? 'https://assets.2dfire.com/frontend/e25c6ce74c7a13e93c801e6b5e5cdde7.png':'https://assets.2dfire.com/frontend/e036d229a2c1f0d260b7dd6229d000b7.png'} />
              </Radio.Button>
              {/* <Radio.Button value="c" name='hasPadding' className={style.imgType}>
                <img src={value.hasPadding == 'c' ? 'https://assets.2dfire.com/frontend/36cbfa04856035395fe5a388b9ff0bf9.png':'https://assets.2dfire.com/frontend/e926936b709902682c4c6265babb0735.png'} />
              </Radio.Button> */}
          </Radio.Group>
        </div>
      </div>
    )
  }
}
