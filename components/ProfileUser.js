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

import { getDatabase, ref, set,get } from "firebase/database";

//Kết nối firebase
import { app } from "../components/firebaseConfig";
const db = getDatabase(app);

// const userProfile = {
//   name: 'Martha Rosie',
//   role: 'UX/UI Designer',
//   stats: { saved: 25, ongoing: 24, completed: 98 },
//   image: "User1.png", // Lưu tên tệp hoặc URL thay vì require()
//   courses: [
//     {
//       id: '1',
//       title: 'Product Design',
//       instructor: 'Dennis Sweeney',
//       price: '$190',
//       rating: 4.5,
//       lessons: 12,
//       saved: true,
//       image: "productDesign.png", // Lưu tên tệp
//     },
//     {
//       id: '2',
//       title: 'Website Design',
//       instructor: 'Ramono Wultschner',
//       price: '$59',
//       rating: 4.5,
//       lessons: 12,
//       saved: true,
//       image: "webdesign.png", // Lưu tên tệp
//     },
//     {
//       id: '3',
//       title: 'Mobile UI Design',
//       instructor: 'Ramono Wultschner',
//       price: '$320',
//       rating: 4.5,
//       lessons: 12,
//       saved: true,
//       image: "mobieUiDesign.png", // Lưu tên tệp
//     },
//     {
//       id: '4',
//       title: 'Digital Portrait',
//       instructor: 'Ramono Wultschner',
//       price: '$67',
//       rating: 4.5,
//       lessons: 12,
//       saved: true,
//       image: "digitalportrait.png", // Lưu tên tệp
//     },
//   ],
// };

// Gửi dữ liệu đã tạo lên firebase
// function guiDuLieu(userProfile) {
//   const db = getDatabase(); // Lấy đối tượng database từ Firebase
//   set(ref(db, "userProfile"), userProfile) // Lưu dữ liệu userProfile vào Firebase
//     .then(() => {
//       console.log("Dữ liệu đã được lưu thành công!");
//     })
//     .catch((error) => {
//       console.error("Lỗi khi lưu dữ liệu:", error);
//     });
// }

const imageMapper = {
  "productDesign.png": require("../assets/images/productDesign.png"),
  "webdesign.png": require("../assets/images/webdesign.png"),
  "mobieUiDesign.png": require("../assets/images/mobieUiDesign.png"),
  "digitalportrait.png": require("../assets/images/digitalportrait.png"),
  "User1.png": require("../assets/images/User1.png"),
};

function ProfileScreen ({route,navigation}) {
//Truyền dữ liệu khi load trang
  // useEffect(() => {
  //   guiDuLieu(userProfile); // Truyền dữ liệu userProfile vào hàm
  // }, []);
  
  // Lấy dữ liệu khóa học từ route params từ trang HomeScreen
  //
  const { dataCourse,user } = route.params;
  const [userProfile, setUserProfile] = useState(user); // Khởi tạo là một đối tượng rỗng
  const [followCourses, setfollowCourses] = useState([]); // Khởi tạo danh sách khóa học là mảng rỗng
  console.log("Dữ liệu UserID", user.uid);
    // Tính toán số lượng khóa học đã lưu, ongoing, completed
  const savedCount = followCourses.length;  // Số khóa học đã lưu
  const ongoingCount = Object.values(userProfile.courses || {}).filter(course => course.status === 'ongoing').length; // Số khóa học đang diễn ra
  const completedCount = Object.values(userProfile.courses || {}).filter(course => course.status === 'completed').length; // Số khóa học đã hoàn thành

  useEffect(() => {
    const fetchFollowCourses = async () => {
      try {
        const userProfileRef = ref(db, `Users/users/${user.uid}/followCourses`);
        const snapshot = await get(userProfileRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setfollowCourses(data);  // Cập nhật lại danh sách khóa học
          console.log("Dữ liệu followCourses ProfileUser:", data);
        }
      } catch (error) {
        console.error("Error fetching followCourses:", error);
      }
    };
  
    fetchFollowCourses();
  }, [user.uid]); // Chỉ khi user.uid thay đổi mới fetch lại
  
  

  // if (!userProfile || courses.length === 0) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text>Đang tải dữ liệu...</Text>
  //     </View>
  //   );
  // }
  
  // const toggleSaveCourse = (id) => {  
  //   const updatedCourses = courses.map((course) => {
  //     if (course.id === id) {
  //       return { ...course, saved: !course.saved }; // Thay đổi trạng thái saved
  //     }
  //     return course;
  //   });
  //   setCourses(updatedCourses.filter((course) => course.saved)); // Chỉ hiển thị các khóa học được lưu
  // };
  const toggleSaveCourse = async (id) => {
    try {
      // Kiểm tra khóa học có trong danh sách followCourses hay không
      const isSaved = followCourses.some(course => course.id === id);
  
      let updatedCourses = [];
      if (isSaved) {
        // Nếu khóa học đã có trong followCourses, thì cần xóa nó
        updatedCourses = followCourses.filter(course => course.id !== id);
      } else {
        // Nếu khóa học chưa có, thì thêm vào danh sách followCourses
        const courseToAdd = dataCourse.find(course => course.id === id);
        updatedCourses = [...followCourses, courseToAdd];
      }
  
      // Cập nhật lại state followCourses
      setfollowCourses(updatedCourses);
  
      // Cập nhật lại followCourses lên Firebase
      const userProfileRef = ref(db, `Users/users/${user.uid}/followCourses`);
      await set(userProfileRef, updatedCourses);
  
      console.log("Updated followCourses:", updatedCourses);
    } catch (error) {
      console.error("Error updating followCourses:", error);
    }
  };
  
  
  
  

  const renderCourse = ({ item }) => {
    if (!item) {
      console.log("Lỗi: Dữ liệu item không đúng:", item);
      return null; // Bỏ qua nếu `item` không tồn tại hoặc không có `saved`
    }
  
    return (
      <View style={styles.courseContainer}>
        <Image source={item.image} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.courseInstructor}>{item.teacher}</Text>
          <Text style={styles.coursePrice}>{item.price}</Text>
          <Text style={styles.courseDetails}>
            ⭐ {item.rating} ({item.lessons} lessons)
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleSaveCourse(item.id)}>
          <Icon
            name="bookmark"
            size={24}
            color="deepskyblue"
          />
        </TouchableOpacity>
      </View>
    );
  };
  
  
  


  
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

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>User's profile</Text>
        <Icon name="ellipsis-vertical" size={24} color="#000" /> {/* Đổi thành ellipsis-vertical */}
      </View>


      <View style={styles.profileHeader}>
        <Image
          source={(userProfile.image)}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userProfile.name}</Text>
        <Text style={styles.profileRole}>{userProfile.role}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>
            {savedCount} {'\n'}Save
          </Text>
          <Text style={styles.statText}>
            {ongoingCount} {'\n'}On Going
          </Text>
          <Text style={styles.statText}>
            {completedCount} {'\n'}Completed
          </Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Saved courses</Text>
      <ScrollView  style={{margin:10,padding:10}}>
      <FlatList
        data={followCourses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.courseList, { paddingBottom: 80 }]}
      />
      </ScrollView>

      <View style={styles.footer}>
        <FooterItem icon={faHome} label="Home" currentPage={currentPage} onPress={() => handleNavigation('Home',{user})} />
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
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Cho phép tiêu đề chiếm không gian giữa
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
export default ProfileScreen;