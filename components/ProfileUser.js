import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const userProfile = {
  name: 'Martha Rosie',
  role: 'UX/UI Designer',
  stats: { saved: 25, ongoing: 24, completed: 98 },
  courses: [
    {
      id: '1',
      title: 'Product Design',
      instructor: 'Dennis Sweeney',
      price: '$190',
      rating: 4.5,
      lessons: 12,
      image: require('../assets/snack-icon.png'),
    },
    {
      id: '2',
      title: 'Website Design',
      instructor: 'Ramono Wultschner',
      price: '$59',
      rating: 4.5,
      lessons: 12,
      image: require('../assets/snack-icon.png'),
    },
    {
      id: '3',
      title: 'Mobile UI Design',
      instructor: 'Ramono Wultschner',
      price: '$320',
      rating: 4.5,
      lessons: 12,
      image: require('../assets/snack-icon.png'),
    },
    {
      id: '4',
      title: 'Digital Portrait',
      instructor: 'Ramono Wultschner',
      price: '$67',
      rating: 4.5,
      lessons: 12,
      image: require('../assets/snack-icon.png'),
    },
  ],
};

const ProfileScreen = () => {
  const renderCourse = ({ item }) => (
    <View style={styles.courseContainer}>
      <Image source={item.image} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseInstructor}>{item.instructor}</Text>
        <Text style={styles.coursePrice}>{item.price}</Text>
        <Text style={styles.courseDetails}>
          ⭐ {item.rating} ({item.lessons} lessons)
        </Text>
      </View>
      <Icon name="bookmark-outline" size={24} color="deepskyblue" />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../assets/snack-icon.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userProfile.name}</Text>
        <Text style={styles.profileRole}>{userProfile.role}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>
            {userProfile.stats.saved} {'\n'}Save
          </Text>
          <Text style={styles.statText}>
            {userProfile.stats.ongoing} {'\n'}On Going
          </Text>
          <Text style={styles.statText}>
            {userProfile.stats.completed} {'\n'}Completed
          </Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Saved courses</Text>
      <FlatList
        data={userProfile.courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.courseList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileRole: {
    color: 'gray',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 15,
  },
  courseList: {
    paddingHorizontal: 15,
  },
  courseContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  courseImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  courseInfo: {
    flex: 1,
    marginLeft: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseInstructor: {
    color: 'gray',
  },
  coursePrice: {
    fontSize: 16,
    color: 'deepskyblue',
    fontWeight: 'bold',
  },
  courseDetails: {
    color: 'gray',
  },
});

export default ProfileScreen;
