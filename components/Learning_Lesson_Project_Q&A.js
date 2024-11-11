import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faSearch,faBook,faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const LessonItem = ({ lesson }) => (
  <View style={[styles.lessonItem, lesson.active ? styles.activeLesson : null]}>
    <Text style={styles.lessonNumber}>{lesson.id}</Text>
    <View style={styles.lessonInfo}>
      <Text style={styles.lessonTitle}>{lesson.title}</Text>
      <Text style={styles.lessonDuration}>{lesson.duration}</Text>
    </View>
    {lesson.completed && <Icon name="checkmark" size={20} color="#00BFFF" />}
    {lesson.active && <Icon name="play-outline" size={20} color="#00BFFF" />}
  </View>
);

const LearningLesson = ({ route }) => {
  const navigation = useNavigation();
  const { course,dataCourse } = route.params;


  const [lessonsData, setLessonsData] = useState(course.lessons);

  const toggleSection = (sectionId) => {
    setLessonsData((prevData) =>
      prevData.map((section) =>
        section.id === sectionId
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
  };
  const [activeTab, setActiveTab] = useState('LESSONS');

  const [currentPage, setCurrentPage] = useState('MyCourse'); // State để theo dõi trang hiện tại

  const handleNavigation = (page, params = {}) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
    navigation.navigate(page, params); // Chuyển hướng với dữ liệu params
  };

  return (

    
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="chevron-back" size={24} color="#000" />
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Icon name="bookmark-outline" size={24} color="#000" />
      </View>

      {/* Course Image */}
      <Image source={course.image} style={styles.courseImage} />

      {/* Course Description */}
      <Text style={styles.courseDescription}>{course.description}</Text>

      {/* Social Info */}
      <View style={styles.socialInfo}>
        <Text style={styles.socialText}>
          <Icon name="heart-outline" size={20} /> {course.likes} Like
        </Text>
        <Text style={styles.socialText}>
          <Icon name="share-social-outline" size={20} /> {course.shares} Share
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('LESSONS')}>
          <Text
            style={[styles.tab, activeTab === 'LESSONS' && styles.activeTab]}>
            LESSONS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('PROJECTS')}>
          <Text
            style={[styles.tab, activeTab === 'PROJECTS' && styles.activeTab]}>
            PROJECTS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Q&A')}>
          <Text style={[styles.tab, activeTab === 'Q&A' && styles.activeTab]}>
            Q&A
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lesson Sections */}
      {activeTab === 'LESSONS' && (
        <FlatList
          data={lessonsData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.sectionContainer}>
              <TouchableOpacity
                onPress={() => toggleSection(item.id)}
                style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{item.module}</Text>
                <Icon
                  name={item.expanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
              {item.expanded && (
                <View style={styles.lessonsList}>
                  {item.lessons.map((lesson) => (
                    <LessonItem key={lesson.lessonId} lesson={lesson} />
                  ))}
                </View>
              )}
            </View>
          )}
          contentContainerStyle={styles.lessonsListContainer}
        />
      )}

      {activeTab === 'PROJECTS' && (
        <ScrollView
          style={styles.projectSection}
          contentContainerStyle={{ paddingBottom: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Upload your project here</Text>
          {/* Upload Section */}
          <TouchableOpacity style={styles.uploadProject}>
            <Text>Upload your project here</Text>
          </TouchableOpacity>

          {/* Student Projects */}
          <Text style={styles.sectionTitle}>12 Student Projects</Text>
          <FlatList
            data={course.projects.studentProjects}
            horizontal
            keyExtractor={(project) => project.id}
            renderItem={({ item }) => (
              <View style={styles.projectItem}>
                <Image source={item.image} style={styles.projectImage} />
                <Text style={styles.projectTitle}>{item.title}</Text>
                <Text style={styles.projectAuthor}>{item.author}</Text>
              </View>
            )}
            contentContainerStyle={styles.projectsListContainer}
          />

          {/* Project Description */}
          <Text style={styles.projectDescriptionTitle}>
            Project Description
          </Text>
          <Text style={styles.projectDescriptionText}>
            {course.projects.description}
          </Text>

          {/* Resources */}
          <Text style={styles.sectionTitle}>Resources</Text>
          <FlatList
            data={course.projects.resources}
            keyExtractor={(resource) => resource.id}
            renderItem={({ item }) => (
              <View style={styles.resourceItem}>
                <Text>{item.name}</Text>
                <Text>{item.size}</Text>
                <TouchableOpacity
                  onPress={() => {
                    /* Thêm logic tải xuống ở đây */
                  }}>
                  <Icon name="download-outline" size={20} color="#00BFFF" />
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      )}

      {activeTab === 'Q&A' && (
        <View style={styles.qnaSection}>
          {/* Danh sách các câu hỏi và trả lời */}
          <FlatList
            data={course.qna} // Đảm bảo rằng dữ liệu qna có sẵn trong course
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.qnaItem}>
                <Image source={item.avatar} style={styles.avatar} />
                <View style={styles.qnaContent}>
                  <Text style={styles.userName}>{item.user}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.questionText}>{item.content}</Text>
                  <View style={styles.qnaActions}>
                    <Text style={styles.qnaAction}>
                      <Icon name="heart-outline" size={16} /> {item.likes}
                    </Text>
                    <Text style={styles.qnaAction}>
                      <Icon name="chatbubble-outline" size={16} />{' '}
                      {item.comments} Comment
                    </Text>
                  </View>
                </View>
              </View>
            )}
            contentContainerStyle={styles.qnaListContainer}
          />

          {/* Phần nhập câu hỏi mới */}
          <View style={styles.qnaInputSection}>
            <Text style={styles.qnaEmoji}>✨ 😍 💖 👏 😂 🔥</Text>
            <View style={styles.qnaInputContainer}>
              <Icon name="person-circle" size={24} style={styles.qnaUserIcon} />
              <Text style={styles.qnaInputText}>Write a Q&A...</Text>
            </View>
          </View>

          
        </View>

        
      )}

      <View style={styles.footer}>
        <FooterItem icon={faHome} label="Home" currentPage={currentPage} onPress={() => handleNavigation('Home')} />
        <FooterItem icon={faSearch} label="Search" currentPage={currentPage} onPress={() => handleNavigation('Search', { dataCourse })} />
        <FooterItem icon={faBook} label="MyCourse" currentPage={currentPage} onPress={() => handleNavigation('MyCourse', { dataCourse })} />
        <FooterItem icon={faUser} label="Profile" currentPage={currentPage} onPress={() => handleNavigation('Profile', { dataCourse })} />
      </View>
    </View>
  );
};
const FooterItem = ({ icon, label, currentPage, onPress }) => (
  <TouchableOpacity style={styles.footerItem} onPress={onPress}>
    <FontAwesomeIcon icon={icon} color={currentPage === label ? 'blue' : 'black'}/>
    <Text style={[styles.footerText, currentPage === label && styles.activeFooterText]}>{label}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  courseImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  courseDescription: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 10,
  },
  socialInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  socialText: {
    fontSize: 14,
    color: 'gray',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    marginBottom: 10,
  },
  tab: {
    fontSize: 16,
    color: 'gray',
    paddingVertical: 6,
  },
  activeTab: {
    color: '#00BFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#00BFFF',
  },
  sectionContainer: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonsList: {
    paddingLeft: 15,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 8,
  },
  lessonNumber: {
    width: 30,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00BFFF',
    textAlign: 'center',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
  },
  lessonDuration: {
    fontSize: 12,
    color: 'gray',
  },
  activeLesson: {
    borderColor: '#00BFFF',
    backgroundColor: '#E0F7FF',
  },
  lessonsListContainer: {
    paddingBottom: 20,
  },

  //project styles
  projectSection: {
    padding: 10,
  },
  uploadProject: {
    borderWidth: 1,
    borderColor: '#00BFFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  projectItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  projectImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  projectAuthor: {
    fontSize: 12,
    color: 'gray',
  },
  projectDescriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  projectDescriptionText: {
    fontSize: 14,
    color: 'gray',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },

  //Q&A styles
  qnaSection: {
    flex: 1,
    padding: 10,
  },
  qnaItem: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  qnaContent: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  questionText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  qnaActions: {
    flexDirection: 'row',
  },
  qnaAction: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
    color: 'gray',
    marginRight: 20,
  },
  qnaListContainer: {
    paddingBottom: 60,
  },
  qnaInputSection: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 10,
    backgroundColor: '#FFF',
  },
  qnaEmoji: {
    fontSize: 16,
    marginBottom: 8,
    color: '#FF4500',
  },
  qnaInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 20,
  },
  qnaUserIcon: {
    marginRight: 10,
    color: 'gray',
  },
  qnaInputText: {
    color: 'gray',
    fontSize: 14,
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

export default LearningLesson;
