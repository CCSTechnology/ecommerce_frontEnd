import { createSlice } from "@reduxjs/toolkit";
import {
  productListData,
  deleteProductData,
  addProductData,
  viewProductData,
  commonListData,
  editProductData,
  addProductNutritionData,
  addProductBenefitsData,
  addMetricData,
  removeMetricData,
  editBenefitProductData,
  editNutriProductData,
  removeNutriData,
  removeBenefitData,
  // commonListMetricData,
} from "../../../redux/api/admin/productService";

const initialState = {
  deleteProduct: {
    loading: false,
    data: null,
    error: null,
  },
  addProduct: {
    loading: false,
    data: null,
    error: null,
  },
  addProductNutrition: {
    loading: false,
    data: null,
    error: null,
  },
  addProductBenefits: {
    loading: false,
    data: null,
    error: null,
  },
  editProduct: {
    loading: false,
    data: null,
    error: null,
  },
  editBenefitProduct: {
    loading: false,
    data: null,
    error: null,
  },
  editNutriProduct: {
    loading: false,
    data: null,
    error: null,
  },
  listProduct: {
    loading: false,
    data: null,
    error: null,
  },
  viewProduct: {
    loading: false,
    data: null,
    error: null,
  },
  commonList: {
    loading: false,
    data: null,
    error: null,
  },
  addMetric: {
    loading: false,
    data: null,
    error: null,
  },
  removeMetric: {
    loading: false,
    data: null,
    error: null,
  },
  removeNutri: {
    loading: false,
    data: null,
    error: null,
  },
  removeBenefit: {
    loading: false,
    data: null,
    error: null,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET
    builder
      //   employeeList
      .addCase(productListData.pending, (state, action) => {
        state.listProduct.loading = true;
      })
      .addCase(productListData.fulfilled, (state, action) => {
        state.listProduct.loading = false;
        state.listProduct.data = action.payload;
        state.listProduct.error = false;
      })
      .addCase(productListData.rejected, (state, action) => {
        state.listProduct.loading = false;
        state.listProduct.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProductData.pending, (state, action) => {
        state.deleteProduct.loading = true;
      })
      .addCase(deleteProductData.fulfilled, (state, action) => {
        state.deleteProduct.loading = false;
        state.deleteProduct.data = action.payload;
        state.deleteProduct.error = null;
      })
      .addCase(deleteProductData.rejected, (state, action) => {
        state.deleteProduct.loading = false;
        state.deleteProduct.error = action.payload;
      })
      //add Employee
      .addCase(addProductData.pending, (state, action) => {
        state.addProduct.loading = true;
      })
      .addCase(addProductData.fulfilled, (state, action) => {
        state.addProduct.loading = false;
        state.addProduct.data = action.payload;
        state.addProduct.error = null;
      })
      .addCase(addProductData.rejected, (state, action) => {
        state.addProduct.loading = false;
        state.addProduct.error = action.payload;
      })
      //edit Employee
      .addCase(editProductData.pending, (state, action) => {
        state.editProduct.loading = true;
      })
      .addCase(editProductData.fulfilled, (state, action) => {
        state.editProduct.loading = false;
        state.editProduct.data = action.payload;
        state.editProduct.error = null;
      })
      .addCase(editProductData.rejected, (state, action) => {
        state.editProduct.loading = false;
        state.editProduct.error = action.payload;
      })
      // view Employee
      .addCase(viewProductData.pending, (state, action) => {
        state.viewProduct.loading = true;
      })
      .addCase(viewProductData.fulfilled, (state, action) => {
        state.viewProduct.loading = false;
        state.viewProduct.data = action.payload;
        state.viewProduct.error = null;
      })
      .addCase(viewProductData.rejected, (state, action) => {
        state.viewProduct.loading = false;
        state.viewProduct.error = action.payload;
      })
      // Common List
      .addCase(commonListData.pending, (state, action) => {
        state.commonList.loading = true;
      })
      .addCase(commonListData.fulfilled, (state, action) => {
        state.commonList.loading = false;
        state.commonList.data = action.payload;
        state.commonList.error = null;
      })
      .addCase(commonListData.rejected, (state, action) => {
        state.commonList.loading = false;
        state.commonList.error = action.payload;
      })

      .addCase(addProductNutritionData.pending, (state, action) => {
        state.addProductNutrition.loading = true;
      })
      .addCase(addProductNutritionData.fulfilled, (state, action) => {
        state.addProductNutrition.loading = false;
        state.addProductNutrition.data = action.payload;
        state.addProductNutrition.error = null;
      })
      .addCase(addProductNutritionData.rejected, (state, action) => {
        state.addProductNutrition.loading = false;
        state.addProductNutrition.error = action.payload;
      })

      .addCase(addProductBenefitsData.pending, (state, action) => {
        state.addProductBenefits.loading = true;
      })
      .addCase(addProductBenefitsData.fulfilled, (state, action) => {
        state.addProductBenefits.loading = false;
        state.addProductBenefits.data = action.payload;
        state.addProductBenefits.error = null;
      })
      .addCase(addProductBenefitsData.rejected, (state, action) => {
        state.addProductBenefits.loading = false;
        state.addProductBenefits.error = action.payload;
      })

      .addCase(addMetricData.pending, (state, action) => {
        state.addMetric.loading = true;
      })
      .addCase(addMetricData.fulfilled, (state, action) => {
        state.addMetric.loading = false;
        state.addMetric.data = action.payload;
        state.addMetric.error = null;
      })
      .addCase(addMetricData.rejected, (state, action) => {
        state.addMetric.loading = false;
        state.addMetric.error = action.payload;
      })

      .addCase(removeMetricData.pending, (state, action) => {
        state.removeMetric.loading = true;
      })
      .addCase(removeMetricData.fulfilled, (state, action) => {
        state.removeMetric.loading = false;
        state.removeMetric.data = action.payload;
        state.removeMetric.error = null;
      })
      .addCase(removeMetricData.rejected, (state, action) => {
        state.removeMetric.loading = false;
        state.removeMetric.error = action.payload;
      })

      .addCase(editBenefitProductData.pending, (state, action) => {
        state.editBenefitProduct.loading = true;
      })
      .addCase(editBenefitProductData.fulfilled, (state, action) => {
        state.editBenefitProduct.loading = false;
        state.editBenefitProduct.data = action.payload;
        state.editBenefitProduct.error = null;
      })
      .addCase(editBenefitProductData.rejected, (state, action) => {
        state.editBenefitProduct.loading = false;
        state.editBenefitProduct.error = action.payload;
      })

      .addCase(editNutriProductData.pending, (state, action) => {
        state.editNutriProduct.loading = true;
      })
      .addCase(editNutriProductData.fulfilled, (state, action) => {
        state.editNutriProduct.loading = false;
        state.editNutriProduct.data = action.payload;
        state.editNutriProduct.error = null;
      })
      .addCase(editNutriProductData.rejected, (state, action) => {
        state.editNutriProduct.loading = false;
        state.editNutriProduct.error = action.payload;
      })

      .addCase(removeNutriData.pending, (state, action) => {
        state.removeNutri.loading = true;
      })
      .addCase(removeNutriData.fulfilled, (state, action) => {
        state.removeNutri.loading = false;
        state.removeNutri.data = action.payload;
        state.removeNutri.error = null;
      })
      .addCase(removeNutriData.rejected, (state, action) => {
        state.removeNutri.loading = false;
        state.removeNutri.error = action.payload;
      })

      .addCase(removeBenefitData.pending, (state, action) => {
        state.removeBenefit.loading = true;
      })
      .addCase(removeBenefitData.fulfilled, (state, action) => {
        state.removeBenefit.loading = false;
        state.removeBenefit.data = action.payload;
        state.removeBenefit.error = null;
      })
      .addCase(removeBenefitData.rejected, (state, action) => {
        state.removeBenefit.loading = false;
        state.removeBenefit.error = action.payload;
      });
  },
});

export default productSlice.reducer;
