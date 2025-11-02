import CommonSymptoms from "@/app/components/ui/commonSymptoms";
import TopDoctors from "@/app/components/ui/topDoctors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
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

const DepartmentsScreen = () => {
  const departments = [
    {
      name: "Neurology",
      imageUrl: require("../../../assets/images/icons/brain1.png"),
      bgColor: "#E3F2FD",
    },
    {
      name: "Cardiology",
      imageUrl: require("../../../assets/images/icons/cardiology.png"),
      bgColor: "#FFEBEE",
    },
    {
      name: "Gynecology",
      imageUrl: require("../../../assets/images/icons/pregnant.png"),
      bgColor: "#F3E5F5",
    },
    {
      name: "Pediatrics",
      imageUrl: require("../../../assets/images/icons/baby.png"),
      bgColor: "#E8F5E8",
    },
    {
      name: "Allergy",
      imageUrl: require("../../../assets/images/icons/allergy.png"),
      bgColor: "#FFF3E0",
    },
    {
      name: "Dentist",
      imageUrl: require("../../../assets/images/icons/dendist.png"),
      bgColor: "#E0F2F1",
    },
    {
      name: "Urology",
      imageUrl: require("../../../assets/images/icons/urology.png"),
      bgColor: "#E1F5FE",
    },
    {
      name: "Gastrology",
      imageUrl: require("../../../assets/images/icons/gastrology.png"),
      bgColor: "#FCE4EC",
    },
    {
      name: "Dermatology",
      imageUrl: require("../../../assets/images/icons/cardiology.png"),
      bgColor: "#FFF8E1",
    },
    {
      name: "Orthopedics",
      imageUrl: require("../../../assets/images/icons/brain1.png"),
      bgColor: "#E8EAF6",
    },
    {
      name: "Ophthalmology",
      imageUrl: require("../../../assets/images/icons/allergy.png"),
      bgColor: "#F1F8E9",
    },
    {
      name: "Psychology",
      imageUrl: require("../../../assets/images/icons/phycatry.png"),
      bgColor: "#FCE4EC",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Departments</Text>
        <View style={styles.placeholder} />
      </View>
      <Text
        style={{
          padding: 24,
          fontSize: 16,
          fontFamily: "Poppins-SemiBold",
          color: "#333333",
        }}
      >
        Departments
      </Text>
      <ScrollView style={styles.content}>
        <View style={styles.grid}>
          {departments.slice(0, 12).map((dept, index) => (
            <TouchableOpacity key={index} style={styles.departmentCard}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: dept.bgColor || "#E3F2FD" },
                ]}
              >
                <Image
                  source={dept.imageUrl}
                  style={{ width: 48, height: 48 }}
                />
              </View>
              <Text style={styles.departmentName}>{dept.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <CommonSymptoms />
        <TopDoctors />
      </ScrollView>
    </SafeAreaView>
  );
};

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
    backgroundColor: "#F2F2F7",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 6,
    backgroundColor: "#F2F2F7",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  departmentCard: {
    width: "30%",
    alignItems: "center",
    marginBottom: 16,
    padding: 4,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  departmentName: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#333333",
    textAlign: "center",
  },
  departmentDescription: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    textAlign: "center",
    lineHeight: 16,
  },
});

export default DepartmentsScreen;
