import { doctors } from "@/assets/data/doctors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AppointmentDetails = () => {
  const {
    doctorId,
    selectedDate,
    selectedTime,
    paymentMethod,
    patientName,
    problem,
  } = useLocalSearchParams();
  const doctor = doctors.find((d) => d.id === parseInt(doctorId as string));

  if (!doctor) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Doctor not found</Text>
      </SafeAreaView>
    );
  }

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleBackToHome = () => {
    router.replace("/(tabs)");
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
        <Text style={styles.headerTitle}>Appointment Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>Confirmed</Text>
            <Text style={styles.statusSubtitle}>
              Your appointment is confirmed
            </Text>
          </View>
        </View>

        {/* Doctor Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doctor Information</Text>
          <View style={styles.doctorCard}>
            <View style={styles.doctorImagePlaceholder}>
              <Text style={styles.doctorInitials}>
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.specialty}>{doctor.specialization}</Text>
              <Text style={styles.degrees}>{doctor.degrees}</Text>
              <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, index) => (
                  <Ionicons key={index} name="star" size={16} color="#FFD700" />
                ))}
                <Text style={styles.ratingText}>({doctor.rating})</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Appointment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appointment Details</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={20} color="#20BEB8" />
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>
                {formatDate(selectedDate as string)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={20} color="#20BEB8" />
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{selectedTime}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="person-outline" size={20} color="#20BEB8" />
              <Text style={styles.detailLabel}>Patient</Text>
              <Text style={styles.detailValue}>
                {patientName || "Not specified"}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="card-outline" size={20} color="#20BEB8" />
              <Text style={styles.detailLabel}>Payment Method</Text>
              <Text style={styles.detailValue}>
                {paymentMethod || "Not specified"}
              </Text>
            </View>
          </View>
        </View>

        {/* Problem Description */}
        {problem && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Problem Description</Text>
            <View style={styles.problemCard}>
              <Text style={styles.problemText}>{problem}</Text>
            </View>
          </View>
        )}

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.paymentCard}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Consultation Fee</Text>
              <Text style={styles.paymentAmount}>{doctor.consultationFee}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>VAT (5%)</Text>
              <Text style={styles.paymentAmount}>
                $
                {Math.round(
                  parseInt(doctor.consultationFee.replace("$", "")) * 0.05
                )}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.paymentRow}>
              <Text style={styles.netAmountLabel}>Total Amount</Text>
              <Text style={styles.netAmountValue}>
                $
                {parseInt(doctor.consultationFee.replace("$", "")) +
                  Math.round(
                    parseInt(doctor.consultationFee.replace("$", "")) * 0.05
                  )}
              </Text>
            </View>
          </View>
        </View>

        {/* Important Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Notes</Text>
          <View style={styles.notesCard}>
            <View style={styles.noteItem}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#FF9800"
              />
              <Text style={styles.noteText}>
                Please arrive 15 minutes before your appointment time
              </Text>
            </View>
            <View style={styles.noteItem}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#FF9800"
              />
              <Text style={styles.noteText}>
                Bring your ID and any relevant medical documents
              </Text>
            </View>
            <View style={styles.noteItem}>
              <Ionicons name="call-outline" size={20} color="#FF9800" />
              <Text style={styles.noteText}>
                Contact us if you need to reschedule or cancel
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Back to Home Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
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
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#333333",
    marginBottom: 12,
  },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIcon: {
    marginRight: 16,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666666",
  },
  doctorCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#20BEB8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  doctorInitials: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#333333",
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#20BEB8",
    marginBottom: 4,
  },
  degrees: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    marginLeft: 4,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#666666",
    marginLeft: 12,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  problemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  problemText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#333333",
    lineHeight: 20,
  },
  paymentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  paymentLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666666",
  },
  paymentAmount: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5EA",
    marginVertical: 12,
  },
  netAmountLabel: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#333333",
  },
  netAmountValue: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#333333",
  },
  notesCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  noteText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  homeButton: {
    backgroundColor: "#20BEB8",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  homeButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
});

export default AppointmentDetails;
