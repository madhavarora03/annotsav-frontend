import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useState } from "react";
import { useTheme } from "tamagui";
import { useTranslation } from "react-i18next"
export default function Layout() {
  const theme = useTheme();
  const [crop,setCrop]=useState('Wheat')
  const { t } = useTranslation()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.green9Dark.get(),
        tabBarInactiveTintColor: theme.gray9.get(),
        tabBarStyle: {
          backgroundColor: theme.gray1.get(),
          elevation: 0,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: t('Home'),
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={19} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarLabel: t('Activity'),
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Ionicons name="apps" color={color} size={19} />
          ),
        }}
      >
        </Tabs.Screen>
      <Tabs.Screen
        name="cropreg"
        options={{
          tabBarLabel: t('Crop Registration'),
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <AntDesign name="form" color={color} size={19} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="test/index"
        options={{
          tabBarLabel: "Test",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Ionicons name="timer-outline" color={color} size={19} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
