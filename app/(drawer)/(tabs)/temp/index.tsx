import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { envConfig } from "@/config";
import { useMqtt } from "@/context/MqttContext";

let dateLastTopicRecived = "N/A";

const MqttScreen = () => {
  const {
    mqttClient,
    mqttData,
    mqttStatus,
    mqttError,
    subscribeToTopics,
    publishToTopic,
  } = useMqtt();

  useEffect(() => {
    subscribeToTopics(envConfig.MQTT_TOPICS, { qos: envConfig.MQTT_QOS });
    publishToTopic(envConfig.MQTT_TOPICS[0], "PING", {
      qos: envConfig.MQTT_QOS,
    });
  }, []);

  const lastTopicRecived = (topic: string | null | undefined) => {
    if (topic) {
      dateLastTopicRecived = new Date().toLocaleString("af-ZA", {
        timeZone: envConfig.TZ,
      });
    }

    return dateLastTopicRecived;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Text>[Connection Status]</Text>
      <Text>{mqttStatus}</Text>

      <Text style={{ marginTop: 20 }}>[Topic]</Text>
      <Text>{mqttData?.topic ?? "N/A"}</Text>

      <Text style={{ marginTop: 20 }}>[Date Last Topic Received]</Text>
      <Text>{lastTopicRecived(mqttData?.topic)}</Text>

      <Text style={{ marginTop: 20 }}>[Message]</Text>
      <Text>{mqttData?.message?.toString() ?? "N/A"}</Text>

      <Text style={{ marginTop: 20, textAlign: "center" }}>
        {mqttError?.type ?? "[Error:N/A]"}
      </Text>
      <Text style={{ textAlign: "left" }}>{mqttError?.msg ?? ""}</Text>

      <View
        style={{
          marginTop: 100,
          gap: 20,
        }}
      >
        <Button title="MQTT-CONNECT" onPress={() => mqttClient!.reconnect()} />
        <Button title="MQTT-DISCONNECT" onPress={() => mqttClient!.end()} />
      </View>
    </View>
  );
};

StyleSheet.create({});

export default MqttScreen;
