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

import { getDatabase, ref, set,get } from "firebase/database";

//Kết nối firebase
import { app } from "../components/firebaseConfig";
const db = getDatabase(app);


const imageMapper = {
  "uxfoundation.png": require('../assets/images/uxfoundation.png'),
  "uxresearch.png": require('../assets/images/uxresearch.png'),
  "webdesign.png": require('../assets/images/webdesign.png'),
  "creativeArtDesign.png": require('../assets/images/creativeArtDesign.png'),
  "palettesforyourApp.png": require('../assets/images/palettesforyourApp.png'),
  "TypographyInUIDesign.png": require('../assets/images/TypographyInUIDesign.png'),
  "teacher1.png": require('../assets/images/teacher1.png'),
  "teacher2.png": require('../assets/images/teacher2.png'),
  "teacher3.png": require('../assets/images/teacher3.png'),
};



//Gửi dữ liệu đã tạo lên firebase
// function guiDuLieu(coursesData) {
//   const db = getDatabase(); // Lấy đối tượng database từ Firebase
//   set(ref(db, "coursesData"), coursesData) // Lưu dữ liệu userProfile vào Firebase
//     .then(() => {
//       console.log("Dữ liệu đã được lưu thành công!");
//     })
//     .catch((error) => {
//       console.error("Lỗi khi lưu dữ liệu:", error);
//     });
// }

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

function MyCoursesScreen({ navigation,route }) {
  //Truyền dữ liệu khi load trang
  // useEffect(() => {
  //   guiDuLieu(coursesData); // Truyền dữ liệu userProfile vào hàm
  // }, []);
  const { dataCourse,user } = route.params;
  const [coursesData, setCoursesData] = useState([]); // Khởi tạo là một đối tượng rỗng
  const userId = user?.uid;
  useEffect(() => {
    if (userId) {
      const fetchCoursesData = async () => {
        try {
          // Tạo tham chiếu đến đường dẫn courses của người dùng trong Firebase
          const coursesRef = ref(db, `Users/${userId}/courses`);
          const snapshot = await get(coursesRef);

          if (snapshot.exists()) {
            const rawData = snapshot.val(); // Dữ liệu khóa học từ Firebase
            setCoursesData(rawData); // Lưu dữ liệu vào state
          } else {
            console.log('Không tìm thấy khóa học nào');
          }
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu khóa học từ Firebase:', error);
        } finally {
          setLoading(false); // Đặt trạng thái loading là false sau khi hoàn thành
        }
      };

      fetchCoursesData();
    }
  }, [userId]); // Chạy // Chạy lại useEffect nếu user thay đổi
  

  

  const handleCoursePress = (course) => {
    navigation.navigate('LearningLesson', { course ,dataCourse,user});
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
  

  const [activeTab, setActiveTab] = useState('all');

  // Lọc danh sách khóa học dựa trên tab
  const filteredCourses = coursesData.filter((course) => {
    if (activeTab === 'all') return true; // Hiển thị tất cả
    return course.status === activeTab; // Lọc dựa trên trạng thái
  });

  return (
    <View style={{flex:1,}}>
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

      {/* Tabs */}
      <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('all')}>
            <Text style={[styles.tab, activeTab === 'all' && styles.activeTab]}>
              ALL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('ongoing')}>
            <Text
              style={[
                styles.tab,
                activeTab === 'ongoing' && styles.activeTab,
              ]}
            >
              ON GOING
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('completed')}>
            <Text
              style={[
                styles.tab,
                activeTab === 'completed' && styles.activeTab,
              ]}
            >
              COMPLETED
            </Text>
          </TouchableOpacity>
        </View>

      <FlatList
        data={filteredCourses}
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
        <FooterItem icon={faHome} label="Home" currentPage={currentPage} onPress={() => handleNavigation('Home',{user })} />
        <FooterItem icon={faSearch} label="Search" currentPage={currentPage} onPress={() => handleNavigation('Search', { dataCourse,user })} />
        <FooterItem icon={faBook} label="MyCourse" currentPage={currentPage} onPress={() => handleNavigation('MyCourse', { dataCourse,user })} />
        <FooterItem icon={faUser} label="Profile" currentPage={currentPage} onPress={() => handleNavigation('Profile', { dataCourse,user })} />
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
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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