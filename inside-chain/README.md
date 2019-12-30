# static-chain

PC连锁商家管理后台

### 使用框架版本注意

- vue 2.x
- iview 2.x

如果要升级代码框架或UI框架，慎重。

### 项目开发注意

1. 组件化开发

   注意使用已有组件，及组件的组合使用，避免重复造简单的轮子，节约开发时间。

2. 状态管理

   vuex提供简单方便的状态管理方法，请在需要存储数据的地方全部用上，避免组件多层嵌套传递，以免冒泡复杂。
   注意将必要的状态存储在store内，以便状态的控制和改变
   
3. 业务逻辑写哪里

   所有的业务逻辑请写在actions内，包括api请求/数据format等

4. 计算属性

   多使用计算属性，避免在html中做过多的计算
   
5. 组件的开发

   组件要加上必要的注释说明，方便其他开发者使用或者优化修改

### 组件列表及简介

列举一些常用的组件

> 组件目录src/components

base-** 系列

- base-img
 
  图片居中平铺组件，在img-box中有引用
  
- base-labels

  项目中多用于展示标签的地方，灰色腰圆标签样式，可显示右侧"X"按钮，冒泡方法on-del
  
- base-xxx-verify

  基础验证组件，冒泡verify方法，未通过验证冒泡false，通过则冒泡true
  
- base-verify

  基础验证组件的集合，通过props: type来判断实际需要哪个验证组件
  
- base-modal

  基础弹窗组件，包括一个弹窗header/body/footer，用法见组件内部注释
  
- base-search-bar

  基础输入框组件，包含一个左侧输入框，右侧留一个slot
  
步骤条组件

步骤条组件由两个组件组成分别是 base-steps 和 base-step 组件组成  

 usage
 
    import BaseSteps from "@/components/step/base-steps";
    import BaseStep from "@/components/step/base-step";
 
    <BaseSteps :current="current" class="mb-20px">
        <BaseStep>1</BaseStep>
        <BaseStep>2</BaseStep>
        <BaseStep>3</BaseStep>
    </BaseSteps>


按钮组件
  
- button-add

  腰圆红边白底，带右侧加号按钮，多用于添加标签等场景
  
- button-refresh

  刷新按钮组件，提供一个圆形带阴影及刷新图标的按钮，有点击事件
  
列表用展示组件  

- list-card 

  列表卡片显示，卡片式容器
  
图片显示组件

- img-box

  显示图片用，提供基础无图片样式、虚线边框
  
树形组件

- tree/node

  树形展示组件，提供点击和展开事件冒泡，返回触发节点。
  
- select-tree

  带选择框的属性列表组件，提供选中时的change事件
  
### 额外的render

为了改造原有iview组件显示的不足，增加了一些render函数来增加显示的内容

- tab-badge

  详细说明及使用方法见 `src/base/tab-badge.js` 文件内
