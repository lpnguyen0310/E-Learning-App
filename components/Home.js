import { StyleSheet, Text, View,ImageBackground,TouchableOpacity,FlatList,Image,ScrollView } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBookmark,faStar } from '@fortawesome/free-regular-svg-icons';
import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';

function LandingPage({ navigation }) {
  const categories = [
    { id: '1', image :require('../assets/images/business.png') , title: 'Business' },
    { id: '2',image :require('../assets/images/Code.png'), title: 'Code' },
    { id: '3',image :require('../assets/images/movie.png'), title: 'Movie' },
    { id: '4',image :require('../assets/images/design.png'), title: 'Design' },
    { id: '5',image :require('../assets/images/writing.png'), title: 'Writing' },
    { id: '6',image :require('../assets/images/language.png'), title: 'Language' },
  ];
  const renderCategoryItem  = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={styles.categoryItem}>
            <Image source={item.image} style={{width: 40, height: 40, borderRadius: 8, objectFit: "cover"}}/>
            <Text style={styles.categoryText}>{item.title}</Text>
       </TouchableOpacity>
    </View> 
  );

  const dataCourse = [
    {
      id: '1',
      title: 'PHP in One Click',
      teacher: 'Ramano Wultschiner',
      price: '$59',
      rating: '4.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/phponeclick.png'),
      bestSeller: false, 
      type : 'Popular',
      categories : 'Code'
    },
    {
      id: '2',
      title: 'Python Introduction Course',
      teacher: 'Ramano Wultschiner',
      price: '$39',
      rating: '4.5 (1267)',
      lessons: '12 Lessons',
      image: require('../assets/images/introductionpython.png'),
      bestSeller: true, 
      type : 'Popular',
      categories : 'Code'
    },
    {
      id: '3',
      title: 'Java Programming',
      teacher: 'Emily Johnson',
      price: '$19.99',
      rating: '4.3 (2365)',
      lessons: '10 Lessons',
      image: require('../assets/images/javaprogram.png'),
      bestSeller: false, 
      type : 'Popular',
      categories : 'Code'
    },
    {
      id: '4',
      title: 'Java Introduction Course',
      teacher: 'Michael Brown',
      price: '$20',
      rating: '4.8 (1865)',
      lessons: '25 Lessons',
      image: require('../assets/images/introductionjava.png'),
      bestSeller: true,
      type : 'Popular',
      categories : 'Code'
    },
    {
    id: '1',
      imageteacher: require('../assets/images/teacher1.png'),
      title: 'Website Design',
      teacher: 'Ramano Wultschiner',
      work: 'UI/UX Designer at Google',
      discription: 'We are a team of professional UX/UI designers, committed to creating products that are intuitive, easy to use and bring value to users. From user research to interface design, we will accompany you throughout the product development process..',
      price: '$59',
      rating: '4.5 (1233)',
      lessons: '9 Lessons',
      image: require('../assets/images/webdesign.png'),
      bestSeller: false, 
      discount: true,
      type : 'Recommend',
      categories : 'Design',
        reviews: [
          {
            id: '1',
            name: 'Jinny Oslin',
            date: '1 day ago',
            comment: 'Nostrud excepteur magna id est quis in aliqua.',
            rating: 5,
          },
          {
            id: '2',
            name: 'Jane Barry',
            date: '1 day ago',
            comment: 'Deserunt minim incididunt cillum nostrud do voluptate.',
            rating: 4,
          },
          {
             id: '3',
            name: 'Claire Mignard',
            date: '5 days ago',
            comment: 'Magna id sit iure in cillum esse nisi dolor laboris ullamco.',
            rating: 3,
          },
      ],   
    },
    {
      id: '6',
      title: 'Ux Research For Beginners',
      teacher: 'Olivia Wang',
      price: '$29',
      rating: '4.5 (1782)',
      lessons: '12 Lessons',
      image: require('../assets/images/uxresearch.png'),
      bestSeller: true, 
      discount: false,
      type : 'Recommend',
      categories : 'Design',
      reviews: [
        {
          id: '1',
          name: 'Jinny Oslin',
          date: '1 day ago',
          comment: 'Nostrud excepteur magna id est quis in aliqua.',
          rating: 5,
        },
        {
          id: '2',
          name: 'Jane Barry',
          date: '1 day ago',
          comment: 'Deserunt minim incididunt cillum nostrud do voluptate.',
          rating: 4,
        },
        {
          id: '3',
          name: 'Claire Mignard',
          date: '5 days ago',
          comment: 'Magna id sit iure in cillum esse nisi dolor laboris ullamco.',
          rating: 3,
        },
      ],
      
    },
    {
      id: '7',
      title: 'UI/UX for Beginners',
      teacher: 'Emily Johnson',
      price: '$20',
      rating: '4.3 (3652)',
      lessons: '15 Lessons',
      image: require('../assets/images/uix.png'),
      bestSeller: false, 
      discount: true,
       type : 'Recommend',
      categories : 'Design',
      reviews: [
        {
          id: '1',
          name: 'Jinny Oslin',
          date: '1 day ago',
          comment: 'Nostrud excepteur magna id est quis in aliqua.',
          rating: 5,
        },
        {
          id: '2',
          name: 'Jane Barry',
          date: '1 day ago',
          comment: 'Deserunt minim incididunt cillum nostrud do voluptate.',
          rating: 4,
        },
        {
          id: '3',
          name: 'Claire Mignard',
          date: '5 days ago',
          comment: 'Magna id sit iure in cillum esse nisi dolor laboris ullamco.',
          rating: 3,
        },
      ],
     
    },
    {
        id: '8',
        title: 'Design Thinking 101',
        teacher: 'Michael Brown',
        price: '$36',
        rating: '4.8 (3256)',
        lessons: '25 Lessons',
        image: require('../assets/images/designpattern.png'),
        bestSeller: true,
        discount: false,
        type : 'Recommend',
        categories : 'Design',
        reviews: [
          {
            id: '1',
            name: 'Jinny Oslin',
            date: '1 day ago',
            comment: 'Nostrud excepteur magna id est quis in aliqua.',
            rating: 5,
          },
          {
            id: '2',
            name: 'Jane Barry',
            date: '1 day ago',
            comment: 'Deserunt minim incididunt cillum nostrud do voluptate.',
            rating: 4,
          },
          {
            id: '3',
            name: 'Claire Mignard',
            date: '5 days ago',
            comment: 'Magna id sit iure in cillum esse nisi dolor laboris ullamco.',
            rating: 3,
          },
        ],
      },
      
   
    {
      id: '9',
      title: 'Digital Portrait',
      teacher: 'Ramano Wultschiner',
      price: '$67',
      rating: '4.5 (657)',
      lessons: '12 Lessons',
      image: require('../assets/images/digitalportrait.png'),
      bestSeller: false, 
      discount: true,
      type : 'Inspire',
      categories : 'Design'
    },
    {
      id: '10',
      title: 'Workspace Decor',
      teacher: 'Ruth Dominguez',
      price: '$19',
      rating: '4.5 (33)',
      lessons: '17 Lessons',
      image: require('../assets/images/workspacedecor.png'),
      bestSeller: true, 
      discount: false,
      type : 'Inspire',
      categories : 'Design'

    },
    {
      id: '11',
      title: 'Packing Design',
      teacher: 'Hui Anderson',
      price: '$89',
      rating: '4.5 (1233)',
      lessons: '14 Lessons',
      image: require('../assets/images/packagingdesign.png'),
      bestSeller: false, 
      discount: true,
      type : 'Inspire',
      categories : 'Design'

    },
  ];
  const popularCourse = dataCourse.filter(course => course.type === 'Popular');
  const recommendCourse = dataCourse.filter(course => course.type === 'Recommend');
  const inspireCourse = dataCourse.filter(course => course.type === 'Inspire');
  const renderCourseItem = ({ item }) => (
    <TouchableOpacity style={styles.courseItem} onPress={() => navigation.navigate('CourseDetail', { course: item })} >
      <View style={styles.imageContainer}>
      <Image source={item.image} style={styles.courseImage} />
      {item.bestSeller && (
        <View style={styles.bestSellerBadge}>
          <Text style={styles.bestSellerText}>Best Seller</Text>
        </View>
      )}
    </View>
      <View style={styles.courseInfo}>
        <View style ={styles.course_title_container} > 
          <Text style={styles.courseTitle} numberOfLines={1} ellipsizeMode="tail"> {item.title}</Text>
          <FontAwesomeIcon icon={faBookmark} />
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


  const CourseRecommentItem = ({ item }) => (
   
    <TouchableOpacity style={styles.courseItem} onPress={() => navigation.navigate('CourseDetail', { course: item })}>
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
      <Image source={item.image} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <View style ={styles.course_title_container}> 
          <Text style={styles.courseTitle} numberOfLines={1} ellipsizeMode="tail"> {item.title}</Text>
          <FontAwesomeIcon icon={faBookmark} />
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
    <TouchableOpacity style={styles.courseItemInpire} onPress={() => navigation.navigate('CourseDetail', { course: item })}>
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


  const topTeachers = [
    {
      id: '1',
      title: 'Chiristian Hayes',
      university: "University of California",
      rating: '4.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher1.png'),
    },
    {
      id: '2',
      title: 'Deniss Sweeneys',
      university: "University of California",
      rating: '4.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher2.png'),
    },
    {
      id: '3',
      title: 'Nancy Sweeneys',
      university: "University of California",
      rating: '4.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher3.png'),
    },
    {
      id: '4',
      title: 'Linda Sweeneys',
      university: "University of California",
      rating: '4.5 (1233)',
      lessons: '18 Lessons',
      image: require('../assets/images/teacher4.png'),
    },
  ];


  const topTeachersItem = ({ item }) => (
    <TouchableOpacity style={styles.courseItem}>
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style ={styles.header_title}>
          <Text style={styles.title}>Hello Lê phước Nguyên</Text>
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
        <TouchableOpacity>
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
        <TouchableOpacity>
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
        <TouchableOpacity>
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
        <TouchableOpacity>
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

      <View style ={styles.titlesection}>
        <Text style ={{fontWeight: 600}}>Top Teacher</Text>
        <TouchableOpacity>
          <Text style ={{color:"aqua"}}>View All</Text>
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


          <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Home')} >
          <FontAwesomeIcon icon={faHome} size={20} />
          <Text style={[styles.footerText , currentPage === 'Home' && styles.activeFooterText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('Search', { dataCourse })}>
          <FontAwesomeIcon icon={faSearch} size={20} />
          <Text style={[styles.footerText,currentPage === 'Search' && styles.activeFooterText]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <FontAwesomeIcon icon={faBook} size={20} />
          <Text style={[styles.footerText, currentPage === 'MyCourses' && styles.activeFooterText]}>My Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <FontAwesomeIcon icon={faUser} size={20} />
          <Text style={[styles.footerText,currentPage === 'Profile' && styles.activeFooterText]}>Profile</Text>
        </TouchableOpacity>
      </View>
      </View>
     </ScrollView>
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
  flex: 1,
  height: 60,
  backgroundColor: 'red',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%',
  borderTopWidth: 0.5,
  borderTopColor: 'gray',
  backgroundColor: 'white',
  position: 'relative',
  marginTop: 10,
  
},
footerItem: {
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: 12,
},
footerText: {
  color: 'black',
  fontSize: 12,
  fontWeight: '600',
},
activeFooterText: {
    color: 'blue', 

  },

});

export default LandingPage;