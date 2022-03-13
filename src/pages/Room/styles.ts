import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;


export const RoomButton = styled.TouchableOpacity`
  width: 100%;
  height: 80px;
  background: white;
  padding: 0 20px;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const RoomText = styled.Text`
  font-size: 20px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  font-size: 20px;
  margin: 50px 0;
`;

export const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #ff0066;
  align-items: center;
  justify-content: center;
`;

export const FloatingText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
`;