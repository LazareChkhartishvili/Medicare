import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SeeAll from "../shared/seeAll";

const Departments = () => {
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
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "space-between",
            width: "100%",
          }}
          onPress={() => router.push("/screens/doctors/departments")}
        >
          <SeeAll title="Departments" />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {departments.map((dept, index) => (
          <TouchableOpacity key={index} style={styles.departmentCard}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: dept.bgColor || "#E3F2FD" },
              ]}
            >
              <Image source={dept.imageUrl} style={{ width: 34, height: 34 }} />
            </View>
            <Text style={styles.departmentName}>{dept.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  departmentCard: {
    width: "23%",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
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
});

export default Departments;
