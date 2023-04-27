import React, { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, TextInput } from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Loader from '../../components/Loader';
import userService from '../../api/userService'

function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });


  const handleOnSubmit = async (values) => {
    try {
      setLoading(true);
      var data = {
        email: values.email,
        password: values.password,
      }
      var res = await userService.loginUser(data)

      if (res.statusCode == 200) {
        navigation.push("NavigationStacks")
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
    <ScrollView style={tw`w-full`}>
      <View style={tw` p-8 content-center w-full flex-1 justify-evenly flex-col`}>
        <Image source={require("../../../assets/splash.jpg")} style={tw`w-full`} resizeMode='contain' />
        <Text style={tw`text-3xl font-semibold`}>Login</Text>
        {
          loading ?
            <Loader />
            : null
        }

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
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
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <TouchableOpacity style={tw`self-center bg-blue-400 p-4 rounded-xl w-full mt-5 `} onPress={handleSubmit} disabled={loading} >
                <Text style={tw`text-white text-center`}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <Text>New to ChemDojo ?
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={tw`text-blue-600`}> Register</Text>

          </TouchableOpacity>
        </Text>
      </View>
    </ScrollView>
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


export default Login