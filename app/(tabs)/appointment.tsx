import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";

const Appointment = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {isAuthenticated ? `გამარჯობა, ${user?.name}!` : 'ჯავშნები'}
        </Text>
        <Text style={styles.subtitle}>
          {isAuthenticated 
            ? 'აქ შეგიძლიათ ჯავშნების ნახვა და ახალი ჯავშნის გაკეთება'
            : 'ჯავშნების სისტემა მალე იქნება მზად...'
          }
        </Text>
        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>
              როლი: {user.role === 'doctor' ? 'ექიმი' : 'პაციენტი'}
            </Text>
            <Text style={styles.userInfoText}>
              ელ-ფოსტა: {user.email}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  userInfo: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfoText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#374151",
    marginBottom: 4,
  },
});

export default Appointment;
