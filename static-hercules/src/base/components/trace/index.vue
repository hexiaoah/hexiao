<template>
    <div class="trace" :class="{'trace--active': active}" v-show="enabled">
        <div class="toggle" @click="active = !active">
            {{ active ? 'x' : 'o' }}
        </div>
        <header class="header">
            <ul class="navigate__list">
                <li v-for="item in tags" @click="switchTab(item)" class="navigate__item" :class="{ 'navigate__item--active': item === tag }">
                    {{ item }}
                </li>
            </ul>
        </header>
        <section class="container">
            <div v-for="item in tags" v-show="item === tag">
                <div :is="item"></div>
            </div>
        </section>
    </div>
</template>
<script>
const traceEvents = require('./events');
module.exports = {
    props: ["is-show"],
    data() {
        return {
            tag: 'logs',
            tags: ['logs', 'storage', 'cookies'],
            active: false
        };
    },
    components: {
        logs: require('./logs'),
        storage: require('./storage'),
        cookies: require('./cookies')
    },
    methods: {
        switchTab(tag) {
            this.tag = tag;
        }
    },
    computed: {
        enabled() {
            return this.traceStatus === 1;
        },
        traceStatus() {
            return traceEvents.traceStatus;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "./common";
.trace {
    position: fixed;
    z-index: 999999999999999;
    top: 100%;
    left: 0;
    width: 100%;
    height: 60%;
    background-color: #FFF;
    padding-top: 60px;
    transition: all .32s cubic-bezier(0, .9, .6, 1);
}

.trace--active {
    top: 40%;
}

.toggle {
    position: absolute;
    text-align: center;
    color: #999;
    top: -40px;
    right: 10px;
    height: 40px;
    width: 40px;
    background-color: #FFF;
    border-radius: 10px 10px 0px 0px;
}

.header {
    position: absolute;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
}

.container {
    overflow: auto;
    height: 100%;
}

.navigate__list {
    list-style-type: none;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $border-color;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}

.navigate__item {
    flex: 1;
    padding: 0px 15px;
    line-height: 56px;
    overflow: hidden;
    text-align: center;
    border-bottom: 4px solid transparent;
    transition: all .32s cubic-bezier(0, .9, .6, 1);
    &:first-child {
        border-left-width: 0;
    }
}

.navigate__item--active {
    border-bottom-color: $active-color;
    color: $active-color;
}
</style>
