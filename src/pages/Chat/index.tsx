import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Keyboard, Platform, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import moment from 'moment';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

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
import { useUser } from '../../hooks/useUser';
import { roleEnumType } from '../../utils';


interface MessageProps {
  name: string;
  message: string;
  hour: Date;
};


const InputContainer = Animated.createAnimatedComponent(InputView);
export function Chat() {
  const { params } = useRoute() as {params: {name: string, room: string }};
  const navigation = useNavigation();
  const room = params.room;
  const { name } = useUser();
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const margin = useSharedValue(0);
  const flatRef = useRef<FlatList>(null);

  const rStyle = useAnimatedStyle(() => ({
    marginBottom: margin.value
  }))
  
  useEffect(() => {
    navigation.setOptions({title: room});
  }, [])
  
  useEffect(() => {
    useOnSocket({
      message: 'chat',
      callback: (data: any) => { 
        setMessages(oldState => [...oldState, data]);
        flatRef.current?.scrollToEnd();
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

  const handleRole = (value: roleEnumType) => {
    if (value === 'STUDENT') return ' - estudante'
    return ' - professor'
  }

  Keyboard.addListener('keyboardWillShow', () => {
    margin.value = withTiming(90);
  })
  Keyboard.addListener('keyboardWillHide', () => {
    margin.value = withTiming(0);
  })

  return (
    <Container behavior={Platform.OS === 'ios' ? "padding" : "height"}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => String(index)}
        ref={flatRef}
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
              <UsernameText>{item.name}{handleRole(item.role)}</UsernameText>
              <MessagesText>{item.message}</MessagesText>
              <HourText>{moment(item.hour).format('HH:mm')}</HourText>
            </OtherMessages>
          )
        }}
        contentContainerStyle={
          {
            paddingVertical: getStatusBarHeight() + 20,
            paddingHorizontal: 20,
            paddingBottom: 80,
          }
        }
        showsVerticalScrollIndicator={false}
      />
      <InputContainer style={rStyle}>
        <Input 
          value={inputValue} 
          onChangeText={setInputValue}
          clearButtonMode="always"
          blurOnSubmit={false}
          multiline
        />
        <TouchableOpacity onPress={handleSubmit} disabled={!inputValue}>
          <FontAwesome name="send" size={24} color={inputValue ? "black" : 'gray'} />
        </TouchableOpacity>
      </InputContainer>
    </Container>
  );
}
