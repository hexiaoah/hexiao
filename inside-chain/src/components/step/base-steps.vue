<!--
    步骤条
    步骤条容器，可放入多个步骤(step)
-->

<template>
    <div class="steps">
        <slot></slot>
    </div>
</template>
<script>
export default {
	props: ["current"],
	data() {
	    return {}
	},
	methods: {
        updateChildProps () {
            const total = this.$children.length;
            this.$children.forEach((child, index) => {
                child.total = total;

                if (index == 0) {
                    child.head = false;
                } else if (index == total -1) {
                    child.tail = false;
                }
                if (index < this.current) {
                    child.currentStatus = 'active';
                } else {
                    child.currentStatus = 'wait';
                }
            });
        },
	},
    mounted() {
	    this.updateChildProps()
	},
    watch: {
        current () {
            this.updateChildProps();
        }
    }
};
</script>

<style lang="scss" scoped>
    .steps {
        font-size: 0;
        padding: 15px;
        background-color: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(202,202,202,0.26);
    }
</style>
