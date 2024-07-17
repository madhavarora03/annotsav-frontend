import { useState, useEffect } from "react";
import { createMqttClient } from "@/utils/mqttClient";
import { MqttClient } from "mqtt";
import { MqttData, MqttError, MqttStatus } from "@/types/MqttTypes";

function useMqttConnection(doMqttConnection: boolean) {
  const [mqttStatus, setMqttStatus] = useState<MqttStatus>("Disconnected");
  const [mqttError, setMqttError] = useState<MqttError | {}>({});
  const [mqttData, setMqttData] = useState<MqttData | {}>({});
  const [mqttClient, setMqttClient] = useState<MqttClient | null>(null);

  useEffect(() => {
    if (!doMqttConnection) return;

    const client = createMqttClient({
      ssl: false,
      setMqttStatus,
      setMqttError,
      uniqueId: "react-native-0000",
      onMessage: (
        topic: string | null | undefined,
        message: string | null | undefined
      ) => {
        setMqttData(() => ({
          message,
          topic,
        }));
      },
    });

    setMqttClient(client);

    return () => {
      if (client) {
        client.end();
      }
    };
  }, [doMqttConnection]);

  return {
    mqttClient,
    mqttData,
    mqttStatus,
    mqttError,
    setMqttStatus,
    setMqttError,
  };
}

export default useMqttConnection;
