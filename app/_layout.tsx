import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider, Theme } from "tamagui";
import { ToastProvider, ToastViewport } from "@tamagui/toast";

import config from "../tamagui.config";
import "../tamagui-web.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/queryClient";

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ToastProvider>
          <Theme name="green">
            <QueryClientProvider client={queryClient}>
              <Slot />
            </QueryClientProvider>
          </Theme>
          <ToastViewport />
        </ToastProvider>
      </GestureHandlerRootView>
    </TamaguiProvider>
  );
}
