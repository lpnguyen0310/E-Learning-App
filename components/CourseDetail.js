import { StyleSheet, Text, View,ImageBackground,TouchableOpacity,FlatList,Image,ScrollView } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faCartShopping,faChevronLeft,faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { faBookmark,faStar } from '@fortawesome/free-regular-svg-icons';
import { faHome,faSearch,faBook,faUser,faVideo,faGlobe,faFileLines,faClock,faCertificate,faCheckDouble} from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';



function CourseDetail ({route }) {
    // Lấy dữ liệu từ route 
    const { course } = route.params;
    // Xử lý Tab
    const [selectedTab, setSelectedTab] = useState('Overview');
    // Xử lý mở rộng mô tả
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

    const CourseSimilar = [
        {
          id: '1',
          title: 'Digital Portrait',
          teacher: 'Ramano Wultschiner',
          price: '$67',
          rating: '4.5 (657)',
          lessons: '12 Lessons',
          image: require('../assets/images/digitalportrait.png'),
          bestSeller: false, 
          discount: true,
        },
        {
          id: '2',
          title: 'Workspace Decor',
          teacher: 'Ruth Dominguez',
          price: '$19',
          rating: '4.5 (33)',
          lessons: '17 Lessons',
          image: require('../assets/images/workspacedecor.png'),
          bestSeller: true, 
          discount: false,
        },
        {
          id: '3',
          title: 'Packing Design',
          teacher: 'Hui Anderson',
          price: '$89',
          rating: '4.5 (1233)',
          lessons: '14 Lessons',
          image: require('../assets/images/packagingdesign.png'),
          bestSeller: false, 
          discount: true,
        },
      ];
    
    
    
    
      const renderSimilarCourse = ({ item }) => (
        <TouchableOpacity style={styles.CourseSimilar} onPress={() => navigation.navigate('CourseDetail', { course:item  })}>
          <Image source={item.image} style={styles.courseInpireImage} />
          <View style={styles.courseInspireInfo}>
            <View style ={styles.courseinspire_title_container}> 
              <Text style={styles.courseTitleInspire}> {item.title}</Text>
              <FontAwesomeIcon icon={faBookmark} />
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
    
  

    // Render Tab Content

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
                                    {course.discription}
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
                                    data={CourseSimilar}  // Sử dụng similarCourses từ route.params
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
                    <View>
                        <Text>Lesson Content</Text>
                       
                    </View>
                );
            case 'Review':
                return (
                    <View>
                        <Text>Review Content</Text>
                    
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
                        <TouchableOpacity>
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
                            <Image source={course.image} style={styles.courseImage} />
                            <View style = {styles.content_course}>
                                <Text style ={{fontWeight:700,fontSize:18,marginTop:10}}>{course.title}</Text>
                                <View style ={styles.course_rating}>
                                    <FontAwesomeIcon icon={faStar} />
                                    <Text style={styles.courseRating}> {course.rating}</Text>
                                    <Text style={{color:"grey",marginLeft:5,marginRight:5}}>.</Text>
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
                            <Text>{course.price}</Text>
                            <Text>80% disc. 73.75$</Text>
                    </View>
                    <View style = {styles.footer_button}>
                        <TouchableOpacity style={styles.button}>
                            <FontAwesomeIcon icon={faCartShopping} style={{color: "#edeff3",marginTop:2}} />
                            <Text style={styles.buttonText}>Start Course</Text>
                        </TouchableOpacity>
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
        flexDirection:'column',
        padding:10,
    },

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



    // Footer
    footer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        height:60,
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
});

export default CourseDetail;