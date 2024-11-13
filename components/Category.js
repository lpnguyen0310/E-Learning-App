import { StyleSheet, Text, View,ImageBackground,TouchableOpacity,FlatList,Image,ScrollView } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBookmark,faStar } from '@fortawesome/free-regular-svg-icons';
import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';



function Category({navigation,route}) {

    const { dataCourse } = route.params;
    
    const categories = [
        { id: '1', image :require('../assets/images/category/business.png') , title: 'Business' },
        { id: '2',image :require('../assets/images/category/code.png'), title: 'Code' },
        { id: '3',image :require('../assets/images/movie.png'), title: 'Movie' },
        { id: '4',image :require('../assets/images/category/design3d.png'), title: 'Design' },
        { id: '5',image :require('../assets/images/writing.png'), title: 'Writing' },
        { id: '6',image :require('../assets/images/language.png'), title: 'Language' },
        { id: '7',image :require('../assets/images/category/finance.png'), title: 'Finance' },
        { id: '8',image :require('../assets/images/category/office.png'), title: 'Office' },
    ];    

    const handleCategoryPress = (category) => {
        navigation.navigate('Search', {
            category: category.title,  // Truyền category vào SearchScreen
            isFromCategory: true,
            dataCourse: dataCourse  // Truyền dataCourse vào SearchScreen
        });
    };



    const renderCategoryList = ({ item }) => {
        return(
          <TouchableOpacity style = {styles.categoryContainer} onPress={() => handleCategoryPress(item)}>
            <View style={styles.Category}>
                <Image source={item.image} style={{width: 40, height: 40}} />
                <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>

        );
    }  
    return (
        <View style = {styles.container}>
           <Text style ={{padding:10,fontWeight:700}}>All Categories</Text>     
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style ={styles.categoly_flat_list}>
                <FlatList
                    data={categories}
                    renderItem={renderCategoryList}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
            </View>
          </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },

    categoryContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        justifyContent: 'center',
        flex: 1,
    },  
    Category: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'lightgrey', 
        width: 120,
        height: 120,
        justifyContent: 'center',
        borderRadius: 15,

    },
    categoly_flat_list:{
        flexDirection: 'row',
        width: '100%',
        flex:1,
        },
    title: {
        fontSize: 15,
        color: '#333333',
        marginTop: 10,
    },
});

export default Category;