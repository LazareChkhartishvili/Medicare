import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Language {
  id: string;
  name: string;
  nativeName: string;
}

const LanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const languages: Language[] = [
    { id: "georgian", name: "Georgian", nativeName: "ქართული" },
    { id: "russian", name: "Russian", nativeName: "Русский" },
    { id: "english", name: "English", nativeName: "English" },
  ];

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={20} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Languages List */}
        <View style={styles.languagesContainer}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.id}
              style={styles.languageItem}
              onPress={() => handleLanguageSelect(language.id)}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>{language.name}</Text>
                <Text style={styles.languageNativeName}>
                  {language.nativeName}
                </Text>
              </View>
              <View style={styles.radioButton}>
                {selectedLanguage === language.id && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    borderBottomColor: "#F1F5F9",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  languagesContainer: {
    gap: 0,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#1F2937",
    marginBottom: 2,
  },
  languageNativeName: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#20BEB8",
  },
});

export default LanguageScreen;
