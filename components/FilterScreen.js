import { StyleSheet, Text, View,CheckBox ,TouchableOpacity,FlatList,Image,ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';




const FilterScreen = ({ navigation, route }) => {
  const { filteredData ,dataCourse ,selectedCategories: initialSelectedCategories, selectedRatings: initialSelectedRatings } = route.params;
  const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories ||{
    Code: false,
    Design: false,
    Writing: false,
    Movie: false,
    Business: false,
    Language: false,
    Finance: false,
    Office: false,
  });

  // State cho rating như một đối tượng
  const [selectedRatings, setSelectedRatings] = useState( initialSelectedRatings ||{
    '3.0': false,
    '3.5': false,
    '4.0': false,
    '4.5': false,
  });


     // Xử lý khi người dùng chọn/deselect category
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  // Xử lý khi người dùng chọn/deselect rating
  const handleRatingChange = (rating) => {
    setSelectedRatings((prevState) => ({
      ...prevState,
      [rating]: !prevState[rating],
    }));
  };

   // Lưu và áp dụng bộ lọc
   const applyFilters = () => {
    const selectedCategoryKeys = Object.keys(selectedCategories).filter(
      (key) => selectedCategories[key]
    );
    const selectedRatingKeys = Object.keys(selectedRatings).filter(
      (key) => selectedRatings[key]
    );

    // Lọc dữ liệu đã tìm kiếm trước đó theo bộ lọc
    const finalFilteredData = filteredData.filter(course => {
      const categoryMatch =
        selectedCategoryKeys.length === 0 || selectedCategoryKeys.includes(course.category);

      const ratingMatch =
        selectedRatingKeys.length === 0 || selectedRatingKeys.some(rating => {
          return parseFloat(course.rating) >= parseFloat(rating);
        });

      return categoryMatch && ratingMatch;
    });

    // Chuyển kết quả đã lọc sang SearchScreen
    navigation.navigate('Search', {
      filteredData: finalFilteredData,
      selectedCategories: selectedCategoryKeys,
      selectedRatings: selectedRatingKeys,
    });
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
        <ScrollView style ={{flexGrow:1}}>
        {/* Bộ lọc subCategory với checkbox */}
        <Text style={styles.label}>SubCategory</Text>
        <View style={styles.checkboxContainer}>
          {Object.keys(selectedCategories).map(category => (
            <View key={category} style={styles.checkboxItem}>
              <CheckBox
                value={selectedCategories[category]}
                onValueChange={() => handleCategoryChange(category)}
              />
              <Text>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
            </View>
          ))}
        </View>
  
        {/* Bộ lọc Price */}
        {/* <Text>Price Range: {priceRange[0]} - {priceRange[1]}</Text>
        <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={300}
            step={10}
            value={priceRange[0]}
            onValueChange={(value) => setPriceRange([value, priceRange[1]])}
        />
        <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={300}
            step={10}
            value={priceRange[1]}
            onValueChange={(value) => setPriceRange([priceRange[0], value])}
        />
   */}
        {/* Bộ lọc Rating với checkbox */}
        <Text style={styles.label}>Rating</Text>
        <View style={styles.checkboxContainer}>
          {Object.keys(selectedRatings).map(rating => (
            <View key={rating} style={styles.checkboxItem}>
              <CheckBox
                value={selectedRatings[rating]}
                onValueChange={() => handleRatingChange(rating)}
              />
              <Text>{rating} & above</Text>
            </View>
          ))}
        </View>
        </ScrollView>
        <TouchableOpacity style={styles.applyButton}  onPress={applyFilters}>
          <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetFilters} style={{ backgroundColor: 'gray', padding: 10, marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Reset Filters</Text>
      </TouchableOpacity>
        {/* Nút Apply */}
      </View>
     
        
    );
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
      },
      label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
      },
      checkboxContainer: {
        marginVertical: 10,
        paddingLeft: 20,
      },
      checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: '0 10px',
      },
      slider: {
        width: '100%',
        height: 40,
        marginVertical: 10,
      },
      applyButton: {
        marginTop: 30,
        backgroundColor: '#007AFF',
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
      },
      buttonText: {
        color: '#FFF',
        fontSize: 18,
      },
});


export default FilterScreen;