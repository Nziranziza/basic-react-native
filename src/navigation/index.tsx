import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/home";
import ProductDetails from "../screens/product-details";
import AddProduct from "../screens/add-product";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ title: 'Products' }} name="home" component={Home} />
        <Stack.Screen options={{ title: 'Product Details' }} name="product-details" component={ProductDetails} />
        <Stack.Screen options={{ title: 'Create a New Product', presentation: 'modal' }} name="add-product" component={AddProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
