import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import xmlFiles, { IconNames as IN } from './icons';

export type IconNames = IN;

interface Props {
  name: IN;
  size?: number;
  color?: string;
  height?: number | string;
  width?: number | string;
  style?: ViewStyle;
}

const Icon: React.FC<Props> = ({
  name,
  size = 25,
  color = '#fff',
  height,
  width,
  style,
}) => {
  let iconString: string | null = null;

  try {
    iconString = xmlFiles[name];

    iconString = iconString
      .replace(/{{size}}/g, `${size}`)
      .replace(/{{color}}/g, color)
      .replace(/{{width}}/g, `${width}`)
      .replace(/{{height}}/g, `${height}`);
  } catch (_exc) {}

  return (
    <View style={[styles.icon, style]}>
      <SvgXml
        xml={iconString}
        width={width || size}
        height={height || size}
      />
    </View>
  );
};

export default Icon;

const styles =  StyleSheet.create({
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});