import { Text, View, StyleSheet } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View
      style={styles.view}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/login" style={styles.button}>Go to Login Screen</Link>
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