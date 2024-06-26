import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: "Annotsav App",
    version: process.env.MY_CUSTOM_PROJECT_VERSION || "1.0.0",
    slug: "annotsav-app",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "com.anonymous.annotsav-app",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },

    plugins: ["expo-font"],
  };
};
