import React, { useState, useEffect } from 'react';
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

export default function Signup() {
  const [email, setemail] = useState('');
  const [password, setpass] = useState('');
  const [userexist, setuserexist] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    getData();
  }, [email]);

  const getData = async () => {
    setuserexist(false)
    try {
      const value = await AsyncStorage.getItem(`${email}`);
      if (value !== null) {
        setuserexist(true);
      }
    } catch (e) {
      userexist(false);
    }
  };
  const onSubmit = async () => {
    if (userexist) {
      Alert.alert(`${email} already exists`);
    } else {
      try {
        await AsyncStorage.setItem(`${email}`, password);
        Alert.alert(`${email} signed up`);
      } catch (e) {
        // saving error
      }
    }
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}>
          <Text style={styles.title}>Sign up!</Text>

          <SizedBox height={8} />

          <Text style={styles.subtitle}>create new account</Text>
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
            style={styles.buttonout}
            onPress={async () => {
              onSubmit();
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
