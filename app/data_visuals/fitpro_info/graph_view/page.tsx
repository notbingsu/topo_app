"use client";
import React from "react";
import { useState, useEffect } from 'react';
import rawData from '../../../../public/datasets/dataset3.json';
import Line from './line.jsx';

export default function GraphView(){
    const [displayBy, setDisplayBy] = useState("Quarter");
    const [lineData, setLineData] = useState(Object.values(dataByQuarter(parseData(rawData))));

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space") {
                event.preventDefault(); // Prevent default spacebar action (scrolling)
                if (displayBy === "Quarter") {
                    setDisplayBy("Year");
                    setLineData(Object.values(sumDataByYear(parseData(rawData))));
                } else {
                    setDisplayBy("Quarter");
                    setLineData(Object.values(dataByQuarter(parseData(rawData))));
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [displayBy]);

    const { revenueData, membershipsData } = splitData(lineData, displayBy);
    return (
        <div style={{width: "100%", height: "100%", padding: "20px", flexDirection: "column", display: "flex", gap: "20px"}}>
            <Line revenue_data={revenueData} membership_data={membershipsData} period={displayBy} />
            <div style={{display: "flex", justifyContent: "center", color: "grey"}}>
                Press spacebar to change display period
            </div>
        </div>
    );
}

interface Data {
    Year: string;
    Quarter: string;
    "Revenue (in $)": number;
    "Memberships Sold": number;
}

function parseData(data: any[]): Data[] {
    return data.map(d => ({
        ...d,
        "Revenue (in $)": parseStringToNumber(d["Revenue (in $)"]),
        "Memberships Sold": Number(d["Memberships Sold"])
    }));
}

function sumDataByYear(data: Data[]) {
    data = data.map(d => ({
        ...d,
        "Revenue (in $)": Number(d["Revenue (in $)"]),
        "Memberships Sold": Number(d["Memberships Sold"])
    }));
    const years = new Set(data.map(d => d.Year));
    const sumData: { [key: string]: Data } = {};
    for (const year of years){
        sumData[year] = data.filter(d => d.Year === year).reduce((acc, d) => {
            acc["Revenue (in $)"] += d["Revenue (in $)"];
            acc["Memberships Sold"] += d["Memberships Sold"];
            return acc;
        }, { Year: year, Quarter: "", "Revenue (in $)": 0, "Memberships Sold": 0 });
    }
    return sumData;
}


function dataByQuarter(data: Data[]){
    const quarters = new Set(data.map(d => d.Year + " " + d.Quarter));
    const quarterData: { [key: string]: Data } = {};
    for (const quarter of quarters){
        quarterData[quarter] = data.filter(d => d.Year + " " + d.Quarter === quarter).reduce((acc, d) => {
            acc["Revenue (in $)"] += d["Revenue (in $)"];
            acc["Memberships Sold"] += d["Memberships Sold"];
            return acc;
        }, { Year: "", Quarter: quarter, "Revenue (in $)": 0, "Memberships Sold": 0 });
    }
    return quarterData;
}

function splitData(data: Data[], interval: string){
    const revenueData = data.map(d => ({ key: interval === "Year" ? d.Year : d.Quarter, count: d["Revenue (in $)"] }));
    const membershipsData = data.map(d => ({ key: interval === "Year" ? d.Year : d.Quarter, count: d["Memberships Sold"] }));
    return { revenueData, membershipsData };
}

function parseStringToNumber(str: string){
    return Number(str.replace(/\D/g, ""));
}