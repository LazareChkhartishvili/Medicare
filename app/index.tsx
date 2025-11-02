import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkInitialRoute();
  }, []);

  const checkInitialRoute = async () => {
    try {
      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Check onboarding
      const hasCompletedOnboarding = await AsyncStorage.getItem(
        "hasCompletedOnboarding"
      );

      if (hasCompletedOnboarding !== "true") {
        router.replace("/screens/auth/onboarding");
        return;
      }

      // Always go to role selection - never auto-navigate based on stored role
      router.replace("/screens/auth/roleSelection");
    } catch (error) {
      console.error("Error:", error);
      router.replace("/screens/auth/onboarding");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/splash-icon.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.appName}>Medicare</Text>
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});
