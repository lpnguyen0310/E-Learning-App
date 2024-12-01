import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database'; // Firebase Realtime Database
import { initializeApp } from "firebase/app";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyANN7T5O_qY-e7PuVdaBVtV2GctAgU3qOg",
  authDomain: "elearning-43ab4.firebaseapp.com",
  databaseURL: "https://elearning-43ab4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "elearning-43ab4",
  storageBucket: "elearning-43ab4.firebasestorage.app",
  messagingSenderId: "259523190660",
  appId: "1:259523190660:web:c39c8bb5d3380bffe647d1",
  measurementId: "G-0Q3F48T7RM"
};

const app = initializeApp(firebaseConfig); // Initialize Firebase app
const auth = getAuth(app); // Get Firebase Auth
const db = getDatabase(app); // Get Firebase Realtime Database

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const handleForgotPassword = () => {
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('A reset link has been sent to your email');
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = '';

        switch (errorCode) {
          case 'auth/invalid-email':
            errorMessage = 'The email address is not valid.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No user found with this email address.';
            break;
          default:
            errorMessage = `Error: ${error.message}`;
        }

        setMessage(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Message Display */}
      {message ? <Text style={styles.message}>{message}</Text> : null}

      {/* Reset Button */}
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Remember your password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f4f6f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  message: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
  linkText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default ForgotPassword;
