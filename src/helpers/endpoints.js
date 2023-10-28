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

  category: {
    list: "/categories",
    removeCategory: (id) => `/category/${id}/1`,
    categoryView: (name) => `/category?unique_label=${name}`,
    categoryAdd: "/category",
    editCategory: (id) => `/category/${id}`,
  },
  product: {
    list: "/products",
    deleteProductList: (id) => `/product/${id}/1`,
    productView: (name) => `/product?unique_label=${name}`,
    productAdd: "/product",
    editProduct: (id) => `/product/${id}`,
    listCommon: (name) => `/commonlist?required=${name}`,
  },
  customer: {
    customerList: "customer/list",
    deleteCustomerList: (id) => `/customer/${id}/1`,
    customerView: (id) => `/customer/view/${id}`,
  },
  essential: {
    essentialSelect: "admin/masters/listing",
  },

  employee: {
    newEmployee: "admin/user",
    // customerList: "customer/list",
    removeEmployee: (id) => `admin/user/${id}`,
    editEmployee: (id) => `admin/user/${id}`,
    viewEmployee: (id) => `admin/user/${id}`,
  },

  dashboard: {
    dashboardData: `/dashboard`,
  },
};
