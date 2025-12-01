import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Scatter, ZAxis } from 'recharts';
import { VolumeDataPoint } from '../types';

interface StockVolumeChartProps {
    volumeData: VolumeDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {  
    if (active && payload && payload.length) {
      const volumePayload = payload.find((p: any) => p.dataKey === 'volume');
      const eventPayload = payload.find((p: any) => p.dataKey === 'event' && p.value);
      
      return (
        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3 text-sm">
          <p className="label font-bold text-white">{label}</p>
          {volumePayload && <p className="text-violet-400">{`Volume: ${volumePayload.value.toLocaleString()}`}</p>}
          {eventPayload && <p className="text-amber-300 mt-1">{`Event: ${eventPayload.value}`}</p>}
        </div>
      );
    }
    return null;
};

export const StockVolumeChart: React.FC<StockVolumeChartProps> = ({ volumeData }) => {
    const eventData = volumeData.filter(d => d.event);

    return (
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg h-96 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4 flex-shrink-0">Stock Volume Over Time</h3>
            <div className="flex-grow w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={volumeData} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 11 }} tickLine={{ stroke: '#4b5563' }} angle={-15} textAnchor="end" />
                        <YAxis 
                            yAxisId="left" 
                            orientation="left" 
                            stroke="#8b5cf6"
                            tick={{ fill: '#9ca3af', fontSize: 11 }} 
                            tickLine={{ stroke: '#4b5563' }}
                            tickFormatter={(value) => value >= 1000000 ? `${value / 1000000}M` : `${value / 1000}K`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <defs>
                            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.7}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                            </linearGradient>
                        </defs>
                        <Bar yAxisId="left" dataKey="volume" name="Volume" fill="url(#colorVolume)" barSize={20} />
                        
                        <Line dataKey="event" stroke="none" activeDot={false} hide={true}/>

                        <ZAxis dataKey="volume" range={[200, 200]} />
                        <Scatter yAxisId="left" dataKey="volume" data={eventData} fill="#fde047" shape="star" name="Campaign Event" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};