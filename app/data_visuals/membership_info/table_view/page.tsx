"use client";
import React, { useState, useEffect } from 'react';
import data from '../../../../public/datasets/dataset2.json';

export default function TableView() {
    const [filteredData, setFilteredData] = useState(data);
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof data[0] | '', direction: string }>({ key: '', direction: '' });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        let sortedData = [...data];
        if (sortConfig.key) {
            sortedData.sort((a, b) => {
                if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                };
                
                if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        setFilteredData(
            sortedData.filter(item =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(filter.toLowerCase())
                )
            )
        );
        if (sortConfig.key) {
            sortedData.sort((a, b) => {
                if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                };
                
                if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        setFilteredData(
            sortedData.filter(item =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(filter.toLowerCase())
                )
            )
        );
    }, [sortConfig, filter]);

    interface DataItem {
        Date: string;
        Membership_ID: string;
        Membership_Type: string;
        Activity: string;
        Revenue: number;
        'Duration (Minutes)': number;
        Location: string;
    }

    const requestSort = (key: keyof DataItem) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="px-10 py-5">
            <div className="flex justify-between mb-5 p-2">
                <input
                    type="text"
                    placeholder="Search filter"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                    />
                <div>
                    Click on the column headers to sort
                </div>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th
                            onClick={() => requestSort('Date')}
                            className="cursor-pointer bg-gray-200 p-2"
                        >
                            Date
                        </th>
                        <th
                            onClick={() => requestSort('Membership_ID')}
                            className="cursor-pointer bg-gray-200 p-2"
                        >
                            Membership_ID
                        </th>
                        <th
                            onClick={() => requestSort('Membership_Type')}
                            className="cursor-pointer bg-gray-200 p-2"
                        >
                            Membership_Type
                        </th>
                        <th
                            onClick={() => requestSort('Activity')}
                            className="cursor-pointer bg-gray-200 p-2"
                        >
                            Activity
                        </th>
                        <th
                            onClick={() => requestSort('Revenue')}
                            className="cursor-pointer bg-gray-200 p-2"
                        >
                            Revenue
                        </th>
                        <th
                            onClick={() => requestSort('Duration (Minutes)')}
                            className="cursor-pointer bg-gray-200 p-2"
                        >
                            Duration (Minutes)
                        </th>
                        <th
                            onClick={() => requestSort('Location')}
                            className="cursor-pointer bg-gray-200 p-2"
                        >
                            Location
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item['Membership_ID']}>
                            <td className="p-2 border border-gray-300">{item['Date']}</td>
                            <td className="p-2 border border-gray-300">{item['Membership_ID']}</td>
                            <td className="p-2 border border-gray-300">{item['Membership_Type']}</td>
                            <td className="p-2 border border-gray-300">{item['Activity']}</td>
                            <td className="p-2 border border-gray-300">{item['Revenue']}</td>
                            <td className="p-2 border border-gray-300">{item['Duration (Minutes)']}</td>
                            <td className="p-2 border border-gray-300">{item['Location']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}