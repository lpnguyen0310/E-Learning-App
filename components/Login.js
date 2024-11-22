import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Authentication
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


const LoginScreen = () => {
  const navigation = useNavigation();

  // State để lưu thông tin email và mật khẩu đăng nhập
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State để lưu người dùng từ Firebase
  const [users, setUsers] = useState([]);

  // Lấy dữ liệu người dùng từ Firebase
  useEffect(() => {
    const usersRef = ref(db, 'User/users'); // Đường dẫn đến danh sách người dùng

    // Lấy thông tin người dùng
    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersList = Object.values(data); // Chuyển đổi dữ liệu Firebase thành mảng
        setUsers(usersList);
      } else {
        setUsers([]);
      }
    });
  }, []);

  // Kiểm tra người dùng đăng nhập
  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    // Xác thực thông tin người dùng với Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user; // Lấy thông tin người dùng từ Firebase Auth

        // Lấy thông tin người dùng từ Realtime Database nếu cần
        const userRef = ref(db, 'User/users/' + user.uid);
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val(); // Lấy thông tin người dùng từ Realtime Database
              navigation.navigate('Home', { user: userData }); // Điều hướng đến trang chủ và truyền thông tin người dùng
            } else {
              Alert.alert('Error', 'User data not found.');
            }
          })
          .catch((error) => {
            console.error(error);
            Alert.alert('Error', 'Error retrieving user data.');
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = '';

        switch (errorCode) {
          case 'auth/user-not-found':
            errorMessage = 'No user found with this email.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password.';
            break;
          default:
            errorMessage = `Error: ${error.message}`;
        }

        Alert.alert('Error', errorMessage); // Hiển thị lỗi
      });
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/snack-icon.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>Telead</Text>
        <Text style={styles.tagline}>LEARN FROM HOME</Text>
      </View>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Let’s Sign In.!</Text>
        <Text style={styles.subHeaderText}>
          Login to Your Account to Continue your Courses
        </Text>
      </View>

      {/* Input Fields */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={20} color="#888" />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail} // Cập nhật state email
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#888" />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword} // Cập nhật state password
          />
        </View>

        {/* Remember Me and Forgot Password */}
        <View style={styles.optionsContainer}>
          <View style={styles.rememberMeContainer}>
            <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
          <Icon name="arrow-forward-outline" size={20} color="#fff" />
        </TouchableOpacity>     
      </View>

      {/* Or Continue With */}
      <Text style={styles.orText}>Or Continue With</Text>

      {/* Social Login Buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../assets/snack-icon.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../assets/snack-icon.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don’t have an Account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signUpLink}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FD',
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A3A3A',
  },
  tagline: {
    fontSize: 12,
    color: '#888',
  },
  headerContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#888',
    marginRight: 8,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#888',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#4A90E2',
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D4ED8',
    borderRadius: 8,
    height: 50,
    marginHorizontal:20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  orText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 0.5,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  signUpText: {
    fontSize: 14,
    color: '#888',
  },
  signUpLink: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
