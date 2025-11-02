import { healthcareProducts } from "@/assets/data/healthcareProducts";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Categories = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {healthcareProducts.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                { backgroundColor: category.bgColor },
              ]}
              onPress={() => {
                router.push(
                  `/screens/medicine/category-details?categoryId=${category.id}`
                );
              }}
            >
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
    fontFamily: "Poppins-SemiBold",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#333333",
    textAlign: "center",
    lineHeight: 20,
  },
});
