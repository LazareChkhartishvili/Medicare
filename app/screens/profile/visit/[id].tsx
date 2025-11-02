import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { patientVisits } from "../../../../assets/data/patientRecords";

export default function VisitDetailScreen() {
  const { id } = useLocalSearchParams();
  const visit = patientVisits.find((v) => v.id === id);

  if (!visit) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color="#EF4444" />
          <Text style={styles.errorText}>ვიზიტი არ მოიძებნა</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>უკან დაბრუნება</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ka-GE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDownloadPDF = (pdfUrl: string, formId: string) => {
    Alert.alert("PDF გადმოწერა", `გსურთ ფორმა 100-ის (${formId}) გადმოწერა?`, [
      {
        text: "გაუქმება",
        style: "cancel",
      },
      {
        text: "გადმოწერა",
        onPress: () => {
          Alert.alert("წარმატება", "PDF ფაილი გადმოწერილია");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerBackButton}
        >
          <View style={styles.headerBackButtonIcon}>
            <Ionicons name="arrow-back" size={20} color="#06B6D4" />
          </View>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>ვიზიტის დეტალები</Text>
          <Text style={styles.headerSubtitle}>{visit.id}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Visit Info Card */}
        <View style={styles.visitInfoCard}>
          <View style={styles.visitInfoHeader}>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar" size={24} color="#06B6D4" />
              <Text style={styles.visitDate}>{formatDate(visit.date)}</Text>
            </View>
          </View>
          <View style={styles.doctorInfo}>
            <Ionicons name="person-circle" size={40} color="#06B6D4" />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>{visit.doctorName}</Text>
              <Text style={styles.doctorSpecialty}>
                {visit.doctorSpecialty}
              </Text>
            </View>
          </View>
        </View>

        {/* Diagnosis */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="medical" size={22} color="#EF4444" />
            <Text style={styles.sectionTitle}>დიაგნოზი</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.diagnosisText}>{visit.diagnosis}</Text>
          </View>
        </View>

        {/* Symptoms */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="warning" size={22} color="#F59E0B" />
            <Text style={styles.sectionTitle}>სიმპტომები</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.symptomsContainer}>
              {visit.symptoms.map((symptom, index) => (
                <View key={index} style={styles.symptomChip}>
                  <Text style={styles.symptomText}>{symptom}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Vital Signs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="fitness" size={22} color="#8B5CF6" />
            <Text style={styles.sectionTitle}>ვიტალური მაჩვენებლები</Text>
          </View>
          <View style={styles.vitalSignsGrid}>
            <View style={styles.vitalSignCard}>
              <View style={styles.vitalSignIconContainer}>
                <Ionicons name="water" size={24} color="#EF4444" />
              </View>
              <Text style={styles.vitalSignLabel}>წნევა</Text>
              <Text style={styles.vitalSignValue}>
                {visit.vitalSigns.bloodPressure}
              </Text>
            </View>
            <View style={styles.vitalSignCard}>
              <View style={styles.vitalSignIconContainer}>
                <Ionicons name="heart" size={24} color="#EF4444" />
              </View>
              <Text style={styles.vitalSignLabel}>პულსი</Text>
              <Text style={styles.vitalSignValue}>
                {visit.vitalSigns.heartRate}
              </Text>
            </View>
            <View style={styles.vitalSignCard}>
              <View style={styles.vitalSignIconContainer}>
                <Ionicons name="thermometer" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.vitalSignLabel}>ტემპერატურა</Text>
              <Text style={styles.vitalSignValue}>
                {visit.vitalSigns.temperature}
              </Text>
            </View>
            <View style={styles.vitalSignCard}>
              <View style={styles.vitalSignIconContainer}>
                <Ionicons name="fitness" size={24} color="#10B981" />
              </View>
              <Text style={styles.vitalSignLabel}>წონა</Text>
              <Text style={styles.vitalSignValue}>
                {visit.vitalSigns.weight}
              </Text>
            </View>
          </View>
        </View>

        {/* Medications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="bandage" size={22} color="#06B6D4" />
            <Text style={styles.sectionTitle}>
              დანიშნული წამლები ({visit.medications.length})
            </Text>
          </View>
          {visit.medications.map((med, index) => (
            <View key={index} style={styles.medicationCard}>
              <View style={styles.medicationHeader}>
                <Text style={styles.medicationName}>{med.name}</Text>
                <View style={styles.dosageBadge}>
                  <Text style={styles.dosageText}>{med.dosage}</Text>
                </View>
              </View>
              <View style={styles.medicationDetails}>
                <View style={styles.medicationDetailRow}>
                  <Ionicons name="time-outline" size={18} color="#6B7280" />
                  <Text style={styles.medicationDetailText}>
                    {med.frequency}
                  </Text>
                </View>
                <View style={styles.medicationDetailRow}>
                  <Ionicons name="calendar-outline" size={18} color="#6B7280" />
                  <Text style={styles.medicationDetailText}>
                    {med.duration}
                  </Text>
                </View>
              </View>
              <View style={styles.instructionsContainer}>
                <Ionicons name="information-circle" size={18} color="#06B6D4" />
                <Text style={styles.instructionsText}>{med.instructions}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Follow-up */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name={
                visit.followUp.required ? "checkmark-circle" : "close-circle"
              }
              size={22}
              color={visit.followUp.required ? "#10B981" : "#6B7280"}
            />
            <Text style={styles.sectionTitle}>განმეორებითი ვიზიტი</Text>
          </View>
          {visit.followUp.required ? (
            <View style={styles.followUpCard}>
              <View style={styles.followUpHeader}>
                <Ionicons name="calendar" size={24} color="#10B981" />
                <View>
                  <Text style={styles.followUpLabel}>დაგეგმილი თარიღი</Text>
                  <Text style={styles.followUpDate}>
                    {formatDate(visit.followUp.date!)}
                  </Text>
                </View>
              </View>
              <View style={styles.followUpDivider} />
              <Text style={styles.followUpReason}>{visit.followUp.reason}</Text>
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.noFollowUpText}>
                განმეორებითი ვიზიტი არ არის საჭირო
              </Text>
            </View>
          )}
        </View>

        {/* Form 100 */}
        {visit.form100 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="document" size={22} color="#8B5CF6" />
              <Text style={styles.sectionTitle}>ფორმა 100</Text>
            </View>
            <View style={styles.form100Card}>
              <View style={styles.form100Header}>
                <View style={styles.form100Badge}>
                  <Ionicons name="document-text" size={20} color="#8B5CF6" />
                  <Text style={styles.form100BadgeText}>
                    {visit.form100.id}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() =>
                    handleDownloadPDF(
                      visit.form100!.pdfUrl || "",
                      visit.form100!.id
                    )
                  }
                >
                  <Ionicons name="download" size={20} color="#FFFFFF" />
                  <Text style={styles.downloadButtonText}>PDF</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.form100Body}>
                <View style={styles.form100Row}>
                  <View style={styles.form100Item}>
                    <Text style={styles.form100Label}>გაცემის თარიღი</Text>
                    <Text style={styles.form100Value}>
                      {formatDate(visit.form100.issueDate)}
                    </Text>
                  </View>
                  <View style={styles.form100Item}>
                    <Text style={styles.form100Label}>ვალიდურია</Text>
                    <Text style={styles.form100Value}>
                      {formatDate(visit.form100.validUntil)}
                    </Text>
                  </View>
                </View>

                <View style={styles.form100Divider} />

                <View style={styles.form100Detail}>
                  <Text style={styles.form100DetailLabel}>მიზეზი</Text>
                  <Text style={styles.form100DetailText}>
                    {visit.form100.reason}
                  </Text>
                </View>

                <View style={styles.form100Detail}>
                  <Text style={styles.form100DetailLabel}>დიაგნოზი</Text>
                  <Text style={styles.form100DetailText}>
                    {visit.form100.diagnosis}
                  </Text>
                </View>

                <View style={styles.form100Recommendations}>
                  <Text style={styles.recommendationsTitle}>
                    რეკომენდაციები
                  </Text>
                  <Text style={styles.recommendationsText}>
                    {visit.form100.recommendations}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Notes */}
        {visit.notes && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="document-text" size={22} color="#F59E0B" />
              <Text style={styles.sectionTitle}>ექიმის შენიშვნები</Text>
            </View>
            <View style={styles.notesCard}>
              <Text style={styles.notesText}>{visit.notes}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerBackButton: {},
  headerBackButtonIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#9CA3AF",
  },
  scrollContainer: {
    flex: 1,
  },
  visitInfoCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  visitInfoHeader: {
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  visitDate: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
  },
  doctorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#06B6D4",
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  diagnosisText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#EF4444",
  },
  symptomsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  symptomChip: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  symptomText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#D97706",
  },
  vitalSignsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  vitalSignCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  vitalSignIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  vitalSignLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    marginBottom: 4,
  },
  vitalSignValue: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
  },
  medicationCard: {
    backgroundColor: "#F0F9FF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  medicationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  medicationName: {
    fontSize: 17,
    fontFamily: "Poppins-Bold",
    color: "#0C4A6E",
    flex: 1,
  },
  dosageBadge: {
    backgroundColor: "#06B6D4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dosageText: {
    fontSize: 13,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  medicationDetails: {
    gap: 8,
    marginBottom: 12,
  },
  medicationDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  medicationDetailText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#475569",
  },
  instructionsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
  },
  instructionsText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    color: "#0891B2",
  },
  followUpCard: {
    backgroundColor: "#F0FDF4",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#BBF7D0",
  },
  followUpHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  followUpLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#15803D",
  },
  followUpDate: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#166534",
  },
  followUpDivider: {
    height: 1,
    backgroundColor: "#BBF7D0",
    marginBottom: 12,
  },
  followUpReason: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#15803D",
    lineHeight: 22,
  },
  noFollowUpText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    fontStyle: "italic",
    textAlign: "center",
  },
  form100Card: {
    backgroundColor: "#F5F3FF",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#DDD6FE",
  },
  form100Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  form100Badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  form100BadgeText: {
    fontSize: 15,
    fontFamily: "Poppins-Bold",
    color: "#8B5CF6",
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  downloadButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  form100Body: {
    padding: 16,
  },
  form100Row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  form100Item: {
    flex: 1,
  },
  form100Label: {
    fontSize: 11,
    fontFamily: "Poppins-SemiBold",
    color: "#6B21A8",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  form100Value: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    color: "#1F2937",
  },
  form100Divider: {
    height: 1,
    backgroundColor: "#DDD6FE",
    marginBottom: 16,
  },
  form100Detail: {
    marginBottom: 16,
  },
  form100DetailLabel: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#6B21A8",
    marginBottom: 6,
  },
  form100DetailText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#4B5563",
    lineHeight: 22,
  },
  form100Recommendations: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#8B5CF6",
  },
  recommendationsTitle: {
    fontSize: 13,
    fontFamily: "Poppins-Bold",
    color: "#6B21A8",
    marginBottom: 8,
  },
  recommendationsText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#4B5563",
    lineHeight: 22,
  },
  notesCard: {
    backgroundColor: "#FFFBEB",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  notesText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#78350F",
    lineHeight: 22,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#EF4444",
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: "#06B6D4",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
});
