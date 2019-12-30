<template>
    <div class="top-wrapper" :class="icon" id="top-wrapper">
        <div class="name" :style="!result.ranking?'padding-top:60PX':''">{{item_name}}</div>
        <div class="title">{{result.result}}{{result.unit}}</div>
        <div class="compare" v-if="result.ranking">
          {{result.rankingPercent}}
        </div>
        <div class="time" v-if="result.ranking"> {{result.ranking}}</div>
        <span href="#hint" class="hint" @click="toHint">指标说明</span>
    </div>
</template>

<script>
    import {getResultTop} from '../config/api'
    import errorToast from 'src/ocean/libs/errorToast'

    export default {
        name: 'result',
        props: {},
        data() {
            return {
                result: {},
                icon: "",
                unitIconClass: '',
                item_name: this.$route.query.item_name || '',
            }
        },
        created() {
            let that = this;
            getResultTop().then((ret) => {
            //     let ret = {}
            //     ret.data = {
            //         // "date": "2018年09月07日 20:21",
            //         "result": "48",
            //         "unit": "%",
            //         ranking:'超过全国40%的店家',
            //         rankingPercent:'超过全国90%',
            //         // "diffResult": '-22',
            //         "type": "COMPARE_PEERS",
            //         "status": "BEST"
            //
            //     };
                if (ret.data) {
                    that.result = ret.data;
                    that.icon = (that.result.type === 'SET' ? '' : ' icon') + ' icon-' + that.result.status;
                    that.nameClass=
                    // that.unitIconClass = that.result.diffResult > 0 ? 'z-add' : (that.result.diffResult < 0 ? 'z-reduce' : '');
                    that.result.diffResultText = !isNaN(Number(that.result.diffResult)) ? ` ${Math.abs(that.result.diffResult) }% ` : ' ' + that.result.diffResult;
                }
            }).catch((e) => {
                errorToast.show(e.result.message)
            })
        },
        mounted() {
        },
        computed: {},
        methods: {
            toHint(){
               let height= this._getPositionNumber(document.getElementById('hint'),'offsetTop')
                document.body.scrollTop = document.documentElement.scrollTop =height
                let start = 0, d = 30;
                let animation;

                animation = () => {
                    start++;
                    document.body.scrollTop = document.documentElement.scrollTop =this.Linear(start, 0, height, d).toFixed(2);
                    if (start < d) {
                        window.requestAnimationFrame(animation)
                    }
                }
                animation()
            },
            Linear: function (t, b, c, d, a, p) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            _getPositionNumber(node, type) {
                let width = node[type]
                let parent = node.offsetParent
                while (parent != null) {
                    width += parent[type]
                    parent = parent.offsetParent
                }
                return width
            }

        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .top-wrapper {
        width: 100%;
        height: 184PX;
        color: white;
        text-align: center;
        position: relative;
        &.icon:before {
            content: "";
            width: 48PX;
            height: 50PX;
            position: absolute;
            top: 0;
            right: 19PX;
        }
        &.icon-BEST {
            background:#49c67d url("https://assets.2dfire.com/frontend/9421d988b076e178e1d0853cd964d26b.jpg") no-repeat center;
            background-size: cover;
            &:before {
                background: url("https://assets.2dfire.com/frontend/0b95500f8a233b74451fe7597ea792f8.png") no-repeat center;
                background-size: cover;
            }
        }
        &.icon-GOOD {
            background:#f6a04b url("https://assets.2dfire.com/frontend/5abeba4bef0f48099602fc8d3632738d.jpg") no-repeat center;
            background-size: cover;
            &:before {
                background: url("https://assets.2dfire.com/frontend/622b4f25318e6c0c7828fef1e455f02e.png") no-repeat center;
                background-size: cover;
            }
        }
        &.icon-BAD {
            background:#f57350 url("https://assets.2dfire.com/frontend/699959570443d23fd33b4634e1666c7c.jpg") no-repeat center;
            background-size: cover;
            &:before {
                background: url("https://assets.2dfire.com/frontend/c33ec01409c6bcb6ec44d31204448094.png") no-repeat center;
                background-size: cover;
            }
        }
    }
    .name{
        padding-top: 35PX;
        font-size: 18PX;
        color: #FFFFFF;
        text-align: center;
        line-height: 24PX;
    }
    .title {
        font-size: 28PX;
        color: #FFFFFF;
        text-align: center;
        line-height: 24PX;
        margin-top:6PX;
    }

    .compare {
        font-size: 13PX;
        color: #FFFFFF;
        margin-top: 30PX;
        opacity: 0.5;
    }

    .time {
        opacity: 0.5;
        font-size:  13PX;
        color: #FFFFFF;
        letter-spacing: 0;
        margin-top: 2PX;
    }

    .hint {
        font-size: 11PX;
        color: rgba(255, 255, 255, 0.50);
        letter-spacing: 0;
        position: absolute;
        right: 15PX;
        bottom: 15PX;
    }

    .z-add:before {
        content: '';
        margin-left: 5px;
        display: inline-block;
        width: 11PX;
        height: 11PX;
        background: url("https://assets.2dfire.com/frontend/51c9c250df9ec08b1ab97b60df10e3bd.png") no-repeat center;
        background-size: 8PX;
    }

    .z-reduce:before {
        content: '';
        margin-left: 5px;
        display: inline-block;
        width: 11PX;
        height: 11PX;
        transform: rotate(180deg);
        background: url("https://assets.2dfire.com/frontend/51c9c250df9ec08b1ab97b60df10e3bd.png") no-repeat center;
        background-size: 8PX;
    }
</style>
