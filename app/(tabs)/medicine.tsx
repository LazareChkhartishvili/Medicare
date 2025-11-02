import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Banner from "../components/shared/banner";
import HealthcareProducts from "../components/shared/healthcareProducts";
import PopularProducts from "../components/shared/popularProducts";
import Search from "../components/ui/search";

const Medicine = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <View style={{ flex: 1 }} />
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#0F172A" }}>
            Medicine Shop
          </Text>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Feather name="shopping-cart" size={24} color="black" />
          </View>
        </View>
        {/*  */}
        <Banner />
        <Search />
        <HealthcareProducts name="Categories" />
        <PopularProducts name="Prescribed Medicine" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Medicine;
