import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";

interface GradientCardProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: ViewStyle;
  children: React.ReactNode;
  borderRadius?: number;
  margin?: number;
  padding?: number;
}

const GradientCard: React.FC<GradientCardProps> = ({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  style,
  children,
  borderRadius = 16,
  margin = 16,
  padding = 24,
}) => {
  return (
    <LinearGradient
      colors={colors as [string, string, ...string[]]}
      start={start}
      end={end}
      style={[
        styles.container,
        {
          borderRadius,
          margin,
          padding,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    // Base container styles
  },
});

export default GradientCard;
