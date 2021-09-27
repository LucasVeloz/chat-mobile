import React, { useState, useEffect } from 'react';
import { FlatList, Keyboard, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import moment from 'moment';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useRoute, useNavigation } from '@react-navigation/native';

import { useEmitSocket, useOnSocket } from '../../hooks/useSocket';

import { 
  Container, 
  HourText, 
  Input, 
  InputContainer as InputView, 
  MessagesText, 
  MyMessages, 
  OtherMessages,
  UsernameText, 
} from './styles'

const InputContainer = Animated.createAnimatedComponent(InputView);

interface MessageProps {
  name: string;
  message: string;
  hour: Date;
  };


export function Chat() {
  const { params } = useRoute() as {params: {name: string, room: string }};
  const navigation = useNavigation();
  const name = params.name;
  const room = params.room;
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const bottom = useSharedValue(20);

  
  const rStyle = useAnimatedStyle(() => ({
    bottom: bottom.value,
  }))
  
  useEffect(() => {
    navigation.setOptions({title: room});
  }, [])
  
  useEffect(() => {
    useOnSocket({
      message: 'chat',
      callback: (data: any) => { 
        setMessages(oldState => [...oldState, data]);
      },
      data: {},
    });
  }, [])

  const handleSubmit = () => {
    useEmitSocket({
      message: 'message',
      data: {
        name,
        hour: new Date(),
        message: inputValue,
        room,
      }
    });
    setInputValue('')
  }

  Keyboard.addListener('keyboardWillShow', (event) => {
    bottom.value = withTiming(event.endCoordinates.height);
  })
  Keyboard.addListener('keyboardWillHide', () => {
    bottom.value = withTiming(20);
  })

  return (
    <Container behavior={Platform.OS === 'ios' ? "padding" : "height"}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => String(index)} 
        renderItem={ ({ item }) => {
          if (item.name === name) {
            return (
              <MyMessages>
                <MessagesText>{item.message}</MessagesText>
                <HourText>{moment(item.hour).format('HH:mm')}</HourText>
              </MyMessages>
            )
          };
          return (
            <OtherMessages>
              <UsernameText>{item.name}</UsernameText>
              <MessagesText>{item.message}</MessagesText>
              <HourText>{moment(item.hour).format('HH:mm')}</HourText>
            </OtherMessages>
          )
        }}
        contentContainerStyle={
          {
            paddingVertical: getStatusBarHeight() + 20,
            paddingHorizontal: 20,
          }
        }
        showsVerticalScrollIndicator={false}
      />
      <InputContainer style={rStyle}>
        <Input 
          value={inputValue} 
          onChangeText={setInputValue}
          onSubmitEditing={handleSubmit}
          clearButtonMode="always"
          blurOnSubmit={false}
        />
      </InputContainer>
    </Container>
  );
}
