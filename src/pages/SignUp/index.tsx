import React, { useState } from 'react';
import { ActivityIndicator, Alert, Keyboard } from 'react-native';
import { useUser } from '../../hooks/useUser';

import { ButtonContainer, ButtonContent, Container, Input } from './styles';


export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useUser();

  const handleForm = async () => {
    try {
      setIsLoading(true);
      if (!name.trim()) return Alert.alert(':/', 'por favor digite seu nome')
      if (!email.trim()) return Alert.alert(':/', 'por favor digite seu email')
      updateUser({ name, email })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container onPress={Keyboard.dismiss}>
      <Input placeholder='Digite o seu nome' value={name} onChangeText={setName} />
      <Input 
        placeholder='Digite seu email institucional' 
        value={email} 
        onChangeText={setEmail} 
        textContentType="emailAddress"
        autoCapitalize='none'
      />
      <ButtonContainer onPress={handleForm} disabled={isLoading}>
        {
          isLoading 
          ? <ActivityIndicator color="white" />
          : <ButtonContent children="Cadastrar" />
        }
      </ButtonContainer>
    </Container>
  )
}
