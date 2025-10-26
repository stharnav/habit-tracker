import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { use, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";


function RouteGuard({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const {user, isLoadingUser} = useAuth();
  const segments = useSegments();
  
  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";
    setTimeout(() => {
      if (!user && !inAuthGroup && !isLoadingUser) {
      router.replace("/auth");
      } else if (user && inAuthGroup && !isLoadingUser) {
      router.replace("/");
      }
    }, 500);
  }, [user, segments]);
  return <>{children}</>;
}

export default function RootLayout() {
  return (<>
  <AuthProvider>
    <SafeAreaProvider>
      <RouteGuard>
        <Stack>
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
            }} 
          />
        </Stack>
      </RouteGuard>
    </SafeAreaProvider>
  </AuthProvider>
  </>);
}
