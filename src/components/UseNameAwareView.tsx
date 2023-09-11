import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {Text, View} from 'react-native';

type UserAwareScreenProps = {
  children: (userName: string | null) => React.ReactNode;
};

const UseNameAwareView: React.FC<UserAwareScreenProps> = ({children}) => {
  const userName = useSelector((state: RootState) => state.user.userName);

  return <View>{children(userName)}</View>;
};

export default UseNameAwareView;
