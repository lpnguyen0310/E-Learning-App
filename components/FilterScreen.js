import { StyleSheet, Text, View,CheckBox ,TouchableOpacity,FlatList,Image,ScrollView } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBookmark,faStar } from '@fortawesome/free-regular-svg-icons';
import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const FilterScreen = ({ navigation, route }) => {
    const [selectedCategories, setSelectedSubCategories] = useState({
      movie: false,
      business: false,
      code: false,
      design: false,
      writing: false,
      language: false,
      finance: false,
      office: false,
    });
  
    const [selectedRatings, setSelectedRatings] = useState({
      '3.0 & up': false,
      '3.5 & up': false,
      '4.0 & up': false,
      '4.5 & up': false,
    });
  
    const [priceRange, setPriceRange] = useState([0, 300]);
  
    // Hàm xử lý thay đổi trạng thái checkbox cho SubCategory
    const toggleSubCategory = (category) => {
      setSelectedSubCategories(prevState => ({
        ...prevState,
        [category]: !prevState[category],
      }));
    };
  
    // Hàm xử lý thay đổi trạng thái checkbox cho Rating
    const toggleRating = (rating) => {
      setSelectedRatings(prevState => ({
        ...prevState,
        [rating]: !prevState[rating],
      }));
    };
  
    const handleApplyFilters = () => {
        // Lọc và gửi dữ liệu đã chọn về màn hình SearchScreen
        navigation.navigate('Search', {
          selectedCategories,
          selectedRatings,
          priceRange,
        });
      };
  
    return (
        
      <View style={styles.container}>
        <ScrollView>
        {/* Bộ lọc subCategory với checkbox */}
        <Text style={styles.label}>SubCategory</Text>
        <View style={styles.checkboxContainer}>
          {Object.keys(selectedCategories).map(category => (
            <View key={category} style={styles.checkboxItem}>
              <CheckBox
                value={selectedCategories[category]}
                onValueChange={() => toggleSubCategory(category)}
              />
              <Text>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
            </View>
          ))}
        </View>
  
        {/* Bộ lọc Price */}
        <Text>Price Range: {priceRange[0]} - {priceRange[1]}</Text>
        <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={1000}
            step={10}
            value={priceRange[0]}
            onValueChange={(value) => setPriceRange([value, priceRange[1]])}
        />
        <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={1000}
            step={10}
            value={priceRange[1]}
            onValueChange={(value) => setPriceRange([priceRange[0], value])}
        />
  
        {/* Bộ lọc Rating với checkbox */}
        <Text style={styles.label}>Rating</Text>
        <View style={styles.checkboxContainer}>
          {Object.keys(selectedRatings).map(rating => (
            <View key={rating} style={styles.checkboxItem}>
              <CheckBox
                value={selectedRatings[rating]}
                onValueChange={() => toggleRating(rating)}
              />
              <Text>{rating}</Text>
            </View>
          ))}
        </View>
        </ScrollView>
        <TouchableOpacity style={styles.applyButton}  onPress={handleApplyFilters}>
          <Text style={styles.buttonText}>Apply Filters</Text>
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