import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const PaymentMethods = () => {
  const { doctorId, selectedDate, selectedTime, amount } =
    useLocalSearchParams();
  const [selectedMethod, setSelectedMethod] = useState<string>("paypal");

  const paymentMethods: PaymentMethod[] = [
    {
      id: "paypal",
      name: "Paypal",
      icon: "logo-paypal",
      color: "#0070BA",
    },
    {
      id: "googlepay",
      name: "Google pay",
      icon: "logo-google",
      color: "#4285F4",
    },
    {
      id: "applepay",
      name: "Apple pay",
      icon: "logo-apple",
      color: "#000000",
    },
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const handlePayNow = () => {
    // Here you would typically process the payment
    console.log("Processing payment:", {
      method: selectedMethod,
      doctorId,
      selectedDate,
      selectedTime,
      amount,
    });

    // Navigate back to appointment page with selected payment method
    router.back();
    // You could also navigate to a success page or back to home
    // router.replace("/(tabs)");
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
        <Text style={styles.headerTitle}>Payments</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Select the payment method want to use
        </Text>

        {/* Payment Methods List */}
        <View style={styles.paymentMethodsList}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.paymentMethodCard}
              onPress={() => handlePaymentMethodSelect(method.id)}
            >
              <View style={styles.paymentMethodLeft}>
                <View
                  style={[
                    styles.paymentIcon,
                    { backgroundColor: method.color },
                  ]}
                >
                  <Ionicons
                    name={method.icon as any}
                    size={24}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.paymentMethodName}>{method.name}</Text>
              </View>
              <View style={styles.radioButton}>
                {selectedMethod === method.id && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Pay Now Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
          <Text style={styles.payNowButtonText}>Pay Now</Text>
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
    paddingTop: 24,
  },
  instructionText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333333",
    marginBottom: 24,
  },
  paymentMethodsList: {
    gap: 12,
  },
  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  paymentMethodLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  paymentMethodName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E5E5EA",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#20BEB8",
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  payNowButton: {
    backgroundColor: "#20BEB8",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  payNowButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
});

export default PaymentMethods;
