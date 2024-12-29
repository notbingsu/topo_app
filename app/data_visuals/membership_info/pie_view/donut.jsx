import React from 'react';
import Chart from 'chart.js/auto';

export default function Donut({ data, display, group_by }) {
    React.useEffect(() => {
        const ctx = document.getElementById('donut').getContext('2d');
        const chartInstance = new Chart(ctx, {
            type: 'doughnut',
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
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
                }
            },
            data: {
            labels: data.map(row => row.key),
            datasets: [
                {
                label: `${display} by ${group_by}`,
                data: data.map(row => row.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(32, 103, 136, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(152, 43, 43, 0.8)',
                    'rgba(100, 100, 255, 0.8)'
                ],
                borderWidth: 0 
                }
            ]
            }
        });

        return () => {
            chartInstance.destroy();
        };
    }, [data, display, group_by]);

    return (
        <div style={{ padding: '20px', width: '50%', margin: 'auto' }}>
            <canvas id="donut"></canvas>
        </div>
    );
}