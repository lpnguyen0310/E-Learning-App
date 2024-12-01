import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from '../components/Home';
import SearchScreen from '../components/SearchScreen';
import CourseDetail from '../components/CourseDetail';
import ProfileUser from '../components/ProfileUser';
import MyCourse from '../components/MyCourses_Chua_Xong';
import lession from '../components/Learning_Lesson_Project_Q&A';
import TeacherProfile from '../components/TeacherProfileScreen';
import LearningLesson from '../components/Learning_Lesson_Project_Q&A'
import LoginScreen from '../components/Login'; // Import LoginScreen
import RegisterScreen from '../components/Register'; // Import RegisterScreen
import MentorsScreen from '../components/MentorsScreen';

import Category from '../components/Category';
import Filter from '../components/FilterScreen';
import CourseList from '../components/CourseList';

import ForgotPassword from '../components/ForgotPassword';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}> 
      <Stack.Navigator initialRouteName="Login">

      <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Ẩn tiêu đề cho Login
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} // Ẩn tiêu đề cho Register
        />

        <Stack.Screen name="Home" component={LandingPage} 
        options={{ headerShown: false }}
        />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="CourseDetail" component={CourseDetail} /> 
        <Stack.Screen name="Profile" component={ProfileUser} 
        options={{ headerShown: false }} // Ẩn tiêu đề cho LearningLesson
        />
        <Stack.Screen name="MyCourse" component={MyCourse} 
          options={{ headerShown: false }} // Ẩn tiêu đề cho LearningLesson
        />
        <Stack.Screen name="Lession" component={lession} />
        <Stack.Screen name="TeacherProfile" component={TeacherProfile} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Filter" component={Filter} />
        <Stack.Screen name="CourseList" component={CourseList} />
        <Stack.Screen name="LearningLesson" component={LearningLesson} 
          options={{ headerShown: false }} // Ẩn tiêu đề cho LearningLesson
        />
        <Stack.Screen name="Mentors" component={MentorsScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} 
          options={{ headerShown: false }} // Ẩn tiêu đề cho ForgotPassword
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
  
};

export default App;