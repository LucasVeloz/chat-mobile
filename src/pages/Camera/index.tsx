import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner, BarCodeScannerResult, usePermissions } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet } from 'react-native';
import { api } from '../../services/api';

import { Container, LoadingContainer, SubContainer } from './styles';

export const Camera = () => {
  const [granted, request] = usePermissions();
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation()

  const handleScan = async (event: BarCodeScannerResult) => {
    setScanned(true);
    try {
      setIsLoading(true);
      await api.post('/rooms', {chat: event.data });
      navigation.goBack()
    } catch {
      Alert.alert('Sala já existente')
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    (async () => {

      if (granted) return;
      await request()
    })()
  }, [])

  return (
    <Container>
      <BarCodeScanner style={StyleSheet.absoluteFillObject} onBarCodeScanned={scanned ? undefined : handleScan} />
      {scanned && 
        <SubContainer>
          <Button
            title='Tentar scanear novamente' 
            onPress={() => setScanned(false)} 
            />
        </SubContainer>
      }
      {isLoading && (
        <LoadingContainer>
          <ActivityIndicator color="#ff0066" size={'large'} />
        </LoadingContainer>
      )
      }
    </Container>
  );
}
