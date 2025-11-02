import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DayAvailability {
  date: string;
  dayOfWeek: string;
  timeSlots: string[];
  isAvailable: boolean;
}

interface Review {
  id: number;
  reviewerName: string;
  reviewDate: string;
  rating: number;
  comment: string;
}

interface AppointmentSchedulerProps {
  workingHours: string;
  availability: DayAvailability[];
  totalReviews: number;
  reviews: Review[];
  doctorId?: number;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  workingHours,
  availability,
  totalReviews,
  reviews,
  doctorId,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    availability[0]?.date || ""
  );
  const [selectedTime, setSelectedTime] = useState<string>("");

  const currentMonth = "January 2024"; // This could be dynamic based on selected date

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time selection when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const selectedDayAvailability = availability.find(
    (day) => day.date === selectedDate
  );

  return (
    <View style={styles.container}>
      {/* Working Time Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Working Time</Text>
        <Text style={styles.workingHours}>{workingHours}</Text>
      </View>

      {/* Schedule Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule</Text>

        {/* Month/Year Selector */}
        <View style={styles.monthSelector}>
          <Text style={styles.monthText}>{currentMonth}</Text>
          <Ionicons name="chevron-down" size={16} color="#666666" />
        </View>

        {/* Day Selection */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dayScroll}
          contentContainerStyle={styles.dayContainer}
        >
          {availability.map((day) => (
            <TouchableOpacity
              key={day.date}
              style={[
                styles.dayCard,
                selectedDate === day.date && styles.selectedDayCard,
              ]}
              onPress={() => handleDateSelect(day.date)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDate === day.date && styles.selectedDayText,
                ]}
              >
                {day.dayOfWeek}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedDate === day.date && styles.selectedDateText,
                ]}
              >
                {day.date.split("-")[2]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Time Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Time</Text>
        <View style={styles.timeGrid}>
          {selectedDayAvailability?.timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeSlot,
                selectedTime === time && styles.selectedTimeSlot,
              ]}
              onPress={() => handleTimeSelect(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reviews Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews ({totalReviews})</Text>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.avatar} />
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewerName}>{review.reviewerName}</Text>
                <Text style={styles.reviewDate}>{review.reviewDate}</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <Ionicons key={index} name="star" size={16} color="#FFD700" />
              ))}
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>

      {/* Book Appointment Button */}
      <TouchableOpacity
        style={[
          styles.bookButton,
          (!selectedDate || !selectedTime) && styles.disabledButton,
        ]}
        disabled={!selectedDate || !selectedTime}
        onPress={() => {
          if (selectedDate && selectedTime && doctorId) {
            router.push({
              pathname: "/screens/appointment/make-appointment",
              params: {
                doctorId: doctorId.toString(),
                selectedDate: selectedDate,
                selectedTime: selectedTime,
              },
            });
          }
        }}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  section: {
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
    marginBottom: 12,
  },
  workingHours: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#666666",
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  monthText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#333333",
    marginRight: 8,
  },
  dayScroll: {
    marginHorizontal: -20,
  },
  dayContainer: {
    paddingHorizontal: 20,
  },
  dayCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: "center",
    minWidth: 60,
  },
  selectedDayCard: {
    backgroundColor: "#06B6D4",
  },
  dayText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#666666",
    marginBottom: 4,
  },
  selectedDayText: {
    color: "#FFFFFF",
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  selectedDateText: {
    color: "#FFFFFF",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  timeSlot: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minWidth: 80,
    alignItems: "center",
  },
  selectedTimeSlot: {
    backgroundColor: "#06B6D4",
  },
  timeText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#666666",
  },
  selectedTimeText: {
    color: "#FFFFFF",
  },
  reviewCard: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E5E5",
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666666",
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    lineHeight: 20,
  },
  bookButton: {
    backgroundColor: "#06B6D4",
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
});

export default AppointmentScheduler;
