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
    viewNotify: "notification/view",
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
    productAddNutri: "/nutriciandetails",
    productAddBenefit: "/healthbenifits",
    editProduct: (id) => `/product/${id}`,
    editBenefitProduct: `/healthbenifitsupdate`,
    editNutriProduct: `/nutriciandetailsupdate`,
    listCommon: (name) => `/commonlist?required=${name}`,
    metricAdd: "/metric",
    metricRemove: (id) => `/metric/${id}`,
    nutriRemove: (id) => `/nutriciandetails/${id}`,
    healthRemove: (id) => `/healthbenifits/${id}`,
  },

  promotion: {
    list: "/promotion",
    promotionAdd: "/promotion",
    promotionDelete: (id) => `/promotionproductdelete/${id}`,
    promotionView: (id) => `/promotion/${id}`,
    promotionAvailable: (id) => `/productpromotionsearch/${id}`,
    promotionAddProduct: "/promotion/addproduct",
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

  order: {
    list: "order/list",
    download: (id) => `createpdf/${id}`,
    orderView: (id) => `/order/view/${id}`,
  },

  setting: {
    imageSetting: "/viewimageforflyer",
    imageSettingAdd: "/addbannerimage",
    imageSettingDelete: (id) => `deletebannerimage/${id}`,
    imageSettingEdit: (id) => `changeimageforflyer/${id}`,
    imageView: (id) => `getbanner/${id}`,
    dataFeature: "/listfeaturedproduct",
    dataFeatureAdd: "/featuredproduct",
    dataFeatureDelete: (id) => `/removefeaturedproduct/${id}`,
    searchFeature: `/productsearch`,
    addContent: "/updateTopData",
    viewContent: (name) => `/viewtopdata?type=${name}`,
  },
};
