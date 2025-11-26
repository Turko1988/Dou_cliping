import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SentimentChart = ({ data }) => {
    // Default data if none provided
    const chartData = data || [
        { name: 'Positivo', value: 35, color: '#22c55e' }, // green-500
        { name: 'Neutro', value: 45, color: '#94a3b8' },  // slate-400
        { name: 'Negativo', value: 20, color: '#ef4444' }, // red-500
    ];

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: '0.5rem',
                            color: 'hsl(var(--foreground))'
                        }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SentimentChart;
