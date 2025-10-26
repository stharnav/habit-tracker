import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";
import { databases, DB_ID } from "@/lib/appwrite";
import { ID } from "react-native-appwrite";
import { useRouter } from "expo-router";

const frequencyOptions = ['daily', 'weekly', 'monthly'];

export default function HabitsScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const { user } = useAuth();
    const router = useRouter();
  async function handleAddHabit() {
    if (!user) return;

    try {
        await databases.createDocument(
          DB_ID!,
          "habits",
          ID.unique(),
          {
            $id: user.$id,
            title,
            description,
            streak_count: 0,
            frequency,
            last_completed: new Date().toISOString(),
            $createdAt: new Date().toISOString(),
          }
        );

      // Reset form after adding
      setTitle("");
      setDescription("");
      setFrequency("daily");

    router.back();
      console.log("✅ Habit added!");
    } catch (err) {
      console.error("❌ Error adding habit:", err);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        mode="outlined"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Description"
        mode="outlined"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <SegmentedButtons
        style={styles.seg}
        value={frequency}
        onValueChange={setFrequency}
        buttons={frequencyOptions.map(frq => ({
          value: frq,
          label: frq.charAt(0).toUpperCase() + frq.slice(1),
        }))}
      />

      <Button
        mode="contained"
        disabled={!title || !description || !frequency}
        onPress={handleAddHabit}
      >
        Add Habit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  seg: {
    marginVertical: 16,
  },
});
