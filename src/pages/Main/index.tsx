import React, { useState } from 'react';
import * as Device from 'expo-device';

import { FlatList, StatusBar } from 'react-native';
import { Container, Input, MyMessages, MyMessagesText, OtherMessages, OtherMessagesText } from './styles'

import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface MessageProps {
  id: string;
  message: string;
  hour: Date;
  };

export function Main() {
  const socket = io('https://chat-teste-123.herokuapp.com/', {
    transports: ['websocket']
  });
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<MessageProps[]>([]);


  socket.emit('connected', Device.deviceName);

  useEffect(() => {
    socket.on('chat', (data) => {
      setMessages(oldState => [...oldState, data]);
    })
  }, [])

  const handleSubmit = () => {
    socket.emit('message', {
      id: Device.deviceName,
      hour: new Date(),
      message: inputValue,
    })
    setInputValue('')
  }

  return (
    <Container>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <FlatList
        data={messages}
        keyExtractor={(_, index) => String(index)} 
        renderItem={ ({ item }) => {
          if (item.id === Device.deviceName) {
            return (
              <MyMessages>
                <MyMessagesText>{item.message}</MyMessagesText>
              </MyMessages>
            )
          };
          return (
            <OtherMessages>
              <OtherMessagesText>{item.message}</OtherMessagesText>
            </OtherMessages>
          )
        }}
        contentContainerStyle={
          {
            paddingVertical: getStatusBarHeight() + 20
          }
        }
        showsVerticalScrollIndicator={false}
      />
      <Input 
        value={inputValue} 
        onChangeText={setInputValue}
        onSubmitEditing={handleSubmit}
      />
  </Container>
  );
}
