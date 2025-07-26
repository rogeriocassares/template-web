'use client';

import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

type TemperatureData = {
  temperature1: number;
  temperature2: number;
  temperature3: number;
  temperature4: number;
  temperature5: number;
  temperature6: number;
  temperature7: number;
  temperature8: number;
  boardVoltage: number;
};

const MQTTPage = () => {
  const [data, setData] = useState<TemperatureData | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const client = mqtt.connect('wss://test.mosquitto.org:8081');
    // const client = mqtt.connect('wss://mqtt.maua.br:8083');

    client.on('connect', () => {
      console.log('🔌 Conectado ao broker MQTT');
      setIsConnected(true);
      client.subscribe('sensor/temperature8point');
      // client.subscribe('IMT/LNS/temperature8point/+/up/imt');
    });

    client.on('message', (_, payload) => {
      try {
        const parsed = JSON.parse(payload.toString()) as TemperatureData;
        setData(parsed);
      } catch (e) {
        console.error('Erro ao parsear mensagem:', e);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div className="p-6 font-sans min-h-screen">
      <h1 className="text-2xl font-bold mb-4">📡 Temperature8Point</h1>
      <p className="mb-4">Status: {isConnected ? '✅ Conectado' : '❌ Desconectado'}</p>

      {data ? (
        <div className="grid grid-cols-2 gap-4 max-w-xl">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-sm font-semibold text-gray-500">{key}</h2>
              <p className="text-xl text-blue-600">{value.toFixed(1)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aguardando dados...</p>
      )}
    </div>
  );
};

export default MQTTPage;

// exemplo de pub (mesmo formato do que está no smartcampus):
// mosquitto_pub -h test.mosquitto.org -p 1883 -t sensor/temperature8point -m "{\"temperature1\":24.3,\"temperature2\":23.7,\"temperature3\":23.2,\"temperature4\":25.8,\"temperature5\":25.9,\"temperature6\":25.1,\"temperature7\":22.6,\"temperature8\":25.9,\"boardVoltage\":3.8}"
