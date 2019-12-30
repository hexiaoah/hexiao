<template>
    <div>
        <EditView @save='save'></EditView>
    </div>
</template>
<script>
import EditView from './components/index'
import chainRoleManage from '@/store/modules/components/chainRoleManage'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        EditView
    },
    methods: {
        ...mapActions({
            getAllActionGroupList:'chainRole/getAllActionGroupList'
        }),
        save(params){
            console.log(params)
        }
    },
    beforeCreate () {
        let { chainRole={} } = this.$store.state

        if(Object.keys(chainRole).length <= 0) {
            this.$store.registerModule('chainRole', chainRoleManage)
        }
    }
}
</script>

