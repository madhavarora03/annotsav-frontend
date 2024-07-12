import { Feather } from "@expo/vector-icons";
import { Toast, useToastController, useToastState } from "@tamagui/toast";
import {
  Button,
  Card,
  H2,
  Label,
  Paragraph,
  Switch,
  Text,
  XStack,
  YStack,
  useTheme,
} from "tamagui";
export default function Page() {
  const theme = useTheme();

  return (
    <Card elevate size="$4" bordered height={300} scale={0.95}>
      <Card.Header padded>
        <XStack justifyContent="space-between" alignItems="center">
          <H2>Weather Update</H2>
          <Button borderRadius="$12">
            <Feather name="refresh-cw" size={24} color="black" />
          </Button>
        </XStack>

        <Paragraph color={theme.green8.get()}>3 Day Forecast</Paragraph>
      </Card.Header>
      <XStack
        padding="$4"
        borderRadius="$4"
        alignContent="center"
        justifyContent="space-around"
      >
        <YStack gap="$1">
          <Text
            fontSize="$5"
            textAlign="center"
            color={theme.green10.get()}
            paddingBottom="$2"
          >
            Today
          </Text>
          <XStack alignItems="center" gap="$1">
            <Feather name="thermometer" size={20} color="black" />
            <Text>25°C</Text>
          </XStack>
          <XStack alignItems="center" gap="$1">
            <Feather name="wind" size={20} color="black" />
            <Text>10 km/h</Text>
          </XStack>
          <XStack alignItems="center" gap="$1">
            <Feather name="droplet" size={20} color="black" />
            <Text>70%</Text>
          </XStack>
        </YStack>
        <YStack gap="$1">
          <Text
            fontSize="$5"
            textAlign="center"
            color={theme.green10.get()}
            paddingBottom="$2"
          >
            Today
          </Text>
          <XStack alignItems="center" gap="$1">
            <Feather name="thermometer" size={20} color="black" />
            <Text>25°C</Text>
          </XStack>
          <XStack alignItems="center" gap="$1">
            <Feather name="wind" size={20} color="black" />
            <Text>10 km/h</Text>
          </XStack>
          <XStack alignItems="center" gap="$1">
            <Feather name="droplet" size={20} color="black" />
            <Text>70%</Text>
          </XStack>
        </YStack>
        <YStack gap="$1">
          <Text
            fontSize="$5"
            textAlign="center"
            color={theme.green10.get()}
            paddingBottom="$2"
          >
            Today
          </Text>
          <XStack alignItems="center" gap="$1">
            <Feather name="thermometer" size={20} color="black" />
            <Text>25°C</Text>
          </XStack>
          <XStack alignItems="center" gap="$1">
            <Feather name="wind" size={20} color="black" />
            <Text>10 km/h</Text>
          </XStack>
          <XStack alignItems="center" gap="$1">
            <Feather name="droplet" size={20} color="black" />
            <Text>70%</Text>
          </XStack>
        </YStack>
      </XStack>
      <Card.Footer padded>
        {/* <XStack gap="$2" justifyContent="center" flex={1}>
          <YStack gap={2} alignItems="center">
            <ToastControl native={native} />
            <CurrentToast />
            <NativeOptions native={native} setNative={setNative} />
          </YStack>
        </XStack> */}
      </Card.Footer>
    </Card>
  );
}
const CurrentToast = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  );
};

const ToastControl = ({ native }: { native: boolean }) => {
  const toast = useToastController();
  return (
    <XStack gap="$2" justifyContent="center">
      <Button
        onPress={() => {
          toast.show("Successfully saved!", {
            message: "Don't worry, we've got your data.",
            native,
          });
        }}
      >
        Show
      </Button>
      <Button
        onPress={() => {
          toast.hide();
        }}
      >
        Hide
      </Button>
    </XStack>
  );
};

const NativeOptions = ({
  native,
  setNative,
}: {
  native: boolean;
  setNative: (native: boolean) => void;
}) => {
  return (
    <XStack gap="$3">
      <Label size="$1" onPress={() => setNative(false)}>
        Custom
      </Label>
      <Switch
        id="native-toggle"
        nativeID="native-toggle"
        theme="active"
        size="$1"
        checked={!!native}
        onCheckedChange={(val) => setNative(val)}
      >
        <Switch.Thumb
          animation={[
            "quick",
            {
              transform: {
                overshootClamping: true,
              },
            },
          ]}
        />
      </Switch>

      <Label size="$1" onPress={() => setNative(true)}>
        Native
      </Label>
    </XStack>
  );
};
