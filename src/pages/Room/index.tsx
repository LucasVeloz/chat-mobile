import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useEmitSocket } from '../../hooks/useSocket';
import { api } from '../../services/api';

import { Container, RoomButton, RoomText } from './styles';

export const Room = () => {
  const [rooms, setRooms] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await api.get('/rooms');
        setRooms(response.data);
      } catch (error) {
        const Err = error as AxiosError<{message: string}>;
        Err.response?.data.message && Alert.alert(Err.response?.data.message)
      }
    }
    getRooms();
  }, []);

  const handleSelectRoom = (value: string) => {
    Alert.prompt('Digite o nome que deseja utilizar:', undefined, (name) => {
      if (name) {
        useEmitSocket({
          message: 'selectRoom',
          data: {
            name,
            room: value
          }
        });
        navigation.navigate('chat', { name, room: value })
      } else {
        Alert.alert('Nome é obrigatório')
      }
    });
  }

  return (
    <Container>
      <FlatList 
        data={rooms}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
            <RoomButton onPress={() => handleSelectRoom(item)}>
              <RoomText>{item}</RoomText>
            </RoomButton>
          )
        }
      />
    </Container>
  );
}
