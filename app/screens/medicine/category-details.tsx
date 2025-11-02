import CategoryFilters from "@/app/components/shared/categoryFilters";
import ProductSearch from "@/app/components/shared/productSearch";
import { healthcareProducts } from "@/assets/data/healthcareProducts";
import Feather from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryDetails = () => {
  const { categoryId } = useLocalSearchParams();
  const [selectedFilter, setSelectedFilter] = useState(
    categoryId ? Number(categoryId) : 0
  );
  const [searchText, setSearchText] = useState("");

  const category = healthcareProducts.find(
    (cat) => cat.id === Number(categoryId)
  );

  // Get all products from all categories for filtering
  const allProducts = useMemo(() => {
    return healthcareProducts.flatMap((cat) =>
      cat.products.map((product) => ({
        ...product,
        categoryName: cat.name,
        categoryId: cat.id,
      }))
    );
  }, []);

  // Filter products based on selected filter and search text
  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Filter by category
    if (selectedFilter !== 0) {
      products = products.filter(
        (product) => product.categoryId === selectedFilter
      );
    }

    // Filter by search text
    if (searchText.trim()) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.categoryName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return products;
  }, [allProducts, selectedFilter, searchText]);

  if (!category) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Category Not Found</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>
    );
  }

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {
        router.push(`/screens/medicine/product-details?productId=${item.id}`);
      }}
    >
      <View style={styles.productImageContainer}>
        <Image
          source={item.image}
          style={styles.productImage}
          contentFit="contain"
        />
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productAmount}>{item.tabletAmount}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          {item.oldPrice && (
            <Text style={styles.oldPrice}>{item.oldPrice}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Products</Text>
        <View style={styles.placeholder} />
      </View>

      <CategoryFilters
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <ProductSearch searchText={searchText} onSearchChange={setSearchText} />

      <View style={styles.content}>
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default CategoryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  productCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 8,
  },
  productImage: {
    width: 80,
    height: 80,
  },
  discountBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#333333",
    marginBottom: 4,
    lineHeight: 16,
  },
  productAmount: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#666666",
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  price: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "#20BEB8",
  },
  oldPrice: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    textDecorationLine: "line-through",
  },
});
