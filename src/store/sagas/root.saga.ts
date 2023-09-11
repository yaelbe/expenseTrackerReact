import {all, call, spawn} from 'redux-saga/effects';
import {rootExpenseSaga} from './expense.saga';
import {rootUserSaga} from './user.saga';
// import authSaga from './auth.saga';

export function* rootSaga() {
  const sagas: any = [rootExpenseSaga, rootUserSaga];
  yield all(
    sagas.map((saga: any) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      }),
    ),
  );
}
