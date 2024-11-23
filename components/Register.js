import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, set } from 'firebase/database'; // Firebase Realtime Database
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential,signInWithPopup } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


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

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo các dịch vụ Firebase Auth và Realtime Database
const auth = getAuth(app);
const db = getDatabase(app);


const SignUpScreen = () => {
  const navigation = useNavigation();

  // State để lưu trữ thông tin đăng ký
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State để hiển thị thông báo
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (Platform.OS !== 'web') {
      GoogleSignin.configure({
        webClientId: '259523190660-btqt3212k7odqalob49nkngqe7jmunk1.apps.googleusercontent.com', // Your Web Client ID from Firebase Console
      });
    }
  }, []);


  const handleSignUp = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
  
    // Sử dụng Firebase Authentication để tạo người dùng mới
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Đăng ký thành công, lấy thông tin người dùng
        const user = userCredential.user;

        // Nếu mảng trống, thay thế bằng null hoặc giá trị mặc định khác
  
        // Lưu thông tin người dùng vào Firebase Realtime Database
        set(ref(db, 'User/users/' + user.uid), {
          name: fullName,
          email: email,
          courses: {},  // Thay thế mảng trống bằng null nếu cần
          courseFollow: {},  // Thay thế mảng trống bằng null nếu cầnrỗng
          age: 0,
        });
  
        // Điều hướng đến màn hình Login
        navigation.navigate('Login', {
          newUser: { email, password },
        });
  
        // Hiển thị thông báo thành công
        setMessage('Registration successful!');
      })
      .catch((error) => {
        // Lỗi trả về từ Firebase
        const errorCode = error.code;
        let errorMessage = '';
  
        switch (errorCode) {
          case 'auth/email-already-in-use':
            errorMessage = 'The email address is already in use by another account.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'The email address is not valid.';
            break;
          case 'auth/weak-password':
            errorMessage = 'The password is too weak. Please choose a stronger password.';
            break;
          default:
            errorMessage = `Error: ${error.message}`;
        }
  
        // Hiển thị thông báo lỗi
        setMessage(errorMessage);
      });
  };
  const handleGoogleSignUpWeb = async () => {
    try {
      // Khởi tạo provider Google
      const provider = new GoogleAuthProvider();
      
      // Mở cửa sổ pop-up cho phép người dùng chọn tài khoản Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Lưu thông tin người dùng vào Firebase Realtime Database
      set(ref(db, 'User/users/' + user.uid), {
        name: user.displayName,
        email: user.email,
        courses: {},
        courseFollow: {},
        age: 0,
      });
  
      // Điều hướng đến màn hình Home
      navigation.navigate('Home', { user: user });
  
      setMessage('Registration successful!');
    } catch (error) {
      setMessage(`Google Sign-Up failed: ${error.message}`);
    }
  };

  const handleGoogleSignUpMobile = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn(); // Hiển thị danh sách tài khoản Google
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      const user = userCredential.user;
  
      // Lưu thông tin người dùng vào Firebase Realtime Database
      set(ref(db, 'User/users/' + user.uid), {
        name: user.displayName,
        email: user.email,
        courses: {},
        courseFollow: {},
        age: 0,
      });
  
      // Điều hướng đến màn hình Home
      navigation.navigate('Home', { user: user });
  
      setMessage('Registration successful!');
    } catch (error) {
      setMessage(`Google Sign-Up failed: ${error.message}`);
    }
  };

  const handleGoogleSignUp = async () => {
    if (Platform.OS === 'web') {
      // Sử dụng Firebase Web Authentication
      await handleGoogleSignUpWeb();
    } else {
      // Sử dụng @react-native-google-signin cho di động
      await handleGoogleSignUpMobile();
    }
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
      <Text style={styles.headerText}>Let’s Sign Up!</Text>
      <Text style={styles.subHeaderText}>
        Create an Account to Continue your Courses
      </Text>
    </View>

    {/* Input Fields */}
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Icon name="person-outline" size={20} color="#888" />
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#888" />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
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
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#888" />
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
    </View>

    {/* Sign Up Button */}
    <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
      <Text style={styles.signUpButtonText}>Sign Up</Text>
      <Icon name="arrow-forward-outline" size={20} color="#fff" />
    </TouchableOpacity>

    {/* Hiển thị thông báo */}
    {message ? (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    ) : null}

    {/* Or Continue With */}
    <Text style={styles.orText}>Or Continue With</Text>

    {/* Social Login Buttons */}
    <View style={styles.socialContainer}>
      <TouchableOpacity style={styles.socialButton}  onPress={handleGoogleSignUp}>
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

    {/* Sign In Link */}
    <View style={styles.signInContainer}>
      <Text style={styles.signInText}>Already have an Account? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInLink}>SIGN IN</Text>
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
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D4ED8',
    borderRadius: 8,
    height: 50,
    marginTop:50,
  },
  signUpButtonText: {
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
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  signInText: {
    fontSize: 14,
    color: '#888',
  },
  signInLink: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
