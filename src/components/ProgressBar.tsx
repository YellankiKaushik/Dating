import React from 'react';

// ============================================================
// PsyMatch Demo - Progress Bar Component
// ============================================================

interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const percentage = Math.round((current / total) * 100);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">
                    Question {current} of {total}
                </span>
                <span className="text-sm font-semibold text-violet-400">{percentage}%</span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}