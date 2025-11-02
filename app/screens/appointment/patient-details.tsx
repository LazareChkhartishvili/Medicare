import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PatientDetails = () => {
  const {
    doctorId,
    selectedDate: appointmentDate,
    selectedTime,
    paymentMethod,
  } = useLocalSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    problem: "",
  });
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === "ios");
    setSelectedDate(currentDate);

    // Format the date
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    setFormData((prev) => ({
      ...prev,
      dateOfBirth: formattedDate,
    }));
  };

  const handleDocumentUpload = () => {
    // Here you would typically implement actual file upload
    // For now, we'll simulate adding a document
    Alert.alert(
      "Upload Document",
      "Document upload functionality would be implemented here. For now, this is a placeholder.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Simulate Upload",
          onPress: () => {
            const newDoc = `Document_${uploadedDocuments.length + 1}.pdf`;
            setUploadedDocuments((prev) => [...prev, newDoc]);
          },
        },
      ]
    );
  };

  const handleNext = () => {
    // Validate form
    if (!formData.name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }
    if (!formData.dateOfBirth.trim()) {
      Alert.alert("Error", "Please enter your date of birth");
      return;
    }
    if (!formData.problem.trim()) {
      Alert.alert("Error", "Please describe your problem");
      return;
    }

    // Here you would typically save the patient details
    console.log("Patient Details:", {
      ...formData,
      doctorId,
      selectedDate: appointmentDate,
      selectedTime,
      paymentMethod,
      uploadedDocuments,
    });

    // Navigate to success page
    router.push({
      pathname: "/screens/appointment/appointment-success",
      params: {
        doctorId: doctorId as string,
        selectedDate: appointmentDate as string,
        selectedTime: selectedTime as string,
        paymentMethod: paymentMethod as string,
        patientName: formData.name,
        problem: formData.problem,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patient Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Name</Text>
          <TextInput
            style={styles.textInput}
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
            placeholder="Enter your name"
            placeholderTextColor="#999999"
          />
        </View>

        {/* Date of Birth Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Date of Birth</Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={[styles.textInput, styles.dateInput]}
              value={formData.dateOfBirth}
              onChangeText={(value) => handleInputChange("dateOfBirth", value)}
              placeholder="Enter your date of birth"
              placeholderTextColor="#999999"
            />
            <TouchableOpacity
              style={styles.calendarIcon}
              onPress={openDatePicker}
            >
              <Ionicons name="calendar-outline" size={20} color="#20BEB8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Gender Selection */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Gender</Text>
          <View style={styles.genderContainer}>
            {[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.genderOption}
                onPress={() => handleGenderSelect(option.value)}
              >
                <View style={styles.radioButton}>
                  {formData.gender === option.value && (
                    <View style={styles.radioButtonSelected} />
                  )}
                </View>
                <Text style={styles.genderLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Problem Description */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Write Your Problem</Text>
          <TextInput
            style={[styles.textInput, styles.problemInput]}
            value={formData.problem}
            onChangeText={(value) => handleInputChange("problem", value)}
            placeholder="Write your problem here.."
            placeholderTextColor="#999999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Document Upload */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Upload Documents (if any)</Text>
          <TouchableOpacity
            style={styles.uploadContainer}
            onPress={handleDocumentUpload}
          >
            <Ionicons name="cloud-upload-outline" size={48} color="#20BEB8" />
            <Text style={styles.uploadText}>Browse your files</Text>
            <Text style={styles.uploadSubtext}>(Maximum size 10MB)</Text>
          </TouchableOpacity>

          {/* Uploaded Documents List */}
          {uploadedDocuments.length > 0 && (
            <View style={styles.uploadedDocumentsContainer}>
              <Text style={styles.uploadedDocumentsTitle}>
                Uploaded Documents:
              </Text>
              {uploadedDocuments.map((doc, index) => (
                <View key={index} style={styles.uploadedDocumentItem}>
                  <Ionicons name="document-text" size={20} color="#20BEB8" />
                  <Text style={styles.uploadedDocumentName}>{doc}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setUploadedDocuments((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <Ionicons name="close-circle" size={20} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Native Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "spinner"}
          onChange={onDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#333333",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333333",
    backgroundColor: "#FFFFFF",
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateInput: {
    flex: 1,
    marginRight: 12,
  },
  calendarIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F0FDFF",
    justifyContent: "center",
    alignItems: "center",
  },
  genderContainer: {
    flexDirection: "row",
    gap: 24,
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E5E5EA",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#20BEB8",
  },
  genderLabel: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333333",
  },
  problemInput: {
    height: 100,
    textAlignVertical: "top",
  },
  uploadContainer: {
    borderWidth: 2,
    borderColor: "#E5E5EA",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  uploadText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#20BEB8",
    marginTop: 12,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
  uploadedDocumentsContainer: {
    marginTop: 16,
  },
  uploadedDocumentsTitle: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
    marginBottom: 8,
  },
  uploadedDocumentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  uploadedDocumentName: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#333333",
    marginLeft: 8,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  nextButton: {
    backgroundColor: "#20BEB8",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
});

export default PatientDetails;
