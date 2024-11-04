  import React,{ useState, useEffect }  from 'react';
  import { View, Text, StyleSheet,TextInput, ScrollView,TouchableOpacity,FlatList,Image } from 'react-native';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faMagnifyingGlass,faFilter,faChartLine,faChevronRight,faPenNib,faCode,faVideo,faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
  import { faStar,faBookmark } from '@fortawesome/free-regular-svg-icons';
  import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';







  function SearchScreen ({navigation}) {
      const hotTopics = ['Java', 'SQL', 'Javascript', 'Python', 'Digital marketing', 'Photoshop', 'Watercolor'];
      const categories = [
          { id: '1',icon: <FontAwesomeIcon icon={faChartLine} style={{color: "#74C0FC",}} /> ,title: 'Business' },
          { id: '2',icon: <FontAwesomeIcon icon={faPenNib} style={{color: "#B197FC",}} /> ,title: 'Design' },
          { id: '3',icon:<FontAwesomeIcon icon={faCode} style={{color: "#e0101a",}} /> ,title: 'Code' },
          { id: '4',icon:<FontAwesomeIcon icon={faVideo} style={{color: "#B197FC",}} />, title: 'Movie' },
          { id: '5',icon: <FontAwesomeIcon icon={faEarthAmericas} style={{color: "#f4aa0b",}} />, title: 'Language' },
        ];

        const renderCategoryItem  = ({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity style={styles.categoryItem}>
                  <View style ={styles.inner_categorytitle}>
                    {item.icon}
                  <Text style={styles.categoryText}>{item.title}</Text>
                  </View>
                  <FontAwesomeIcon icon={faChevronRight} />
                
            </TouchableOpacity>
          </View>
        );

        const CourseRecomment = [
          {
            id: '1',
            title: 'Website Design',
            teacher: 'Ramano Wultschiner',
            price: '$59',
            rating: '4.5 (1233)',
            lessons: '9 Lessons',
            image: require('../assets/images/webdesign.png'),
            bestSeller: false, 
            discount: true,
          },
          {
            id: '2',
            title: 'Ux Research For Beginners',
            teacher: 'Olivia Wang',
            price: '$29',
            rating: '4.5 (1782)',
            lessons: '12 Lessons',
            image: require('../assets/images/uxresearch.png'),
            bestSeller: true, 
            discount: false,
          },
          {
            id: '3',
            title: 'UI/UX for Beginners',
            teacher: 'Emily Johnson',
            price: '$20',
            rating: '4.3 (3652)',
            lessons: '15 Lessons',
            image: require('../assets/images/uix.png'),
            bestSeller: false, 
            discount: true,
          },
          {
            id: '4',
            title: 'Design Thinking 101',
            teacher: 'Michael Brown',
            price: '$36',
            rating: '4.8 (3256)',
            lessons: '25 Lessons',
            image: require('../assets/images/designpattern.png'),
            bestSeller: true,
            discount: false,
          },
        ];

        const CourseRecommentItem = ({ item }) => (
    
          <TouchableOpacity style={styles.courseItem}>
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


   const [currentPage, setCurrentPage] = useState('Search'); 

    const handleNavigation = (page) => {
      setCurrentPage(page); // Cập nhật trang hiện tại
      navigation.navigate(page); // Chuyển hướng
    };

   
    return (
      <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
          <View style ={styles.headerSearch}>
              <View style ={styles.inputSearch}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{padding:8}} />
                      <TextInput
                          placeholder="Search"
                          clearButtonMode='always'
                          style={{height: 40, borderColor: 'gray',width: "100%",color :"grey",borderRadius: 8}}
                                    />
                </View>
              <View style = {styles.filtercontainer}>
                  <TouchableOpacity style ={styles.filterButton}>
                          <FontAwesomeIcon icon={faFilter} />
                          <Text style ={{marginLeft:5}}>Filter</Text>
                  </TouchableOpacity>
              </View>
          </View>

               
        
        <View style = {styles.containerBody}>
          <View style ={styles.titlehot}>
              <Text style = {{fontWeight:600}}>Hot Topics</Text>
          </View>
          <View style = {styles.hottopic}>
              {hotTopics.map((topic) => (
                  <TouchableOpacity key={topic} style={styles.topicButton}>
                  <Text style={styles.topicButtonText}>{topic}</Text>
                  </TouchableOpacity>
                  ))}   
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
                numColumns={1} 
                contentContainerStyle={styles.categoryList}
              />
          </View>

          <View style ={styles.titlesection}>
              <Text style ={{fontWeight: 600}}>Recommended For You</Text>
              <TouchableOpacity>
              <Text style ={{color:"aqua"}}>View more</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.flat_list_courses}>
          <FlatList
            data={CourseRecomment}
            renderItem={CourseRecommentItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View>
      </View>

      </View>
      </ScrollView> 
        <View style={styles.footer}>
        <FooterItem icon={faHome} label="Home" currentPage={currentPage} onPress={() => navigation.navigate('Home')}/>
        <FooterItem icon={faSearch} label="Search" currentPage={currentPage} onPress={() => setCurrentPage('Search')} />
        <FooterItem icon={faBook} label="My Courses" currentPage={currentPage} onPress={() => setCurrentPage('MyCourses')} />
        <FooterItem icon={faUser} label="Profile" currentPage={currentPage} onPress={() => setCurrentPage('Profile')} />
      </View>
        </View>
    );
  };
  const FooterItem = ({ icon, label, currentPage, onPress }) => (
    <TouchableOpacity style={styles.footerItem} onPress={onPress}>
      <FontAwesomeIcon icon={icon} size={20} />
      <Text style={[styles.footerText, currentPage === label && styles.activeFooterText]}>{label}</Text>
    </TouchableOpacity>
  );
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      width: "100%",
      flexDirection: "column",
      flex: 1,
      justifyContent: "space-around",
    },
    headerSearch:{
      flexDirection: "row",
      justifyContent: "space-between",    
      width: "100%",
      padding: 10,
      alignItems: "center",
  },
  inputSearch:{
      flexDirection: "row",
      width: "75%",
      alignItems: "center",
      border: "1px solid black",
      backgroundColor:  "#eff0f2",
      borderRadius: 8,
      height: 40,
      
  },
  filtercontainer:{
      flexDirection: "column",
      width: "10%",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
  },
  filterButton:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "aqua",
      padding: 10,
      borderRadius: 5,
      height: 40,
  },

  titlehot:{
      width: "100%",
      padding: 10,
  },

  // Body
  containerBody:{
      flexDirection: "column",
      width: "100%",
      padding: 10,
      justifyContent: "space-between",
      flex: 6
    },
    

  container_search:{
      flexDirection: "column",
      width: "100%",
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      flex: 1,

  
  },
  result_search:{
      flexDirection: "column",
      width: "100%",
      flex: 1,
  },


  // Hot Topics
  hottopic:{
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 0,
      width: "100%",
      padding: 5,

  },
  topicButton: {
      backgroundColor: '#f0f0f0', 
      borderRadius: 20,
      padding: 10,
      margin: 5,
      border: "1px solid aqua",
      backgroundColor: "white",
    },
      topicButtonText: {
      color: 'aqua',
      fontSize: 14,
      fontWeight: '600',
  },
  
    titlesection:{
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      padding: 10,
      marginBottom: 0,
      marginTop: 20 ,
    },

    // Categories
    flat_list_category:{
      width: "100%",
      padding: 5,
    },
    item: {
      width: "98%",
    },  
    inner_categorytitle:{
      flexDirection: "row",
      alignItems: "center",
    },
    categoryItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: 5,
      padding: 10 ,
      margin: 5,
      width: "100%",
      border: "0.1px solid grey",
    },
    categoryText: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 10,
    },

    // Course Recommend
    flat_list_courses: {
      width: "100%",
    },
    courseItem: {
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

  // Footer
  footer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    backgroundColor: 'white',    
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
    fontWeight: 'bold',
    fontSize: 14,
  },

  });

  export default SearchScreen;