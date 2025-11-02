import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

const Header = () => {
  const { getTotalItems } = useCart();
  const { user, isAuthenticated } = useAuth();

  const handleProfilePress = () => {
    if (isAuthenticated) {
      router.push("/screens/profile/profile");
    } else {
      router.push("/screens/auth/login");
    }
  };

  const handleCartPress = () => {
    router.push("/screens/medicine/cart");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={handleProfilePress}>
        <Image
          style={{ width: 44, height: 44, borderRadius: 100 }}
          source={require("../../../assets/images/test.png")}
        />
        <View>
          <Text style={{ color: "#171717", fontFamily: "Poppins-Medium" }}>
            {isAuthenticated ? "გამარჯობა!" : "მოგესალმებით!"}
          </Text>
          <Text style={{ fontFamily: "Poppins-SemiBold" }}>
            {isAuthenticated && user ? user.name : "მომხმარებელი"}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={handleCartPress} style={styles.cartIcon}>
          <Ionicons name="cart-outline" size={24} color="black" />
          {getTotalItems() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cartIcon: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Poppins-Bold",
  },
});
