import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";

export default function TabsLayout() {
  return (<>
  <Tabs screenOptions={{
      tabBarActiveTintColor:"coral",
      tabBarStyle:{
        backgroundColor: "#f5f5f5",
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
      tabBarInactiveTintColor: "gray",
    }}>
    <Tabs.Screen 
      name="index" 
      options={{ 
        headerTitle: "Home Screen",
        tabBarLabel: "Todays Habit",
        tabBarIcon: ({color, size})=>(
          <MaterialCommunityIcons name="calendar-today" color={color} size={size} />
          //<Feather name="home" color={color} size={size} />
        )
      }} 
    />
    <Tabs.Screen 
      name="streaks" 
      options={{ 
        headerTitle: "Streaks Screen",
        tabBarLabel: "Streaks",
        tabBarIcon: ({color, size})=>(
          <MaterialCommunityIcons name="chart-line" color={color} size={size} />
          //<Feather name="home" color={color} size={size} />
        )
      }} 
    />
    <Tabs.Screen 
      name="habits" 
      options={{ 
        headerTitle: "Habits Screen",
        tabBarLabel: "Habits",
        tabBarIcon: ({color, size})=>(
          <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
          //<Feather name="home" color={color} size={size} />
        )
      }} 
    />
  </Tabs>
  </>);
}
