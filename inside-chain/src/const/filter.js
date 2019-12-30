const filter = {
    // 将true/false或1/0转换为中文是/否，方便显示
    bool2CN(value){
        return value ? '是' : '否'
    },
    //1:散座，2:包厢，3:卡座
    seatKind(value){
        switch (value) {
            case 1:
                return '散座'
            case 2:
                return '包厢'
            case 3:
                return '卡座'
            default:
                return '-'
        }
    }
}

export default filter
