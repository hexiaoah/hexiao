const Vue = require('vue');
const bindLevels = ['debug', 'log', 'warn', 'error', 'info'];

const bus = new Vue({
    data () {
        return {
            traceStatus: 0
        };
    },
    methods: {

    },
    created () {
        const re = window.location.href.match(/trace=(\d)/);
        const traceStatus = re
            ? +re[1]
            : (+window.localStorage.getItem('traceStatus') || 0);
        if (traceStatus === 1) {
            bindLevels.forEach(level => {
                const consoleBak = console[level];
                console[level] = (...args) => {
                    consoleBak(...args);
                    bus.$emit('log', level, args);
                };
            });
        }
        window.localStorage.setItem('traceStatus', traceStatus);
        this.traceStatus = traceStatus;
        setTimeout(() => {
            bus.$emit('setTraceStatus', traceStatus);
        }, 1000);
    }
});

module.exports = bus;
