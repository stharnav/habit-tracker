import {Account, Client, Databases} from 'react-native-appwrite';

export const client = new Client();

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // Your API Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT!); // Your project ID
//   .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM); // Your app package name

export const account = new Account(client);
export const databases = new Databases(client);
