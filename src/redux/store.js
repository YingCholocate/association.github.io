import {createStore,combineReducers} from 'redux'
import { CollapsedReducer } from './reducers/CollapsedReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig={
    key:'root',
    storage,
    backlist:['LoadingReducer']
}
const reducer=combineReducers({
    CollapsedReducer,
    LoadingReducer
})
const persisteedReducer=persistReducer(persistConfig,reducer)


const store=createStore(persisteedReducer);
const persistor=persistStore(store);
export {store,persistor}