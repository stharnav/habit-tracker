import { Text, View, StyleSheet } from "react-native";
import {Link} from "expo-router";
import { Button } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";

export default function Index() {
  const {signOut} = useAuth();
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