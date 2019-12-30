/**
 * Created by huaixi on 2019/5/6.
 */
export default {
    permissionList: [],

	//底部选择弹出
	picker: {
		showPicker: false,
		pickerName: '', //当前选择的字段
		pickerSlots: [{
				defaultIndex: 0
			}, //默认选中第一个
		],
		pickerTitle: '',
		other: '', //其他需要设置的值，省份需要设置id的值
		pickerToolbarTitle: '',  // 展示的toobar title
		showBottom: false, // 是否展示底部bottom
	},

	isShowSaveButton: false,  // 是否展示top-header的保存按钮

	staffInfoTitle: '员工',
	addStaffTitle: '添加员工',
	clickedSaveButton: false, // 是否点击保存按钮

	pageTitle: {
		'/staffmanage': '员工管理',
		'/permissions': '权限设置',
		'/rank/rankmanagelist': '职级管理',
		'/rank/rankmanagedetail': '职级管理',
		'/help': '帮助',
		'/addstaff': '添加员工',
		'/staffinfo': '员工',
	},

	totalRankActionCount: '0',	//云收银权限总数

	rank: {
		id: '',
		name: '',
		actionCount: '0',
	},
	// 员工信息
	staffInfo: {
		userName: "",
		mobile: "",
		roleName: "",
		roleId: "",
		isSupper: 0, // 是否是超级管理员，服务端用的此字段，为了保持一致
	},

	// 员工设置信息
	extraActionInfo: {
		allowDiscount: false,
		allowDiscountValue: "100",
		noAllowDiscount: false, // 关闭
		noAllowDiscountValue: "100",
		limitSubZero: true,  
		maxLimitSubZero: "10",
	},
}