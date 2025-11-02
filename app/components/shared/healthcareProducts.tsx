import { healthcareProducts } from "@/assets/data/healthcareProducts";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SeeAll from "./seeAll";

const HealthcareProducts = ({ name }: { name: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SeeAll title={name} route="/screens/medicine/categories" />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {Array.from(
          { length: Math.ceil(healthcareProducts.length / 2) },
          (_, index) => (
            <View key={index} style={styles.column}>
              {healthcareProducts
                .slice(index * 2, (index + 1) * 2)
                .map((product) => (
                  <View
                    key={product.id}
                    style={[
                      styles.productCard,
                      { backgroundColor: product.bgColor },
                    ]}
                  >
                    <Text style={styles.productName}>{product.name}</Text>
                  </View>
                ))}
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default HealthcareProducts;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  scrollContent: {
    paddingRight: 16,
  },
  column: {
    width: 180,
    marginRight: 12,
  },
  productCard: {
    width: "100%",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    color: "#333333",
    textAlign: "center",
  },
});
