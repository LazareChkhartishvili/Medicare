import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { ScheduleProvider } from "../contexts/ScheduleContext";

export default function DoctorTabsLayout() {
  return (
    <ScheduleProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#20BEB8",
          tabBarInactiveTintColor: "#94A3B8",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#E5E5EA",
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="appointments"
          options={{
            title: "Appointments",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="patients"
          options={{
            title: "Patients",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="users" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            title: "Schedule",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ScheduleProvider>
  );
}
