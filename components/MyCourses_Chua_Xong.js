import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';
// Dữ liệu mẫu cho danh sách khóa học
const coursesData = [
  {
    id: '1',
    title: 'UX Foundation',
    time: '2 hrs 25 mins',
    progress: 0.3,
    image: require('../assets/images/uxfoundation.png'),
    lessons: [
      {
        module: 'I - Introduction',
        lessons: [
          {
            id: '01',
            title: 'Amet adipiscing consectetur',
            duration: '01:23 mins',
          },
          {
            id: '02',
            title: 'Culpa est incididunt enim id adi',
            duration: '01:23 mins',
          },
        ],
      },
      // Các module khác
      {
        module: 'II - Introduction',
        lessons: [
          {
            id: '01',
            title: 'Amet adipiscing consectetur',
            duration: '01:23 mins',
          },
          {
            id: '02',
            title: 'Culpa est incididunt enim id adi',
            duration: '01:23 mins',
          },
        ],
      },
      {
        module: 'III - Introduction',
        lessons: [
          {
            id: '01',
            title: 'Amet adipiscing consectetur',
            duration: '01:23 mins',
          },
          {
            id: '02',
            title: 'Culpa est incididunt enim id adi',
            duration: '01:23 mins',
          },
        ],
      },
      {
        module: 'IV - Introduction',
        lessons: [
          {
            id: '01',
            title: 'Amet adipiscing consectetur',
            duration: '01:23 mins',
          },
          {
            id: '02',
            title: 'Culpa est incididunt enim id adi',
            duration: '01:23 mins',
          },
        ],
      },
    ],
    projects: {
      studentProjects: [
        {
          id: '1',
          title: 'Wireframe',
          author: 'Ramono Wultschner',
          image: require('../assets/images/uxfoundation.png'),
        },
        {
          id: '2',
          title: 'Personal',
          author: 'Thomas Carlson',
          image: require('../assets/images/uxresearch.png'),
        },
        {
          id: '3',
          title: 'Website Redesign',
          author: 'Ramon Wultschner',
          image: require('../assets/images/webdesign.png'),
        },
        {
          id: '4',
          title: 'Wireframe',
          author: 'Ramono Wultschner',
          image: require('../assets/images/uxfoundation.png'),
        },
        {
          id: '5',
          title: 'Personal',
          author: 'Thomas Carlson',
          image: require('../assets/images/uxresearch.png'),
        },
        {
          id: '6',
          title: 'Website Redesign',
          author: 'Ramon Wultschner',
          image: require('../assets/images/webdesign.png'),
        },
        {
          id: '7',
          title: 'Wireframe',
          author: 'Ramono Wultschner',
          image: require('../assets/images/uxfoundation.png'),
        },
        {
          id: '8',
          title: 'Personal',
          author: 'Thomas Carlson',
          image: require('../assets/images/uxresearch.png'),
        },
        {
          id: '9',
          title: 'Website Redesign',
          author: 'Ramon Wultschner',
          image: require('../assets/images/webdesign.png'),
        },
        {
          id: '10',
          title: 'Wireframe',
          author: 'Ramono Wultschner',
          image: require('../assets/images/uxfoundation.png'),
        },
        {
          id: '11',
          title: 'Personal',
          author: 'Thomas Carlson',
          image: require('../assets/images/uxresearch.png'),
        },
        {
          id: '12',
          title: 'Website Redesign',
          author: 'Ramon Wultschner',
          image: require('../assets/images/webdesign.png'),
        },
      ],
      description:
        'Culpa aliquip commodo incididunt nostrud aliqua ut adipisicing officia. Laborum consequat ea reprehenderit voluptate voluptate quis pariatur dolor. Laboris proident ea fugiat nulla...',
      resources: [
        {
          id: '1',
          name: 'Document 1.txt',
          size: '612 Kb',
          type: '.txt',
          downloadLink: 'link_to_document_1',
        },
        {
          id: '2',
          name: 'Document 2.pdf',
          size: '35 Mb',
          type: '.pdf',
          downloadLink: 'link_to_document_2',
        },
      ],
    },

    qna: [
      {
        id: '1',
        user: 'Jane Barry',
        avatar: require('../assets/images/teacher1.png'), // Đường dẫn đến ảnh đại diện
        time: 'A day ago',
        content:
          'Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est',
        likes: 23,
        comments: 5,
      },
      {
        id: '2',
        user: 'Thomas',
        avatar: require('../assets/images/teacher2.png'), // Đường dẫn đến ảnh đại diện
        time: 'A day ago',
        content:
          'Excepteur excepteur minim nostrud cillum nostrud dolore voluptate ex minim est.',
        likes: 15,
        comments: 3,
      },
      {
        id: '3',
        user: 'Jenny Barry',
        avatar: require('../assets/images/teacher3.png'), // Đường dẫn đến ảnh đại diện
        time: 'A day ago',
        content:
          'Minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est.',
        likes: 18,
        comments: 2,
      },
      // Thêm nhiều câu hỏi hơn nếu cần
    ],
  },
  {
    id: '2',
    title: 'Creative Art Design',
    time: '3 hrs 25 mins',
    progress: 0.7,
    image: require('../assets/images/creativeArtDesign.png'),
    lessons: [
      // Dữ liệu bài học cho "Palettes for Your App"
    ],
    qna: [
      // Dữ liệu Q&A cho "Palettes for Your App"
    ],
  },
  {
    id: '3',
    title: 'Palettes for Your App',
    time: '4 hrs 50 mins',
    progress: 1,
    image: require('../assets/images/palettesforyourApp.png'),
    lessons: [
      // Dữ liệu bài học cho "Palettes for Your App"
    ],
    qna: [
      // Dữ liệu Q&A cho "Palettes for Your App"
    ],
  },
  {
    id: '4',
    title: 'Typography in UI Design',
    time: '4 hrs 50 mins',
    progress: 0.5,
    image: require('../assets/images/TypographyInUIDesign.png'),
    lessons: [
      // Dữ liệu bài học cho "Typography in UI Design"
    ],
    qna: [
      // Dữ liệu Q&A cho "Typography in UI Design"
    ],
  },
  // Add more course data as needed
];

