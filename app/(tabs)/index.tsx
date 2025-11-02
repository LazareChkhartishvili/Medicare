import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Banner from "../components/shared/banner";
import HealthcareProducts from "../components/shared/healthcareProducts";
import PopularProducts from "../components/shared/popularProducts";
import Departments from "../components/ui/departments";
import Header from "../components/ui/header";
import Search from "../components/ui/search";
import Services from "../components/ui/services";
import TopDoctors from "../components/ui/topDoctors";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Header />
        <Search />
        <Services />
        <Departments />
        <TopDoctors />
        <Banner />
        <HealthcareProducts name="Healthcare Products" />
        <PopularProducts name="Popular Products" />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
});
