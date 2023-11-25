import { Image, ImageProps, StyleSheet } from "react-native";
import { useState } from "react";

export default function ({
  style,
  onLoadStart = () => {},
  onLoadEnd = () => {},
  ...props
}: ImageProps) {
  const [loading, setLoading] = useState(false);

  const onLoadStartHandler = () => {
    setLoading(true);
    onLoadStart();
  };

  const onLodEndHandler = () => {
    setLoading(false);
    onLoadEnd();
  };

  return (
    <Image
      onLoadEnd={onLodEndHandler}
      onLoadStart={onLoadStartHandler}
      style={[style, loading ? styles.loading : {}]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    backgroundColor: "#d3d3d3",
  },
});
