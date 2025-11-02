import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GradientCard from "./GradientCard";

const Banner = () => {
  return (
    <GradientCard
      colors={["#DCEEFA", "#7EB7DD"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Get 20% OFF</Text>
          <Text style={styles.subText}>On all items on first order</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Order Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Ionicons name="medical" size={80} color="#FFFFFF" />
        </View>
      </View>
    </GradientCard>
  );
};

export default Banner;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 120,
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  mainText: {
    fontSize: 26,
    fontFamily: "Poppins-Bold",
    color: "#333333",
    marginBottom: 8,
  },
  subText: {
    fontSize: 17,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#20BEB8",
    borderRadius: 25,
    paddingHorizontal: 28,
    paddingVertical: 14,
    alignSelf: "flex-start",
  },
  buttonText: {
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
});
