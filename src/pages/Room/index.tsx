import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, RefreshControl } from 'react-native';
import Lottie from 'lottie-react-native';

import { Skeleton } from '../../components/Skeleton';

import { useEmitSocket } from '../../hooks/useSocket';

import { api } from '../../services/api';

import { Container, EmptyText, FloatingButton, FloatingText, RoomButton, RoomText } from './styles';
import { useUser } from '../../hooks/useUser';

export const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const { name, role } = useUser();
  const navigation = useNavigation();

  const onRefresh = async () => {
    try {
      setRefreshLoading(true);
      const response = await api.get('/rooms');
      setRooms(response.data);
    } catch {
      Alert.alert(
        "Tivemos problemas", 
        "no momento não foi possivel, achar salas, tente novamente mais tarde"
      )
    } finally {
      setRefreshLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    const getRooms = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/rooms');
        setRooms(response.data);
      } catch {
        Alert.alert(
          "Tivemos problemas", 
          "no momento não foi possivel, achar salas, tente novamente mais tarde"
        )
      } finally {
        setIsLoading(false)
      }
    };

    getRooms();
  }, []));

  const handleSelectRoom = (value: string) => {
    useEmitSocket({
      message: 'selectRoom',
      data: {
        name,
        role,
        room: value
      }
    });
    navigation.navigate('chat', { room: value })
  }

  const handleCamera = () => {
    navigation.navigate('camera')
  }

  if (isLoading) {
    return <Skeleton />
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
        ListEmptyComponent={
          <>
            <EmptyText>Não foi encontrada nenhuma sala no momento</EmptyText>
            <Lottie
              source={require('../../../animation.json')} 
              autoPlay
              loop 
              autoSize 
              /> 
          </>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshLoading}
            onRefresh={onRefresh}
          />
        }
      />
      <FloatingButton onPress={handleCamera}>
        <FloatingText>+</FloatingText>
      </FloatingButton>
    </Container>
  );
}
