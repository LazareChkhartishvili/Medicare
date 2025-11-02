import Feather from "@expo/vector-icons/Feather";
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

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface ContactMethod {
  id: string;
  title: string;
  value?: string;
  icon: string;
  action?: () => void;
}

type TabType = "faq" | "contact";

const HelpCenterScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>("faq");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>("faq-1");

  // FAQ Data
  const faqData: FAQItem[] = [
    {
      id: "faq-1",
      question: "What is Medicare?",
      answer:
        "Medicare is a comprehensive healthcare platform that connects patients with qualified doctors for online consultations, appointment bookings, and medical services.",
    },
    {
      id: "faq-2",
      question: "How to use Medicare?",
      answer:
        "Using Medicare is simple: 1) Browse doctors by specialty, 2) Book an appointment, 3) Attend your consultation, 4) Manage your health records all in one place.",
    },
    {
      id: "faq-3",
      question: "How do I save the recordings?",
      answer:
        "Your consultation recordings are automatically saved to your account. You can access them anytime from the 'History' tab in your profile.",
    },
  ];

  // Contact Methods Data
  const contactMethods: ContactMethod[] = [
    {
      id: "live-chat",
      title: "Live Chat",
      icon: "chatbubble-outline",
      action: () => {
        // Implement live chat functionality
        console.log("Opening live chat...");
      },
    },
    {
      id: "hotline",
      title: "Hotline Number",
      value: "+995 32 2 123 456",
      icon: "call-outline",
      action: () => {
        // Implement phone call functionality
        console.log("Calling hotline...");
      },
    },
    {
      id: "whatsapp",
      title: "Whatsapp",
      value: "+995 32 2 123 456",
      icon: "logo-whatsapp",
      action: () => {
        // Implement WhatsApp functionality
        console.log("Opening WhatsApp...");
      },
    },
    {
      id: "website",
      title: "Website",
      value: "www.medicare.ge",
      icon: "globe-outline",
      action: () => {
        // Implement website opening functionality
        console.log("Opening website...");
      },
    },
    {
      id: "email",
      title: "Email Support",
      value: "support@medicare.ge",
      icon: "mail-outline",
      action: () => {
        // Implement email functionality
        console.log("Opening email...");
      },
    },
  ];

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleBack = () => {
    router.back();
  };

  const handleContactAction = (method: ContactMethod) => {
    if (method.action) {
      method.action();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={20} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabChange("faq")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "faq" && styles.activeTabText,
            ]}
          >
            FAQ
          </Text>
          {activeTab === "faq" && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabChange("contact")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "contact" && styles.activeTabText,
            ]}
          >
            Contact US
          </Text>
          {activeTab === "contact" && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "faq" ? (
          <View style={styles.faqContainer}>
            {faqData.map((faq) => (
              <TouchableOpacity
                key={faq.id}
                style={styles.faqItem}
                onPress={() => toggleFAQ(faq.id)}
              >
                <View style={styles.faqContent}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  {expandedFAQ === faq.id && (
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  )}
                </View>
                <Feather
                  name={expandedFAQ === faq.id ? "arrow-up" : "arrow-down"}
                  size={20}
                  color={expandedFAQ === faq.id ? "#20BEB8" : "#6B7280"}
                />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.contactContainer}>
            {contactMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={styles.contactItem}
                onPress={() => handleContactAction(method)}
              >
                <View style={styles.contactLeft}>
                  <View style={styles.contactIconContainer}>
                    <Ionicons
                      name={method.icon as any}
                      size={20}
                      color="#20BEB8"
                    />
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactTitle}>{method.title}</Text>
                    {method.value && (
                      <Text style={styles.contactValue}>{method.value}</Text>
                    )}
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
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
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    position: "relative",
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#20BEB8",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#20BEB8",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  // FAQ Styles
  faqContainer: {
    gap: 12,
  },
  faqItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  faqContent: {
    flex: 1,
    marginRight: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#1F2937",
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    lineHeight: 20,
  },
  // Contact Styles
  contactContainer: {
    gap: 12,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#F0FDF4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#1F2937",
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
  },
});

export default HelpCenterScreen;
