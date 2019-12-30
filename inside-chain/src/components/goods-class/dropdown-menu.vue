<template>
    <div>
        <!--{{input.value}}:selectName-{{selectName}}-->
        <!--<Dropdown trigger="click" class="dropdown" @on-click="handleClick"-->
                  <!--:class="{ 'dropdown-disabled' :input.disabled }" :visible="visible">-->
            <!--<a href="javascript:void(0)" class="a-link">-->
                <!--<span class="sp-item">{{selectName}}</span>-->
                <!--<Icon type="arrow-down-b"></Icon>-->
            <!--</a>-->
            <!--<DropdownMenu slot="list" v-for="(item,index) in list" :key="index">-->
                <!--<DropdownItem v-if="!item.subList" :name="item.id" :disabled=item.disabled><span class="sp-item">{{item.name}}</span>-->
                <!--</DropdownItem>-->
                <!--<Dropdown v-else placement="right-start">-->
                    <!--<DropdownItem :name="item.id" :disabled=item.disabled>-->
                        <!--<a @click="handleClick(item.id)">-->
                            <!--<span class="sp-item">{{item.name}}</span>-->
                            <!--<Icon type="ios-arrow-right"></Icon>-->
                        <!--</a>-->
                    <!--</DropdownItem>-->
                    <!--<DropdownMenu slot="list" v-for="(item1) in item.subList">-->
                        <!--<DropdownItem v-if="!item1.subList" :name="item1.id" :disabled=item1.disabled><span-->
                            <!--class="sp-item">{{item1.name}}</span>-->
                        <!--</DropdownItem>-->
                        <!--<Dropdown v-else placement="right-start">-->
                            <!--<DropdownItem :name="item1.id" :disabled="item1.disabled">-->
                                <!--<a @click="handleClick(item1.id)">-->
                                    <!--<span class="sp-item">{{item1.name}}</span>-->
                                    <!--<Icon type="ios-arrow-right"></Icon>-->
                                <!--</a>-->
                            <!--</DropdownItem>-->
                            <!--<DropdownMenu slot="list" v-for="(item2,index) in item1.subList">-->
                                <!--<DropdownItem v-if="!item2.subList" :name="item2.id" :disabled=item2.disabled><span-->
                                    <!--class="sp-item">{{item2.name}}</span>-->
                                <!--</DropdownItem>-->
                                <!--<Dropdown v-else placement="right-start">-->
                                    <!--<DropdownItem :name="item2.id" :disabled="item2.disabled">-->
                                        <!--<a @click="handleClick(item2.id)">-->
                                            <!--<span class="sp-item">{{item2.name}}</span>-->
                                            <!--<Icon type="ios-arrow-right"></Icon>-->
                                        <!--</a>-->
                                    <!--</DropdownItem>-->
                                    <!--<DropdownMenu slot="list" v-for="(item3,index) in item2.subList">-->
                                        <!--<DropdownItem v-if="!item3.subList" :name="item3.id" :disabled="item3.disabled">-->
                                            <!--<span class="sp-item">{{item3.name}}</span></DropdownItem>-->
                                        <!--<Dropdown v-else placement="right-start">-->
                                            <!--<DropdownItem :name="item3.id" class="dropdown-item-disabled"-->
                                                          <!--:disabled=item3.disabled>-->
                                                <!--<span class="sp-item">{{item3.name}} dis</span>-->
                                                <!--<Icon type="ios-arrow-right"></Icon>-->
                                            <!--</DropdownItem>-->
                                        <!--</Dropdown>-->
                                    <!--</DropdownMenu>-->
                                <!--</Dropdown>-->
                            <!--</DropdownMenu>-->
                        <!--</Dropdown>-->
                    <!--</DropdownMenu>-->
                <!--</Dropdown>-->
            <!--</DropdownMenu>-->
        <!--</Dropdown>-->
        <Select v-model="input.value">
            <Option v-for="(item, index) in zlist"
                    :value="item.id"
                    :disabled="item.disabled"
                    :key="index">
                {{item.name}}
            </Option>
        </Select>
        <VerifyRequired :value="input.value" :required="input.required" @verify="emitVerify"></VerifyRequired>
    </div>
