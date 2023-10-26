import { createAsyncThunk } from "@reduxjs/toolkit";
import SERVER from "..";

export const invoiceList = createAsyncThunk("invoiceList", async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
        const response = await SERVER({
            url,
            params: others,
            method: "GET",
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const viewInvoiceData = createAsyncThunk("viewInvoiceData", async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
        const response = await SERVER({
            url,
            params: others,
            method: "GET",
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})


export const invoicePdfDownloadData = createAsyncThunk("invoicePdfDownloadData", async (params, thunkApi) => {
    const { url = "", ...others } = params;
    try {
        const response = await SERVER({
            url,
            params: others,
            method: "POST",
            responseType: "blob"
        });

        const blob = await new Blob([response.data], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'invoice.pdf';
        link.click();
        return blob;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})



export const invoiceApproveData = createAsyncThunk("invoiceApproveData", async (params, thunkApi) => {

    const { url = "", ...others } = params;
    console.log(others);
    try {
        const response = await SERVER({
            url,
            data: others,
            method: "PATCH",
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const invoiceMiscAddData = createAsyncThunk(
    "invoiceMiscAddData",
    async (params, thunkApi) => {
        const { url, data, } = params;
        try {
            const response = await SERVER.post(url, {
                ...data,
            },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const invoiceMiscDeleteData = createAsyncThunk("invoiceMiscDeleteData", async (params, thunkApi) => {
    const { url = "", data = {} } = params;
    try {
        const response = await SERVER.delete(url, {
            ...data,
        });
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const invoiceMiscEditData = createAsyncThunk(
    "invoiceMiscEditData",
    async (params, thunkApi) => {
        const { url, data, } = params;
        try {
            const response = await SERVER.post(url, {
                ...data,
            },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);
