<template>
    <div class="logs">
        <div class="logs-tools">
            <a @click="clear" class="logs-tools__item">清除</a>
        </div>
        <ul class="logs-list">
            <li class="logs-item" v-for="log in logs" @click="log.inspect = !log.inspect" track-by="id">
                <span class="logs-item__time">
                    {{ log.time }}
                </span>
                <span class="logs-item__level" :class="'logs-item__level--' + log.level">
                    {{ log.level }}
                </span>
                <span class="logs-item__msg" v-show="!log.inspect">
                    {{ log.msg }}
                </span>
                <div class="logs-item__detail" v-show="log.inspect">{{ log.payload | stringifyObjectPretty }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    const debugEvents = require('./events');
    const stringifyObject = require('stringify-object');

    exports.events = debugEvents;

    let curIndex = 0;
    const startTime = Date.now();
    function nowTime () {
        return ((Date.now() - startTime) / 1000).toFixed(3) + 's';
    }
    module.exports = {
        data () {
            return {
                logs: []
            };
        },
        created () {
            debugEvents.$on('log', this.log);
            // for (let i = 0; i < 1; i++) {
            //     this.log('log', i + 'asdsssssssssssssadasdsadsadsadssssssssssssssssssssssad');
            //     this.log('log', [123, 123213]);
            //     this.log('log', { i, a: () => {} });
            //     this.log('log', { list: [1, 2, 3], string: 'some string' });
            // }
        },
        methods: {
            log (level, payload) {
                const logs = this.logs;
                while (logs.length > 1000) {
                    logs.shift();
                }
                logs.push({
                    id: ++curIndex,
                    time: nowTime(),
                    level,
                    payload,
                    msg: stringifyObject(payload || ''),
                    inspect: false
                });
            },
            clear () {
                this.logs = [];
            }
        },
        filters: {
            stringifyObjectPretty (payload) {
                return stringifyObject(payload || '', {
                    indent: '  ',
                    singleQuotes: false
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "./common";
    .logs {
        font-size: 16px;
        color: #333;
        padding-top: 50px;
        position: relative;
    }
    .logs-tools {
        position: absolute;
        top: 0px;
        left: 0px;
        height: 50px;
        width: 100%;
        border-bottom: 2px solid $border-color;
    }
    .logs-tools__item {
        line-height: 50px;
        margin-left: 10px;
        font-size: 20px;
    }
    .logs-list {
        list-style-type: none;
    }
    .logs-item {
        border-bottom: 2px solid $border-color;
        display: flex;
    }
    .logs-item__time {
        color: $green;
        padding: 10px;
    }
    .logs-item__msg {
        flex: 1;
        padding: 10px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .logs-item__level {
        padding: 10px;
        color: $darkerOrange;
    }
    .logs-item__detail {
        width: 100%;
        padding: 10px;
        background-color: $border-color;
        word-break: break-all;
        white-space: pre;
    }
</style>
