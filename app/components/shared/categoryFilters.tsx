import { healthcareProducts } from "@/assets/data/healthcareProducts";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CategoryFiltersProps {
  selectedFilter: number;
  onFilterChange: (filterId: number) => void;
}

const categoryFilters = [
  {
    id: 0,
    name: "All",
  },
  ...healthcareProducts.map((category) => ({
    id: category.id,
    name: category.name,
  })),
];

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
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
        {categoryFilters.map((filter) => (
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

export default CategoryFilters;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#F2F2F7",
  },
  scrollContent: {
    gap: 12,
    alignItems: "center",
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    minWidth: 80,
    alignItems: "center",
  },
  activeFilterButton: {
    borderColor: "#20BEB8",
    backgroundColor: "white",
  },
  filterText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#333333",
    textAlign: "center",
  },
  activeFilterText: {
    color: "#20BEB8",
    fontFamily: "Poppins-SemiBold",
  },
});
