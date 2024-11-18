import { StyleSheet, Text, View,CheckBox ,TouchableOpacity,FlatList,Image,ScrollView,Button } from "react-native";
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';




const FilterScreen = ({ navigation, route }) => {
  const { fromScreen ,courses,dataCourse: dataCourse, categoryType,selectedSubcategories: prevSelectedSubcategories = [], selectedRatings: prevSelectedRatings = [] } = route.params || {};
  
  const subcategories = ['Code', 'Movie', 'Design', 'Language','Business','Finance','Office','Writing'];
  const ratings = [3.0 , 3.5, 4.0, 4.5];

  // State Management
  const [selectedSubcategories, setSelectedSubcategories] = useState(prevSelectedSubcategories);
  const [selectedRatings, setSelectedRatings] = useState(prevSelectedRatings);

  // Cập nhật checkbox
  const toggleSubcategory = (subcategory) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((item) => item !== rating)
        : [...prev, rating]
    );
  };

  // Lọc khóa học theo subcategory và rating
  const applyFilters = () => {
   

    if(fromScreen === 'CourseList') {
    // Truyền các bộ lọc về CourseList và cập nhật filteredCourses
    navigation.navigate('CourseList', {
      courses, // Truyền lại tất cả khóa học để lọc trên đó
      selectedSubcategories,
      selectedRatings,
      categoryType,  // Truyền loại khóa học nếu cần thiết
    });
    }else if(fromScreen === 'SearchScreen'){
      navigation.navigate('Search', {
        dataCourse, // Truyền lại tất cả khóa học để lọc trên đó
        selectedSubcategories,
        selectedRatings,
        categoryType,  // Truyền loại khóa học nếu cần thiết
      });
    }
  };

  // Reset bộ lọc
  const resetFilters = () => {
    setSelectedSubcategories([]);
    setSelectedRatings([]);
    let resetCourses = courses || dataCourse;

    // Reset bộ lọc và trả về CourseList với tất cả khóa học
   if(fromScreen === 'CourseList') {
    navigation.navigate('CourseList', {
      courses, // Truyền lại tất cả khóa học
      selectedSubcategories: [],
      selectedRatings: [],
      categoryType,  // Truyền lại loại khóa học nếu cần thiết
    });
    }else if(fromScreen === 'SearchScreen'){
      navigation.navigate('Search', {
        dataCourse: resetCourses , // Truyền lại tất cả khóa học để lọc trên đó
        selectedSubcategories:[],
        selectedRatings:[],
        categoryType,  // Truyền loại khóa học nếu cần thiết
      });
    }
  };

 

    return (
      <View style={styles.container}>
      <Text style={styles.header}>Filter Courses</Text>

      <Text style={styles.filterTitle}>Subcategory</Text>
      {subcategories.map((subcategory) => (
        <View key={subcategory} style={styles.checkboxContainer}>
          <CheckBox
            value={selectedSubcategories.includes(subcategory)}
            onValueChange={() => toggleSubcategory(subcategory)}
          />
          <Text>{subcategory}</Text>
        </View>
      ))}

      <Text style={styles.filterTitle}>Rating</Text>
      {ratings.map((rating) => (
        <View key={rating} style={styles.checkboxContainer}>
          <CheckBox
            value={selectedRatings.includes(rating)}
            onValueChange={() => toggleRating(rating)}
          />
          <Text>{rating}</Text>
        </View>
      ))}

      <View style={styles.buttonRow}>
        {/* Apply Filters button */}
        <TouchableOpacity style={[styles.button, styles.applyButton]} onPress={applyFilters}>
          <Text style={styles.buttonText}>Apply</Text>
          <View style={styles.circleIconContainer}>
            <FontAwesomeIcon icon={faArrowRight} style={styles.icon} />
          </View>
        </TouchableOpacity>

        {/* Reset Filters button */}
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetFilters}>
          <Text style={styles.buttonText}>Reset</Text>
          <View style={styles.circleIconContainerReset}>
            <FontAwesomeIcon icon={faArrowRight} style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
        
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
    gap:'0 10px',
  },
  filterButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
  },
  // Button styles
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    width: '48%',
   gap:'0 10px',
   justifyContent: 'center',
  },
  applyButton: {
    backgroundColor: '#007BFF', // Blue color
    borderColor: '#007BFF', 
  },
  resetButton: {
    backgroundColor: 'grey', // Light gray
    borderColor: '#D3D3D3',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1, // Ensures that text is centered
    textAlign: 'center', // Center align the text
  },
  // Icon styles
  circleIconContainer: {
    width: 40,
    height: 40,
    gap:'0 10px',
    borderRadius: 20, // Creates a circle
    backgroundColor: '#74C0FC', // White background for circle
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#74C0FC', // Border color for the circle
  },
  circleIconContainerReset: {
    width: 40,
    height: 40,
    gap:'0 10px',
    borderRadius: 20, // Creates a circle
    backgroundColor: '#D3D3D3', // White background for circle
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'grey', // Border color for the circle
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});


export default FilterScreen;