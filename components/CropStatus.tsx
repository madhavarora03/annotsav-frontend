import { Button, Card, H2, H3, Image, XStack, YStack, H6, Text } from "tamagui";
import ProgressBar from "./ProgressBar";
import CropTable from "./CropTable";
import { useEffect, useState } from "react";
import { useMqtt } from "@/context/MqttContext";
import { Feather } from "@expo/vector-icons";
import { envConfig } from "@/config";

let dateLastTopicRecived = "";
let timeLastTopicRecived = "";

const CropStatus = () => {
  const [val, setVal] = useState(0);

  const {
    mqttClient,
    mqttData,
    mqttStatus,
    mqttError,
    subscribeToTopics,
    publishToTopic,
  } = useMqtt();

  const lastTopicRecived = (topic: string | null | undefined) => {
    if (topic) {
      dateLastTopicRecived = new Date().toLocaleDateString("en-IN");
      timeLastTopicRecived = new Date().toLocaleTimeString("en-IN");
    }

    return `${dateLastTopicRecived} at ${timeLastTopicRecived}`;
  }


  const handleRefresh = async () => {
    setVal(60);
    publishToTopic("pv0/commands", "MOISTURE_GET", { qos: 2 });
    console.log("MQTTDATA");
    console.log(mqttData);
    if (mqttData?.message && mqttData?.topic === "pv0/moisture") {
      console.log(mqttData?.message.toString());
      setVal(parseInt(mqttData?.message?.toString()));
    }
  };

  useEffect(() => {
    setVal(-1);

    mqttClient?.reconnect();
    subscribeToTopics(envConfig.MQTT_TOPICS, { qos: 2 })
    publishToTopic("pv0/commands", "MOISTURE_GET", { qos: 2 });
    console.log("MQTTDATA");
    console.log(mqttData);
    if (mqttData?.message && mqttData?.topic === "pv0/moisture") {
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
          <Text>Last Updated: {lastTopicRecived(mqttData?.topic)}</Text>
          <ProgressBar val={val} />
        </YStack>
      </Card.Header>
      <CropTable />
    </Card>
  );
};


export default CropStatus;
