import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import { range } from "lodash";

import { getAllProducts } from "../api/products";
import ProductCard, { ProductCardLoader } from "../components/product-card";
import Icon from "../components/icons";

export default function Home() {
  const { isLoading, data, isError, refetch }: any = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [refreshing, setRefreshing] = useState(false);

  const handleProductPress = (productId: number) => {
    navigation.navigate("product-details", { productId });
  };

  const onAddProduct = () => {
    navigation.navigate("add-product");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = useCallback(
    ({ item }: any) => (
      <ProductCard onPress={() => handleProductPress(item.id)} {...item} />
    ),
    []
  );

  if (isLoading || refreshing) {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={range(0, 3)}
        renderItem={() => <ProductCardLoader />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.container}
      />
    );
  }

  if (isError) {
    return <Text>An error happened!</Text>;
  }

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
        style={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity onPress={onAddProduct} style={styles.floatingButton}>
        <Icon name="plus" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingTop: 15,
  },
  separator: {
    height: 15,
  },
  floatingButton: {
    backgroundColor: "#000",
    height: 75,
    width: 75,
    position: "absolute",
    bottom: 15,
    right: 15,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
});
