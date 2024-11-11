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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}> 
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={LandingPage} />
        <Stack.Screen name="Search" component={SearchScreen} />
        {/* <Stack.Screen name="CourseDetail" component={CourseDetail} /> */}
        <Stack.Screen name="Profile" component={ProfileUser} />
        <Stack.Screen name="MyCourse" component={MyCourse} />
        <Stack.Screen name="Lession" component={lession} />
        <Stack.Screen name="TeacherProfile" component={TeacherProfile} />
        <Stack.Screen name="LearningLesson" component={LearningLesson} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;