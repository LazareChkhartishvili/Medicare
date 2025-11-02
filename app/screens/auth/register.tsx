import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { apiService } from "../../services/api";
import { showToast } from "../../utils/toast";

export default function RegisterScreen() {
  const { userRole, register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Common fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Doctor specific fields
  const [specialization, setSpecialization] = useState("");
  const [licenseDocument, setLicenseDocument] = useState<{
    uri: string;
    name: string;
    type: string;
    filePath?: string;
  } | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/jpeg", "image/jpg", "image/png"],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];

      // Check file size (max 5MB)
      if (file.size && file.size > 5 * 1024 * 1024) {
        showToast.error("ფაილის ზომა არ უნდა აღემატებოდეს 5MB-ს", "შეცდომა");
        return;
      }

      // Upload file to backend
      setUploadingFile(true);
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType || "application/pdf",
      } as any);

      const response = await fetch(
        `${apiService.getBaseURL()}/upload/license`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setLicenseDocument({
          uri: file.uri,
          name: file.name,
          type: file.mimeType || "application/pdf",
          filePath: data.data.filePath,
        });
        showToast.success("ფაილი წარმატებით აიტვირთა", "წარმატება");
      } else {
        throw new Error(data.message || "ფაილის ატვირთვა ვერ მოხერხდა");
      }
    } catch (error) {
      console.error("File pick error:", error);
      showToast.error(
        error instanceof Error ? error.message : "ფაილის ატვირთვა ვერ მოხერხდა",
        "შეცდომა"
      );
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSignup = async () => {
    // Basic validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      showToast.error("გთხოვთ შეავსოთ ყველა სავალდებულო ველი", "შეცდომა");
      return;
    }

    if (userRole === "doctor" && (!specialization.trim() || !licenseDocument)) {
      showToast.error(
        "გთხოვთ შეავსოთ ყველა ექიმის ველი და ატვირთოთ ლიცენზია",
        "შეცდომა"
      );
      return;
    }

    if (password.length < 6) {
      showToast.error("პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო", "შეცდომა");
      return;
    }

    try {
      setIsLoading(true);

      const registerData: any = {
        name: name.trim(),
        email: email.trim(),
        password,
        role: userRole || "patient",
      };

      // Add doctor specific fields
      if (userRole === "doctor") {
        registerData.specialization = specialization.trim();
        registerData.licenseDocument = licenseDocument?.filePath;
      }

      await register(registerData);

      // Show success toast
      showToast.auth.registerSuccess(name.trim());

      // Navigate based on role
      if (userRole === "doctor") {
        router.replace("/(doctor-tabs)");
      } else {
        router.replace("/(tabs)");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "შეცდომა რეგისტრაციისას";
      showToast.auth.registerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignin = () => {
    router.push("/screens/auth/login");
  };

  const isDoctor = userRole === "doctor";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Image
                  source={require("../../../assets/images/logo/logo.png")}
                  style={styles.logoImage}
                  contentFit="contain"
                />
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>
              {isDoctor ? "Register as Doctor" : "Create Account"}
            </Text>
            <Text style={styles.subtitle}>
              {isDoctor
                ? "Join as healthcare provider"
                : "Sign up to get started"}
            </Text>

            {/* Form */}
            <View style={styles.form}>
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color="#9CA3AF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#9CA3AF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="your.email@example.com"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Doctor specific fields */}
              {isDoctor && (
                <>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Specialization *</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons
                        name="medical-outline"
                        size={20}
                        color="#9CA3AF"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="e.g., Cardiology, Pediatrics"
                        placeholderTextColor="#9CA3AF"
                        value={specialization}
                        onChangeText={setSpecialization}
                      />
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>
                      License Document (PDF/Image) *
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.filePickerButton,
                        licenseDocument && styles.filePickerButtonActive,
                      ]}
                      onPress={handleFilePick}
                      disabled={uploadingFile}
                    >
                      <Ionicons
                        name={
                          licenseDocument
                            ? "checkmark-circle"
                            : "cloud-upload-outline"
                        }
                        size={20}
                        color={licenseDocument ? "#10B981" : "#9CA3AF"}
                        style={styles.inputIcon}
                      />
                      {uploadingFile ? (
                        <View style={styles.uploadingContainer}>
                          <ActivityIndicator size="small" color="#06B6D4" />
                          <Text style={styles.uploadingText}>ატვირთვა...</Text>
                        </View>
                      ) : (
                        <Text
                          style={[
                            styles.filePickerText,
                            licenseDocument && styles.filePickerTextActive,
                          ]}
                        >
                          {licenseDocument
                            ? licenseDocument.name
                            : "ატვირთეთ სამედიცინო ლიცენზია"}
                        </Text>
                      )}
                      <Ionicons
                        name="document-attach-outline"
                        size={20}
                        color="#9CA3AF"
                      />
                    </TouchableOpacity>
                    {licenseDocument && (
                      <Text style={styles.fileHelper}>
                        ✓ ფაილი წარმატებით აიტვირთა
                      </Text>
                    )}
                  </View>
                </>
              )}

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#9CA3AF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    placeholder="••••••••••"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Signup Button */}
              <TouchableOpacity
                style={[
                  styles.signupButton,
                  isLoading && styles.signupButtonDisabled,
                ]}
                onPress={handleSignup}
                disabled={isLoading}
              >
                <Text style={styles.signupButtonText}>
                  {isLoading ? "რეგისტრაცია..." : "რეგისტრაცია"}
                </Text>
              </TouchableOpacity>

              {/* Signin Link */}
              <View style={styles.signinContainer}>
                <Text style={styles.signinText}>Have an account? </Text>
                <TouchableOpacity onPress={handleSignin}>
                  <Text style={styles.signinLink}>sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#06B6D4",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#1F2937",
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#1F2937",
  },
  eyeIcon: {
    padding: 4,
  },
  signupButton: {
    backgroundColor: "#06B6D4",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  signupButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  signupButtonDisabled: {
    backgroundColor: "#9CA3AF",
    opacity: 0.7,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
    marginHorizontal: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  facebookIcon: {
    backgroundColor: "#1877F2",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#1F2937",
  },
  signinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signinText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#1F2937",
  },
  signinLink: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#06B6D4",
  },
  logoImage: {
    width: 50,
    height: 50,
  },
  filePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderStyle: "dashed",
  },
  filePickerButtonActive: {
    borderColor: "#10B981",
    borderStyle: "solid",
    backgroundColor: "#F0FDF4",
  },
  filePickerText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
  },
  filePickerTextActive: {
    color: "#10B981",
    fontFamily: "Poppins-Medium",
  },
  uploadingContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  uploadingText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#06B6D4",
    marginLeft: 8,
  },
  fileHelper: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#10B981",
    marginTop: 4,
    marginLeft: 4,
  },
});
