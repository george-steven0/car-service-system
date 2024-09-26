import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/Auth/AuthSlice";
import bills from "./Slices/Bills/bills";
import cars from "./Slices/Cars/carSlice";
import clients from "./Slices/Clients/clients";
import toastMessage from "./Slices/Toast-Messages/toastMessage";
import sparePartSlice from "./Slices/Spareparts/sparePartSlice";
import resetPagination from "./Slices/ResetPagination/resetPagination";
import languageSlice from "./Slices/Language/languageSlice";

export const store = configureStore({
    reducer: {
        auth : AuthSlice,
        bills : bills,
        cars : cars,
        clients : clients,
        toastMessage : toastMessage,
        sparepart : sparePartSlice,
        resetPagination : resetPagination,
        lang : languageSlice
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;