import { configureStore } from '@reduxjs/toolkit'
import RootReducer from './RootReducers'


export const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>;


