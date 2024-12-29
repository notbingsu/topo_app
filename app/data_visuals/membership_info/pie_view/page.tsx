"use client";

import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { FaChevronDown } from 'react-icons/fa';
import data from '../../../../public/datasets/dataset2.json';
import Donut from './donut.jsx';

export default function PieView(){
    const [membershipType, setMembershipType] = useState("None");
    const [activity, setActivity] = useState("None");
    const [location, setLocation] = useState("None");
    const [groupBy, setGroupBy] = useState("Membership_Type");
    const [display, setDisplay] = useState("Revenue");
    const groupedData = sumGroupData(data, groupBy, display, {
        Membership_Type: membershipType,
        Activity: activity,
        Location: location
    });
    const membershipTypes = new Set(data.map(d => d.Membership_Type));
    const activities = new Set(data.map(d => d.Activity));
    const locations = new Set(data.map(d => d.Location));
    const groupBys = ["Membership_Type", "Activity", "Location"];
    const displays = ["Revenue", "Duration (Minutes)"];
    
    const chartData = Object.entries(groupedData).map(([key, count]) => ({ key, count }));

    return (
        <div>
            <div style={{position:'absolute', padding: "10px 0 0 20px", display: "flex", flexDirection: "column", gap: "10px"}}>
                <h2 style={{fontWeight: "bold"}}>Filter By</h2>
                <div style={{display: "flex", alignItems:"center", gap: "10px"}}>
                <label htmlFor='Membership_Type'>Membership Type: </label>
                <Dropdown>
                    <DropdownTrigger>
                    <Button style={{ width:'120px', borderRadius: "8px", border: "1px solid grey", display: "flex", alignItems: "center" }}>
                        {membershipType}
                        <FaChevronDown style={{ marginLeft: "5px" }} />
                    </Button>
                    </DropdownTrigger>
                    <DropdownMenu style={{ minWidth:'120px',backgroundColor: 'white', gap: '10px' }} aria-label="Membership Type" onAction={(key) => setMembershipType(key as string)}>
                    <DropdownItem key="None">None</DropdownItem>
                    <>
                    {[...membershipTypes].map(type => (
                        <DropdownItem key={type} style={{ margin: '5px 0' }}>{type}</DropdownItem>
                    ))}
                    </>
                    </DropdownMenu>
                </Dropdown>
                </div>
                <div style={{display: "flex", alignItems:"center", gap: "10px"}}>
                <label htmlFor='Activity'>Activity: </label>
                <Dropdown>
                    <DropdownTrigger>
                    <Button style={{ width:'120px', borderRadius: "8px", border: "1px solid grey", display: "flex", alignItems: "center" }}>
                        {activity}
                        <FaChevronDown style={{ marginLeft: "5px" }} />
                    </Button>
                    </DropdownTrigger>
                    <DropdownMenu style={{ minWidth:'120px',backgroundColor: 'white', gap: '10px' }} aria-label="Activity" onAction={(key) => setActivity(key as string)}>
                    <DropdownItem key="None">None</DropdownItem>
                    <>
                    {[...activities].map(activity => (
                        <DropdownItem key={activity} style={{ margin: '5px 0' }}>{activity}</DropdownItem>
                    ))}
                    </>
                    </DropdownMenu>
                </Dropdown>
                </div>
                <div style={{display: "flex", alignItems:"center", gap: "10px"}}>
                <label htmlFor='Location'>Location: </label>
                <Dropdown>
                    <DropdownTrigger>
                    <Button style={{ width:'120px', borderRadius: "8px", border: "1px solid grey", display: "flex", alignItems: "center" }}>
                        {location}
                        <FaChevronDown style={{ marginLeft: "5px" }} />
                    </Button>
                    </DropdownTrigger>
                    <DropdownMenu style={{ minWidth:'120px',backgroundColor: 'white', gap: '10px' }} aria-label="Location" onAction={(key) => setLocation(key as string)}>
                    <DropdownItem key="None">None</DropdownItem>
                    <>
                    {[...locations].map(location => (
                        <DropdownItem key={location} style={{ margin: '5px 0' }}>{location}</DropdownItem>
                    ))}
                    </>
                    </DropdownMenu>
                </Dropdown>
                </div>
                <h2 style={{fontWeight: "bold"}}>Group By</h2>
                <div style={{display: "flex", alignItems:"center", gap: "10px"}}>
                <label htmlFor='GroupBy'>Group By: </label>
                <Dropdown>
                    <DropdownTrigger>
                    <Button style={{ width:'200px', borderRadius: "8px", border: "1px solid grey", display: "flex", alignItems: "center" }}>
                        {groupBy}
                        <FaChevronDown style={{ marginLeft: "5px" }} />
                    </Button>
                    </DropdownTrigger>
                    <DropdownMenu style={{ minWidth:'120px',backgroundColor: 'white', gap: '10px' }} aria-label="Group By" onAction={(key) => setGroupBy(key as string)}>
                    {groupBys.map(group => (
                        <DropdownItem key={group} style={{ margin: '5px 0' }}>{group}</DropdownItem>
                    ))}
                    </DropdownMenu>
                </Dropdown>
                </div>
                <div style={{display: "flex", alignItems:"center", gap: "10px"}}>
                <h2 style={{fontWeight: "bold"}}>Display</h2>
                <label htmlFor='Display'>Value: </label>
                <Dropdown>
                    <DropdownTrigger>
                    <Button style={{ minWidth:'120px', borderRadius: "8px", border: "1px solid grey", display: "flex", alignItems: "center" }}>
                        {display}
                        <FaChevronDown style={{ marginLeft: "5px" }} />
                    </Button>
                    </DropdownTrigger>
                    <DropdownMenu style={{ minWidth:'120px',backgroundColor: 'white', gap: '10px' }} aria-label="Display" onAction={(key) => setDisplay(key as string)}>
                    {displays.map(display => (
                        <DropdownItem key={display} style={{ margin: '5px 0' }}>{display}</DropdownItem>
                    ))}
                    </DropdownMenu>
                </Dropdown>
                </div>
            </div>    
            <Donut data={chartData} display={display} group_by={groupBy} />
        </div>
    );
}

interface Data {
    Membership_Type: string;
    Activity: string;
    Location: string;
    "Duration (Minutes)": number;
    Revenue: number;
    [key: string]: any;
}

interface Filters {
    Membership_Type: string;
    Activity: string;
    Location: string;
}

function sumGroupData(data: Data[], groupBy: string, display: string, filters: Filters): { [key: string]: number } {
    if (!groupBy || !display) {
        return {};
    }

    const filtered = filteredData(data, filters);

    let sumData: { [key: string]: number } = {};
    filtered.forEach(d => {
        if (sumData[d[groupBy]] === undefined) {
            sumData[d[groupBy]] = 0;
        }
        sumData[d[groupBy]] += d[display];
    });
    return sumData;
}

function filteredData(data: Data[], filters: Filters): Data[] {
    let filteredData = data;
    if (filters.Membership_Type != "None") {
        filteredData = filteredData.filter(d => d.Membership_Type == filters.Membership_Type);
    }
    if (filters.Activity != "None") {
        filteredData = filteredData.filter(d => d.Activity == filters.Activity);
    }
    if (filters.Location != "None") {
        filteredData = filteredData.filter(d => d.Location == filters.Location);
    }
    return filteredData;
}
