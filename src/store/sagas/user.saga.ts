import {call, put, takeLatest} from 'redux-saga/effects';
import {userService} from '../../services/user-service';
import {UserAction, userActions, UserActionType} from '../actions';

type UserSagaHandler = (action: UserAction) => void;

function* handleInitUser(action: UserAction): any {
  const userName: string = yield call(userService.getUserFromStorage);
  yield put(userActions.setUserName(userName));
}

function* handleUserLogin(action: UserAction): any {
  yield call(userService.login, action.payload.userName);
  yield put(userActions.setUserName(action.payload.userName));
}

export function* rootUserSaga() {
  yield takeLatest<UserActionType, UserSagaHandler>(
    'USER_INIT',
    handleInitUser,
  );

  yield takeLatest<UserActionType, UserSagaHandler>(
    'USER_LOGIN',
    handleUserLogin,
  );
}
