import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


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

function ProfileScreen ({route,navigation}) {

  // Lấy dữ liệu khóa học từ route params từ trang HomeScreen
  //
  const { dataCourse } = route.params;
  
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

  
  // State lưu trữ trang hiện tại của ứng dụng
  const [currentPage, setCurrentPage] = useState('Profile'); 
        

  // const handleNavigation = (page) => {
  //   setCurrentPage(page); // Cập nhật trang hiện tại
  //   navigation.navigate(page); // Chuyển hướng
  // };
  const handleNavigation = (page, params = {}) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
    navigation.navigate(page, params); // Chuyển hướng với dữ liệu params
  };
  
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
      <ScrollView  style={{margin:10,padding:10}}>
      <FlatList
        data={userProfile.courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.courseList, { paddingBottom: 80 }]}
      />
      </ScrollView>
     

      <View style={styles.footer}>
        <FooterItem icon={faHome} label="Home" currentPage={currentPage} onPress={() => handleNavigation('Home')} />
        <FooterItem icon={faSearch} label="Search" currentPage={currentPage} onPress={() => handleNavigation('Search', { dataCourse })} />
        <FooterItem icon={faBook} label="MyCourse" currentPage={currentPage} onPress={() => handleNavigation('MyCourse', { dataCourse })} />
        <FooterItem icon={faUser} label="Profile" currentPage={currentPage} onPress={() => handleNavigation('Profile', { dataCourse })} />
      </View>

    </View>
  );
};

const FooterItem = ({ icon, label, currentPage, onPress }) => (
  <TouchableOpacity style={styles.footerItem} onPress={onPress}>
    <FontAwesomeIcon icon={icon} color={currentPage === label ? 'blue' : 'black'}/>
    <Text style={[styles.footerText, currentPage === label && styles.activeFooterText]}>{label}</Text>
  </TouchableOpacity>
);

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

  //footer
  footer: {
    position: 'absolute',  // Đặt footer ở cuối màn hình
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'gray',  // Màu đường viền trên
    paddingVertical: 10,
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 5, // Giảm padding để tiết kiệm không gian
  },
  footerText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2, // Thêm khoảng cách nhỏ giữa icon và text
  },
  activeFooterText: {
    color: 'blue',
    fontWeight: '700',  // Làm đậm thêm văn bản khi chọn
  },

});
export default ProfileScreen;
