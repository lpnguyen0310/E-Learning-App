  import React,{ useState, useEffect }  from 'react';
  import { View, Text, StyleSheet,TextInput, ScrollView,TouchableOpacity,FlatList,Image } from 'react-native';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faMagnifyingGlass,faFilter,faChartLine,faChevronRight,faPenNib,faCode,faVideo,faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
  import { faStar,faBookmark } from '@fortawesome/free-regular-svg-icons';
  import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';







  function SearchScreen ({route,navigation}) {
    // Lấy dữ liệu khóa học từ route params từ trang HomeScreen
    const {category ,dataCourse,isFromCategory } = route.params;
     // State lưu trữ từ khóa tìm kiếm và kết quả lọc
    const [keyword, setKeyword] = useState("");
    // State lưu trữ kết quả lọc dựa trên từ khóa
     const [filterActive, setFilterActive] = useState(false);
     // State lưu trữ kết quả lọc dựa trên từ khóa 
     const [filteredData, setFilteredData] = useState([]);
       

    
    // 
    const placeholderText = isFromCategory && category ? `Search in ${category}` : 'Search';
    const navigateToCategory = (category) => {
      navigation.navigate('Search', { category , dataCourse,isFromCategory: true });
    };



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
            <TouchableOpacity style={styles.categoryItem} onPress={() => navigateToCategory(item.title)} >
                  <View style ={styles.inner_categorytitle}>
                    {item.icon}
                  <Text style={styles.categoryText}>{item.title}</Text>
                  </View>
                  <FontAwesomeIcon icon={faChevronRight} />
                
            </TouchableOpacity>
          </View>
        );
       // Lọc ra các khóa học được recommend
        const recommendCourses = dataCourse.filter(course => course.type === 'Recommend');

     

        // Render một khóa học trong danh sách khóa học được recommend
        const CourseRecommentItem = ({ item  }) => (
    
          <TouchableOpacity style={styles.courseItem} onPress={() => navigation.navigate('CourseDetail', { course: item,dataCourse: dataCourse  })}
>
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

        // State lưu trữ trang hiện tại của ứng dụng
        const [currentPage, setCurrentPage] = useState('Search'); 
        

        const handleNavigation = (page) => {
          setCurrentPage(page); // Cập nhật trang hiện tại
          navigation.navigate(page); // Chuyển hướng
        };
    
        
    
   
    
        // Xử lý khi nhấn nút Filter để lọc kết quả
        const handleFilter = () => {
          const keywordLower = keyword.toLowerCase();
          if (!keywordLower) {
            if (category) {
              setFilteredData(dataCourse.filter(course => course.categories === category));
            } else {
                setFilteredData(dataCourse); // Không có danh mục, hiển thị toàn bộ
            }
        } else {
            // Nếu có keyword, thực hiện lọc dựa trên từ khóa và điều kiện giảm giá
            const filteredResults = dataCourse.filter((item) => (
                item.title.toLowerCase().includes(keywordLower)  &&
                (!category || item.categories === category)
            ));
            setFilteredData(filteredResults);
        }

        setFilterActive(true);
      };

  
     


      // Xử lý khi chọn một chủ đề trong mục Hot Topics
      useEffect(() => {
        if (category && isFromCategory) {
          const filteredCourses = dataCourse.filter(course => course.categories === category);
          setFilteredData(filteredCourses);
          setFilterActive(true);
        } else {
          setFilteredData(dataCourse);
          setFilterActive(false);
        }
      }, [category, isFromCategory,dataCourse]);

      // Xử lý khi nhấn vào nút View All
      const handleViewAllPress = () => {
        navigation.navigate('Category', { dataCourse: dataCourse });
      };

        // Render kết quả tìm kiếm 
        const renderItemSearch = ({ item }) => (
          <TouchableOpacity style={styles.courseItemSearch}  onPress={() => navigation.navigate('CourseDetail', { course: item,dataCourse: dataCourse  })}>
              {item.bestSeller && (
                  <View style={styles.bestSellerBadge}>
                      <Text style={styles.bestSellerText}>Best Seller</Text>
                  </View>
              )}
              {item.discount && (
                  <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>20% OFF</Text>
                  </View>
              )}
              <Image source={item.image} style={styles.courseImageSearch} />
              <View style={styles.courseListSeach}>
                  <View style ={styles.course_item_title_search}> 
                      <Text style={styles.courseTitle} numberOfLines={1} ellipsizeMode="tail"> {item.title}</Text>
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

      // Xử lý khi click vào một chủ đề hot topic
      const handleTopicPress = (topic) => {
        setKeyword(topic);
        setFilterActive(true);
        const filteredResults = dataCourse.filter((item) => (
            item.title.toLowerCase().includes(topic.toLowerCase()) &&
            (!category || item.categories === category)
        ));
        setFilteredData(filteredResults);
      };

      const handleKeywordChange = (text) => {
        setKeyword(text);
        if (text) {
          const filteredResults = dataCourse.filter((item) => (
            item.title.toLowerCase().includes(text.toLowerCase()) &&
            (!category || item.categories === category)
          ));
          setFilteredData(filteredResults);
          setFilterActive(true);
        } else {
          setFilterActive(false); // Tắt chế độ lọc nếu không có từ khóa
          setFilteredData(dataCourse); // Hoặc hiển thị toàn bộ dữ liệu
        }
      };
   
    return (
      <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
          <View style ={styles.headerSearch}>
              <View style ={styles.inputSearch}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{padding:8}} />
                      <TextInput
                          placeholder={placeholderText}
                          style={{height: 40, borderColor: 'gray',width: "100%",color :"grey",borderRadius: 8}}
                          value={keyword}
                          onChangeText={handleKeywordChange}
                          onSubmitEditing={handleFilter} 
                           />
                </View>
              <View style = {styles.filtercontainer}>
                  <TouchableOpacity style ={styles.filterButton}  onPress={() => navigation.navigate('Filter', { dataCourse  })}>
                          <FontAwesomeIcon icon={faFilter} />
                          <Text style ={{marginLeft:5}}>Filter</Text>
                  </TouchableOpacity>
              </View>
          </View>
          {filterActive ? (
            <View style ={styles.container_search}>
                <View style ={styles.result_search}>
                <FlatList
                data={filteredData}
                renderItem={renderItemSearch}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.resultsContainer}
                numColumns={1}

              />
                </View>

            </View>
            
               
          ) : (
        <View style = {styles.containerBody}>
          <View style ={styles.titlehot}>
              <Text style = {{fontWeight:600}}>Hot Topics</Text>
          </View>
          <View style = {styles.hottopic}>
              {hotTopics.map((topic) => (
                  <TouchableOpacity key={topic} style={styles.topicButton} onPress={() => handleTopicPress(topic)}>
                  <Text style={styles.topicButtonText}>{topic}</Text>
                  </TouchableOpacity>
                  ))}   
          </View>
          <View style ={styles.titlesection}>
              <Text style ={{fontWeight: 600}}>Categories</Text>
              <TouchableOpacity  onPress={handleViewAllPress}>
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
            data={recommendCourses}
            renderItem={CourseRecommentItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View>
      </View>
        )} 
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
      <FontAwesomeIcon icon={icon} />
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
      alignItems: "center",
      border: "1px solid black",
      backgroundColor:  "#eff0f2",
      borderRadius: 8,
      height: 40,
      marginRight:0,
      flex:1,
   
      
  },
  filtercontainer:{
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 10,
      height: 40,
  
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
    height: 50,
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
  // Kết quả tìm kiếm
  resultsContainer: {
    flex: 1,
    width: "100%",
},
resultsCount: {
    fontSize: 16,
    marginBottom: 8,
},
noResultsText: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
},

// item search
courseItemSearch: {
  flexDirection: "row",
  backgroundColor: "white",
  borderRadius: 10,
  padding: 10,
  marginBottom: 10,
  width: "100%",
  flex:1,
},

courseImageSearch: {
  width: 120,
  height: 120,
  borderRadius: 10,
},

courseListSeach: {
  flexDirection: "column",
  justifyContent: "space-around",
  paddingLeft: 10,
  width: "100%",
  flex:1,
},
course_item_title_search:{
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
},


  });

  export default SearchScreen;