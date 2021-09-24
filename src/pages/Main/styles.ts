import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';



export const Container = styled.View`
  flex: 1;
  padding: 0 20px ${getBottomSpace() + 20}px;
  justify-content: center;
`;

export const Input = styled.TextInput`
  height: 60px;
  width: 100%;
  border-radius: 10px;
  border-width: 1px;
  border-color: #c4c4c4;
  padding: 0 20px;
`;

export const MyMessages = styled.View`
  padding: 20px;
  background: green;
  border-radius: 10px;
  justify-content: center;
  align-self: flex-end;
  margin: 10px 0;
`;

export const MyMessagesText = styled.Text`
  font-size: 14px;
  font-weight: 600;
`;

export const OtherMessages = styled(MyMessages)`
  background: gray;
  align-self: flex-start;
`;

export const OtherMessagesText = styled.Text`
  /* font-size: 16px;
  font-weight: 600; */
`;