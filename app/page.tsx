"use client";
import React from "react";
import { Link } from "@nextui-org/react";
export default function Home() {
  const datas = [
    {name: "FitPro Info", path:"/data_visuals/fitpro_info/graph_view"},
    {name: "Membership Info", path:"/data_visuals/membership_info/pie_view"}
  ];
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh"}}>
      <h1 style={{textAlign: "center", fontWeight:"bold", fontSize:"30px", padding:"10px"}}>Topo App</h1>
      <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
      {datas.map(data => (
        <div key={data.name} style={{margin: "auto"}}>
        <div
          style={{cursor: "pointer", textAlign: "center", backgroundColor: "lightgrey", padding: "12px", borderRadius:'8px', minWidth: "200px", boxShadow: "0 0 5px rgba(0,0,0,0.2)"}}
          onMouseEnter={(event) => {
            (event.currentTarget as HTMLElement).style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(event) => {
            (event.currentTarget as HTMLElement).style.boxShadow = "0 0 5px rgba(0,0,0,0.2)";
          }}
        >
          <Link
            key={data.name}
            href={data.path}
          >
            {data.name}
          </Link>
        </div>
        </div>
      ))}
      </div>
      <p style={{color: "white", backgroundColor:"grey", padding:"10px", borderRadius:"6px", position:"fixed", bottom:"30px"}}>
          Start local Flask server before using app
      </p>
    </div>
  );
}
