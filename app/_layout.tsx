import { Stack, useRouter } from "expo-router";
import { use, useEffect } from "react";


function RouteGuard({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const isAuth = false;
  
  useEffect(() => {
    if (!isAuth) {
      router.replace("/auth");
    }
  });

  return <>{children}</>;
}

export default function RootLayout() {
  return (<>
  <RouteGuard>
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          headerTitle: "Login Screen"
        }} 
      />
    </Stack>
  </RouteGuard>
  </>);
}
