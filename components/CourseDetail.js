import { StyleSheet, Text, View,ImageBackground,TouchableOpacity,FlatList,Image,ScrollView } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faCartShopping,faChevronLeft,faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { faBookmark,faStar } from '@fortawesome/free-regular-svg-icons';
import { faHome,faSearch,faBook,faUser,faVideo,faGlobe,faPauseCircle,faFileLines,faClock,faCertificate,faCheckDouble,faPlayCircle, faCheckCircle, faLock,faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { useCart } from '../contexts/CartContext'; // Đường dẫn tới CartContext.js
import { useIsFocused } from '@react-navigation/native';
import { getDatabase, ref, set,get } from "firebase/database";
import Video from "react-native-video";
 //Kết nối firebase
 import { app } from "../components/firebaseConfig";
 const db = getDatabase(app);
function CourseDetail ({route,navigation  }) {
    // Lấy dữ liệu từ route 
    const { course,dataCourse,user  } = route.params;
    console.log("User id in coursesDetail:",user.uid)
    // Dữ liệu khóa học
    const [currentSound, setCurrentSound] = useState(null); // Store the current playing sound
    const [playingLessonId, setPlayingLessonId] = useState(null);
    const [lessonStatus, setLessonStatus] = useState({}); 
    const [playbackStatus, setPlaybackStatus] = useState({});

    const { addToCart } = useCart();
    // Xử lý Tab
    const [selectedTab, setSelectedTab] = useState('Overview');
    // Xử lý mở rộng mô tả abc
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
    // Kiểm tra xem khóa học đã được mua hay chưa
  // const hasPurchasedCourse = user.courses.some(
  //   (userCourse) => userCourse.id === course.id
  // );

      // Lọc các khóa học cùng category với khóa học đang xem
      const similarCourses = dataCourse.filter((item) => item.categories === course.categories && item.id !== course.id).slice(0, 3);

    // Chuyển đổi price từ chuỗi sang số (loại bỏ ký hiệu "$")
    const priceNumber = parseFloat(course.price.replace('$', ''));

    // Tính toán giá sau khi giảm (nếu discount là true)
    const discountedPrice = course.discount ? (priceNumber * 0.8).toFixed(2) : null;
    
    
      const renderSimilarCourse = ({ item }) => (
        <TouchableOpacity style={styles.CourseSimilar} onPress={() => navigation.navigate('CourseDetail', { course: item,dataCourse: dataCourse ,user })}>
          <Image source={item.image} style={styles.courseInpireImage} />
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

    // Tính tổng số review 
    const totalReviews = course.reviews ? course.reviews.length : 0;
    // Xử lý rating
    const [selectedRating, setSelectedRating] = useState('All');4

    // Xử lý lọc review theo rating
    const filteredReviews = selectedRating === 'All' 
    ? course.reviews 
    : course.reviews.filter(review => review.rating === selectedRating);
    

    const [userProfile, setUserProfile] = useState({}); // Khởi tạo là một đối tượng rỗng
    const [followCourses, setfollowCourses] = useState([]); // Khởi tạo danh sách khóa học là mảng rỗng
  
    const isFocused = useIsFocused(); // Kiểm tra trạng thái focus của màn hình
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        const userProfileRef = ref(db, `Users/users/${user.uid}`);
        try {
          const snapshot = await get(userProfileRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            const getFollowCourses = data.followCourses || [];
             set
            setUserProfile(data);
            setfollowCourses(getFollowCourses); // Cập nhật danh sách khóa học từ Firebase
            console.log("Dữ liệu followCourses SearchScreen:", getFollowCourses);
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

    

    // Tính số ngày trước đó    
    const calculateTimeAgo = (reviewDate) => {
        const now = new Date();
        const diffTime = now - reviewDate; // Hiệu số mili giây giữa hai thời điểm
    
        // Tính toán thời gian
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
        if (diffMinutes < 60) {
            return `${diffMinutes} phút trước`;
        } else if (diffHours < 24) {
            return `${diffHours} giờ trước`;
        } else {
            return `${diffDays} ngày trước`;
        }
    };

    //  Xuất số sao dựa trên rating
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FontAwesomeIcon
                key={index}
                icon={faStar}
                style={{ marginHorizontal: 2 }}
                color={index < rating ? "#FFD43B" : "#C0C0C0"} // Màu vàng cho sao sáng, xám cho sao tối
            />
        ));
    };
    
    
  const renderReview = ({ item }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <Image source={item.image} style={{ width: 40, height: 40, borderRadius: 25 }} />
        <View style={styles.reviewInfo}>
          <Text style={styles.reviewerName}>{item.name}</Text>
          <Text style={styles.reviewDate}>{calculateTimeAgo(new Date(item.date))}</Text>
        </View>
        <View style={styles.starsContainer}>
                {renderStars(item.rating)}
        </View>
      </View>
      <Text style={styles.reviewText}>{item.comment}</Text>
    </View>
  );

   // Play or pause audio for the selected lesson
  const toggleAudio = async (audioUrl, lessonId) => {
    if (playingLessonId === lessonId) {
      // If the selected lesson is already playing, pause it
      if (currentSound) {
        await currentSound.stopAsync();
        setCurrentSound(null);
        setPlayingLessonId(null); // Reset playing lesson
        setLessonStatus((prevStatus) => ({
          ...prevStatus,
          [lessonId]: 'paused',
        }));
      }
    } else {
      // If a different lesson is selected, stop the current one and play the new one
      if (currentSound) {
        await currentSound.stopAsync();
      }

      try {
        // Create a new sound and play it
        const { sound, status } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );
        setCurrentSound(sound); // Set the new sound to the currentSound state
        setPlayingLessonId(lessonId); // Update the playing lesson ID
        setLessonStatus((prevStatus) => ({
          ...prevStatus,
          [lessonId]: 'playing', // Mark the lesson as playing
        }));

        // Monitor playback status to update when finished and track progress
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded) {
            setPlaybackStatus((prevStatus) => ({
              ...prevStatus,
              [lessonId]: {
                progress: status.positionMillis / status.durationMillis, // Calculate progress as a percentage
                currentTime: status.positionMillis, // Current position in milliseconds
                duration: status.durationMillis, // Total duration in milliseconds
              }
            }));

            if (status.didJustFinish) {
              setLessonStatus((prevStatus) => ({
                ...prevStatus,
                [lessonId]: 'completed', // Mark the lesson as completed when finished
              }));
            }
          }
        });

        await sound.playAsync(); // Play the audio
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

// const [expandedSection, setExpandedSection] = useState(null)
// const toggleSection = (index) => {
//     setExpandedSection(expandedSection === index ? null : index);
// };
const [expandedSections, setExpandedSections] = useState([]); // Trạng thái mở rộng của từng mục

// const toggleSection = (index) => {
//     setExpandedSections((prev) => {
//         const updatedSections = [...prev];
//         updatedSections[index] = !updatedSections[index]; // Đảo trạng thái của mục được bấm
//         return updatedSections;
//     });
// };
 // Toggle section expansion
 const toggleSection = (index) => {
    setExpandedSections((prev) => {
      const newSections = [...prev];
      newSections[index] = !newSections[index];
      return newSections;
    });
  };

  // Dọn dẹp khi component unmount
  useEffect(() => {
    return () => {
      // Nếu có âm thanh đang phát, dừng lại khi component bị unmounted
      if (currentSound) {
        currentSound.stopAsync();
      }
    };
  }, [currentSound]);
    // Render Tab Content
    const [cart, setCart] = useState([]);
    const handleAddToCart = (course) => {
      addToCart(course); // Thêm khóa học vào giỏ hàng
      navigation.navigate('Cart',{ user}); // Điều hướng tới màn hình giỏ hàng
    alert(
      'Thành công', 
      'Khóa học đã được thêm vào giỏ hàng 🎉', 
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  );
  };


    const renderTabContent = () => {
        switch (selectedTab) {
            case 'Overview':
                return (
                    <ScrollView>
                        <View style = {styles.course_container}>
                            <View style = {styles.course_information}>
                                <View style ={styles.teacher_infomation}>
                                    <TouchableOpacity>
                                        <View style ={{flexDirection:'row',alignItems:'center',width:60,height:40}}>
                                            <Image source={course.imageteacher} style={{width:40,height:40,borderRadius:50}} />
                                            <View style = {{justifyContent:'space-around',height:'100%',marginLeft:10}}>
                                                <Text style ={styles.textteacher}>{course.teacher}</Text>
                                                <Text style ={{fontSize:12,color:'grey'}}>{course.work}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style ={styles.containerButtonFollow}>
                                        <TouchableOpacity style ={styles.buttonFollow}>
                                            <Text style ={{color:'#66B4Be'}}>Follow</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style ={{fontSize:15,marginTop:15,fontWeight:700}}>Description</Text>
                                <Text numberOfLines={isDescriptionExpanded ? undefined : 3} style={styles.descriptionText}>
                                    {course.description}
                                </Text>
                                <TouchableOpacity onPress={() => setDescriptionExpanded(!isDescriptionExpanded)}>
                                    <Text style={styles.seeMoreText}>
                                        {isDescriptionExpanded ? "See Less" : "See More"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style ={{fontSize:15,marginTop:15,fontWeight:700}}>Benefits</Text>
                            <View style ={styles.container_benifit}>
                                <View style = {styles.inners_benifit}>
                                    <FontAwesomeIcon icon={faVideo} style={{color: "#02BDD6",}} />
                                    <Text style = {{paddingLeft:8}}> 14 hours on-demand video</Text>
                                </View>
                                <View style = {styles.inners_benifit}>
                                <FontAwesomeIcon icon={faGlobe} style={{color: "#02BDD6",}}/>
                                    <Text style = {{paddingLeft:15}}>Native teacher</Text>
                                </View>
                                <View style = {styles.inners_benifit}>
                                <FontAwesomeIcon icon={faFileLines} style={{color: "#02BDD6",}} />
                                    <Text style = {{paddingLeft:17}}>100% free document</Text>
                                </View>
                                <View style = {styles.inners_benifit}>
                                <FontAwesomeIcon icon={faClock}  style={{color: "#02BDD6",}} />
                                    <Text style = {{paddingLeft:15}}>Full lifetime access</Text>
                                </View>
                                <View style = {styles.inners_benifit}>
                                <FontAwesomeIcon icon={faCertificate}  style={{color: "#02BDD6",}}  />
                                    <Text style = {{paddingLeft:14}}>Certificate of complete</Text>
                                </View>
                                <View style = {styles.inners_benifit}>
                                <FontAwesomeIcon icon={faCheckDouble}  style={{color: "#02BDD6",}}  />
                                    <Text style = {{paddingLeft:15}}>24/7 support</Text>
                                </View>
                            </View>
                            <Text style ={{fontSize:15,marginTop:15,fontWeight:700}}>Similar courses</Text>
                                <View style ={styles.flat_list_courses}>
                                    <FlatList
                                        data={similarCourses}  
                                        renderItem={renderSimilarCourse}
                                        keyExtractor={(item) => item.id.toString()}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                         </View>

                    </ScrollView>
                );
            case 'Lesson':
              return (
                <ScrollView>
                  <View style={styles.lessonContainer}>
                    <FlatList
                      data={course.sections} // Danh sách các mục (sections)
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => (
                        <View>
                          {/* Section Header */}
                          <TouchableOpacity onPress={() => toggleSection(index)} style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{item.module}</Text>
                            <FontAwesomeIcon
                              icon={expandedSections[index] ? faChevronUp : faChevronDown}
                              style={styles.icon}
                            />
                          </TouchableOpacity>
            
                          {/* Section Content */}
                          {expandedSections[index] && (
                            <FlatList
                              data={item.lessons} // Các bài học trong section
                              keyExtractor={(lesson) => lesson.id.toString()}
                              renderItem={({ item }) => (
                                <View style={styles.lessonItem}>
                                  <View style={styles.lessonDetails}>
                                    <Text style={styles.lessonName}>{item.title}</Text>
                                    <Text style={styles.lessonDuration}>{item.duration}</Text>
                                  </View>
            
                                  <TouchableOpacity
                                    onPress={() => {
                                      // Kiểm tra nếu bài học không bị khóa và có thể phát/tạm dừng
                                      if (item.status !== 'locked' || user.courses.some((userCourse) => userCourse.id === course.id)) {
                                        toggleAudio(item.audioUrl, item.id);
                                      }
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      icon={
                                        item.status === 'completed'
                                          ? faCheckCircle // Hiển thị icon check nếu bài học đã hoàn thành
                                          : item.status === 'current' || user.courses.some((userCourse) => userCourse.id === course.id)
                                          ? playingLessonId === item.id
                                            ? faPauseCircle // Hiển thị icon pause nếu bài học đang phát
                                            : faPlayCircle // Hiển thị icon play nếu bài học chưa phát
                                          : faLock // Hiển thị icon khóa nếu bài học bị khóa
                                      }
                                      style={
                                        item.status === 'completed'
                                          ? styles.completedIcon
                                          : item.status === 'current' || user.courses.some((userCourse) => userCourse.id === course.id)
                                          ? playingLessonId === item.id
                                            ? styles.pauseIcon
                                            : styles.currentIcon
                                          : styles.lockedIcon
                                      }
                                    />
                                  </TouchableOpacity>
                                </View>
                              )}
                            />
                          )}
                        </View>
                      )}
                    />
                  </View>
                </ScrollView>
              );
            case 'Review':
                return (
                    <View>
                        <View style = {styles.review_rating}>
                           <View style = {styles.inner_review_rating_left} >
                                <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}} />
                                <Text style={styles.courseRating}> {course.rating}/5</Text>
                                <Text style ={{color:'#808690'}}> ({totalReviews}+ reviews)</Text>
                           </View>
                           <TouchableOpacity>
                               <Text style ={{color:'#32CADE'}}>View all</Text> 
                           </TouchableOpacity>
                        </View>       
                        <View style={styles.rating_list}>
                            {['All', 5, 4, 3, 2, 1].map((rating) => (
                            <TouchableOpacity
                                key={rating}
                                style={[
                                    styles.button_rating,
                                    selectedRating === rating && {
                                        backgroundColor: 'aqua',
                                    },
                                ]}
                                onPress={() => setSelectedRating(rating)}
                            >
                                <FontAwesomeIcon icon={faStar} style={{ color: selectedRating === rating ? 'white' : '#37CBDE' }} />
                                <Text style={{ color: selectedRating === rating ? 'white' : 'black' }}>{rating}</Text>
                            </TouchableOpacity>
                             ))}
                        </View> 
                        <View style = {styles.review_list_container}>
                           <ScrollView>
                           <FlatList
                                data={filteredReviews}
                                renderItem={renderReview}
                                keyExtractor={(item) => item.id.toString()}

                            />
                           </ScrollView>
                        </View>

                       
                    </View>
                );
            default:
                return null;
        }
    };
    return (
        <View style={{flex:1}}> 
            <View style ={styles.container}>
                <View style ={styles.header}>
                    <View style ={styles.header_title}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faChevronLeft} style={{color: "#97989b",}} />
                        </TouchableOpacity>
                        <Text style ={{fontWeight:700,fontSize:18}}>Course Details</Text>
                        <View style = {styles.header_right_icon}>
                            <FontAwesomeIcon icon={faBookmark} style={{color: "#97989b",}} />
                            <FontAwesomeIcon icon={faEllipsisVertical} style={{color: "#97989b",}} />
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View style ={styles.container_body}>
                        <View style = {styles.title_course}>
                            {/* <Image source={course.image} style={styles.courseImage} /> */}
                           <View style={styles.courseImage}> 
                            <Video
                                    source={{ uri: course.video }} // URL từ Firebase Storage
                                    style={styles.courseImage}
                                    controls={true} // Hiển thị nút điều khiển
                                    resizeMode="cover" // Điều chỉnh hiển thị
                                    paused={true} // Không tự động phát video
                                  />
                           </View>
                            <View style = {styles.content_course}>
                                <Text style ={{fontWeight:700,fontSize:18,marginTop:10}}>{course.title}</Text>
                                <View style ={styles.course_rating}>
                                    <FontAwesomeIcon icon={faStar} />
                                    <Text style={styles.courseRating}> {course.rating}</Text> 
                                    <Text style ={{color:'#808690',gap: '0 10px'}}> ( {totalReviews} )</Text>
                                    <Text style={{color:"grey",marginLeft:5,marginRight:5}}></Text>
                                    <Text style={styles.courseLessons}>{course.lessons}</Text>
                                </View>                      
                            </View>
                            <View style ={styles.section}>
                                <TouchableOpacity onPress={() => setSelectedTab('Overview')}>
                                    <Text style={[styles.tabText, selectedTab === 'Overview' && styles.activeTab]}>Overview</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelectedTab('Lesson')}>
                                    <Text style={[styles.tabText, selectedTab === 'Lesson' && styles.activeTab]}>Lession</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelectedTab('Review')}>
                                    <Text style={[styles.tabText, selectedTab === 'Review' && styles.activeTab]}>ReView</Text>
                                </TouchableOpacity>                          
                            </View>
                            <View style={styles.tabContent}>
                            {renderTabContent()}
                        </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <View>
                     {/* Hiển thị giá gốc (in đậm nếu có giảm giá) */}
                {course.discount ? (
                    <Text style={styles.originalPrice}>
                        Original: ${priceNumber.toFixed(2)}
                    </Text>
                ) : (
                    <Text style={styles.price}>
                        Price: ${priceNumber.toFixed(2)}
                    </Text>
                )}
                {/* Hiển thị giá giảm (nếu có) */}
                {course.discount && (
                    <Text style={styles.discountedPrice}>
                        20% disc: ${discountedPrice}
                    </Text>
                )}
                    </View>
                    <View style = {styles.footer_button}>
                    {user.courses.some((userCourse) => userCourse.id === course.id) ? (
                        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('LearningLesson', { course ,dataCourse,user})}>
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                style={{ color: "#edeff3", marginTop: 2 }}
                            />
                            <Text style={styles.buttonText}>Start Course</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(course)}>
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                style={{ color: "#edeff3", marginTop: 2 }}
                            />
                            <Text style={styles.buttonText}>Buy Course</Text>
                        </TouchableOpacity>
                    )}
                    </View>
                </View>
            </View>
            
        </View>
    );   
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        flexDirection:'column',    },

    // Header
    header:{
        width:'100%',
        height:50,
        padding:10,
    },
    header_title:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    header_right_icon:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:40,
    },

    // Body
    container_body:{
        width:'100%',
    },
    courseImage:{
        width:'100%',
        height:180,
        borderRadius:10,
    },

    content_course:{
        padding:10,
    },

    // Title Course
    title_course:{
        width:'100%',
    },
    course_rating:{
        flexDirection:'row',
        marginTop:10,
        alignItems:'center',
    },

    // Section 

    section:{
        width:'100%',
        padding:5,
        flexDirection:'row', 
        justifyContent:'space-around',
    },
    tabText: {
        fontSize: 16,
        paddingVertical: 10,
        color: 'grey',
      },
      activeTab: {
        color: 'aqua', 
        borderBottomWidth: 2,
        borderBottomColor: 'aqua', 
      },

      // Tab Content
        tabContent: {
            width:'100%',
        },
        // Course Information
        course_container:{
            width:'100%',
            flexDirection:'column',
            padding:10,
        },

      course_information:{
        flexDirection:'column',
        width:'100%',
        justifyContent:'space-between',    
        },
        teacher_infomation:{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            padding:10,
        },
        textteacher:{
            fontSize:12,
        },
        teacher:{
            flexDirection:'row',
            justifyContent:'space-between',
            padding:10,
        },
        containerButtonFollow:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
        },
        buttonFollow:{
            alignItems:'center',
            width:80,
            backgroundColor:'#c8f9ff',
            padding:8,
            borderRadius:5,
        },

        // description
        
        descriptionText: {
            fontSize: 14,
            color: 'grey',
            marginTop: 10,
          },
          seeMoreText: {
            color: 'aqua',
            marginTop: 5,
            },
        
      // Benifit
        container_benifit:{
            paddingVertical:10,
            flexDirection:'column',
            justifyContent:'space-between',
            width:'100%',
            height:230,
            
        },
      inners_benifit:{
            flexDirection:'row',
            alignItems:'center',

      },

      // Course Similar

        flat_list_courses: {
            width: "100%",
            marginTop: 10,
        
        },
  
    CourseSimilar: {
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
  reviewContainer:{
    backgroundColor:'white',
    padding:10,
    borderRadius:10,
    marginBottom:10,
  },
  reviewHeader:{
    flexDirection:'row',
  },
  reviewInfo:{
    marginLeft:10,
    flexDirection:'column',
    justifyContent:'space-around',
    height:40,
  },
  starsContainer:{
    flexDirection:'row',
    marginLeft:'auto',
    },
    reviewerName:{
        fontWeight:'700',
    },
    reviewDate:{
        color:'grey',
        fontSize:12,
    },
    reviewText:{
        marginTop:10,
        color:'grey',
    },


    // Footer
    footer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        height:60,
        border: '1px solid #e0e0e0',
    },
    footer_button:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        flexDirection:'row',
        backgroundColor:'aqua',
        padding:10,
        borderRadius:5,
        width:130,
        justifyContent:'space-around',  
    },
    buttonText:{
        color:'white',
        marginLeft:5,
    },

    // Price
    originalPrice: {
        fontWeight: "bold", // Làm chữ in đậm
        fontSize: 16,
        color: "#555", // Màu xám đậm
    },
    price: {
        fontSize: 16,
        color: "#555",
    },
    discountedPrice: {
        fontSize: 14,
        color: "#ff5733", // Màu đỏ cam cho giá giảm
    },
    // Lesson
    lessonContainer: {
        padding: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 14,
        color: '#000',
    },
    lessonItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    lessonName: {
        fontSize: 14,
    },
    lessonDuration: {
        fontSize: 15,
        color: '#888',
    },
    completedIcon: {
        color: '#4caf50',
        fontSize: 15,
    },
    currentIcon: {
        color: '#2196f3',
        fontSize: 15,
    },
    lockedIcon: {
        color: '#f44336',
        fontSize: 15,    
    },
});

export default CourseDetail;