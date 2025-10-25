import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

export default function TabsLayout() {
  return (<>
  <Tabs screenOptions={{tabBarActiveTintColor:"coral"}}>
    <Tabs.Screen 
      name="index" 
      options={{ 
        headerTitle: "Home Screen",
        tabBarLabel: "Home",
        tabBarIcon: ({color, size})=>(
          <Feather name="home" color={color} size={size} />
        )
      }} 
    />
    <Tabs.Screen 
      name="login" 
      options={{ 
        headerTitle: "Login Screen",
      }} 
    />
  </Tabs>
  </>);
}
