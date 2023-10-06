import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { profileReducer, subscriptionReducer, userReducer } from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';
import { otherReducer } from './reducers/otherReducer';

let reducers = combineReducers({
    user:userReducer,
    profile:profileReducer,
    course:courseReducer,
    subscription:subscriptionReducer,
    admin:adminReducer,
    other:otherReducer,
})

const store = configureStore(
    {reducer:reducers}
)

export default store;

export const server = 'https://learnwithus-n7xq.onrender.com/api/v1';
