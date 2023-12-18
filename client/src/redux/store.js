/* eslint-disable no-unused-vars */
import { combineReducers, configureStore, } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import blogReducer from './blog/blogSlice.js'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({user: userReducer, blog: blogReducer});

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false
  })
})



export const persistor = persistStore(store);