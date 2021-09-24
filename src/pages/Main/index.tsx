import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import * as Device from 'expo-device';
import { io } from 'socket.io-client';
import moment from 'moment';

import { 
  Container, 
  HourText, 
  Input, 
  InputContainer, 
  MessagesText, 
  MyMessages, 
  OtherMessages, 
} from './styles'

interface MessageProps {
  id: string;
  message: string;
  hour: Date;
  };


export function Main() {
  const socket = io('https://chat-teste-123.herokuapp.com');
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
    <Container behavior="padding">
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <FlatList
        data={messages}
        keyExtractor={(_, index) => String(index)} 
        renderItem={ ({ item }) => {
          if (item.id === Device.deviceName) {
            return (
              <MyMessages >
                <MessagesText>{item.message}</MessagesText>
                <HourText>{moment(item.hour).format('HH:mm')}</HourText>
              </MyMessages>
            )
          };
          return (
            <OtherMessages style={{
              borderBottomLeftRadius: -1
            }}>
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
      <InputContainer>
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
