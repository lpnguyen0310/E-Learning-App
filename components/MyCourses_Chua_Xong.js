import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import * as Progress from 'react-native-progress';

// Dữ liệu mẫu cho danh sách khóa học
const coursesData = [
  {
    id: '1',
    title: 'UX Foundation',
    time: '2 hrs 25 mins',
    progress: 0.3,
    image: require('../assets/snack-icon.png'),
    lessons: [
      {
        module: 'I - Introduction',
        lessons: [
          {
            id: '01',
            title: 'Amet adipiscing consectetur',
            duration: '01:23 mins',
          },
          {
            id: '02',
            title: 'Culpa est incididunt enim id adi',
            duration: '01:23 mins',
          },
        ],
      },
      // Các module khác
      {
        module: 'II - Introduction',
        lessons: [
          {
            id: '01',
            title: 'Amet adipiscing consectetur',
            duration: '01:23 mins',
          },
          {
            id: '02',
            title: 'Culpa est incididunt enim id adi',
            duration: '01:23 mins',
          },
        ],
      },
      {
        module: 'III - Introduction',
        lessons: [
          {
            id: '01',
            title: 'Amet adipiscing consectetur',
            duration: '01:23 mins',
          },
          {
            id: '02',
            title: 'Culpa est incididunt enim id adi',
            duration: '01:23 mins',
          },
        ],
      },
      {
        module: 'IV - Introduction',
        lessons: [
          {
            id: '01',
            title: 'Amet adipiscing consectetur',
            duration: '01:23 mins',
          },
          {
            id: '02',
            title: 'Culpa est incididunt enim id adi',
            duration: '01:23 mins',
          },
        ],
      },
    ],
    projects: {
      studentProjects: [
        {
          id: '1',
          title: 'Wireframe',
          author: 'Ramono Wultschner',
          image: require('../assets/snack-icon.png'),
        },
        {
          id: '2',
          title: 'Personal',
          author: 'Thomas Carlson',
          image: require('../assets/snack-icon.png'),
        },
        {
          id: '3',
          title: 'Website Redesign',
          author: 'Ramon Wultschner',
          image: require('../assets/snack-icon.png'),
        },
      ],
      description:
        'Culpa aliquip commodo incididunt nostrud aliqua ut adipisicing officia. Laborum consequat ea reprehenderit voluptate voluptate quis pariatur dolor. Laboris proident ea fugiat nulla...',
      resources: [
        {
          id: '1',
          name: 'Document 1.txt',
          size: '612 Kb',
          type: '.txt',
          downloadLink: 'link_to_document_1',
        },
        {
          id: '2',
          name: 'Document 2.pdf',
          size: '35 Mb',
          type: '.pdf',
          downloadLink: 'link_to_document_2',
        },
      ],
    },

    qna: [
      {
        id: '1',
        user: 'Jane Barry',
        avatar: require('../assets/snack-icon.png'), // Đường dẫn đến ảnh đại diện
        time: 'A day ago',
        content:
          'Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est',
        likes: 23,
        comments: 5,
      },
      {
        id: '2',
        user: 'Thomas',
        avatar: require('../assets/snack-icon.png'),
        time: 'A day ago',
        content:
          'Excepteur excepteur minim nostrud cillum nostrud dolore voluptate ex minim est.',
        likes: 15,
        comments: 3,
      },
      {
        id: '3',
        user: 'Jenny Barry',
        avatar: require('../assets/snack-icon.png'),
        time: 'A day ago',
        content:
          'Minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est.',
        likes: 18,
        comments: 2,
      },
      // Thêm nhiều câu hỏi hơn nếu cần
    ],
  },
  {
    id: '3',
    title: 'Palettes for Your App',
    time: '4 hrs 50 mins',
    progress: 1,
    image: require('../assets/snack-icon.png'),
    lessons: [
      // Dữ liệu bài học cho "Palettes for Your App"
    ],
    qna: [
      // Dữ liệu Q&A cho "Palettes for Your App"
    ],
  },
  {
    id: '4',
    title: 'Typography in UI Design',
    time: '4 hrs 50 mins',
    progress: 0.5,
    image: require('../assets/snack-icon.png'),
    lessons: [
      // Dữ liệu bài học cho "Typography in UI Design"
    ],
    qna: [
      // Dữ liệu Q&A cho "Typography in UI Design"
    ],
  },
  // Add more course data as needed
];

// Thành phần khóa học
const CourseItem = ({ title, time, progress, image, item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={styles.courseItem}>
      <Image source={image} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.courseTime}>{time}</Text>
        <Progress.Bar progress={progress} width={200} color="#00BFFF" />
        <Text style={styles.courseProgress}>{`${Math.round(
          progress * 100
        )}% Complete`}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const MyCoursesScreen = ({ navigation }) => {
  const handleCoursePress = (course) => {
    navigation.navigate('LearningLesson', { course });
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Courses that boost your career!</Text>
        <TouchableOpacity style={styles.bannerButton}>
          <Text style={styles.bannerButtonText}>Check Now</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/snack-icon.png')}
          style={styles.bannerImage}
        />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity>
          <Text style={[styles.tab, styles.activeTab]}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.tab}>ON GOING</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.tab}>COMPLETED</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={coursesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseItem
            title={item.title}
            time={item.time}
            progress={item.progress}
            image={item.image}
            item={item}
            onPress={handleCoursePress} // Truyền hàm handleCoursePress vào đây
          />
        )}
        contentContainerStyle={styles.courseList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  banner: {
    backgroundColor: '#8a2be2',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerText: {
    color: '#FFFFFF',
    fontSize: 18,
    flex: 1,
  },
  bannerButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bannerImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    color: 'gray',
  },
  activeTab: {
    color: '#00BFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#00BFFF',
    paddingBottom: 4,
  },
  courseList: {
    paddingBottom: 20,
  },
  courseItem: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 15,
  },
  courseImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseTime: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  courseProgress: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
});

export default MyCoursesScreen;
