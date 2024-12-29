import React from "react";
import Chart from "chart.js/auto";

export default function Line({ revenue_data, membership_data, period }) {
    React.useEffect(() => {
        const ctx = document.getElementById("line").getContext("2d");
        const chartInstance = new Chart(ctx, {
            type: "line",
            options: {
                responsive: true,
                interaction: {
                    mode: "index",
                    intersect: false
                },
                stacked: false,
                plugins: {
                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            font: {
                                size: 15
                            }
                        }
                    },
                    tooltip: {
                        titleFont: {
                            size: 15
                        },
                        bodyFont: {
                            size: 14
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: `${period}`,
                            font: {
                                size: 18,
                                weight: "bold"
                            }
                        },
                        ticks: {
                            font: {
                                size: 14
                            }
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: "Revenue",
                            font: {
                                size: 15,
                                weight: "bold"
                            }
                        },
                        ticks: {
                            font: {
                                size: 14
                            }
                        },
                        type: "linear",
                        position: "left",
                        min: 0
                    },
                    y2: {
                        display: true,
                        title: {
                            display: true,
                            text: "Membership",
                            font: {
                                size: 15,
                                weight: "bold"
                            }
                        },
                        ticks: {
                            font: {
                                size: 14
                            }
                        },
                        type: "linear",
                        position: "right",
                        min: 0
                    }
                }
            },
            data: {
                labels: revenue_data.map(row => row.key),
                datasets: [
                    {
                        label: "Revenue",
                        data: revenue_data.map(row => row.count),
                        borderColor: "rgba(255, 99, 132, 0.8)",
                        backgroundColor: "rgba(255, 99, 132, 0.8)",
                        yAxisID: "y"
                    },
                    {
                        label: "Membership",
                        data: membership_data.map(row => row.count),
                        borderColor: "rgba(32, 103, 136, 0.8)",
                        backgroundColor: "rgba(32, 103, 136, 0.8)",
                        yAxisID: "y2"
                    }
                ]
            }
        });

        return () => {
            chartInstance.destroy();
        }
    }, [revenue_data, membership_data]);

    return (
        <div style={{ padding: "20px", width: "80%", margin: "auto" }}>
            <canvas id="line"></canvas>
        </div>
    );
}