// Thành phần khóa học
const CourseItem = ({ title, time, progress, image, item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={styles.courseItem}>
      <Image source={image} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.courseTime}>{time}</Text>
        <Progress.Bar progress={progress} width={270} color="#00BFFF" />
        <Text style={styles.courseProgress}>{`${Math.round(
          progress * 100
        )}% Complete`}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const MyCoursesScreen = ({ navigation,route }) => {

  const { dataCourse } = route.params;

  const handleCoursePress = (course) => {
    navigation.navigate('LearningLesson', { course ,dataCourse});
  };
 
 
  const [currentPage, setCurrentPage] = useState('MyCourse'); // State để theo dõi trang hiện tại


  // const handleNavigation = (page) => {
  //   setCurrentPage(page); // Cập nhật trang hiện tại
  //   navigation.navigate(page); // Chuyển hướng
  // };
  const handleNavigation = (page, params = {}) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
    navigation.navigate(page, params); // Chuyển hướng với dữ liệu params
  };
  
  return (
    <View>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>My Courses</Text>
        </View>


        <View style={styles.banner}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerText}>Courses that boost <br></br> your career!</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Check Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../assets/images/teacher1_khong_nen.png')} // Đảm bảo đúng đường dẫn tới ảnh của bạn
            style={styles.bannerImage}
          />
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity>
            <Text style={[styles.tab, styles.activeTab]}>ALL</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.tab}>ON GOING</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.tab}>COMPLETED</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={coursesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseItem
              title={item.title}
              time={item.time}
              progress={item.progress}
              image={item.image}
              item={item}
              onPress={handleCoursePress} // Truyền hàm handleCoursePress vào đây
            />
          )}
          contentContainerStyle={[styles.courseList, { paddingBottom: 80 }]}
        />
      </View>
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
    marginHorizontal:10,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Cho phép tiêu đề chiếm không gian giữa
  },
  banner: {
    backgroundColor: '#8A2BE2', 
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    height: 230,
    marginBottom: 20,
  },
  bannerTextContainer: {
    flex: 1,
    paddingRight: 10, 
  },
  bannerText: {
    color: '#00D3FF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bannerButton: {
    backgroundColor: '#00C4FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bannerImage: {
    width: 200,   // Tăng kích thước ảnh nếu cần để chạm đáy
    height: 200,  // Tăng chiều cao để đảm bảo ảnh chạm tới đáy
    position: 'absolute',
    bottom: 0, 
    right: 0,
    resizeMode: 'cover',  // Thử với cover để ảnh chiếm toàn bộ chiều cao
  },
  
  
  
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    color: 'gray',
  },
  activeTab: {
    color: '#00BFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#00BFFF',
    paddingBottom: 4,
  },
  courseList: {
    paddingBottom: 20,
  },
  courseItem: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 15,
  },
  courseImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseTime: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  courseProgress: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },

  
  //footer
  footer: {
    position: 'absolute',  // Đặt footer ở cuối màn hình
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
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

export default MyCoursesScreen;