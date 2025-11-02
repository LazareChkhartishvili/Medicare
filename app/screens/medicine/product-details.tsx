import { healthcareProducts } from "@/assets/data/healthcareProducts";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../contexts/CartContext";

const ProductDetails = () => {
  const { productId } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Find the product
  const product = healthcareProducts
    .flatMap((cat) => cat.products)
    .find((prod) => prod.id === Number(productId));

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Not Found</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    // Add product to cart with selected quantity
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price.replace("$", "")),
        weight: product.tabletAmount || "250g",
        image: product.image,
      },
      quantity
    );

    Alert.alert(
      "Added to Cart",
      `${quantity} ${product.name} has been added to your cart`,
      [
        {
          text: "Continue Shopping",
          style: "cancel",
        },
        {
          text: "View Cart",
          onPress: () => router.push("/screens/medicine/cart"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Description</Text>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => router.push("/screens/medicine/cart")}
        >
          <Feather name="shopping-cart" size={24} color="#666666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <Image
              source={product.image}
              style={styles.productImage}
              contentFit="contain"
            />
            {product.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}</Text>
              </View>
            )}
          </View>

          {/* Image Slider Dots */}
          {/* <View style={styles.sliderDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View> */}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.name}</Text>

          {/* Rating and Delivery Info */}
          <View style={styles.ratingSection}>
            <View style={styles.ratingItem}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>4.8 (1.2k)</Text>
            </View>
            <View style={styles.ratingItem}>
              <Ionicons name="time-outline" size={16} color="#666666" />
              <Text style={styles.ratingText}>25-30 mins</Text>
            </View>
            <View style={styles.deliveryBadge}>
              <Ionicons name="gift-outline" size={16} color="white" />
              <Text style={styles.deliveryText}>Free Delivery</Text>
            </View>
          </View>

          {/* Price */}
          <View style={styles.priceSection}>
            <Text style={styles.currentPrice}>{product.price}</Text>
            {product.oldPrice && (
              <Text style={styles.oldPrice}>{product.oldPrice}</Text>
            )}
          </View>

          {/* Product Details */}
          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Dosage Form:</Text>
              <Text style={styles.detailValue}>Tablet</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Dosage:</Text>
              <Text style={styles.detailValue}>90mg</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Active Elements:</Text>
              <Text style={styles.detailValue}>Multivitamins</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </Text>
            <TouchableOpacity>
              <Text style={styles.readMoreText}>Read More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section - Quantity and Add to Cart */}
      <View style={styles.bottomSection}>
        <View style={styles.quantitySection}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Ionicons name="remove" size={20} color="#666666" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Ionicons name="add" size={20} color="666666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
    fontFamily: "Poppins-SemiBold",
  },
  likeButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  imageSection: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#F8F9FA",
  },
  imageContainer: {
    position: "relative",
    width: 280,
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  productImage: {
    width: 200,
    height: 200,
  },
  discountBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  sliderDots: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E5E5",
  },
  activeDot: {
    backgroundColor: "#20BEB8",
  },
  productInfo: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    fontFamily: "Poppins-Bold",
    marginBottom: 16,
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Poppins-Medium",
  },
  deliveryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#20BEB8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  deliveryText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  priceSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    fontFamily: "Poppins-Bold",
  },
  oldPrice: {
    fontSize: 20,
    color: "#999999",
    textDecorationLine: "line-through",
    fontFamily: "Poppins-Medium",
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detailLabel: {
    fontSize: 14,
    color: "#999999",
    fontFamily: "Poppins-Regular",
  },
  detailValue: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    fontFamily: "Poppins-Regular",
    marginBottom: 8,
  },
  readMoreText: {
    fontSize: 14,
    color: "#20BEB8",
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    gap: 16,
  },
  quantitySection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Poppins-SemiBold",
    minWidth: 24,
    textAlign: "center",
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#20BEB8",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },
});
