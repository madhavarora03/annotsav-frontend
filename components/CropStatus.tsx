import { Button, Card, H2, H3, Image, XStack, YStack } from "tamagui";
import ProgressBar from "./ProgressBar";
import CropTable from "./CropTable";
import { useEffect, useState } from "react";
import { useMqtt } from "@/context/MqttContext";
import { Feather } from "@expo/vector-icons";

const CropStatus = () => {
  const [val, setVal] = useState(0);
  const { publishToTopic, mqttData } = useMqtt();

  const handleRefresh = async () => {
    setVal(60);
    publishToTopic("pv0/commands", "MOISTURE_GET", { qos: 0 });
    console.log(mqttData);
    if (mqttData?.message) {
      console.log(mqttData?.message.toString());
      setVal(parseInt(mqttData?.message?.toString() ?? "0"));
    }
  };

  useEffect(() => {
    setVal(-1);
    publishToTopic("pv0/commands", "MOISTURE_GET", { qos: 0 });
    console.log(mqttData);
    if (mqttData?.message) {
      console.log(mqttData?.message.toString());
      setVal(parseInt(mqttData?.message?.toString() ?? "0"));
    }
  }, []);

  return (
    <Card bordered scale={0.95}>
      <Card.Header padded>
        <XStack alignItems="center" justifyContent="space-between">
          <H2>Crop Status</H2>

          <Button borderRadius="$12" onPress={handleRefresh}>
            <Feather name="refresh-cw" size={24} color="black" />
          </Button>
        </XStack>

        <YStack width="100%" paddingTop="$3" gap="$2">
          <H3 height={30} paddingLeft="$1" opacity={0.5}>
            Moisture Level: {val}%
          </H3>
          <ProgressBar val={val} />
        </YStack>
      </Card.Header>
      <CropTable />
    </Card>
  );
};

export default CropStatus;
