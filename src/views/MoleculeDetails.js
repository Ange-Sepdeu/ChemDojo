import { useRoute } from '@react-navigation/native'
import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput } from 'react-native'
import { ScrollView, View, FlatList, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { dataMolecules } from '../constants'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Carousel from 'react-native-snap-carousel';
import { Formik } from 'formik'
import * as Yup from 'yup';
import courseService from '../api/courseService'
import Loader from '../components/Loader'



const data = [
  { name: 'John', time: '1 hour ago', image: require('../../assets/chemdojo2.jpg') },
  { name: 'Jane', time: '2 hours ago', image: require('../../assets/chemdojo2.jpg') },
  { name: 'Bob', time: '3 hours ago', image: require('../../assets/chemdojo2.jpg') },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().min(10).required(),
});


function MoleculeDetails({ navigation, route }) {
  const { item } = route.params;
  const bottomSheetRef = useRef < BottomSheet > (null);
  const snapPoints = useMemo(() => ['10%', '60%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  const props = dataMolecules[0]
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const getCourses = () => {
    setLoading(true);
    courseService.listCourses(item.id).then((response) => {
      setCourses(response.data)
    }).finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    getCourses()
  }, [])
  const handleOnSubmit = async (values, { resetForm }) => {
    console.log("submited")
    if (image?.uri.length > 0) {
      const response = await courseService.addCourses({
        uri: image.uri,
        title: values.title,
        topicId: item.id,
        description: values.description,
      });
      if (response.statusCode === 200) {
        Alert.alert("Course added successfully");
        setCourses([...courses, response.data]);
        setImage(null)
        resetForm({
          values: {
            title: '',
            description: '',
          }
        })

      } else {
        if (response?.message) {
          Alert.alert(response.message);
        } else {
          Alert.alert("An error occured");
        }
      }
    } else {
      Alert.alert("Enter an Image")
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result?.uri.length > 0) {
      const source = { uri: result.uri };
      setImage(source);
    }
  }
  const [image, setImage] = useState(null);
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <ScrollView>
        <Text style={tw`text-3xl mb-5 text-white`}> {item.title}</Text>
        <Image source={require('../../assets/chemdojo2.jpg')} resizeMode='contain' style={tw`w-full mb--20 `} />
        <Text style={tw`text-gray-400 mt-8`}>Description: </Text>
        <Text style={tw`text-white text-justify`}>{item.description}</Text>
      </ScrollView>
    </View>
  );
  return (
    <View style={tw`w-full`}>
      {
        loading ? <Loader />
          : null
      }
      <TouchableOpacity
        onPress={() => navigation.navigate("Quiz", {item})}
        style={styles.quizContainer}>
        <Text style={styles.quizText}>Quiz</Text>
      </TouchableOpacity>
      <View style={tw`bg-blue-950 h-200`}>
        <Carousel
          data={courses}
          renderItem={renderItem}
          sliderWidth={400}
          itemWidth={300}
          autoplay={false}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef.current}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetScrollView>
          <View style={tw`pl-8 pr-8 pb-8`}>
            <Text style={tw` text-center text-xl`}>Add Course</Text>
            <View style={tw`flex flex-row justify-between items-center `}>
              <View style={tw`flex w-85`}>
                <Formik
                  initialValues={{ title: '', description: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleOnSubmit}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>

                      <TouchableOpacity style={tw`self-center bg-blue-400 p-4 rounded-xl w-full mt-5 `} onPress={pickImage} >
                        <Text style={tw`text-white text-center`}>Pick an Image</Text>
                      </TouchableOpacity>
                      {
                        image ?
                          <View style={styles.imageContainer}>
                            <MaterialIcons name='close' size={40} color="black" style={styles.closeImage} onPress={() => setImage(null)} />
                            <Image source={image} style={styles.displayImage} />
                          </View> : null
                      }
                      <View style={styles.formControl}>
                        <TextInput
                          style={tw`border-b border-b-gray-200  p-4 mt-2`}
                          onChangeText={handleChange('title')}
                          onBlur={handleBlur('title')}
                          value={values.title}
                          placeholder="Enter your title"
                        />
                        {errors.title && touched.title && <Text style={styles.error}>{errors.title}</Text>}
                      </View>
                      <View style={styles.formControl}>
                        <TextInput
                          style={tw`border-b border-b-gray-200  p-4 mt-2 `}
                          onChangeText={handleChange('description')}
                          onBlur={handleBlur('description')}
                          value={values.description}
                          placeholder="Enter your description"
                          numberOfLines={5}
                          multiline={true}
                        />
                        {errors.description && touched.description && <Text style={styles.error}>{errors.description}</Text>}
                      </View>
                      {error ? <Text style={styles.error}>{error}</Text> : null}
                      <TouchableOpacity style={tw`self-center bg-blue-400 p-4 rounded-xl w-full mt-5 `} onPress={handleSubmit} >
                        <Text style={tw`text-white text-center`}>Add</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </Formik>
              </View>
            </View>

          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  slide: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 400,
  },
  info: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    marginLeft: 5,
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  imageContainer: {
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  displayImage: {
    height: 200,
    width: "100%"
  },
  closeImage: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 100,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  quizContainer: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    right: 20,
    top: 20,
  },
  quizText: {

  },
});
export default MoleculeDetails