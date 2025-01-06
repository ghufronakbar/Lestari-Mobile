import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { C } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: C[1],
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          bottom: 30,
          marginHorizontal: 20,
          borderRadius: 20,
          paddingBottom: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 2,
          height: 55,          
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={focused ? C[1] : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Riwayat",
          headerTitle: "Riwayat",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "time" : "time-outline"}
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
              name={focused ? "add-circle" : "add-circle-outline"}
              color={focused ? C[1] : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="draft"
        options={{
          title: "Draft",
          headerTitle: "Draft",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "document" : "document-outline"}
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
