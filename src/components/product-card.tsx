import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";

import Image from "./image";

type Props = {
  title: string;
  image: string;
  description: string;
  onPress?: () => void;
};

export default function ProductCard({
  title,
  description,
  image,
  onPress = () => {},
}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{ uri: image }}
      />
      <Text numberOfLines={4}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
  },
  image: {
    height: 300,
    marginVertical: 10,
  },
  separator: {
    width: 10,
  },
});

export function ProductCardLoader() {
  return (
    <View style={styles.card}>
    <Placeholder style={{ marginBottom: 0, paddingBottom: 0 }} Animation={Fade}>
      <PlaceholderLine color="#d3d3d3" width={70} />
      <PlaceholderLine style={styles.image} color="#d3d3d3" />
      <PlaceholderLine color="#d3d3d3" width={100} />
      <PlaceholderLine color="#d3d3d3" width={90} />
      <PlaceholderLine color="#d3d3d3" width={100} />
      <PlaceholderLine color="#d3d3d3" width={95} />
    </Placeholder>
    </View>
  );
}
