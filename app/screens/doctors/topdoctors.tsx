import DoctorFilters from "@/app/components/shared/doctorFilters";
import { doctors } from "@/assets/data/doctors";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TopDoctors = () => {
  const [selectedFilter, setSelectedFilter] = useState(1);

  const filteredDoctors = useMemo(() => {
    if (selectedFilter === 1) {
      return doctors;
    } else {
      // Filter by specialization
      const filterMap: { [key: number]: string } = {
        2: "Neurology",
        3: "Cardiology",
        4: "Gynecology",
        5: "Pediatrics",
        6: "Allergy",
        7: "Dentist",
        8: "Urology",
        9: "Gastrology",
      };

      const filterSpecialization = filterMap[selectedFilter];
      return doctors.filter((doctor) =>
        doctor.specialization
          .toLowerCase()
          .includes(filterSpecialization.toLowerCase())
      );
    }
  }, [selectedFilter]);

  // Group doctors by specialization
  const groupedDoctors = useMemo(() => {
    const groups: { [key: string]: typeof doctors } = {};

    filteredDoctors.forEach((doctor) => {
      const specialization = doctor.specialization.split(" ")[0];
      if (!groups[specialization]) {
        groups[specialization] = [];
      }
      groups[specialization].push(doctor);
    });

    return groups;
  }, [filteredDoctors]);

  const renderDoctorCard = (doctor: (typeof doctors)[0]) => (
    <TouchableOpacity
      key={doctor.id}
      style={styles.doctorCard}
      onPress={() =>
        router.push({
          pathname: "/screens/doctors/doctor/[id]",
          params: { id: doctor.id.toString() },
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image source={doctor.image} style={styles.doctorImage} />
        {doctor.isActive && (
          <View style={styles.activeIndicator}>
            <Fontisto name="radio-btn-active" size={18} color="#22C55E" />
          </View>
        )}
      </View>
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialization}>{doctor.specialization}</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingLeft}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.doctorRating}>{doctor.rating}</Text>
            <Text style={styles.doctorReviews}>({doctor.reviewCount})</Text>
          </View>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={20} color="#D4D4D4" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top Doctors</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Filter Section */}
      <View style={{ paddingHorizontal: 20 }}>
        <DoctorFilters
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
      </View>

      {/* Doctors by Specialization */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(groupedDoctors).map(([specialization, doctorsList]) => (
          <View key={specialization} style={styles.specializationSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{specialization}</Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/screens/doctors/doctors-list",
                    params: { specialty: specialization },
                  })
                }
              >
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.doctorsScroll}
            >
              {doctorsList.map((doctor) => renderDoctorCard(doctor))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopDoctors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#F2F2F7",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  headerSpacer: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  specializationSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#20BEB8",
  },
  doctorsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  doctorCard: {
    width: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: "100%",
    height: 140,
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  doctorImage: {
    width: "100%",
    height: "100%",
  },
  doctorInfo: {
    padding: 16,
  },
  doctorName: {
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
    marginBottom: 4,
  },
  doctorSpecialization: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  doctorRating: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: "#333333",
  },
  doctorReviews: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: "#333333",
  },
  favoriteButton: {
    padding: 4,
  },
  activeIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
