import {StoreAction, StoreFunctions} from './base.actions';

export type UserActionType =
  | 'USER_INIT'
  | 'USER_SET_USERNAME'
  | 'USER_LOGIN'
  | 'USER_LOGOUT';

export interface UserAction extends StoreAction<UserActionType> {}

function userLogin(userName: string | null): UserAction {
  return {
    type: 'USER_LOGIN',
    payload: {
      userName,
    },
  };
}

function setUserName(userName: string | null): UserAction {
  return {
    type: 'USER_SET_USERNAME',
    payload: {
      userName,
    },
  };
}

function userLogout(): UserAction {
  return {
    type: 'USER_LOGOUT',
  };
}

function userInit(): UserAction {
  return {
    type: 'USER_INIT',
  };
}

interface IUserActions {
  userLogin: (userName: string | null) => UserAction;
  setUserName: (userName: string | null) => UserAction;
  userLogout: () => UserAction;
  userInit: () => UserAction;
}

export const userActions: StoreFunctions<UserActionType> & IUserActions = {
  setUserName: setUserName,
  userLogout: userLogout,
  userInit: userInit,
  userLogin: userLogin,
};
