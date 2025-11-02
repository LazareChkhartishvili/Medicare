import { patientAppointments } from "@/assets/data/patientAppointments";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TodayAppointment = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Find today's appointments
  const todayAppointments = patientAppointments.filter(
    (appointment) => appointment.date === today && appointment.status === "scheduled"
  );

  // If no appointments for today, don't show banner
  if (todayAppointments.length === 0) {
    return null;
  }

  // Get the first appointment (or closest one)
  const appointment = todayAppointments[0];

  // Calculate time until appointment
  const getTimeUntil = () => {
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
    const now = new Date();
    const diff = appointmentDateTime.getTime() - now.getTime();

    if (diff < 0) return "ახლა";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours} საათში`;
    } else if (minutes > 0) {
      return `${minutes} წუთში`;
    } else {
      return "ახლა";
    }
  };

  // Check if appointment is within 1 hour from now
  const isUrgent = () => {
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
    const now = new Date();
    const diff = appointmentDateTime.getTime() - now.getTime();
    return diff > 0 && diff <= 60 * 60 * 1000; // 1 hour
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.container, isUrgent() && styles.containerUrgent]}
        onPress={() => setShowModal(true)}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={isUrgent() ? "alarm" : "calendar"}
            size={24}
            color="#FFFFFF"
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>
            {isUrgent() ? "კონსულტაცია მალე!" : "დღეს გაქვთ ჯავშანი"}
          </Text>
          <View style={styles.infoRow}>
            <Ionicons name="medical" size={16} color="#FFFFFF" />
            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={16} color="#FFFFFF" />
            <Text style={styles.time}>{appointment.time}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Details Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>დღევანდელი ჯავშანი</Text>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.detailCard}>
                <View style={styles.detailRow}>
                  <Ionicons name="medical" size={20} color="#06B6D4" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>ექიმი</Text>
                    <Text style={styles.detailValue}>{appointment.doctorName}</Text>
                    <Text style={styles.detailSubValue}>
                      {appointment.doctorSpecialty}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={20} color="#8B5CF6" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>დრო</Text>
                    <Text style={styles.detailValue}>{appointment.time}</Text>
                    <Text style={styles.detailSubValue}>{getTimeUntil()} დარჩა</Text>
                  </View>
                </View>

                {appointment.symptoms && (
                  <View style={styles.detailRow}>
                    <Ionicons name="pulse" size={20} color="#EF4444" />
                    <View style={styles.detailContent}>
                      <Text style={styles.detailLabel}>სიმპტომები</Text>
                      <Text style={styles.detailValue}>{appointment.symptoms}</Text>
                    </View>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={[styles.joinCallButton, isUrgent() && styles.joinCallButtonUrgent]}
                onPress={() => {
                  setShowModal(false);
                  router.push({
                    pathname: "/screens/video-call",
                    params: {
                      appointmentId: appointment.id,
                      doctorName: appointment.doctorName,
                      roomName: `medicare-${appointment.id}`,
                    },
                  });
                }}
              >
                <Ionicons name="videocam" size={20} color="#FFFFFF" />
                <Text style={styles.joinCallText}>
                  შესვლა კონსულტაციაზე
                </Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => {
                  setShowModal(false);
                  router.push("/(tabs)/appointment");
                }}
              >
                <Text style={styles.viewAllText}>ყველა ჯავშნის ნახვა</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#06B6D4",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#06B6D4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  containerUrgent: {
    backgroundColor: "#EF4444",
    shadowColor: "#EF4444",
    animationDuration: "1s",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  doctorName: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
  },
  time: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    padding: 20,
  },
  detailCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  detailContent: {
    flex: 1,
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#6B7280",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#1F2937",
  },
  detailSubValue: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    marginTop: 2,
  },
  joinCallButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#10B981",
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 8,
  },
  joinCallButtonUrgent: {
    backgroundColor: "#EF4444",
  },
  joinCallText: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#06B6D4",
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
});

export default TodayAppointment;

