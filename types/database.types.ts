import { Models } from "react-native-appwrite";


export interface Habit extends Models.Document{
  $id: string;
  title: string;
  description: string;
  streak_count: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  last_completed: string; // ISO date string
  $createdAt: string; // ISO date string
}