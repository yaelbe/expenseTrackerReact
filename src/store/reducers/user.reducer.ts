import {UserAction} from '../actions/user.actions';

export interface UserState {
  userName: string | null;
  initialized: boolean;
}

const initialState: UserState = {
  userName: null,
  initialized: false,
};

export function userReducer(
  state = initialState,
  action: UserAction,
): UserState {
  switch (action.type) {
    case 'USER_SET_USERNAME':
      return {
        ...state,
        userName: action.payload.userName,
        initialized: true,
      };

    case 'USER_LOGOUT':
      return {
        ...state,
        userName: null,
        initialized: false,
      };

    default:
      return state;
  }
}
