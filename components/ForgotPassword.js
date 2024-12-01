import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
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

    const handleForgotPassword = async () => {
      if (!email) {
        Alert.alert('Thông báo', 'Vui lòng nhập email của bạn.');
        return;
      }
  
      try {
        await sendPasswordResetEmail(auth, email);
        alert('Thành công', `Yêu cầu đặt lại mật khẩu đã được gửi đến: ${email}`);
        setEmail('');
        navigation.goBack(); // Quay lại màn hình trước đó
      } catch (error) {
        console.error(error);
        if (error.code === 'auth/user-not-found') {
          alert('Lỗi', 'Email không tồn tại trong hệ thống.');
        } else if (error.code === 'auth/invalid-email') {
          alert('Lỗi', 'Định dạng email không hợp lệ.');
        } else {
          alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
      }
    };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <Text style={styles.description}>
        Vui lòng nhập email đã đăng ký để đặt lại mật khẩu.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập email của bạn"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}    >
        <Text style={styles.buttonText}>Gửi yêu cầu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ForgotPassword;
