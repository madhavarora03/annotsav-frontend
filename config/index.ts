import { z } from "zod";

const envConfigSchema = z.object({
  TZ: z.string().default("UTC"),
  MQTT_HOST: z.string().default("localhost"),
  MQTT_SSL: z.boolean().default(false),
  MQTT_PORT: z.number().default(0),
  MQTT_PORT_SSL: z.number().default(0),
  MQTT_VERSION: z.number().default(0),
  MQTT_QOS: z.number().default(0),
  MQTT_USERNAME: z.string().optional(),
  MQTT_PASSWORD: z.string().optional(),
  MQTT_TOPICS: z.array(z.string()).default([]),
  EMIT_CONSOLE_LOGS: z.boolean().default(false),
});

const envConfig = envConfigSchema.parse({
  TZ: process.env.EXPO_PUBLIC_TZ,
  MQTT_HOST: process.env.EXPO_PUBLIC_MQTT_HOST,
  MQTT_SSL: process.env.EXPO_PUBLIC_MQTT_SSL === "true",
  MQTT_PORT: parseInt(process.env.EXPO_PUBLIC_MQTT_PORT!),
  MQTT_PORT_SSL: parseInt(process.env.EXPO_PUBLIC_MQTT_PORT_SSL!),
  MQTT_VERSION: parseInt(process.env.EXPO_PUBLIC_MQTT_VERSION!),
  MQTT_QOS: parseInt(process.env.EXPO_PUBLIC_MQTT_QOS!),
  MQTT_USERNAME: process.env.EXPO_PUBLIC_MQTT_USERNAME,
  MQTT_PASSWORD: process.env.EXPO_PUBLIC_MQTT_PASSWORD,
  MQTT_TOPICS: process.env.EXPO_PUBLIC_MQTT_TOPICS?.split(",") || [],
  EMIT_CONSOLE_LOGS: process.env.EXPO_PUBLIC_EMIT_CONSOLE_LOGS === "true",
});

export { envConfig };
