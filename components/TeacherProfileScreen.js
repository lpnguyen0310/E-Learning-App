import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';

const teacherProfile = {
  name: 'Sara Weise',
  role: 'UI/UX Designer',
  location: 'New York',
  time: '09:30 AM',
  overview: [
    {
      id: '1',
      title: 'About the Teacher',
      description:
        'Sara Weise is an experienced UI/UX Designer with over 10 years in the industry.',
    },
    {
      id: '2',
      title: 'Experience',
      description: 'Worked with top companies like XYZ and ABC.',
    },
  ],
  courses: [
    {
      category: 'UI/UX Design',
      tag: 'Top-rated',
      items: [
        {
          id: '1',
          title: 'UX Foundation',
          price: '$51',
          rating: 5,
          lessons: 12,
          image: require('../assets/snack-icon.png'),
        },
        {
          id: '2',
          title: 'Mobile App Design',
          price: '$59',
          rating: 4.5,
          lessons: 12,
          image: require('../assets/snack-icon.png'),
        },
      ],
    },
    {
      category: 'Graphic Design',
      items: [
        {
          id: '3',
          title: 'Digital Poster',
          price: '$59',
          rating: 4.5,
          lessons: 12,
          image: require('../assets/snack-icon.png'),
        },
        {
          id: '4',
          title: 'Patterns Design',
          price: '$59',
          rating: 4.5,
          lessons: 12,
          image: require('../assets/snack-icon.png'),
        },
      ],
    },
  ],
  reviews: [
    { id: '1', reviewer: 'John Doe', review: 'Great instructor!', rating: 5 },
    {
      id: '2',
      reviewer: 'Jane Smith',
      review: 'Very detailed and insightful.',
      rating: 4.5,
    },
  ],
};

const TeacherProfileScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Courses');

  const [currentPage, setCurrentPage] = useState('MyCourse'); // State để theo dõi trang hiện tại

  const handleNavigation = (page) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
    navigation.navigate(page); // Chuyển hướng
  };

  const renderContent = () => {
    if (activeTab === 'Overview') {
      return (
        <FlatList
          data={teacherProfile.overview}
          renderItem={({ item }) => (
            <View style={styles.overviewItem}>
              <Text style={styles.overviewTitle}>{item.title}</Text>
              <Text style={styles.overviewDescription}>{item.description}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      );
    } else if (activeTab === 'Courses') {
      return (
        <FlatList
          data={teacherProfile.courses}
          renderItem={renderCourseCategory}
          keyExtractor={(item) => item.category}
          contentContainerStyle={styles.courseCategoriesList}
        />
      );
    } else if (activeTab === 'Review') {
      return (
        <FlatList
          data={teacherProfile.reviews}
          renderItem={({ item }) => (
            <View style={styles.reviewItem}>
              <Text style={styles.reviewer}>{item.reviewer}</Text>
              <Text style={styles.reviewText}>{item.review}</Text>
              <Text style={styles.rating}>Rating: {item.rating}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      );
    }
  };

  const renderCourseCategory = ({ item }) => (
    <View style={styles.courseCategory}>
      <View style={styles.courseCategoryHeader}>
        <Text style={styles.courseCategoryTitle}>{item.category}</Text>
        {item.tag && <Text style={styles.courseCategoryTag}>{item.tag}</Text>}
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={item.items}
        horizontal
        renderItem={renderCourseItem}
        keyExtractor={(course) => course.id}
        contentContainerStyle={styles.courseList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const renderCourseItem = ({ item }) => (
    <View style={styles.courseContainer}>
      <Image source={item.image} style={styles.courseImage} />
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.coursePrice}>{item.price}</Text>
      <Text style={styles.courseDetails}>
        ⭐ {item.rating} ({item.lessons} lessons)
      </Text>
      <Icon
        name="bookmark-outline"
        size={24}
        color="deepskyblue"
        style={styles.bookmarkIcon}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          <Image
            source={require('../assets/snack-icon.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{teacherProfile.name}</Text>
          <Text style={styles.profileRole}>{teacherProfile.role}</Text>
          <Text style={styles.profileLocation}>
            <Icon name="location-outline" size={16} color="gray" />{' '}
            {teacherProfile.location} - {teacherProfile.time}
          </Text>
          <View style={styles.tabMenu}>
            <TouchableOpacity onPress={() => setActiveTab('Overview')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Overview' && styles.activeTab,
                ]}>
                OVERVIEW
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('Courses')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Courses' && styles.activeTab,
                ]}>
                COURSES
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('Review')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Review' && styles.activeTab,
                ]}>
                REVIEW
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentContainer}>{renderContent()}</View>

        <View style={styles.footer}>
          <FooterItem icon={faHome} label="Home" currentPage={currentPage} onPress={() => handleNavigation('Home')} />
          <FooterItem icon={faSearch} label="Search" currentPage={currentPage} onPress={() => handleNavigation('Search')} />
          <FooterItem icon={faBook} label="MyCourse" currentPage={currentPage} onPress={() => handleNavigation('MyCourse')} />
          <FooterItem icon={faUser} label="Profile" currentPage={currentPage} onPress={() => handleNavigation('Profile')} />
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
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
  profileLocation: {
    color: 'gray',
    marginVertical: 10,
  },
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTab: {
    color: 'deepskyblue',
    borderBottomWidth: 2,
    borderBottomColor: 'deepskyblue',
    paddingBottom: 5,
  },
  courseCategoriesList: {
    paddingHorizontal: 15,
  },
  courseCategory: {
    marginBottom: 20,
  },
  courseCategoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  courseCategoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseCategoryTag: {
    backgroundColor: 'deepskyblue',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginLeft: 10,
  },
  viewAllText: {
    color: 'deepskyblue',
  },
  courseList: {
    paddingVertical: 10,
  },
  courseContainer: {
    width: 150,
    marginRight: 15,
  },
  courseImage: {
    width: '100%',
    height: 80,
    borderRadius: 10,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  coursePrice: {
    color: 'deepskyblue',
    fontWeight: 'bold',
  },
  courseDetails: {
    color: 'gray',
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
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

export default TeacherProfileScreen;
