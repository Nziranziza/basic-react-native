import { ScrollView, Text, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import Image from "../components/image";
import Button from "../components/button";
import { deleteProduct, getProduct } from "../api/products";
import { ProductCardLoader } from "../components/product-card";
import Icon from "../components/icons";

export default function ProductDetails() {
  const {
    params: { productId },
  } = useRoute<any>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const { isLoading, data, isError }: any = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId),
  });

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProduct(productId);
      Toast.show({
        type: "success",
        text1: "Sucess",
        text2: "Product delete successfully",
      });
      navigation.navigate("home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Can't delete the product",
        text2: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isError) return <Text>An error occurred!</Text>;

  if (!loading && !data?.id) {
    return (
      <View style={styles.notFound}>
        <Icon name="empty" size={150} />
        <Text>Product not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {isLoading ? (
        <ProductCardLoader />
      ) : (
        <>
          <Text style={styles.title}>{data.title}</Text>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: data.image }}
          />
          <Text>{data.description}</Text>
          <Button
            loading={loading}
            onPress={handleDelete}
            style={styles.deleteBtn}
            title="Delete"
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#fff",
    minHeight: hp("100%"),
  },
  image: {
    height: 400,
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  deleteBtn: {
    backgroundColor: "#ff0000",
    marginTop: 30,
  },
  notFound: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
