import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewPaymentScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("mastercard");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const paymentMethods = [
    {
      id: "mastercard",
      name: "mastercard",
      color: "#EB001B",
      secondaryColor: "#F79E1B",
    },
    {
      id: "visa",
      name: "VISA",
      color: "#1A1F71",
    },
    {
      id: "skrill",
      name: "Skrill",
      color: "#7B1FA2",
    },
  ];

  const handleNext = () => {
    // Validate form
    if (!cardHolderName.trim()) {
      alert("Please enter card holder name");
      return;
    }
    if (!cardNumber.trim()) {
      alert("Please enter card number");
      return;
    }
    if (!expiryDate.trim()) {
      alert("Please enter expiry date");
      return;
    }
    if (!cvv.trim()) {
      alert("Please enter CVV");
      return;
    }

    // Here you would typically save the payment method
    console.log("Payment method saved:", {
      paymentMethod: selectedPaymentMethod,
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
    });

    // Navigate back to profile or payment methods
    router.back();
  };

  const formatCardNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, "");
    // Add spaces every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted;
  };

  const formatExpiryDate = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, "");
    // Add slash after 2 digits
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (text: string) => {
    const formatted = formatCardNumber(text);
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (text: string) => {
    const formatted = formatExpiryDate(text);
    setExpiryDate(formatted);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#8E44AD" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Payment Method</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Select the payment method want to use
        </Text>

        {/* Payment Method Selection */}
        <View style={styles.paymentMethodSelection}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.paymentMethodOption}
              onPress={() => setSelectedPaymentMethod(method.id)}
            >
              <View
                style={[
                  styles.paymentMethodIcon,
                  selectedPaymentMethod === method.id &&
                    styles.paymentMethodSelected,
                  { backgroundColor: method.color },
                ]}
              >
                {method.id === "mastercard" ? (
                  <View style={styles.mastercardIcon}>
                    <View
                      style={[
                        styles.mastercardCircle,
                        { backgroundColor: "#F79E1B" },
                      ]}
                    />
                    <View
                      style={[
                        styles.mastercardCircle,
                        { backgroundColor: "#EB001B" },
                      ]}
                    />
                  </View>
                ) : (
                  <Text style={styles.paymentMethodText}>{method.name}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Card Details Form */}
        <View style={styles.form}>
          {/* Card Holder Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card Holder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter card holder name"
              placeholderTextColor="#9CA3AF"
              value={cardHolderName}
              onChangeText={setCardHolderName}
              autoCapitalize="words"
            />
          </View>

          {/* Card Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="XXXX XXXX XXXX XXXX"
              placeholderTextColor="#9CA3AF"
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              keyboardType="numeric"
              maxLength={19} // 16 digits + 3 spaces
            />
          </View>

          {/* Expiry Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Expiry Date</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, styles.inputWithIconInput]}
                placeholder="MM/YY"
                placeholderTextColor="#9CA3AF"
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                keyboardType="numeric"
                maxLength={5}
              />
              <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
            </View>
          </View>

          {/* CVV */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="XXX"
              placeholderTextColor="#9CA3AF"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
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
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F3E5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
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
    color: "#6B7280",
    marginBottom: 24,
  },
  paymentMethodSelection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 32,
  },
  paymentMethodOption: {
    alignItems: "center",
  },
  paymentMethodIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "transparent",
  },
  paymentMethodText: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  paymentMethodSelected: {
    borderColor: "#20BEB8",
  },
  mastercardIcon: {
    width: 30,
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mastercardCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: -2,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#374151",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#1F2937",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  inputWithIconInput: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: 0,
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

export default NewPaymentScreen;
