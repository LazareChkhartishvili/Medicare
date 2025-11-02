import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CommonSymptoms = () => {
  const commonSymptoms = [
    {
      name: "Fever",
      imageUrl: require("../../../assets/images/icons/fever.png"),
      bgColor: "#E3F2FD",
    },
    {
      name: "Cough",
      imageUrl: require("../../../assets/images/icons/cemineba.png"),
      bgColor: "#FFEBEE",
    },
    {
      name: "Blood pressure",
      imageUrl: require("../../../assets/images/icons/blood_pressure.png"),
      bgColor: "#F3E5F5",
    },
    {
      name: "Diabetics",
      imageUrl: require("../../../assets/images/icons/diabetics.png"),
      bgColor: "#E8F5E8",
    },
    {
      name: "Headache",
      imageUrl: require("../../../assets/images/icons/headache.png"),
      bgColor: "#FFF3E0",
    },
    {
      name: "Stomach pain",
      imageUrl: require("../../../assets/images/icons/stomach.png"),
      bgColor: "#E0F2F1",
    },
    {
      name: "Dizziness",
      imageUrl: require("../../../assets/images/icons/dizziness.png"),
      bgColor: "#E1F5FE",
    },
    {
      name: "Eye problem",
      imageUrl: require("../../../assets/images/icons/eye_problem.png"),
      bgColor: "#FCE4EC",
    },
  ];
  return (
    <View>
      <Text
        style={{
          padding: 24,
          fontSize: 16,
          fontFamily: "Poppins-SemiBold",
          color: "#333333",
        }}
      >
        Common Symptoms
      </Text>
      <View style={styles.grid}>
        {commonSymptoms.map((symptom, index) => (
          <TouchableOpacity key={index} style={styles.departmentCard}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: symptom.bgColor || "#E3F2FD" },
              ]}
            >
              <Image
                source={symptom.imageUrl}
                style={{ width: 34, height: 34 }}
              />
            </View>
            <Text style={styles.departmentName}>{symptom.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CommonSymptoms;

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
  title: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  seeAll: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#007AFF",
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
