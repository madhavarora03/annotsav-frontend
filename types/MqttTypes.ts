export type MqttStatus =
  | "Connected"
  | "Disconnected"
  | "Offline"
  | "Reconnecting"
  | "Error";

export type MqttError = { type: string; msg: string };

export type MqttData = { message: any; topic: string };
export type CreateMqttClientOptions = {
  ssl: boolean;
  setMqttStatus: (status: MqttStatus) => void;
  setMqttError: (error: string) => void;
  uniqueId: string;
  onMessage: (topic: string, message: any) => void;
};
export type SubscribeToTopics = (topics: string[], options?: any) => void;
export type PublishToTopic = (
  topic: string,
  message: any,
  options?: any
) => void;
