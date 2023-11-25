import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewProps,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

import Icon from "./icons";
import Image from "./image";

type MediaUploaderProps = {
  error?: string;
  label?: string;
  onChange?: (uri: string) => void;
} & ViewProps;

export default function ImageUploader({
  error,
  style,
  label,
  onChange = () => {},
}: MediaUploaderProps) {
  const [image, setImage] = useState<any>();

  useEffect(() => {
    onChange(image?.uri);
  }, [image]);

  const openFileSelector = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        videoQuality: 1,
      });
      if (!res.canceled) {
        setImage(res.assets?.[0]);
      }
    } catch (error) {}
  };

  const onRemoveImage = () => {
    setImage(null);
  };

  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      {image ? (
        <View>
          <Image style={styles.image} source={{ uri: image.uri }} />
          <TouchableOpacity style={styles.close} onPress={onRemoveImage}>
            <Icon name="x" color="#fff" size={15} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.uploader} onPress={openFileSelector}>
          <Icon name="upload" color="#d3d3d3" size={65} />
        </TouchableOpacity>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  uploader: {
    backgroundColor: "#fff",
    padding: 20,
    height: 150,
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  image: {
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
