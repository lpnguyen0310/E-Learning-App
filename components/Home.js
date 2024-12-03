import { StyleSheet, Text, View,ImageBackground,TouchableOpacity,FlatList,Image,ScrollView } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBookmark,faStar } from '@fortawesome/free-regular-svg-icons';
import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState,useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
// import { getDatabase, ref, get } from 'firebase/database'; 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';


import { getDatabase, ref, set,get } from "firebase/database";

//Kết nối firebase
import { app } from "../components/firebaseConfig";
const db = getDatabase(app);




  function LandingPage({route, navigation }) {

    const[dataCourse,setDataCourse] = useState([]);
  const user = route.params?.user; // Nhận thông tin người dùng từ navigation
  const userName = user?.name || 'User'; // Sử dụng tên hoặc 'User' nếu không có
  console.log("User ID in Home:", user?.uid);  // Truyền user.uid
  console.log("Full user data:", user);

  const [userProfile, setUserProfile] = useState(); // Khởi tạo là một đối tượng rỗng
  const [followCourses, setfollowCourses] = useState(); // Khởi tạo danh sách khóa học là mảng rỗng

  const isFocused = useIsFocused(); // Kiểm tra trạng thái focus của màn hình

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfileRef = ref(db, `Users/users/${user.uid}`);
      try {
        const snapshot = await get(userProfileRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const getFollowCourses = data.followCourses || [];
          setUserProfile(data);
          setfollowCourses(getFollowCourses); // Cập nhật danh sách khóa học từ Firebase
          console.log("Dữ liệu followCourses cập nhật:", getFollowCourses);
        } else {
          console.error("Không tìm thấy dữ liệu userProfile.");
          setfollowCourses([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ Firebase:", error);
      }
    };

    if (isFocused) {
      fetchUserProfile(); // Gọi hàm khi màn hình được focus
    }
  }, [isFocused]); // Gọi lại khi trạng thái focus thay đổi

  //Xử lí add dữ liệu vào followCourses
  const handleBookmark = async (course) => {
    try {
      const isBookmarked = followCourses.some(
        (followedCourse) => followedCourse.id === course.id
      );
  
      let updatedFollowCourses;
  
      if (isBookmarked) {
        updatedFollowCourses = followCourses.filter(
          (followedCourse) => followedCourse.id !== course.id
        );
      } else {
        updatedFollowCourses = [...followCourses, course];
      }
  
      setfollowCourses(updatedFollowCourses);
  
      // Đồng bộ với Firebase
      const userProfileRef = ref(db, `Users/users/${user.uid}/followCourses`);
      await set(userProfileRef, updatedFollowCourses);
    } catch (error) {
      console.error("Error updating followCourses:", error);
    }
  };


    const categories = [
      { id: '1', image :require('../assets/images/business.png') , title: 'Business' },
      { id: '2',image :require('../assets/images/Code.png'), title: 'Code' },
      { id: '3',image :require('../assets/images/movie.png'), title: 'Movie' },
      { id: '4',image :require('../assets/images/design.png'), title: 'Design' },
      { id: '5',image :require('../assets/images/writing.png'), title: 'Writing' },
      { id: '6',image :require('../assets/images/language.png'), title: 'Language' },
    ];

    const navigateToCategory = (category) => {
      navigation.navigate('Search', { category , dataCourse,isFromCategory: true ,user });
    };

    const handleViewAllPress = () => {
      navigation.navigate('Category', { dataCourse: dataCourse,user  });
    };

    

    const renderCategoryItem  = ({ item }) => (
      <View style={styles.item}>
        <TouchableOpacity style={styles.categoryItem}   onPress={() => navigateToCategory(item.title)} >
              <Image source={item.image} style={{width: 40, height: 40, borderRadius: 8, objectFit: "cover"}}/>
              <Text style={styles.categoryText}>{item.title}</Text>
        </TouchableOpacity>
      </View> 
    );

    useEffect(() => {
      // Fetch courses from Realtime Database on component mount
      const fetchCourses = async () => {
        try {
          const coursesRef = ref(db, 'data'); // Tham chiếu đến đường dẫn 'dataCourse' trong Realtime Database
          const snapshot = await get(coursesRef); // Lấy dữ liệu từ đường dẫn này

          if (snapshot.exists()) {
            // Nếu dữ liệu tồn tại, lưu vào state
            const coursesData = snapshot.val();
            setDataCourse(Object.values(coursesData)); // Convert object thành array nếu cần
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error("Error fetching courses: ", error);
        }
      };
      fetchCourses(); // Gọi hàm để lấy dữ liệu khóa học
    }, []); // Mảng phụ thuộc rỗng đảm bảo chỉ chạy một lần khi component mount

    // Phân loại khóa học
    const categorizedCourses = dataCourse.reduce((acc, course) => {
      const { type } = course; // Lấy loại khóa học từ từng course

      // Kiểm tra xem loại khóa học đã tồn tại trong accumulator chưa, nếu chưa thì khởi tạo một mảng trống
      if (!acc[type]) {
        acc[type] = [];
      }

      // Thêm khóa học vào danh sách tương ứng
      acc[type].push(course);

      return acc;
    }, {});

    const popularCourse = categorizedCourses['Popular'] || [];
    const recommendCourse = categorizedCourses['Recommend'] || [];
    const inspireCourse = categorizedCourses['Inspire'] || [];
    
    const navigateToCourses = (categoryType) => {
      let courses = [];
    
      if (categoryType === 'Popular') {
        courses = popularCourse;
        categoryType = 'Popular Courses';
      } else if (categoryType === 'Recommend') {
        courses = recommendCourse;
        categoryType = 'Recommended Courses';

      } else if (categoryType === 'Inspire') {
        courses = inspireCourse;
        categoryType = 'Inspiring Courses';

      }
      
      // Điều hướng tới màn hình CourseList với danh sách khóa học
      navigation.navigate('CourseList', { user,courses,categoryType ,dataCourse: dataCourse });
    };


  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => navigation.navigate("CourseDetail", { course: item, dataCourse,user })}
    >
      <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.courseImage} />
        {item.bestSeller && (
          <View style={styles.bestSellerBadge}>
            <Text style={styles.bestSellerText}>Best Seller</Text>
          </View>
        )}
      </View>
      <View style={styles.courseInfo}>
        <View style={styles.course_title_container}>
          <Text style={styles.courseTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <TouchableOpacity onPress={() => handleBookmark(item)}>
            <FontAwesomeIcon
              icon={faBookmark}
              style={{
                color: followCourses.some((course) => course.id === item.id)
                  ? "blue" // Nếu đã bookmark, đổi màu
                  : "gray", // Nếu chưa bookmark, màu xám
              }}
            />
          </TouchableOpacity>
        </View>
  
        <Text style={styles.courseTeacher}>By {item.teacher}</Text>
        <Text style={styles.coursePrice}>{item.price}</Text>
        <View style={styles.course_rating}>
          <FontAwesomeIcon icon={faStar} />
          <Text style={styles.courseRating}> {item.rating}</Text>

          <Text style={{ color: "grey", marginLeft: 5, marginRight: 5 }}>.</Text>
          <Text style={styles.courseLessons}>{item.lessons}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const CourseRecommentItem = ({ item }) => (
   
    <TouchableOpacity style={styles.courseItem} onPress={() => navigation.navigate('CourseDetail', { course: item,dataCourse: dataCourse,user  })}>
      {item.bestSeller && (
            <View style={styles.bestSellerBadge}>
                <Text style={styles.bestSellerText}>Best Seller</Text>
            </View>
        )}
        {/* Hiển thị giảm giá nếu có */}
        {item.discount && (
            <View style={styles.discountBadge}>
                <Text style={styles.discountText}>20% OFF</Text>
            </View>
        )}
      <Image source={{ uri: item.image }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <View style ={styles.course_title_container}> 
          <Text style={styles.courseTitle} numberOfLines={1} ellipsizeMode="tail"> {item.title}</Text>
          <TouchableOpacity onPress={() => handleBookmark(item)}>
            <FontAwesomeIcon
              icon={faBookmark}
              style={{
                color: followCourses.some((course) => course.id === item.id)
                  ? "blue" // Nếu đã bookmark, đổi màu
                  : "gray", // Nếu chưa bookmark, màu xám
              }}
            />
          </TouchableOpacity>
        </View>
       
        <Text style={styles.courseTeacher}>By {item.teacher}</Text>
        <Text style={styles.coursePrice}>{item.price}</Text>
        <View style ={styles.course_rating}>
          <FontAwesomeIcon icon={faStar} />
          <Text style={styles.courseRating}> {item.rating}</Text>
          <Text style={{color:"grey",marginLeft:5,marginRight:5}}>.</Text>
          <Text style={styles.courseLessons}>{item.lessons}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const CourseInspireItem = ({ item }) => (
    <TouchableOpacity style={styles.courseItemInpire} onPress={() => navigation.navigate('CourseDetail', { course: item,dataCourse: dataCourse,user  })}>
      <Image source={{uri: item.image}} style={styles.courseInpireImage} />
      <View style={styles.courseInspireInfo}>
        <View style ={styles.courseinspire_title_container}> 
          <Text style={styles.courseTitleInspire}> {item.title}</Text>
          <TouchableOpacity onPress={() => handleBookmark(item)}>
            <FontAwesomeIcon
              icon={faBookmark}
              style={{
                color: followCourses.some((course) => course.id === item.id)
                  ? "blue" // Nếu đã bookmark, đổi màu
                  : "gray", // Nếu chưa bookmark, màu xám
              }}
            />
          </TouchableOpacity>
        </View>
       
        <Text style={styles.courseTeacher}>{item.teacher}</Text>
        <Text style={styles.coursePrice}>{item.price}</Text>
        <View style ={styles.course_rating}>
          <FontAwesomeIcon icon={faStar} />
          <Text style={styles.courseRating}> {item.rating}</Text>
          <Text style={{color:"grey",marginLeft:5,marginRight:5}}>.</Text>
          <Text style={styles.courseLessons}>{item.lessons}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );


  const topTeachers = [
    {
      id: '1',
      title: 'Chiristian Hayes',
      university: "University of California",
      rating: '4.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher1.png'),
      course: '3D Modeling',
    },
    {
      id: '2',
      title: 'Deniss Sweeneys',
      university: "University of California",
      rating: '4.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher2.png'),
      course: '3D Animation',
    },
    {
      id: '3',
      title: 'Nancy Sweeneys',
      university: "University of California",
      rating: '3.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher3.png'),
      course: '3D Printing',
    },
    {
      id: '4',
      title: 'Linda Sweeneys',
      university: "University of California",
      rating: '4.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher4.png'),
      course: '3D Rendering',
    },
    {
      id: '5',
      title: 'Chiristian Hayes',
      university: "University of California",
      rating: '4.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher1.png'),
      course: '3D Modeling',
    },
    {
      id: '6',
      title: 'Deniss Sweeneys',
      university: "University of California",
      rating: '4.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher2.png'),
      course: '3D Animation',
    },
    {
      id: '7',
      title: 'Nancy Sweeneys',
      university: "University of California",
      rating: '3.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher3.png'),
      course: '3D Printing',
    },
    {
      id: '8',
      title: 'Linda Sweeneys',
      university: "University of California",
      rating: '4.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher4.png'),
      course: '3D Rendering',
    },
    {
      id: '9',
      title: 'Linda Sweeneys',
      university: "University of California",
      rating: '4.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher4.png'),
      course: '3D Visualization',
    },
  ];


  const topTeachersItem = ({ item }) => (
    <TouchableOpacity style={styles.courseItem} onPress={() => navigation.navigate('TeacherProfile', { teacher: item,dataCourse: dataCourse,user  })}>
      <Image source={item.image} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <View style ={styles.course_title_container}> 
          <Text style={styles.courseTitle} numberOfLines={1} ellipsizeMode="tail"> {item.title}</Text>
        </View>
       
        <Text style={styles.courseTeacher}>By {item.university}</Text>
        <View style ={styles.course_rating}>
          <FontAwesomeIcon icon={faStar} />
          <Text style={styles.courseRating}> {item.rating}</Text>
          <Text style={{color:"grey",marginLeft:5,marginRight:5}}>.</Text>
          <Text style={styles.courseLessons}>{item.lessons}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const [currentPage, setCurrentPage] = useState('Home'); // State để theo dõi trang hiện tại

  const handleNavigation = (page) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
    navigation.navigate(page); // Chuyển hướng
  };


  return (
    <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style ={styles.header_title}>
          <Text style={styles.title}>Hello {userName}</Text>
          <View style = {styles.inner_icon_header}>
                <FontAwesomeIcon icon={faCartShopping} />     
                <FontAwesomeIcon icon={faBell} />
          </View>
        </View>
        <Text style ={{color: "white"}}>What do you learn today ?</Text>
      </View>
      <View style ={styles.header_banner}>
         <TouchableOpacity>
            <ImageBackground source={require('../assets/images/headerbanner.png')} style={{width :"100%",height:150}}>
                <View style ={styles.innter_text_banner}>
                    <Text style={{color:"white"}}>PROJECT MANAGER</Text>
                    <Text  style={{color:"white", fontWeight:"bold"}}>20% OFF</Text>
                    <TouchableOpacity style ={styles.inner_banner_button}>
                        <Text>JOIN NOW</Text>
                    </TouchableOpacity>
                </View>
              </ImageBackground>
         </TouchableOpacity>
      </View>
      <View style ={styles.titlesection}>
        <Text style ={{fontWeight: 600}}>Categories</Text>
        <TouchableOpacity onPress={handleViewAllPress}>
          <Text style ={{color:"aqua"}}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.flat_list_category}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            numColumns={2} 
            contentContainerStyle={styles.categoryList}
          />
      </View>
      <View style ={styles.titlesection}>
        <Text style ={{fontWeight: 600}}>Popular courses</Text>
        <TouchableOpacity onPress={() => navigateToCourses('Popular')}>
          <Text style ={{color:"aqua"}}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flat_list_courses}>
        <FlatList
          data={popularCourse}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, marginBottom: 10 }}
        />
      </View>
      <View style ={styles.titlesection}>
        <Text style ={{fontWeight: 600}}>Recommended for you</Text>
        <TouchableOpacity onPress={() => navigateToCourses('Recommend')}>
          <Text style ={{color:"aqua"}}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flat_list_courses}>
        <FlatList
          data={recommendCourse}
          renderItem={CourseRecommentItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>
      <View style ={styles.titlesection}>
        <Text style ={{fontWeight: 600}}>Course that inspires</Text>
        <TouchableOpacity onPress={() => navigateToCourses('Inspire')}>
          <Text style ={{color:"aqua"}}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flat_list_coursesInspire}>
        <FlatList
          data={inspireCourse}
          renderItem={CourseInspireItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>

      <View style={styles.titlesection}>
        <Text style={{ fontWeight: '600' }}>Top Teacher</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Mentors', { topTeachers ,dataCourse,user})}>
          <Text style={{ color: "aqua" }}>View All</Text>
        </TouchableOpacity>
      </View>
          <View style={styles.flat_list_courses}>
            <FlatList
              data={topTeachers}
              renderItem={topTeachersItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            />
          </View>
      </View>
     </ScrollView>
     <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')} >
          <FontAwesomeIcon icon={faHome}/>
          <Text style={[styles.footerText , currentPage === 'Home' && styles.activeFooterText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Search', { dataCourse, isFromCategory: false,user})}>
          <FontAwesomeIcon icon={faSearch}/>
          <Text style={[styles.footerText,currentPage === 'Search' && styles.activeFooterText]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}  onPress={() => navigation.navigate('MyCourse', { dataCourse,user})}>
          <FontAwesomeIcon icon={faBook} />
          <Text style={[styles.footerText, currentPage === 'MyCourses' && styles.activeFooterText]}>My Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Profile', { dataCourse,user })}>
          <FontAwesomeIcon icon={faUser}  />
          <Text style={[styles.footerText,currentPage === 'Profile' && styles.activeFooterText]}>Profile</Text>
        </TouchableOpacity>
      </View>
     </View>
  );
}
const FooterItem = ({ icon, label, currentPage, onPress }) => (
    <TouchableOpacity style={styles.footerItem} onPress={onPress}>
      <FontAwesomeIcon icon={icon} />
      <Text style={[styles.footerText, currentPage === label && styles.activeFooterText]}>{label}</Text>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 0,
    width: "100%",
    flexDirection: "column",
    flex: 1,

  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor:"#00BDD6",
    padding: 10,

  },
  header_title: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",

  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: 500,
  },
  inner_icon_header:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: 50,
  },
  header_banner:{
    width: "90%",
    padding: 5,
  },
  innter_text_banner:{
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: 130,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    marginTop: 8,
  },
  inner_banner_button:{
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  titlesection:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  item: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 5,
    width: "50%",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    border: "0.1px solid grey",
  },
  flat_list_category:{
    width: "90%",
  },
  categoryText: {
    marginLeft: 10,
  },

  // Course List Styles
 
  flat_list_courses: {
    width: "90%",
  },
  courseItem: {
    flex: 1,
    width: 200,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
    marginRight: 23,

  },
  course_title_container:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: 180,
    alignItems: "center",
    
  },
  courseImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  courseTitle: {
    fontWeight: "600",  
    fontSize: 16,
  },
  courseTeacher: {
    fontSize: 12,
    color: "gray",
  },
  coursePrice: {
    color: "aqua",
    fontWeight: "bold",
    marginTop: 5,
  },
  courseRating: {
    fontSize: 12,
    color: "gray",
  },
  courseLessons: {
    fontSize: 12,
    color: "gray",
  },
  courseInfo: {
    width: "80%",
    marginTop: 10
  },
  course_rating:{
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: 'flex-start',
    zIndex: 1,
},
discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
},
bestSellerBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'gold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: 'flex-start',
    zIndex: 1,
},

// Course Inspire

flat_list_coursesInspire: {
  width: "90%",

},

courseItemInpire: {
  flex: 1,
  backgroundColor: "white",
  borderRadius: 10,
  flexDirection: "row",
  height: 100,
  padding: 10,
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 15,
  width: "100%",
  
},
courseInpireImage: {
  width: 90,
  height: 90,
  borderRadius: 10,
  
},
courseTitleInspire: {
  fontWeight: "600",
  fontSize: 16,
  marginLeft:0,
},
courseinspire_title_container:{
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
 
},
courseInspireInfo: {
  width: "100%",
  flexDirection: "column",
  justifyContent: "space-between",
  marginLeft: 10,
  flex: 1,
},

// footer
footer: {
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
  marginTop: 20,
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

export default LandingPage;