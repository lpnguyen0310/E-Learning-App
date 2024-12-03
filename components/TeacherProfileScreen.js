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
import { faBookmark,faStar } from '@fortawesome/free-regular-svg-icons';
const teacherProfile = {
  name: 'Sara Weise',
  role: 'UI/UX Designer',
  location: 'New York',
  time: '09:30 AM',
  image: require('../assets/images/teacher1.png'),
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
          image: require('../assets/images/uix.png'),
        },
        {
          id: '2',
          title: 'Mobile App Design',
          price: '$59',
          rating: 4.5,
          lessons: 12,
          image: require('../assets/images/mobieUiDesign.png'),
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
          image: require('../assets/images/digitalPoster.png'),
        },
        {
          id: '4',
          title: 'Patterns Design',
          price: '$59',
          rating: 4.5,
          lessons: 12,
          image: require('../assets/images/patternDesign.png'),
        },
      ],
    },
  ],
  reviews: [
    { id: '1', reviewer: 'John Doe', review: 'Great instructor, very engaging and clear.', rating: 5 },
    {
      id: '2',
      reviewer: 'Jane Smith',
      review: 'Very detailed and insightful, helped me a lot with my project.',
      rating: 4.5,
    },
    { 
      id: '3', 
      reviewer: 'Alice Brown', 
      review: 'The course was okay, but could use more examples.', 
      rating: 4 
    },
    {
      id: '4',
      reviewer: 'Bob Johnson',
      review: 'The explanations were too fast, could improve pacing.', 
      rating: 3,
    },
    { 
      id: '5', 
      reviewer: 'Charlie White', 
      review: 'Fantastic course! I learned so much and the instructor was great!', 
      rating: 5 
    },
    {
      id: '6',
      reviewer: 'Diana Green',
      review: 'Good course but I expected more depth in the topics.',
      rating: 4,
    },
  ],  
};

const TeacherProfileScreen = ({route}) => {
  const navigation = useNavigation();
  const { teacher, dataCourse, user } = route.params; 
  const [activeTab, setActiveTab] = useState('Courses');

  const [currentPage, setCurrentPage] = useState('MyCourse'); // State để theo dõi trang hiện tại

  const handleNavigation = (page) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
    navigation.navigate(page); // Chuyển hướng
  };

  const [selectedRating, setSelectedRating] = useState('All');
  // Hàm lọc review theo rating
  const filteredReviews = teacherProfile.reviews.filter((review) => {
    if (selectedRating === 'All') {
      return true; // Hiển thị tất cả review nếu không có rating nào được chọn
    }
    return review.rating === selectedRating;  // Lọc review theo rating
  });

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
        <View>
          
          <FlatList
            data={filteredReviews}  // Sử dụng filteredReviews đã lọc
            renderItem={renderReview}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.reviewList}
          />
        </View>
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

  const renderReview = ({ item }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <FontAwesomeIcon icon={faUser} size={20} color="gray" />
        <View style={styles.reviewInfo}>
          <Text style={styles.reviewerName}>{item.reviewer}</Text>
          {/* Hiển thị ngày tháng */}
          <Text style={styles.reviewDate}>Date: {item.date}</Text>
        </View>
        <View style={styles.starsContainer}>
          {/* Hiển thị sao */}
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              color={index < item.rating ? 'gold' : 'gray'}
              size={16}
            />
          ))}
        </View>
      </View>
      <Text style={styles.reviewText}>{item.review}</Text>
    </View>
  );
  
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          <Image
            source={teacher.image}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{teacher.title}</Text>
          <Text style={styles.profileRole}>{teacher.course}</Text>
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

  // Xử lý rating

  review_rating:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
  },
  inner_review_rating_left:{
    flexDirection:'row',
    alignItems:'center',
    gap: '0 5px',
  },
  rating_list:{
    flexDirection:'row',
    justifyContent:'space-around',
    width:'100%', 

  },
  button_rating:{
    flexDirection:'row',
    border: '1px solid aqua',
    gap: '0 8px',
    padding:8,
    borderRadius:15,
    justifyContent:'space-around',
    alignItems:'center',
  },
  // End Xử lý rating

  // Xử lý review
  review_list_container:{
    width:'100%',
    padding:10,

    },
    reviewContainer: {
      backgroundColor: '#f9f9f9',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    reviewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    reviewInfo: {
      marginLeft: 10,
    },
    reviewerName: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    reviewDate: {
      color: 'gray',
      fontSize: 12,
    },
    starsContainer: {
      flexDirection: 'row',
      marginLeft: 'auto',
    },
    reviewText: {
      color: '#444',
      marginTop: 10,
      fontSize: 14,
    },
  
    // Có thể bạn muốn có thêm phần chỉnh sửa/ xóa review
    reviewList: {
      paddingBottom: 20,
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
