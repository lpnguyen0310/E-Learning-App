import { StyleSheet, Text, View,CheckBox ,TouchableOpacity,FlatList,Image,ScrollView,Button } from "react-native";
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';


const subcategories = ['Code', 'Movie', 'Design', 'Language'];
const ratings = [3.0, 3.5, 4.0, 4.5];

const FilterScreen = ({ navigation, route }) => {
  const { courses } = route.params;
 
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

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
    let filteredCourses = courses;

    if (selectedSubcategories.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        selectedSubcategories.includes(course.categories)
      );
    }

    if (selectedRatings.length > 0) {
      filteredCourses = filteredCourses.filter((course) => {
        // Kiểm tra điều kiện rating >= value
        return selectedRatings.some((rating) => parseFloat(course.rating) >= rating);
      });
    }

    // Chuyển kết quả lọc về màn hình CourseList
    navigation.navigate('CourseList', { courses: filteredCourses });
  };

  // Reset bộ lọc
  const resetFilters = () => {
    setSelectedCategories({
      Code: false,
      Design: false,
      Writing: false,
      Movie: false,
      Business: false,
      Language: false,
      Finance: false,
      Office: false,
    });
    setSelectedRatings({
      '3.0': false,
      '3.5': false,
      '4.0': false,
      '4.5': false,
    });
  }
      

 

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

      <Button title="Apply Filters" onPress={applyFilters} />
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
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
  },
});


export default FilterScreen;