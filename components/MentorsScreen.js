// MentorsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';


export default function MentorsScreen({route,navigation}) {
  const { topTeachers,dataCourse } = route.params;
  const [search, setSearch] = useState('');
  const [searchMode, setSearchMode] = useState('course'); // Chế độ tìm kiếm: 'course' hoặc 'name'

  // Lọc mentor dựa vào chế độ tìm kiếm
  const filteredMentors = topTeachers.filter((mentor) => {
    if (searchMode === 'course') {
      return mentor.course.toLowerCase().includes(search.toLowerCase());
    }
    return mentor.title.toLowerCase().includes(search.toLowerCase());
  });

  const renderMentor = ({ item }) => (
    <View style={styles.mentorCard}>
      <Image source={item.image} style={styles.profileImage} />
      <View>
        <Text style={styles.mentorName}>{item.title}</Text>
        <Text style={styles.mentorField}>{item.field}</Text>
        <Text style={styles.mentorCourse}>{item.course}</Text>
      </View>
    </View>
  );
  const [currentPage, setCurrentPage] = useState('Home'); 
        

  // const handleNavigation = (page) => {
  //   setCurrentPage(page); // Cập nhật trang hiện tại
  //   navigation.navigate(page); // Chuyển hướng
  // };
  const handleNavigation = (page, params = {}) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
    navigation.navigate(page, params); // Chuyển hướng với dữ liệu params
  };
  return (

    
    <View style={styles.container}>

      {/* Thanh tìm kiếm và nút chuyển đổi chế độ tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Tìm kiếm theo ${
            searchMode === 'course' ? 'khóa học' : 'tên mentor'
          }`}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            searchMode === 'course' ? styles.activeButton : null,
          ]}
          onPress={() => setSearchMode('course')}>
          <Text style={styles.filterText}>Khóa học</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            searchMode === 'name' ? styles.activeButton : null,
          ]}
          onPress={() => setSearchMode('name')}>
          <Text style={styles.filterText}>Tên mentor</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.resultText}>
        Kết quả cho "
        {search || (searchMode === 'course' ? 'khóa học' : 'tên mentor')}"
      </Text>
      <Text style={styles.foundText}>{filteredMentors.length} TÌM THẤY</Text>

      <FlatList
        data={filteredMentors}
        renderItem={renderMentor}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      
      <View style={styles.footer}>
        <FooterItem icon={faHome} label="Home" currentPage={currentPage} onPress={() => handleNavigation('Home')} />
        <FooterItem icon={faSearch} label="Search" currentPage={currentPage} onPress={() => handleNavigation('Search', { dataCourse })} />
        <FooterItem icon={faBook} label="MyCourse" currentPage={currentPage} onPress={() => handleNavigation('MyCourse', { dataCourse })} />
        <FooterItem icon={faUser} label="Profile" currentPage={currentPage} onPress={() => handleNavigation('Profile', { dataCourse })} />
      </View>
    </View>
  );
}

const FooterItem = ({ icon, label, currentPage, onPress }) => (
  <TouchableOpacity style={styles.footerItem} onPress={onPress}>
    <FontAwesomeIcon icon={icon} color={currentPage === label ? 'blue' : 'black'}/>
    <Text style={[styles.footerText, currentPage === label && styles.activeFooterText]}>{label}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 5,
  },
  activeButton: {
    backgroundColor: '#2196F3',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  foundText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 16,
    marginBottom:20,
  },
  mentorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mentorField: {
    fontSize: 14,
    color: 'gray',
  },
  mentorCourse: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
  
  
  //footer
  footer: {
    position: 'absolute',  // Đặt footer ở cuối màn hình
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
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

});
