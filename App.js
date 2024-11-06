import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Import các màn hình của bạn
import ProfileScreen from './components/ProfileUser';
import TeacherProfileScreen from './components/TeacherProfileScreen';
import MyCoursesScreen from './components/MyCourses_Chua_Xong';
import LearningLesson from './components/Learning_Lesson_Project_Q&A';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="TeacherProfile"
        component={TeacherProfileScreen}
        options={{ title: "Teacher Profile" }}
      />
       <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{ title: "User's Profile" }}
      />
      <Stack.Screen
        name="MyCourses"
        component={MyCoursesScreen}
        options={{ title: "My Courses" }}
      />
       <Stack.Screen
        name="LearningLesson"
        component={LearningLesson}
        options={{ headerShown: false }} // Ẩn header cho màn hình LearningLesson
      />
       
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home-outline';
              else if (route.name === 'Search') iconName = 'search-outline';
              else if (route.name === 'My Courses') iconName = 'book-outline';
              else if (route.name === 'Profile') iconName = 'person-outline';
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#00BFFF',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={AppStack}  options={{ title: 'Home', headerShown: false }} />
          <Tab.Screen name="Search" component={MyCoursesScreen} options={{ title: 'Search' }} />
          <Tab.Screen name="My Courses" component={MyCoursesScreen} options={{ title: 'My Courses' }} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
