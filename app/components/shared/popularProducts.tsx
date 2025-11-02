import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { popularProducts } from "../../../assets/data/popularProducts";
import SeeAll from "./seeAll";

const PopularProducts = ({ name }: { name: string }) => {
  return (
    <View style={{ padding: 16 }}>
      <View style={styles.header}>
        <SeeAll title={name} />
      </View>
      <View style={styles.grid}>
        {popularProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.imageContainer}>
              <Image
                source={product.image}
                style={styles.productImage}
                contentFit="cover"
                transition={200}
              />
              <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons name="heart-outline" size={20} color="#D4D4D4" />
              </TouchableOpacity>
              {product.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{product.discount}</Text>
                </View>
              )}
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.tabletAmount}>{product.tabletAmout}</Text>
              <View style={styles.priceContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.currentPrice}>{product.price}</Text>
                  <Text style={styles.oldPrice}>{product.oldPrice}</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PopularProducts;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
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
    position: "relative",
    height: 130,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 172,
    height: 130,
    backgroundColor: "#F8F9FA",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 4,
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#FF4444",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
    marginBottom: 4,
  },
  tabletAmount: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currentPrice: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#333333",
  },
  oldPrice: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    textDecorationLine: "line-through",
    marginLeft: 4,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#20BEB8",
    backgroundColor: "#20BEB8",
    color: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
