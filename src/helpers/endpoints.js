export const authEndPoints = {
	user: {
		userLogin: "/auth/login",
		userRegister: "admin/auth/register",
		userForgetPassword: "admin/auth/forget-password",
		userResetPassword: "admin/auth/reset-password",
		userChangePassword: "admin/auth/change-password",
	},
	admin: {
		adminLogin: "/auth/login",
	},
	directory: {
		list: "/categories",
		newDirectory: "admin/directory",
		removeDirectory: (id) => `/category/${id}/1`,
		editDirectory: (id) => `admin/directory/${id}`,
		viewDirectory: (id) => `admin/directory/${id}`,
	},
	category: {
		list: "/categories",		
		removeCategory: (id) => `/category/${id}/1`,	
		categoryView:(name) => `/category?unique_label=${name}`,
		categoryAdd:"/category",
        editCategory: (id) => `/categoty/${id}`,
	},
	product:{
		list:"/products",
		deleteProductList:(id)=>`/product/${id}/1`,
		productView:(name) => `/product?unique_label=${name}`,
		productAdd:"/product",
        editProduct: (id) => `/product/${id}`,
		listCommon:(name) => `/commonlist?required=${name}`
	},

	role: {
		rolesList: "admin/masters/role",
		newRole: "admin/masters/role",
		removeRole: (id) => `admin/masters/role/${id}`,
		editRole: (id) => `admin/masters/role/${id}`,
		permissionRole: "admin/permission",
		savePermission: (id) => `admin/permission/${id}`,
	},
	essential: {
		essentialSelect: "admin/masters/listing",
	},
	approved: {
		approvedData: (id) => `admin/user/${id}`,
	},
	profile: {
		getme: "admin/auth/me",
		updateme: "admin/auth/update",
		changepassword: "admin/auth/change-password",
		tokenGenerate: "admin/auth/token/update",
	},
	employee: {
		newEmployee: "admin/user",
		employeeList: "admin/user",
		removeEmployee: (id) => `admin/user/${id}`,
		editEmployee: (id) => `admin/user/${id}`,
		viewEmployee: (id) => `admin/user/${id}`,
	},
	form: {
		newForm: "admin/form",
		formList: "admin/form",
		editForm: (id) => `admin/form/${id}`,
		viewForm: (id) => `admin/form/${id}`,
		deleteForm: (id) => `admin/form/${id}`,
		formById: (id) => `admin/form/${id}`,
	},
	job: {
		jobCalenderList: "admin/job/calander",
		jobList: "admin/job",
		addJob: "admin/job",
		editJob: (id) => `admin/job/${id}`,
		viewJob: (id) => `admin/job/${id}`,
		deleteJob: (id) => `admin/job/${id}`,
		verifyJob: (id) => `admin/job/verify/${id}`,
		statusUpdate: (id) => `admin/job/status/${id}`,
		taskViewJobDelete: (id) => `admin/job/${id}`
	},
	invoice: {
		invoiceList: "admin/invoice",
		invoiceView: (id) => `admin/invoice/${id}`,
		pdfInvoice: (id) => `admin/invoice/${id}/pdf`,
		approveInvoice: (id) => `admin/invoice/status/${id}`,
		miscAddInvoice: "admin/invoice/expense",
		miscDeleteInvoice: (id) => `admin/invoice/expense/${id}`,
		miscEditInvoice: (id) => `admin/invoice/expense/${id}`
	},

	notification: {
		list: "admin/notification",
		newNotification: "admin/notification",
	},

	dashboard: {
		dashboardTable: `/dashboard`,
	},
};
