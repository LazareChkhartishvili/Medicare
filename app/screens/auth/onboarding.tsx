import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    id: 1,
    title: "Book Appointment",
    description: "For any health questions, our doctors are Ready to help you.",
  },
  {
    id: 2,
    title: "Online Health Check",
    description: "For any health questions, our doctors are Ready to help you.",
  },
  {
    id: 3,
    title: "2000+ Trusted Doctors",
    description: "For any health questions, our doctors are Ready to help you.",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Simple animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Simple slide in animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [currentIndex, slideAnim]);

  const handleNext = () => {
    // Simple button press
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();

    if (currentIndex < onboardingData.length - 1) {
      // Simple slide out
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(currentIndex + 1);
        slideAnim.setValue(width);
      });
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = async () => {
    await AsyncStorage.setItem("hasCompletedOnboarding", "true");
    router.replace("/screens/auth/roleSelection");
  };

  const currentData = onboardingData[currentIndex];
  const isLastScreen = currentIndex === onboardingData.length - 1;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Background Image */}
      <Image
        source={require("../../../assets/images/backgrounds/onboarding.png")}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      <SafeAreaView style={styles.safeArea}>
        {/* Main Content */}
        <View style={styles.content}>
          {/* Vector Background Card */}
          <Animated.View
            style={[
              styles.cardContainer,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            {/* Vector Background Image */}
            <Image
              source={require("../../../assets/images/icons/Vector.png")}
              style={styles.vectorBackground}
              contentFit="contain"
            />

            {/* Content Overlay */}
            <View style={styles.contentOverlay}>
              <Text style={styles.title}>{currentData.title}</Text>
              <Text style={styles.description}>{currentData.description}</Text>
            </View>

            {/* Button positioned in the cutout */}
            <Animated.View
              style={{
                transform: [{ scale: buttonScale }],
              }}
            >
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Ionicons
                  name={isLastScreen ? "checkmark" : "arrow-forward"}
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  time: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  signalIcon: {
    width: 18,
    height: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  wifiIcon: {
    width: 16,
    height: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  batteryIcon: {
    width: 24,
    height: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  cardContainer: {
    position: "relative",
    alignItems: "center",
    width: width * 0.9,
    height: 220,
  },
  vectorBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
  },
  contentOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 60,
    paddingBottom: 80,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 34,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.95,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  nextButton: {
    position: "absolute",
    bottom: -260,
    right: -35,
    width: 72,
    height: 72,
    borderRadius: "50%",
    backgroundColor: "#06B6D4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    // Make button appear to be "inside" the card
    zIndex: 1,
  },
});
