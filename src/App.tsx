import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface Ads1115 {
  id: number;
  analog_value: number;
  voltage: string;
  fecha: string;
}

function App() {
  const [data, setData] = useState<Ads1115[]>([]);

  async function fetchData() {
    console.log("FechData");
    try {
      const response = await axios.get("http://localhost:8000/ads1115");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <LineChart
        width={1500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="analog_value" stroke="#8884d8" />
        <Line type="monotone" dataKey="voltage" stroke="#000000" />
      </LineChart>
    </div>
  );
}

export default App;
