import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { C } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: C[1],
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "grid" : "grid-outline"}
              color={focused ? C[1] : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Riwayat",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "timer" : "timer-outline"}
              color={focused ? C[1] : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Input Satwa",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "pencil" : "pencil-outline"}
              color={focused ? C[1] : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={focused ? C[1] : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
