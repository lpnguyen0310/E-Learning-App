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
import Icon from 'react-native-vector-icons/Ionicons';

const mentors = [
  {
    id: '1',
    name: 'Branden S. Baker',
    course: '3D Modeling',
    image: require('../assets/snack-icon.png'),
  },
  {
    id: '2',
    name: 'Gregory M. Padgett',
    course: '3D Animation',
    image: require('../assets/snack-icon.png'),
  },
  {
    id: '3',
    name: 'Marie F. Munoz',
    course: '3D Printing',
    image: require('../assets/snack-icon.png'),
  },
  {
    id: '4',
    name: 'Sandra C. Florence',
    course: '3D Rendering',
    image: require('../assets/snack-icon.png'),
  },
  {
    id: '5',
    name: 'Justin W. Foxwell',
    course: '3D Visualization',
    image: require('../assets/snack-icon.png'),
  },
  {
    id: '6',
    name: 'Branden S. Baker',
    course: '3D Modeling',
    image: require('../assets/snack-icon.png'),
  },
  {
    id: '7',
    name: 'Gregory M. Padgett',
    course: '3D Animation',
    image: require('../assets/snack-icon.png'),
  },
  {
    id: '8',
    name: 'Marie F. Munoz',
    course: '3D Printing',
    image: require('../assets/snack-icon.png'),
  },
  {
    id: '9',
    name: 'Sandra C. Florence',
    course: '3D Rendering',
    image: require('../assets/snack-icon.png'),
  },
  {
    id: '10',
    name: 'Justin W. Foxwell',
    course: '3D Visualization',
    image: require('../assets/snack-icon.png'),
  },
  
];

export default function MentorsScreen() {
  const [search, setSearch] = useState('');
  const [searchMode, setSearchMode] = useState('course'); // Chế độ tìm kiếm: 'course' hoặc 'name'

  // Lọc mentor dựa vào chế độ tìm kiếm
  const filteredMentors = mentors.filter((mentor) => {
    if (searchMode === 'course') {
      return mentor.course.toLowerCase().includes(search.toLowerCase());
    }
    return mentor.name.toLowerCase().includes(search.toLowerCase());
  });

  const renderMentor = ({ item }) => (
    <View style={styles.mentorCard}>
      <Image source={item.image} style={styles.profileImage} />
      <View>
        <Text style={styles.mentorName}>{item.name}</Text>
        <Text style={styles.mentorField}>{item.field}</Text>
        <Text style={styles.mentorCourse}>{item.course}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Mentors</Text>
      </View>

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
    </View>
  );
}

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
});
