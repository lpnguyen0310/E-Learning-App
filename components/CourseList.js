import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faFilter,faChartLine,faChevronRight,faPenNib,faCode,faVideo,faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { faStar,faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';


export default function CourseList({route, navigation}) {
    const { courses,categoryType  } = route.params; 

    if (!courses || courses.length === 0) {
        return (
          <View style={styles.container}>
            <Text>No courses found.</Text>
          </View>
        );
      }
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
    
      return (
        <View style={styles.container}>
           <Text style={styles.header}>{categoryType}</Text> 
          <View style={styles.searchBar}>
            <TextInput placeholder="Search Courses" style={styles.input} />
            <TouchableOpacity style={styles.filterButton}>
              <Icon name="sliders" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.resultsText}>Results for "{courses.length}" courses</Text>
          <FlatList
            data={courses}
            renderItem={renderItemSearch}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  filterButton: {
    marginLeft: 8,
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 8,
  },
 
 
  
  resultsText: {
    marginBottom: 16,
    fontSize: 16,
    color: '#555',
  },
  
  // Course List
  courseItemSearch: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 30,
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
});
