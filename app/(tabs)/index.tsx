import { Text, View, StyleSheet } from "react-native";
import {Link} from "expo-router";
import { Button } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";
import { databases, DB_ID } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";
import { useEffect, useState } from "react";
import { Habit } from "@/types/database.types";

export default function Index() {
  const {signOut, user} = useAuth();

  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(()=>{
    fetchHabits();
  },[user]);

  async function fetchHabits(){
    try{
      const response = await databases.listDocuments(
        DB_ID!,
        "habits",
        [Query.equal("$id", user!.$id)]
      );
      console.log("✅ Habits fetched:", response.documents);
      setHabits(response.documents as unknown as Habit[]);
    }catch(err){
      console.error("❌ Error fetching habits:", err);
    }
  }
  return (
    <View
      style={styles.view}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/login" style={styles.button}>Go to Login Screen</Link>
      <Button mode="contained" onPress={signOut} style={styles.button} icon={"logout"}>Sign out</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
  button:{
    width:200,
    backgroundColor:"blue",
    textAlign:"center",
    color:"white",
  }
});