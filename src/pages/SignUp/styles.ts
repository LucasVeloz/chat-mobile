import styled from 'styled-components/native';

export const Container = styled.Pressable`
  flex: 1;
  padding: 20px;
`;


export const Input = styled.TextInput`
  width: 100%;
  background: white;
  border-radius: 8px;
  border-width: 1px;
  border-color: rgba(0,0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background: #ff0066;
  height: 55px;
  border-radius: 8px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ButtonContent = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
`;