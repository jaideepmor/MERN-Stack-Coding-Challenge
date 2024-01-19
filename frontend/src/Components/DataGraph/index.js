import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./style.css";

function DataGraph({ data }) {
  if (!data) {
    return null;
  }

  // Creating graph data.
  const graphData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Transactions",
        backgroundColor: "#19c1e3",
        borderColor: "#19c1e3",
        data: Object.values(data),
      },
    ],
  };

  return (
    <div>
      <Bar className="data-graph" data={graphData} />
    </div>
  );
}

export default DataGraph;
