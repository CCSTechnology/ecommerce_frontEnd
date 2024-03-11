import { createSlice } from "@reduxjs/toolkit";
import {
  addCartServices,
  cartViewServices,
  paymentStatusChange,
  checkOutWithGuest,
  checkOutWithUser,
  getAddressServices,
  getDeliveryCharge,
  guestAddCartServices,
  removeCartServices,
} from "../../api/public/cartServices";
import { store } from "../../store";

const cartCases = [
  {
    api: addCartServices,
    name: "addCartServices",
  },
  {
    api: cartViewServices,
    name: "cartViewServices",
  },
  {
    api: getAddressServices,
    name: "getAddressServices",
  },
  {
    api: checkOutWithUser,
    name: "checkOutWithUser",
  },
  {
    api: checkOutWithGuest,
    name: "checkOutWithGuest",
  },
  {
    api: guestAddCartServices,
    name: "guestAddCartServices",
  },
  {
    api: removeCartServices,
    name: "removeCartServices",
  },
  {
    api: getDeliveryCharge,
    name: "getDeliveryCharge",
  },
  {
    api: paymentStatusChange,
    name: "paymentStatusChange",
  },
];

const initialState = {
  cartProducts: [],
};

cartCases.forEach((cases) => {
  initialState[cases.name] = {
    loading: false,
    data: undefined,
    error: null,
  };
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, { payload }) => {
      const filteredProduct = state.cartProducts.filter(
        (cart) => cart.id === payload.id
      );
      if (filteredProduct.length >= 1) {
        filteredProduct[0].count = filteredProduct[0].count + payload.count;
      } else {
        const array = [...state.cartProducts];
        array.push(payload);
        state.cartProducts = array;
      }
    },
    removeCart: (state, { payload }) => {
      const filteredProduct = state.cartProducts.filter(
        (cart) => cart.id === payload.id
      );
      state.cartProducts = filteredProduct;
    },
  },
  extraReducers: (builder) => {
    cartCases.forEach((cases) => {
      builder
        .addCase(cases.api.fulfilled, (state, { payload }, others) => {
          state[cases.name].loading = false;
          state[cases.name].data = payload;
          state[cases.name].error = null;
        })
        .addCase(cases.api.pending, (state) => {
          state[cases.name].loading = true;
          state[cases.name].error = null;
          state[cases.name].data = null;
        })
        .addCase(cases.api.rejected, (state, { payload }) => {
          state[cases.name].loading = false;
          state[cases.name].error = payload;
          state[cases.name].data = null;
        });
    });
  },
});

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;
