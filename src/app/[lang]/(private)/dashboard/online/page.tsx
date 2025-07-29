"use client";

import { useEffect, useState } from "react";
import mqtt from "mqtt";

interface MqttFields {
  [key: string]: unknown;
}

interface MqttTags {
  [key: string]: unknown;
  canId?: string;
}

interface RawMqttMessage {
  fields: MqttFields;
  name: string;
  tags: MqttTags;
  timestamp: number;
}

interface ParsedMqttMessage {
  topic: string;
  raw: string;
  parsed: RawMqttMessage;
}

function isRawMqttMessage(data: unknown): data is RawMqttMessage {
  if (typeof data !== "object" || data === null) return false;

  const obj = data as Partial<RawMqttMessage>;

  return (
    typeof obj.name === "string" &&
    typeof obj.timestamp === "number" &&
    typeof obj.fields === "object" &&
    typeof obj.tags === "object"
  );
}

const MQTTPage = () => {
  const [messages, setMessages] = useState<Record<string, ParsedMqttMessage>>(
    {}
  );

  const [connectStatus, setConnectStatus] = useState<string>("❌ Disconnected");

  // const [data, setData] = useState<TemperatureData | null>(null);
  useEffect(() => {
    const client = mqtt.connect("wss://mqtt.maua.br:8084");

    client.on("connect", () => {
      console.log("Conectados ao broker MQTT");
      setConnectStatus("✅ Connected");
      client.subscribe(
        // "IMT/LNS/Temperature8Point/0004a30b0023580e/up/+",
        "FSAELive/Car/Can/mauaracing/up/sim7670g",
        (err) => {
          if (!err) {
            console.log(
              "Subscribed to FSAELive/Car/Can/mauaracing/up/sim7670g"
            );
          } else {
            console.error("Subscription error:", err);
          }
        }
      );
      // client.subscribe('IMT/LNS/temperature8point/+/up/imt');
    });

    client.on("message", (topic, message) => {
      // try {
      const rawMessage = message.toString();
      console.log(`rawMessage: ${rawMessage}`);

      // const parsedJson = isRawMqttMessage(rawMessage) ? rawMessage : null;

      let parsedJson: RawMqttMessage | null = null;

      // try {
      //   parsedJson = JSON.parse(rawMessage);
      // } catch (e) {
      //   console.warn("Failed to parse JSON", rawMessage);
      // }

      try {
        const data = JSON.parse(rawMessage);
        if (isRawMqttMessage(data)) {
          parsedJson = data;
        } else {
          console.warn(
            "MQTT message structure mismatch. Expected fields: name, timestamp, fields, tags. Got:",
            Object.keys(data)
          );
          return;
        }
      } catch (e) {
        console.warn("Failed to parse JSON:", e, "Raw message:", rawMessage);
        return;
      }

      // Validate canId
      const canId = parsedJson.tags.canId;
      if (!canId) {
        console.warn("Missing canId in tags, skipping message:", parsedJson);
        return;
      }

      const parsedMessage: ParsedMqttMessage = {
        topic,
        raw: rawMessage,
        parsed: parsedJson,
      };

      setMessages((prev) => ({
        ...prev,
        // [parsedJson.name]: parsedMessage,
        [canId]: parsedMessage,
      }));
    });

    client.on("error", (err) => {
      console.error("MQTT Connection error:", err);
      setConnectStatus(`❌ Error: ${err.message}`);
    });

    client.on("reconnect", () => {
      setConnectStatus("🔁 Reconnecting...");
    });

    client.on("offline", () => {
      setConnectStatus("⚠️ Offline");
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-6 font-sans min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📡 MauaRacing Team Telemetry</h1>
      {/* <p className="mb-4">Status: {isConnected ? '✅ Conectado' : '❌ Desconectado'}</p> */}
      <p>Connection Status: {connectStatus}</p>

      <ul className="w-full max-w-2xl space-y-4">
        {Object.values(messages).length === 0 ? (
          <li className="text-gray-500">No messages received yet...</li>
        ) : (
          Object.values(messages).map((msg, index) => {
            const canId = msg.parsed.tags.canId;
            return (
              <li
                key={canId || index}
                className="border-b border-gray-300 pb-2"
              >
                <h3 className="font-semibold">CAN ID: {canId}</h3>
                <p className="text-sm text-gray-600">
                  Topic: {msg.topic} | Time:{" "}
                  {new Date(msg.parsed.timestamp).toLocaleTimeString()}
                </p>
                <ul className="mt-2 space-y-1">
                  {Object.entries(msg.parsed.fields).map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                      <span className="font-medium">{key}:</span>
                      <span>{JSON.stringify(value)}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default MQTTPage;
