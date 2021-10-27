import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
// Components
import SizedBox from './SizedBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');
  const styles = useStyles();

  const onSubmit = async () => {
    try {
      const value = await AsyncStorage.getItem(`${email}`);
      if (value !== null) {
        if (value == password) {
          navigation.navigate('Home', { name: email });
        } else {
          Alert.alert(`${email} : password error`);
        }
      } else {
        Alert.alert(`${email} dosent exist`);
      }
    } catch (e) {}
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}>
          <Text style={styles.title}>Welcome back!</Text>

          <SizedBox height={8} />

          <Text style={styles.subtitle}>Sign in to your account</Text>
          <SizedBox height={32} />

          <Pressable>
            <View style={styles.form}>
              <Text style={styles.label}>Email</Text>

              <TextInput
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(e) => setemail(e)}
                returnKeyType="next"
                style={styles.textInput}
                textContentType="username"
                value={email}
              />
            </View>
          </Pressable>

          <SizedBox height={16} />

          <Pressable>
            <View style={styles.form}>
              <Text style={styles.label}>Password</Text>

              <TextInput
                autoCapitalize="none"
                autoCompleteType="password"
                autoCorrect={false}
                onChangeText={(e) => setpass(e)}
                onSubmitEditing={onSubmit}
                returnKeyType="done"
                secureTextEntry
                style={styles.textInput}
                textContentType="password"
                value={password}
              />
            </View>
          </Pressable>

          <SizedBox height={16} />

          <SizedBox height={16} />
          <Button
            style={styles.button}
            onPress={async () => {
              onSubmit();
            }}
            color="rgb(93, 95, 222)"
            title="Login"
          />

          <Button
            style={styles.buttonout}
            onPress={async () => {
              navigation.navigate('SignUp');
            }}
            color="red"
            title="Sign up"
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

function useStyles() {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: 'rgb(93, 95, 222)',
      borderRadius: 8,
      height: 48,
      justifyContent: 'center',
    },
    buttonout: {
      marginTop: '10px',
      alignItems: 'center',
      backgroundColor: 'rgb(93, 95, 222)',
      borderRadius: 8,
      height: 48,
      justifyContent: 'center',
    },
    buttonTitle: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: '600',
      lineHeight: 22,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 32,
    },
    forgotPasswordContainer: {
      alignItems: 'flex-end',
    },
    form: {
      alignItems: 'center',
      backgroundColor: 'rgb(58, 58, 60)',
      borderRadius: 8,
      flexDirection: 'row',
      height: 48,
      paddingHorizontal: 16,
    },
    label: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
      width: 80,
    },
    root: {
      backgroundColor: '#000000',
      flex: 1,
    },
    safeAreaView: {
      flex: 1,
    },
    subtitle: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 22,
    },
    textButton: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
    },
    textInput: {
      color: '#FFFFFF',
      flex: 1,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 34,
    },
    
  });
}
