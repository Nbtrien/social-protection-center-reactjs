import React, { useEffect } from "react";
import Chart from "chart.js";
import usePrivateApi from "api/usePrivateApi";
import { useState } from "react";

export default function CardBarChart() {
  const privateApi = usePrivateApi();
  const [yearsChildrenIn, setYearsChildrenIn] = useState([]);
  const [childrenInYears, setChildrenInYears] = useState([]);
  const [childrenInByYears, setChildrenInByYears] = useState([]);
  const [childrenOutByYears, setChildrenOutByYears] = useState([]);

  useEffect(() => {
    const getYearsChildrenIn = async () => {
      const response = await privateApi.getYearsChildrenIn();
      setYearsChildrenIn(response.data);
    };
    getYearsChildrenIn();
  }, []);

  useEffect(() => {
    const getYearsChildren = async () => {
      const response = await privateApi.getYearsChildrenOut();
      const data = response.data;
      const ams = [];
      for (const [key, value] of Object.entries(data)) {
        ams.push(value);
      }
      setChildrenOutByYears(ams);
    };
    getYearsChildren();
  }, []);

  useEffect(() => {
    const ys = [];
    const ams = [];
    for (const [key, value] of Object.entries(yearsChildrenIn)) {
      ys.push(key);
      ams.push(value);
    }
    setChildrenInYears(ys);
    setChildrenInByYears(ams);
  }, [yearsChildrenIn]);

  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: childrenInYears,
        datasets: [
          {
            label: "Số trẻ tiếp nhận",
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: childrenInByYears,
            fill: false,
            barThickness: 15,
          },
          {
            label: "Số trẻ được nhận nuôi",
            fill: false,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: childrenOutByYears,
            barThickness: 15,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(0,0,0,.7)",
              },
              display: true,
              scaleLabel: {
                display: true,
                // labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [childrenInYears, childrenInByYears, childrenOutByYears]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Thống kê trẻ em
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Theo từng năm
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
