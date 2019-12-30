<template>
<div>
    <div class="redirect-coupone" v-for='(item,index) in list' :key="index">
    <div class="coupone-text">
        <div v-if='total(item)'>
            <p>
                <span class="coupone-type">{{item.title}}</span>
                <br>
                <span class="coupone-details active">{{item.details}}</span>
            </p>
        </div>
        <div v-else class="coupone-img">
            <img :src="item.img" alt="" v-if='item.img'>
            <img src="https://assets.2dfire.com/frontend/db8f47e3b8693fef7170ad7f5560fb34.jpg" alt="" v-if='!item.img'>
            <p>
                <span class="coupone-type">{{item.title}}</span>
                <br>
                <span class="coupone-details">{{item.details}}</span>
            </p>
        </div>
        <p class="coupone-time">{{item.time}}</p>
    </div>
    <div class="coupone-line"></div>
    <div class="coupone-money">
        <p v-if='price(item)'>
            ¥<span class="coupone-price">{{item.amount | money}}</span>.{{item.amount | decimals}}
        </p>
        <p v-if='percentum(item)'>
            <span class="coupone-price">{{item.amount}}</span>%
        </p>
        <span class="coupone-name" v-if='item.name'>
                {{item.name}}
            </span>
    </div>
    <div class="coupone-num" v-if='item.number'>
    </div>
    <div class="coupone-span" v-if='item.number'>
        <span>{{item.number}}张</span>
    </div>
</div>
</div>
</template>

<script> 
export default {
    data() {
        return {}
    },
    props: ['list'],
    methods: {
        total(item) { 
            return item.type == 0 || item.type == 1;
        },
        price(item) {
            return item.type == 0 || item.type == 20 || item.type == 23 || item.type == 22;
        },
        percentum(item) {
            return item.type == 1 || item.type == 21; 
        },
    },
    filters: {
        money(value) {
            let str = value.toString()
            return str.substring(0, str.length - 2)
        },
        decimals(value) {
            let str = value.toString()
            return str.toString().substr(str.length - 2)
        }
    },
    computed: {},
    components: {},
    ready() {}

}
</script>

<style lang="scss" scoped>
.redirect-coupone {
    width: 100%;
    border: 1PX solid #999999;
    border-radius: 8px;
    height: 204px;
    box-sizing: border-box;
    padding: 28px 0 32px;
    display: flex;
    position: relative;
    margin-top: 24px;
    background: #FFFFFF;
}

.coupone-text {
    margin-left: 12px;
    width: 396px;
    position: relative;
}

.coupone-type { 
    font-size: 40px;
    color: #EC313D;
}

.coupone-details {
    font-size: 26px;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 7rem;
    overflow: hidden;
    color: #333333;
}
.coupone-details.active{
    width: 100%;
}

.coupone-time {
    font-size: 20px;
    color: #999999;
    position: absolute;
    bottom: -14px;
}

.coupone-line {
    width: 1PX;
    background: #999999;
    height: 100%;
}

.coupone-line:after,
.coupone-line:before {
    content: '';
    display: block;
    width: .7rem;
    height: .7rem;
    border: 1PX solid;
    border-radius: 50%;
    position: absolute;
    background:#f3f2f2;
}

.coupone-line::after {
    top: -.45rem;
    left: 10.3rem;
    border-color: transparent #999999 #999999 transparent;
    transform: rotate(45deg); 
}

.coupone-line::before {
    bottom: -.45rem;
    left: 10.3rem;
    border-color: #999999 #999999 transparent transparent;
    transform: rotate(-45deg); 
}

.coupone-money {
    width: calc(100% - 396px);
    text-align: center;
    height: 100%;
    position: relative;
}

.coupone-money p { 
    font-size:40px;
    color: #EC313D;
    line-height: 126px;
    height: 100%;
}

.coupone-price {
    font-size: 56px;
}

.coupone-name {
    font-size: 24px;
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    color: #333333;
}

.coupone-num {
    position: absolute;
    right: 0;
    top: 0; 
    width: 0px;
    height: 0px;
    border: 36px solid;
    border-color: #999999 #999999 transparent transparent;
}

.coupone-span {
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 70px;
    text-align: center;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 40px;
    display: block;
    transform: rotate(45deg);
}

.coupone-img {
    display: flex;
}

.coupone-img img {
    width: 100px;
    height: 100px;
    margin-right: 14px;
}

.coupone-img .coupone-details {
    font-size: 32px; 
    color: #333333;
}
</style>
