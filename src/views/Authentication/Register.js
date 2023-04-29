import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Button, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import tw from 'twrnc'
import { Formik } from 'formik';
import * as Yup from 'yup';
import userService from '../../api/userService'
import Loader from '../../components/Loader';

// import DocumentPicker from "react-native-document-picker"


function Register({ navigation }) {
  // const [image, setImage] = useState([])
  // const docPicker = () => {
  //   try {
  //     DocumentPicker.pickSingle({
  //       type: [DocumentPicker.types.images],
  //       presentationStyle: 'fullScreen'
  //     })
  //       .then(res => setImage(res))
  //       .catch(err => console.log(err))
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log("error -----", err);
  //     } else {
  //       throw err;
  //     }
  //   }
  // }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // const { handleRegister } = useContext(AuthProvider);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    username: Yup.string().min(3).required(),
    password: Yup.string().min(6).required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required(),
  });


  const handleOnSubmit = async (values) => {
    try {
      setLoading(true);
      var data = {
        username: values.username,
        email: values.email,
        password: values.password,
        type: "1",
      }
      var res = await userService.addUser(data)

      if (res.statusCode == 200) {
        Alert.alert('Registration', res.message, [
          {text: 'OK', onPress: () => navigation.navigate("Login")},
        ])
      } else {
        Alert.alert(res.message)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error.message", error.message)
      setError(error.message);
    }
  };


  return (
    <>
      <ScrollView style={tw`w-full`}>
        <View style={tw`p-8 w-full flex-1 justify-around flex-col`}>
          <Image source={require("../../../assets/splash.jpg")} style={tw`w-full`} resizeMode='contain' />
          <Text style={tw`text-3xl font-semibold`}>Sign Up</Text>
          {
            loading ?
              <Loader />
              : null
          }
          <Formik
            initialValues={{ email: '', password: '', username: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <View style={styles.formControl}>
                  <TextInput
                    style={tw`border-b border-b-gray-200  p-4 mt-2`}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    placeholder="Enter your username"
                    keyboardType="default"
                  />
                  {errors.username && touched.username && <Text style={styles.error}>{errors.username}</Text>}
                </View>
                <View style={styles.formControl}>
                  <TextInput
                    style={tw`border-b border-b-gray-200  p-4 mt-2`}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                  />
                  {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
                </View>
                <View style={styles.formControl}>
                  <TextInput
                    style={tw`border-b border-b-gray-200  p-4 mt-2`}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    placeholder="Enter your password"
                    secureTextEntry
                  />
                  {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}
                </View>
                <View style={styles.formControl}>
                  <TextInput
                    style={tw`border-b border-b-gray-200  p-4 mt-2`}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    placeholder="Confirm your password"
                    secureTextEntry
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <TouchableOpacity style={tw`self-center bg-blue-400 p-4 rounded-xl w-full mt-5 `} onPress={handleSubmit} disabled={loading} >
                  <Text style={tw`text-white text-center`}>Register</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <Text style={tw`mt-5`}>Got an account already?
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={tw`text-blue-600`}> Login</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formControl: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: "100",
    fontSize: 16,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
});

export default Register