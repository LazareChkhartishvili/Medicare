import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DoctorFiltersProps {
  selectedFilter: number;
  onFilterChange: (filterId: number) => void;
}

const doctorFilters = [
  {
    id: 1,
    name: "All Doctors",
  },
  {
    id: 2,
    name: "Neurology",
  },
  {
    id: 3,
    name: "Cardiology",
  },
  {
    id: 4,
    name: "Gynecology",
  },
  {
    id: 5,
    name: "Pediatrics",
  },
  {
    id: 6,
    name: "Allergy",
  },
  {
    id: 7,
    name: "Dentist",
  },
  {
    id: 8,
    name: "Urology",
  },
  {
    id: 9,
    name: "Gastrology",
  },
];

const DoctorFilters: React.FC<DoctorFiltersProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {doctorFilters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.activeFilterButton,
            ]}
            onPress={() => onFilterChange(filter.id)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.id && styles.activeFilterText,
              ]}
            >
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default DoctorFilters;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#F2F2F7",
  },
  scrollContent: {
    gap: 16,
    alignItems: "center",
  },
  filterButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#D4D4D4",
    minWidth: 100,
    alignItems: "center",
  },
  activeFilterButton: {
    borderColor: "#20BEB8",
  },
  filterText: {
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    color: "#525252",
    textAlign: "center",
  },
  activeFilterText: {
    color: "#20BEB8",
    fontFamily: "Poppins-SemiBold",
  },
});
