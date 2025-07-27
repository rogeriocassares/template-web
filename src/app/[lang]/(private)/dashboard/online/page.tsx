"use client";

import { useEffect, useState } from "react";
import mqtt from "mqtt";

interface MqttFields {
  [key: string]: unknown | null;
}

interface MqttTags {
  [key: string]: unknown;
  deviceId?: string;
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
      console.log("Conectado ao broker MQTT");
      setConnectStatus("✅ Connected");
      client.subscribe(
        // "IMT/LNS/Temperature8Point/0004a30b0023580e/up/+",
        "FSAELive/Car/Can/mauaracing/up/sim7670g",
        (err) => {
          if (!err) {
            console.log("Subscribed to test/topic");
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
        }
      } catch (e) {
        console.warn("Failed to parse JSON:", e, "Raw message:", rawMessage);
      }

      if (!parsedJson) return;

      const parsedMessage: ParsedMqttMessage = {
        topic,
        raw: rawMessage,
        parsed: parsedJson,
      };

      setMessages((prev) => ({
        ...prev,
        [parsedJson.name]: parsedMessage,
      }));
    });

    client.on("error", (err) => {
      console.error("Connection error:", err);
      setConnectStatus("Error");
    });

    client.on("reconnect", () => {
      setConnectStatus("Reconnecting");
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

        <ul className="w-96 h-48">
          {Object.values(messages).map((msg, index) => (
            <li key={index} >
              {/* <p><strong>Timestamp:</strong> {new Date(msg.parsed.timestamp).toLocaleString()}</p> */}
              {/* <h3>Message Type: {msg.parsed.name}</h3> */}
              {/* <p><strong>Device ID:</strong> {msg.parsed.tags.deviceId}</p> */}
              {/* <p><strong>Timestamp:</strong> {new Date(msg.parsed.timestamp).toLocaleString()}</p> */}

              {/* <h4>Fields:</h4> */}
              <ul>
                {Object.entries(msg.parsed.fields).map(([key, value]) => (
                  <li key={key}>
                    {/* <strong>{key}:</strong> {JSON.stringify(value)} */}
                    <div className="flex flex-wrap -mx-3">
                      <div className="w-full max-w-full px-3 mb-6 ">
                        <div className="relative flex flex-col min-w-0 break-words bg-slate-900 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                          <div className="flex-auto p-4">
                            <div className="flex flex-row -mx-3">
                              <div className="flex-none w-2/3 max-w-full px-3">
                                <div>
                                  <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                                    {key}
                                  </p>
                                  <h5 className="mb-2 font-bold dark:text-white">
                                    {JSON.stringify(value)}
                                  </h5>
                                </div>
                              </div>
                              <div className="px-3 text-right basis-1/3">
                                <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                                  <i className="ni leading-none ni-money-coins text-lg relative top-3.5 text-white"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default MQTTPage;