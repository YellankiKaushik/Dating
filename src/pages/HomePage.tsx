import React from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// PsyMatch Demo - Home Page
// ============================================================

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
            {/* Decorative glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    Personality Matching Engine
                </div>

                {/* Heading */}
                <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight">
                    <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                        Discover Your
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                        Perfect Match
                    </span>
                </h1>

                {/* Description */}
                <p className="max-w-xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed">
                    Take a 20-question personality assessment and find people who truly understand you.
                    Powered by Big Five, personal values, and life goals analysis.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        to="/register"
                        className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-lg shadow-2xl shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Get Started
                            <svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </Link>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center gap-8 sm:gap-12 pt-8">
                    <Stat value="20" label="Questions" />
                    <div className="w-px h-10 bg-white/10" />
                    <Stat value="15" label="Traits Analyzed" />
                    <div className="w-px h-10 bg-white/10" />
                    <Stat value="3" label="Categories" />
                </div>
            </div>
        </div>
    );
}

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">{value}</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">{label}</div>
        </div>
    );
}
