import { useMqtt } from "@/context/MqttContext";
import { useEffect, useState } from "react";
import {
  Card,
  Text,
  XStack,
  YStack,
  useTheme,
  Button,
  Input,
  Switch,
  H1,
} from "tamagui";

export default function Page() {
  const theme = useTheme();
  const [auto, setAuto] = useState(false);
  const [motor, setMotor] = useState(false);
  const [timer, setTimer] = useState<number | "">(30);

  const { publishToTopic } = useMqtt();

  const handleInputChange = (value: any) => {
    if (value === "") {
      setTimer("");
    } else {
      const number = parseFloat(value);
      if (!isNaN(number)) {
        setTimer(number);
      }
    }
  };

  const sendTaskDelayX = () => {
    const timeToSend = timer * 60;
    publishToTopic("pv0/autodelayx", String(timeToSend), { qos: 2 });
  }

  useEffect(() => {
    if (auto) {
      publishToTopic("pv0/commands", "MANUAL_OVERRIDE_ON", { qos: 2 })
    }
    if (!auto) {
      publishToTopic("pv0/commands", "MANUAL_OVERRIDE_OFF", { qos: 2 })
    }
  }, [auto])

  useEffect(() => {
    if (motor) {
      publishToTopic("pv0/commands", "WATER_ON", { qos: 2 })
    }
    if (!motor) {
      publishToTopic("pv0/commands", "WATER_OFF", { qos: 2 })
    }
  }, [motor])

  return (
    <Card
      backgroundColor={theme.gray5.get()}
      size="$4"
      bordered
      borderColor={theme.gray7.get()}
      height={300}
      scale={0.95}
    >
      <Card.Header padded>
        <H1 textAlign="center">Manual Override</H1>
      </Card.Header>
      <YStack justifyContent="center" alignItems="center" gap="$5">
        <XStack gap="$2" alignItems="center">
          <Text color={theme.green10.get()}>Auto</Text>
          <Switch
            size="$4"
            checked={!!auto}
            onCheckedChange={(val) => setAuto(val)}
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
          <Text color={theme.green10.get()}>Manual</Text>
        </XStack>
        {/* <XStack alignItems="center" gap="$4">
          <Input
            width="$12"
            keyboardType="numeric"
            disabled={!auto}
            disabledStyle={{
              backgroundColor: theme.gray7.get(),
              borderColor: theme.gray7.get(),
            }}
            textAlign="center"
            value={String(timer)}
            onChangeText={handleInputChange}
          />
          <Button
            size="$4"
            disabled={!auto}
            disabledStyle={{
              backgroundColor: theme.green5.get(),
              borderColor: theme.black12.get(),
            }}
            onPress={() => sendTaskDelayX}
          >Take Control</Button>
        </XStack> */}
        <XStack alignItems="center" gap="$4">
          <Button
            size="$8"
            fontSize={12}
            disabled={!auto}
            disabledStyle={{
              backgroundColor: theme.green5.get(),
              borderColor: theme.black12.get(),
            }}
            onPress={() => setMotor(true)}
          >
            Start
          </Button>
          <Button
            size="$8"
            fontSize={12}
            disabled={!auto}
            disabledStyle={{
              backgroundColor: theme.green5.get(),
              borderColor: theme.black12.get(),
            }}
            onPress={() => setMotor(false)}
          >
            Stop
          </Button>
        </XStack>
      </YStack>
      <Card.Footer padded></Card.Footer>
    </Card>
  );
}
