import {
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

import Input from "../components/text-input";
import Button from "../components/button";
import { CreateProductBody } from "../api/products";
import ImageUploader from "../components/image-uploader";
import { createProduct } from "../api/products";


const INITIAL_VALUES: CreateProductBody = {
  title: "",
  description: "",
  image: "",
};

const validation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().required("Image is required"),
});

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const onSubmit = async (values: CreateProductBody) => {
    try {
      setLoading(true);
      await createProduct(values);
      Toast.show({
        type: 'success',
        text1: 'Sucess',
        text2: 'Your product is live!'
      })
    } catch(error) {
      Toast.show({
        type: 'error',
        text1: "Can't create your product",
        text2: 'Something went wrong!'
      })
    } finally {
      setLoading(false);
      navigation.navigate('home');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validation}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => (
          <>
            <Input
              label="Product title"
              placeholder="Add product title"
              containerStyle={styles.input}
              value={values.title}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              error={errors.title}
            />
            <Input
              label="Product description"
              placeholder="Add Product description"
              multiline
              numberOfLines={10}
              containerStyle={styles.input}
              value={values.description}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              error={errors.description}
            />
            <ImageUploader
              onChange={(uri) => {
                setFieldValue("image", uri);
              }}
              style={styles.input}
              label="Product image"
              error={errors.image}
            />
            <Button
              loading={loading}
              onPress={() => handleSubmit()}
              title="Create"
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 15,
    flex: 1,
  },
  input: {
    marginBottom: 15,
  },
  uploader: {
    backgroundColor: "#fff",
    padding: 20,
    height: 150,
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  image: {
    marginBottom: 15,
    height: 150,
  },
  close: {
    backgroundColor: "#ff0000",
    position: "absolute",
    right: -10,
    top: -10,
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    marginBottom: 5,
  },
  error: {
    fontSize: 12,
    marginTop: 5,
    color: "#ff0000",
  },
});
