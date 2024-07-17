import mqtt from "mqtt";
import { envConfig } from "@/config";
import { emitStateError } from "./errorHandler";
import { CreateMqttClientOptions } from "@/types/MqttTypes";

function createMqttClient({
  ssl = false,
  setMqttStatus,
  setMqttError,
  uniqueId,
  onMessage,
}: CreateMqttClientOptions) {
  const host = envConfig.MQTT_HOST;
  const path = "/ws";
  const protocolVersion = envConfig.MQTT_VERSION;
  let port = envConfig.MQTT_PORT;
  let protocol = "ws";

  if (ssl) {
    port = envConfig.MQTT_PORT_SSL;
    protocol = "wss";
  }

  const client = mqtt
    .connect({
      protocol,
      host,
      port,
      path,
      protocolVersion,
      clientId: uniqueId,
      username: envConfig.MQTT_USERNAME,
      password: envConfig.MQTT_PASSWORD,
      reconnectPeriod: 5000,
      queueQoSZero: true,
      resubscribe: true,
      clean: true,
      keepalive: 30,
      properties:
        protocolVersion === 5
          ? {
              sessionExpiryInterval: 600,
            }
          : undefined,
    })
    .on("connect", () => {
      setMqttStatus("Connected");
    })
    .on("error", (error) => {
      setMqttStatus("Error");
      emitStateError(setMqttError, "MqttGeneral", error);
    })
    .on("disconnect", (packet) => {
      setMqttStatus("Disconnected");
    })
    .on("offline", () => {
      setMqttStatus("Offline");
    })
    .on("reconnect", () => {
      setMqttStatus("Reconnecting");
    })
    .on("close", () => {
      setMqttStatus("Disconnected");
    })
    .on("message", (topic, message, packet) => {
      onMessage(topic, message);
    });

  return client;
}

export { createMqttClient };
