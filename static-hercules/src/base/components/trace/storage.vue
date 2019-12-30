<template>
    <div class="storage">
        <div class="storage-tools">
            <a @click="refresh" class="storage-tools__item">刷新</a>
        </div>
        <h2 class="title">sessionStorage</h2>
        <div class="detail">{{ sStorage | stringifyObjectPretty }}</div>
        <h2 class="title">localStorage</h2>
        <div class="detail">{{ lStorage | stringifyObjectPretty }}</div>
    </template>
</div>
<script>
    const stringifyObject = require('stringify-object');
    module.exports = {
        data () {
            return {
                sStorage: {},
                lStorage: {}
            };
        },
        methods: {
            storageValues(storage) {
                const values = {};
                for (var i = 0, len = storage.length; i  <  len; i++){
                    var key = storage.key(i);
                    values[key] = storage.getItem(key);
                }
                return values;
            },
            refresh () {
                this.sStorage = this.storageValues(window.sessionStorage);
                this.lStorage = this.storageValues(window.localStorage);
            }
        },
        created () {
            this.refresh();
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
    .title {

    }
    .storage {
        position: relative;
        padding-top: 50px;
    }
    .storage-tools {
        position: absolute;
        top: 0px;
        left: 0px;
        height: 50px;
        width: 100%;
        border-bottom: 2px solid $border-color;
    }
    .storage-tools__item {
        line-height: 50px;
        margin-left: 10px;
        font-size: 20px;
    }
    .detail {
        background-color: $border-color;
        overflow: auto;
        padding: 10px;
        font-size: 14px;
        white-space: pre;
    }
</style>
