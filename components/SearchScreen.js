import React,{ useState, useEffect,useMemo  }  from 'react';
import { View, Text, StyleSheet,TextInput, ScrollView,TouchableOpacity,FlatList,Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faFilter,faChartLine,faChevronRight,faPenNib,faCode,faVideo,faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { faStar,faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';


import { getDatabase, ref, set,get } from "firebase/database";

//Kết nối firebase
import { app } from "../components/firebaseConfig";
const db = getDatabase(app);

function SearchScreen ({route,navigation}) {

  //Lấy dữ liệu User
  const {category ,dataCourse,user,isFromCategory,courses,categoryType, selectedSubcategories = [], selectedRatings = []  } = route.params;
const [userProfile, setUserProfile] = useState(); // Khởi tạo là một đối tượng rỗng
const [followCourses, setfollowCourses] = useState([]); // Khởi tạo danh sách khóa học là mảng rỗng

const isFocused = useIsFocused(); // Kiểm tra trạng thái focus của màn hình

useEffect(() => {
  if (route.params?.user) {
    setUserProfile(route.params?.user);
    console.log("userProfile SearchScreen ",userProfile)
  }
}, [route.params?.user]);

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
        console.log("Dữ liệu SearchScreen cập nhật:", data);
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
  
   // State lưu trữ từ khóa tìm kiếm và kết quả lọc
  const [keyword, setKeyword] = useState("");
  // State lưu trữ kết quả lọc dựa trên từ khóa
   const [filterActive, setFilterActive] = useState(false);
   // State lưu trữ kết quả lọc dựa trên từ khóa 
   const [filteredData, setFilteredData] = useState([]);

   const [noResults, setNoResults] = useState(false);
     
   // Memoize courses để tránh thay đổi tham chiếu mỗi lần render
  const memoizedCourses = useMemo(() => dataCourse, [dataCourse]);

  

  
  // 
  const placeholderText = isFromCategory && category ? `Search in ${category}` : 'Search';
  const navigateToCategory = (category) => {
    navigation.navigate('Search', { category , dataCourse,isFromCategory: true,selectedSubcategories, selectedRatings,user }); 
  };

   // Lọc theo từ khóa và các bộ lọc khác


  // Go to FilterScreen
  const navigateToFilter = () => {
    navigation.navigate('Filter', {
      courses,
      dataCourse,
      categoryType: category,
      selectedSubcategories,
      selectedRatings,
      isFromCategory,
      category,
      onApplyFilters: (newFilters) => {
        setFilteredCourses(newFilters);
        setFilterActive(true);
    },
      fromScreen: 'SearchScreen',
      user,  // Truyền thông tin về màn hình gốc
    });
  };


    const hotTopics = ['Java', 'SQL', 'Javascript', 'Python', 'Digital marketing', 'Photoshop', 'Watercolor'];
    const categories = [
        { id: '1',icon: <FontAwesomeIcon icon={faChartLine} style={{color: "#74C0FC",}} /> ,title: 'Business' },
        { id: '2',icon: <FontAwesomeIcon icon={faPenNib} style={{color: "#B197FC",}} /> ,title: 'Design' },
        { id: '3',icon:<FontAwesomeIcon icon={faCode} style={{color: "#e0101a",}} /> ,title: 'Code' },
        { id: '4',icon:<FontAwesomeIcon icon={faVideo} style={{color: "#B197FC",}} />, title: 'Movie' },
        { id: '5',icon: <FontAwesomeIcon icon={faEarthAmericas} style={{color: "#f4aa0b",}} />, title: 'Language' },
      ];

  
     // Lọc ra các khóa học được recommend
      const recommendCourses = dataCourse.filter(course => course.type === 'Recommend');

   

    

      // State lưu trữ trang hiện tại của ứng dụng
      const [currentPage, setCurrentPage] = useState('Search'); 

       const handleNavigation = (page, params = {}) => {
       setCurrentPage(page); // Cập nhật trang hiện tại
      navigation.navigate(page, params); // Chuyển hướng với dữ liệu params
      };
  
 
   // Search and filter
   const handleFilter = () => {
    const keywordLower = keyword.toLowerCase();
    let filteredResults;
  
    // Nếu không có từ khóa tìm kiếm
    if (!keywordLower) {
      // Nếu có danh mục được chọn
      if (category) {
        filteredResults = dataCourse.filter(course => course.categories === category);
      } 
    } else {
      // Nếu có từ khóa tìm kiếm, thực hiện lọc dữ liệu theo từ khóa và danh mục
      filteredResults = dataCourse.filter((item) => (
        item.title.toLowerCase().includes(keywordLower) &&
        (!category || item.categories === category)
      ));
    }
  
    // Cập nhật dữ liệu lọc
    setFilteredData(filteredResults);

    setFilterActive(true); // Kích hoạt bộ lọc khi có kết quả
    setNoResults();   // Hiển thị "No results found" khi không có kết quả
  };

    // Xử lý khi chọn một chủ đề trong danh sách chủ đề
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
      navigation.navigate('Category', { dataCourse: dataCourse,user });
    };

    // Xử lý khi click vào một chủ đề hot topic
     // Xử lý khi click vào một chủ đề hot topic
     const handleTopicPress = (topic) => {
      setKeyword(topic);
      const filteredResults = dataCourse.filter((item) => (
          item.title.toLowerCase().includes(topic.toLowerCase()) &&
          (!category || item.categories === category)
      ));
      setFilteredData(filteredResults);
      setFilterActive(filteredResults.length > 0);
    setNoResults(filteredResults.length === 0);
    };
   // Xử lý khi thay đổi từ khóa tìm kiếm
   // Xử lý khi thay đổi từ khóa tìm kiếm
   useEffect(() => {
    // Nếu không có từ khóa hoặc danh mục, hiển thị toàn bộ
    if (!keyword.trim() && !category) {
      if (dataCourse.length > 0) {
          // Nếu có dữ liệu, hiển thị tất cả
          setFilteredData(dataCourse);
          setFilterActive(false);
          setNoResults(false); // Đảm bảo trạng thái không kết quả là false
      } else {
          // Nếu không có dữ liệu
          setFilteredData([]);
          setFilterActive(false);
          setNoResults(true); // Hiển thị "NO RESULT FOUND"
      }
      return; // Dừng xử lý thêm nếu không có từ khóa hoặc danh mục
  }

    // Lọc theo từ khóa, danh mục, và các bộ lọc khác
    let filteredResults = dataCourse.filter((item) => (
        item.title.toLowerCase().includes(keyword.toLowerCase()) &&
        (!category || item.categories === category)
    ));

    // Thêm các bộ lọc khác nếu cần
    if (selectedSubcategories.length > 0) {
        filteredResults = filteredResults.filter((course) =>
            selectedSubcategories.includes(course.categories)
        );
    }
    if (selectedRatings.length > 0) {
        filteredResults = filteredResults.filter((course) =>
            selectedRatings.some((rating) => parseFloat(course.rating) >= rating)
        );
    }

    if (JSON.stringify(filteredResults) !== JSON.stringify(filteredData)) {
      setFilteredData(filteredResults);
  }
    setNoResults(filteredResults.length === 0); 
    setFilterActive(filteredResults.length > 0);
    
    // Cập nhật trạng thái noResults
  
}, [keyword, category, selectedSubcategories, selectedRatings, dataCourse]);

const handlekeyword = (text) => {
  setKeyword(text);
  if (text.trim() === '') {
    setFilteredData(dataCourse);
    setFilterActive(false);
    setNoResults(false);
  } else {
    handleFilter();
  }
};

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
  navigation.navigate('CourseList', { user:user,courses,categoryType ,dataCourse: dataCourse });
};

  // Render một chủ đề trong danh sách chủ đề
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

// Render một khóa học trong danh sách khóa học được recommend
const CourseRecommentItem = ({ item  }) => (
  
  <TouchableOpacity style={styles.courseItem} onPress={() => navigation.navigate('CourseDetail', { course: item,dataCourse: dataCourse ,user:userProfile })}
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

// Render kết quả tìm kiếm 
const renderItemSearch = ({ item }) => (
<TouchableOpacity style={styles.courseItemSearch}  onPress={() => navigation.navigate('CourseDetail', { course: item,dataCourse: dataCourse ,user })}>
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
                        onChangeText={handlekeyword}
                        onSubmitEditing={handleFilter} 
                        />
              </View>
            <View style = {styles.filtercontainer}>
                <TouchableOpacity style ={styles.filterButton}  onPress={navigateToFilter}>
                        <FontAwesomeIcon icon={faFilter} />
                        <Text style ={{marginLeft:5}}>Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
        {noResults ? (
            <View style={styles.container_search}>
                <Text style={styles.noResultsText}>NO RESULT FOUND</Text>
             </View>
           ) : filterActive ? (
            <View style={styles.container_search}>
              <View style={styles.result_search}>
                <FlatList
                  data={filteredData}
                  renderItem={renderItemSearch}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.resultsContainer}
                  numColumns={1}
                  initialNumToRender={10} 
                />
              </View>
            </View>
          ) :(
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
            <TouchableOpacity onPress={() => navigateToCourses('Recommend')}>
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
      <FooterItem icon={faHome} label="Home" currentPage={currentPage} onPress={() => handleNavigation('Home',{ dataCourse,user })} />
      <FooterItem icon={faSearch} label="Search" currentPage={currentPage} onPress={() => handleNavigation('Search', { dataCourse ,user})} />
      <FooterItem icon={faBook} label="MyCourse" currentPage={currentPage} onPress={() => handleNavigation('MyCourse', { dataCourse ,user})} />
      <FooterItem icon={faUser} label="Profile" currentPage={currentPage} onPress={() => handleNavigation('Profile', { dataCourse ,user})} />
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