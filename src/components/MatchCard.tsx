import React from 'react';
import { Link } from 'react-router-dom';
import { MatchResult } from '../types';

// ============================================================
// PsyMatch Demo - Match Card Component
// ============================================================

interface MatchCardProps {
    match: MatchResult;
    rank: number;
}

export default function MatchCard({ match, rank }: MatchCardProps) {
    const { user, similarity } = match;

    // Color based on similarity level
    const getColor = () => {
        if (similarity >= 90) return 'from-emerald-500 to-teal-500';
        if (similarity >= 80) return 'from-violet-500 to-indigo-500';
        return 'from-sky-500 to-blue-500';
    };

    // Initials from name
    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    return (
        <div className="group relative bg-slate-900/60 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5">
            {/* Rank badge */}
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold shadow-lg">
                #{rank}
            </div>

            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getColor()} flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-lg`}>
                    {initials}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-lg truncate">{user.name}</h3>
                    <p className="text-sm text-slate-400 truncate">{user.email}</p>
                </div>
            </div>

            {/* Similarity bar */}
            <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Similarity
                    </span>
                    <span className={`text-lg font-bold bg-gradient-to-r ${getColor()} bg-clip-text text-transparent`}>
                        {similarity}%
                    </span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r ${getColor()} rounded-full transition-all duration-700`}
                        style={{ width: `${similarity}%` }}
                    />
                </div>
            </div>

            {/* Chat button */}
            <Link
                to={`/chat/${user.id}`}
                className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-sm font-medium text-slate-300 hover:text-white transition-all"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Chat
            </Link>
        </div>
    );
}