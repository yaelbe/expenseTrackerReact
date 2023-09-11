import React from 'react';
import {Provider} from 'react-redux';
import {type EmptyObject, type Store, type AnyAction} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootReducer, type RootState} from './reducers/root.reducer';
import {rootSaga} from './sagas/root.saga';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

export type RootStoreProps = Store<EmptyObject & RootState, AnyAction>;

const sagaMiddleware = createSagaMiddleware();

export const store: RootStoreProps = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const RootStore = (props: any) => {
  return <Provider store={store}>{props.children}</Provider>;
};
