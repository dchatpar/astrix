import React from 'react';
import { ImpactMechanism } from '../types';
import { FileText, Eye, Store, Briefcase, LucideIcon } from 'lucide-react';

interface StrategicMechanismsProps {
    impactData: ImpactMechanism[];
}

const icons: { [key: string]: LucideIcon } = {
    FileText,
    Eye,
    Store,
    Briefcase,
};

export const StrategicMechanisms: React.FC<StrategicMechanismsProps> = ({ impactData }) => {
    return (
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-lg h-full">
            <h3 className="text-lg font-bold text-white mb-4">Strategic Mechanisms</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {impactData.map(item => {
                    const Icon = icons[item.icon];
                    return (
                        <div key={item.id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col">
                            <div className="flex items-center gap-3">
                                {Icon && <Icon className="h-6 w-6 text-blue-400" />}
                                <p className="font-bold text-slate-200 text-sm">{item.name}</p>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold text-white my-1">{item.value}</p>
                            <p className="text-xs text-slate-400 mt-auto">{item.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};