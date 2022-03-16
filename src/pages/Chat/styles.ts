import styled from 'styled-components/native';


export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const InputContainer = styled.View`
  padding: 20px;
  width: 100%;
  background: white;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput`
  flex: 1;
  border-radius: 10px;
  border-width: 1px;
  border-color: #c4c4c4;
  padding: 20px;
  margin-right: 20px;
`;

export const MyMessages = styled.View`
  padding: 8px;
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

export const UsernameText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: rgba(255,255,255, 0.7);
  margin-bottom: 4px;
`;

export const HourText = styled.Text`
  font-size: 10px;
  font-weight: 500;
  color: white;
  align-self: flex-end;
`;