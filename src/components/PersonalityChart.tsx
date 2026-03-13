import React from 'react';
import { PersonalityProfile } from '../types';

// ============================================================
// PsyMatch Demo - Personality Chart Component (Bar Chart)
// ============================================================

interface PersonalityChartProps {
    profile: PersonalityProfile;
}

interface TraitBarProps {
    label: string;
    value: number;
    color: string;
}

function TraitBar({ label, value, color }: TraitBarProps) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-400 w-28 sm:w-36 text-right truncate">
                {label}
            </span>
            <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-700`}
                    style={{ width: `${value}%` }}
                />
            </div>
            <span className="text-xs font-semibold text-slate-300 w-10 text-right">{value}</span>
        </div>
    );
}

export default function PersonalityChart({ profile }: PersonalityChartProps) {
    const bigFiveTraits = [
        { label: 'Openness', value: profile.bigFive.openness },
        { label: 'Conscientiousness', value: profile.bigFive.conscientiousness },
        { label: 'Extraversion', value: profile.bigFive.extraversion },
        { label: 'Agreeableness', value: profile.bigFive.agreeableness },
        { label: 'Neuroticism', value: profile.bigFive.neuroticism },
    ];

    const valueTraits = [
        { label: 'Risk Taking', value: profile.values.stabilityVsRisk },
        { label: 'Meaning Focus', value: profile.values.moneyVsMeaning },
        { label: 'Independence', value: profile.values.familyVsIndependence },
        { label: 'Growth Drive', value: profile.values.growthVsComfort },
        { label: 'Freedom', value: profile.values.securityVsFreedom },
    ];

    const goalTraits = [
        { label: 'Long-term Planning', value: profile.lifeGoals.longTermPlanning },
        { label: 'Exploration', value: profile.lifeGoals.explorationDrive },
        { label: 'Career Focus', value: profile.lifeGoals.careerFocus },
        { label: 'Relationships', value: profile.lifeGoals.relationshipPriority },
        { label: 'Self-Improvement', value: profile.lifeGoals.personalDevelopment },
    ];

    return (
        <div className="space-y-8">
            {/* Big Five */}
            <div>
                <h3 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-4">
                    Big Five Personality
                </h3>
                <div className="space-y-3">
                    {bigFiveTraits.map((t) => (
                        <TraitBar key={t.label} label={t.label} value={t.value} color="bg-gradient-to-r from-violet-500 to-indigo-500" />
                    ))}
                </div>
            </div>

            {/* Values */}
            <div>
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">
                    Core Values
                </h3>
                <div className="space-y-3">
                    {valueTraits.map((t) => (
                        <TraitBar key={t.label} label={t.label} value={t.value} color="bg-gradient-to-r from-emerald-500 to-teal-500" />
                    ))}
                </div>
            </div>

            {/* Life Goals */}
            <div>
                <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-4">
                    Life Goals
                </h3>
                <div className="space-y-3">
                    {goalTraits.map((t) => (
                        <TraitBar key={t.label} label={t.label} value={t.value} color="bg-gradient-to-r from-sky-500 to-blue-500" />
                    ))}
                </div>
            </div>
        </div>
    );
}
