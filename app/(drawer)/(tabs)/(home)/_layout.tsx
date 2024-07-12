import { DrawerToggleButton } from "@react-navigation/drawer";
import { Stack } from "expo-router";
import { Image, useTheme } from "tamagui";

export const unstable_settings = {
  initialRouteName: "index",
};

const Layout = () => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Image
            source={{
              uri: "@/assets/logo.png",
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
          title: "",
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
