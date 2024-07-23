import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";
import { Image, useTheme } from "tamagui";
import { useTranslation } from "react-i18next"
export const unstable_settings = {
  initialRouteName: "index",
};

const Layout = () => {
  const theme = useTheme();
  const { t } = useTranslation()
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Image
            source={{
              uri: "../../../assets/logo.png",
              height: 75,
              width: 75,
            }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: t('My Device'),
          headerTintColor: "white",
          headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
          headerStyle: {
            backgroundColor: theme.green10.get(),
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
