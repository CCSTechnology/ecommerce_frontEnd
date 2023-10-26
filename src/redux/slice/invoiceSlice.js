import { createSlice } from "@reduxjs/toolkit"
import { invoiceList, viewInvoiceData, invoicePdfDownloadData, invoiceApproveData, invoiceMiscAddData, invoiceMiscDeleteData, invoiceMiscEditData } from "redux/api/services/invoiceService"

const initialState = {
    invoiceList: {
        loading: false,
        data: [],
        error: null,
    },

    viewInvoiceData: {
        loading: false,
        data: null,
        error: null,
    },

    invoicePdfDownload: {
        loading: false,
        data: null,
        error: null,
    },

    invoiceApprove: {
        loading: false,
        data: null,
        error: null,
    },

    invoiceMiscAdd: {
        loading: false,
        data: null,
        error: null,
    },

    invoiceMiscDelete: {
        loading: false,
        data: null,
        error: null,
    },

    invoiceMiscEdit: {
        loading: false,
        data: null,
        error: null,
    }
}

export const directorySlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //job list
            .addCase(invoiceList.pending, (state, action) => {
                state.invoiceList.loading = true;
            })
            .addCase(invoiceList.fulfilled, (state, action) => {
                state.invoiceList.loading = false;
                state.invoiceList.data = action.payload;
                state.invoiceList.error = null;
            })
            .addCase(invoiceList.rejected, (state, action) => {
                state.invoiceList.loading = false;
                state.invoiceList.error = action.payload;
            })
            //view Directory
            .addCase(viewInvoiceData.pending, (state, action) => {
                state.viewInvoiceData.loading = true;
            })
            .addCase(viewInvoiceData.fulfilled, (state, action) => {
                state.viewInvoiceData.loading = false;
                state.viewInvoiceData.data = action.payload;
                state.viewInvoiceData.error = null;
            })
            .addCase(viewInvoiceData.rejected, (state, action) => {
                state.viewInvoiceData.loading = false;
                state.viewInvoiceData.error = action.payload;
            })

            //pdf downlOd
            .addCase(invoicePdfDownloadData.pending, (state, action) => {
                state.invoicePdfDownload.loading = true;
            })
            .addCase(invoicePdfDownloadData.fulfilled, (state, action) => {
                state.invoicePdfDownload.loading = false;
                state.invoicePdfDownload.data = action.payload;
                state.invoicePdfDownload.error = null;
            })
            .addCase(invoicePdfDownloadData.rejected, (state, action) => {
                state.invoicePdfDownload.loading = false;
                state.invoicePdfDownload.error = action.payload;
            })

            //Approve Data
            .addCase(invoiceApproveData.pending, (state, action) => {
                state.invoiceApprove.loading = true;
            })
            .addCase(invoiceApproveData.fulfilled, (state, action) => {
                state.invoiceApprove.loading = false;
                state.invoiceApprove.data = action.payload;
                state.invoiceApprove.error = null;
            })
            .addCase(invoiceApproveData.rejected, (state, action) => {
                state.invoiceApprove.loading = false;
                state.invoiceApprove.error = action.payload;
            })

            //Invoice Misc Add
            .addCase(invoiceMiscAddData.pending, (state, action) => {
                state.invoiceMiscAdd.loading = true;
            })
            .addCase(invoiceMiscAddData.fulfilled, (state, action) => {
                state.invoiceMiscAdd.loading = false;
                state.invoiceMiscAdd.data = action.payload;
                state.invoiceMiscAdd.error = null;
            })
            .addCase(invoiceMiscAddData.rejected, (state, action) => {
                state.invoiceMiscAdd.loading = false;
                state.invoiceMiscAdd.error = action.payload;
            })

            //Invoice Misc Delete
            .addCase(invoiceMiscDeleteData.pending, (state, action) => {
                state.invoiceMiscDelete.loading = true;
            })
            .addCase(invoiceMiscDeleteData.fulfilled, (state, action) => {
                state.invoiceMiscDelete.loading = false;
                state.invoiceMiscDelete.data = action.payload;
                state.invoiceMiscDelete.error = null;
            })
            .addCase(invoiceMiscDeleteData.rejected, (state, action) => {
                state.invoiceMiscDelete.loading = false;
                state.invoiceMiscDelete.error = action.payload;
            })

            //Invoice Misc Edit
            .addCase(invoiceMiscEditData.pending, (state, action) => {
                state.invoiceMiscEdit.loading = true;
            })
            .addCase(invoiceMiscEditData.fulfilled, (state, action) => {
                state.invoiceMiscEdit.loading = false;
                state.invoiceMiscEdit.data = action.payload;
                state.invoiceMiscEdit.error = null;
            })
            .addCase(invoiceMiscEditData.rejected, (state, action) => {
                state.invoiceMiscEdit.loading = false;
                state.invoiceMiscEdit.error = action.payload;
            })
    },

})

export default directorySlice.reducer