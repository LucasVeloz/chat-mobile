import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';



export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  padding-bottom: ${getBottomSpace() + 20}px;
  justify-content: center;
`;

export const InputContainer = styled.View`
  padding: 20px;
  margin-bottom: 10px;
  border-color: #c4c4c4;
  border-top-width: 1px;
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

export const OtherMessages = styled(MyMessages)`
  background: #707070;
  align-self: flex-start;
`;

export const MessagesText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

export const HourText = styled.Text`
  font-size: 10px;
  font-weight: 500;
  color: white;
  position: absolute;
  bottom: 7px;
  right: 7px;
`;