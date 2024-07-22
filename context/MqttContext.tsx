import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import useAppStateBackground from "@/hooks/useAppStateReconnect";
import useMqttConnection from "@/hooks/useMqttConnection";
import { emitStateError } from "@/utils/errorHandler";
import { IClientPublishOptions, MqttClient } from "mqtt/*";
import { MqttData, PublishToTopic, SubscribeToTopics } from "@/types/MqttTypes";

const MqttContext = createContext<{
  mqttClient: MqttClient | null;
  mqttData: MqttData | null;
  mqttStatus: string;
  mqttError: {};
  subscribeToTopics: SubscribeToTopics;
  publishToTopic: PublishToTopic;
  setDoMqttConnection: Dispatch<SetStateAction<boolean>>;
}>({
  mqttClient: null,
  mqttData: null,
  mqttStatus: "",
  mqttError: {},
  subscribeToTopics: () => {},
  publishToTopic: () => {},
  setDoMqttConnection: () => {},
});

export const MqttProvider = ({ children }: { children: ReactNode }) => {
  const [doMqttConnection, setDoMqttConnection] = useState(true);
  const {
    mqttClient,
    mqttData,
    mqttStatus,
    mqttError,
    setMqttError,
    setMqttStatus,
  } = useMqttConnection(doMqttConnection);

  useAppStateBackground(mqttClient);
  const subscribeToTopics: SubscribeToTopics = (topics, { qos = 0 }) => {
    if (!mqttClient) return;

    for (const topic of topics) {
      mqttClient.subscribe(topic, { qos }, (error, granted) => {
        if (error) {
          setMqttStatus("Error");
          emitStateError(setMqttError, "MqttTopic", error);
        }
      });
    }
  };

  const publishToTopic: PublishToTopic = (topic, message, options) => {
    if (!mqttClient) return;

    mqttClient.publish(topic, message, options, (error) => {
      if (error) {
        setMqttStatus("Error");
        emitStateError(setMqttError, "MqttGeneral", error);
      }
    });
  };

  return (
    <MqttContext.Provider
      value={{
        mqttClient,
        mqttData,
        mqttStatus,
        mqttError,
        subscribeToTopics,
        publishToTopic,
        setDoMqttConnection,
      }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => useContext(MqttContext);
