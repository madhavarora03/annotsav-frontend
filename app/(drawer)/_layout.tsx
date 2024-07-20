import { Ionicons } from "@expo/vector-icons";
import { colorTokens } from "@tamagui/themes";
import Drawer from "expo-router/drawer";
import { Image, useTheme } from "tamagui";
import { useTranslation } from "react-i18next"
const Layout = () => {
  const theme = useTheme();
  const { t } = useTranslation()
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: colorTokens.dark.green.green7,
        drawerActiveTintColor: "#fff",
        drawerLabelStyle: { marginLeft: -20 },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: t('Home'),
          headerShown: false,
          drawerIcon: () => (
            <Ionicons name="home" size={14} color={theme.green7.get()} />
          ),
        }}
      />
    </Drawer>
  );
};

export default Layout;
