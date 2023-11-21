import logo from "./logo.svg";
import "./App.css";
import Plot from "react-plotly.js";
import React, { useState, useRef, useEffect, useMEmo, useMemo } from "react";
import axios from "axios";
import videojs from "video.js";
import "video.js/dist/video-js.css";
// import videojs from "video.js";

function App() {
  const [streamingUrl, setStreamingUrl] = useState();
  const [currentTime, setCurrentTime] = useState();

  let time = useMemo(() => console.log("memo"), [currentTime]);

  const [chartData, setChartData] = useState([
    {
      x: [1, 2, 3],
      y: [2, 6, 3],
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "red" },
    },
    // { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
  ]);

  const plotRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      console.log("Get url");
      setStreamingUrl(
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      );
    }, 2000);
  }, []);
  // let time;
  // let currentTime = 0;
  useEffect(() => {
    if (streamingUrl) {
      if (streamingUrl) {
        const player = videojs(videoRef.current);
        player.autoplay(true);
        player.src(streamingUrl);
        player.on("timeupdate", () => {
          let currentTime = player.currentTime();
          console.log(currentTime);
          setCurrentTime(currentTime);
          // time = useMemo(() => currentTime);
        });
      }
    }
  }, [streamingUrl]);

  return (
    <div className="App" style={{ margin: "5rem" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {streamingUrl && (
          <video
            ref={videoRef}
            className="video-js vjs-default-skin"
            controls
            style={{ objectFit: "contain", width: "600px", height: "300px" }}
          ></video>
        )}
      </div>
      <div>currentTime : {currentTime}</div>
      <div ref={plotRef}>
        <Plot
          data={chartData}
          // layout={{
          //   xaxis: { title: "X" },
          //   yaxis: { title: "Y" },
          //   shapes: [
          //     // ...chartData.filter((data) => data.type === "rect"),
          //     // ...graphLayout.shapes.filter((shape) => !chartData.find((data) => data.xref === shape.xref && data.yref === shape.yref && data.x0 === shape.x0 && data.x1 === shape.x1 && data.y0 === shape.y0 && data.y1 === shape.y1))
          //   ],
          //   showlegend: true,
          // }}
          style={{ width: "1280px" }}
          useResizeHandler
        />
      </div>
    </div>
  );
}

export default App;
