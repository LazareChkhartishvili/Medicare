import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Clipboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

/**
 * ვიდეო კონსულტაციის გვერდი - In-App Jitsi Meet
 * 
 * გამოიყენება Jitsi Meet WebView-ით პირდაპირ აპლიკაციის შიგნით
 * 
 * უპირატესობები:
 * - ✅ 100% უფასო
 * - ✅ Expo Go-ში მუშაობს
 * - ✅ არ საჭიროებს backend-ს
 * - ✅ In-App (არა browser)
 * - ✅ HD ხარისხი
 * - ✅ Screen Sharing
 * - ✅ Recording
 */

export default function VideoCallScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callStarted, setCallStarted] = useState(false);

  // Get parameters from navigation
  const consultationId = params.consultationId as string;
  const patientName = params.patientName as string;
  const roomName = (params.roomName as string) || `medicare-${consultationId}`;

  // Jitsi Meet configuration
  // Jitsi Meet WebView URL with config
  const jitsiUrl = `https://meet.jit.si/${roomName}#config.prejoinPageEnabled=false&config.startWithAudioMuted=false&config.startWithVideoMuted=false&config.disableDeepLinking=true`;

  // Call duration timer
  useEffect(() => {
    if (!callStarted) return;

    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [callStarted]);

  const handleEndCall = () => {
    Alert.alert(
      "კონსულტაციის დასრულება",
      "დარწმუნებული ხართ, რომ გსურთ კონსულტაციის დასრულება?",
      [
        {
          text: "გაუქმება",
          style: "cancel",
        },
        {
          text: "დასრულება",
          style: "destructive",
          onPress: () => {
            router.back();
          },
        },
      ]
    );
  };

  const handleOpenInBrowser = async () => {
    const url = `https://meet.jit.si/${roomName}`;
    const canOpen = await Linking.canOpenURL(url);
    
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("შეცდომა", "Browser-ის გახსნა ვერ მოხერხდა");
    }
  };

  const handleCopyLink = () => {
    const url = `https://meet.jit.si/${roomName}`;
    Clipboard.setString(url);
    Alert.alert("✅ კოპირებულია", "Meeting link დაკოპირდა Clipboard-ში");
  };

  // Format duration
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {callStarted && (
            <>
              <View style={styles.statusIndicator}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>LIVE</Text>
              </View>
              <Text style={styles.durationText}>
                {formatDuration(callDuration)}
              </Text>
            </>
          )}
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.patientName}>{patientName}</Text>
          <Text style={styles.consultationId}>ID: {consultationId}</Text>
        </View>
        <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
          <Ionicons name="call" size={20} color="#FFFFFF" />
          <Text style={styles.endCallText}>დასრულება</Text>
        </TouchableOpacity>
      </View>

      {/* Video Call Container - WebView */}
      <View style={styles.videoContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#06B6D4" />
            <Text style={styles.loadingText}>
              ვიდეო კონსულტაციის ჩატვირთვა...
            </Text>
            <Text style={styles.loadingSubtext}>
              Jitsi Meet-ის ინიციალიზაცია
            </Text>
          </View>
        )}
        <WebView
          source={{ uri: jitsiUrl }}
          style={styles.webview}
          onLoadStart={() => {
            setLoading(true);
            setCallStarted(false);
          }}
          onLoadEnd={() => {
            setLoading(false);
            setCallStarted(true);
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error("WebView error: ", nativeEvent);
            Alert.alert(
              "შეცდომა",
              "ვიდეო კონსულტაციის ჩატვირთვა ვერ მოხერხდა. გთხოვთ შეამოწმოთ ინტერნეტ კავშირი."
            );
          }}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          mixedContentMode="always"
          // Allow camera and microphone
          mediaCapturePermissionGrantType="grant"
        />
      </View>

      {/* Footer Info */}
      <View style={styles.footer}>
        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark" size={20} color="#10B981" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              End-to-End Encrypted • Jitsi Meet
            </Text>
            <Text style={styles.infoText}>
              Room: {roomName}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2937",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#111827",
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  headerLeft: {
    flex: 1,
  },
  headerCenter: {
    flex: 2,
    alignItems: "center",
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#EF4444",
  },
  durationText: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    marginTop: 4,
  },
  patientName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  consultationId: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
  },
  endCallButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#EF4444",
    borderRadius: 8,
  },
  endCallText: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  videoContainer: {
    flex: 1,
    backgroundColor: "#000000",
    position: "relative",
  },
  webview: {
    flex: 1,
    backgroundColor: "#000000",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F2937",
    zIndex: 10,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginTop: 20,
  },
  loadingSubtext: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
    marginTop: 8,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#111827",
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    backgroundColor: "#1F293720",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#10B98130",
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#10B981",
    marginBottom: 2,
  },
  infoText: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
  },
});
