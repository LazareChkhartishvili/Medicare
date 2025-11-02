import { doctors } from "@/assets/data/doctors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MakeAppointment = () => {
  const { doctorId, selectedDate, selectedTime, paymentMethod } =
    useLocalSearchParams();
  const doctor = doctors.find((d) => d.id === parseInt(doctorId as string));
  const [selectedPatient, setSelectedPatient] = useState("zenifer");
  const [promoCode, setPromoCode] = useState("");
  const [selectedPaymentMethod] = useState((paymentMethod as string) || "visa");

  if (!doctor) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Doctor not found</Text>
      </SafeAreaView>
    );
  }

  const consultationFee = parseInt(doctor.consultationFee.replace("$", ""));
  const vat = Math.round(consultationFee * 0.05);
  const netAmount = consultationFee + vat;

  // Format the date and time for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const appointmentDateTime = `${formatDate(
    selectedDate as string
  )} | ${selectedTime}`;

  const handlePaymentMethodPress = () => {
    router.push({
      pathname: "/screens/payment/payment-methods",
      params: {
        doctorId: doctorId as string,
        selectedDate: selectedDate as string,
        selectedTime: selectedTime as string,
        amount: netAmount.toString(),
      },
    });
  };

  const handleMakeAppointment = () => {
    // Navigate to Patient Details page
    router.push({
      pathname: "/screens/appointment/patient-details",
      params: {
        doctorId: doctorId as string,
        selectedDate: selectedDate as string,
        selectedTime: selectedTime as string,
        paymentMethod: selectedPaymentMethod,
        amount: netAmount.toString(),
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
        <Text style={styles.headerTitle}>Make Appointment</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Doctor Information */}
        <View style={styles.section}>
          <View style={styles.doctorCard}>
            <View style={styles.doctorImagePlaceholder}>
              <Image source={doctor.image} style={styles.doctorImage} />
            </View>
            <View style={styles.doctorInfo}>
              <View style={styles.doctorNameRow}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <View style={styles.ratingContainer}>
                  {[...Array(5)].map((_, index) => (
                    <Ionicons
                      key={index}
                      name="star"
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.specialty}>{doctor.specialization}</Text>
              <Text style={styles.degrees}>{doctor.degrees}</Text>
              <Text style={styles.appointmentDateTime}>
                {appointmentDateTime}
              </Text>
            </View>
          </View>
        </View>

        {/* Patient Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient information</Text>
          <TouchableOpacity
            style={styles.patientOption}
            onPress={() => setSelectedPatient("zenifer")}
          >
            <View style={styles.radioButton}>
              {selectedPatient === "zenifer" && (
                <View style={styles.radioButtonSelected} />
              )}
            </View>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>Zenifer Aniston</Text>
              <Text style={styles.patientDetails}>25yrs | 65 kg</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.patientOption}
            onPress={() => setSelectedPatient("someone")}
          >
            <View style={styles.radioButton}>
              {selectedPatient === "someone" && (
                <View style={styles.radioButtonSelected} />
              )}
            </View>
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>Someone else</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Consultation fee</Text>
            <Text style={styles.paymentAmount}>{doctor.consultationFee}</Text>
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>VAT (5%)</Text>
            <Text style={styles.paymentAmount}>${vat}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentRow}>
            <Text style={styles.netAmountLabel}>Net Amount</Text>
            <Text style={styles.netAmountValue}>${netAmount}</Text>
          </View>

          <View style={styles.promoCodeContainer}>
            <TextInput
              style={styles.promoCodeInput}
              placeholder="Have any promo code?"
              placeholderTextColor="#999999"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pay with</Text>

          <TouchableOpacity
            style={styles.paymentMethodCard}
            onPress={handlePaymentMethodPress}
          >
            <View style={styles.visaButton}>
              <Text style={styles.visaText}>VISA</Text>
            </View>
            <Text style={styles.cardNumber}>************ 3254</Text>
            <Ionicons name="chevron-forward" size={20} color="#999999" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Make Appointment Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.makeAppointmentButton}
          onPress={handleMakeAppointment}
        >
          <Text style={styles.makeAppointmentButtonText}>Make Appointment</Text>
        </TouchableOpacity>
      </View>
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
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#333333",
    marginBottom: 16,
  },
  doctorCard: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  doctorImagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#E5E5EA",
    marginRight: 16,
    overflow: "hidden",
  },
  doctorImage: {
    width: "100%",
    height: "100%",
  },
  doctorInfo: {
    flex: 1,
  },
  doctorNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  doctorName: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#333333",
    flex: 1,
  },
  specialty: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#20BEB8",
  },
  degrees: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  appointmentDateTime: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  patientOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E5E5EA",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#20BEB8",
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
    marginBottom: 2,
  },
  patientDetails: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333333",
  },
  paymentAmount: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  divider: {
    height: 1,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    borderStyle: "dashed",
    marginVertical: 12,
  },
  netAmountLabel: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#333333",
  },
  netAmountValue: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#333333",
  },
  promoCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  promoCodeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#333333",
    marginRight: 12,
  },
  applyButton: {
    backgroundColor: "#20BEB8",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  applyButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
  },
  visaButton: {
    backgroundColor: "#1E40AF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 12,
  },
  visaText: {
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  cardNumber: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  makeAppointmentButton: {
    backgroundColor: "#20BEB8",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  makeAppointmentButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
});

export default MakeAppointment;