</template>

<script>
    /**
     *
     * @param res
     * @author
     *
     */
    import verifyRequired from '../verify/base-required-verify'
    import Tool from '@/base/tools'
    export default {
        name: "dropdown-menu",
        props: ['list', 'input'],
        data() {
            return {
                visible: false,
                lastValue: 0,
            }
        },
        components: {
            VerifyRequired: verifyRequired
        },
        computed: {
            selectName() {
                // console.log('this.input.value:', this.input.value)
                if (this.input.value === undefined) {
                    this.input.value = ''
                }
                if (this.input.value === '') {
                    return '';
                } else {
                    this.input.value = this.input.value.toString()
                    let item = this.getName(this.list, this.input.value)
                    // console.log('selectName----',item);
                    if (!item) {
                        return ''
                    } else {
                        // console.log('item.name',item.name)
                        return item.name;
                    }
                }
            },
            zlist () {
                return Tool.recursionClass(this.list)
            }
        },
        methods: {
            handleClose() {
                this.visible = false;
            },
            handleOpen(e) {
                // this.visible = false;
                this.visible = !this.visible;
                console.log(this.visible)
                // this.handleClick(e);
                // console.log('handleOpen',e)
            },
            handleClick(e) {//e  返回ID
                // console.log('handleClick', e)
                if (this.lastValue != e) {
                    let v = this.isDisabled(this.list, e);
                    // console.log('isdisabled----', v);
                    if (!this.isDisabled(this.list, e)) {
                        this.input.value = e;
                        // this.id = e;
                        this.lastValue = e;
                        this.$emit('change', e)
                    }
                }
            },

            isDisabled(list, id) {
                if (!list) return false;
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    if (item.id == id) {
                        // console.log(item.id, '-------------------', id, item.name , item.disabled , item.addSub);
                        if (item.disabled === true) {
                            return true;
                        }
                    }
                }
                for(let i = 0; i < list.length; i++){
                    let item = list[i];
                    if (item.subList) {
                        if(this.isDisabled(item.subList, id)==true){
                            return true;
                        }
                    }
                }
                return false
            },
            getName(list, id) {
                if (!list) return null;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id == id) {
                        // console.log('dropdown', list[i]);
                        return list[i]
                    }
                    let tmp = this.getName(list[i].subList, id)
                    if (!!tmp) return tmp;
                }
                return null
            },
            emitVerify(e) {
                // console.log('dropDown verify:', e)
                this.$emit('verify', e);
            },
        },
    }
</script>

<style scoped>
    .a-link {
        width: 100%;
        display: inline-block;
        height: 100%;
        line-height: 100%;
    }

    .a-link > span {
        width: 90%;
        display: inline-block;
        vertical-align: middle;
        height: 32px;
        line-height: 32px;
    }

    .dropdown-disabled {
        background: #f3f3f3;
    }

    .dropdown {
        width: 200px;
        height: 32px;
        border: 1px solid #dddee1;
        border-radius: 4px;
        padding: 0 7px;
        line-height: 1;
        display: inline-block;
        font-size: 12px;
        vertical-align: middle;
    }

    .dropdown-disabled /deep/ span {
        color: #bbbec4;
    }

    .dropdown-disabled /deep/ .ivu-select-dropdown {
        display: none;
    }

    .dropdown /deep/ .ivu-dropdown-menu > li {
        width: 170px;
        overflow: hidden;
    }

    .dropdown /deep/ .ivu-dropdown-menu span.sp-item {
        display: inline-block;
        width: 160px;
        overflow: hidden;
        vertical-align: middle;
        line-height: 1;
        text-overflow: ellipsis;
    }

    .dropdown /deep/ .ivu-dropdown-menu[disabled] {
        /*background: #dcdcdc;*/
    }
    .dropdown /deep/ .ivu-dropdown-item-disabled span{
        color: #bbbec4;
        /*border: 1px solid #000;*/
    }

    .a-link {
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .ivu-select-item-selected.ivu-select-item-focus {
        background: #ffffff;
        color: #D83F3F;
    }
</style>
