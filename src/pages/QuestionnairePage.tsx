import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { questions } from '../store/questions';
import { Answers } from '../types';
import ProgressBar from '../components/ProgressBar';

// ============================================================
// PsyMatch Demo - Questionnaire Page (Multi-step)
// ============================================================

const likertLabels = [
    'Strongly Disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly Agree',
];

export default function QuestionnairePage() {
    const { completeQuestionnaire } = useApp();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [selectedValue, setSelectedValue] = useState<number | null>(null);

    const currentQuestion = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;

    const handleSelect = (value: number) => {
        setSelectedValue(value);
    };

    const handleNext = () => {
        if (selectedValue === null) return;

        const updatedAnswers = { ...answers, [currentQuestion.id]: selectedValue };
        setAnswers(updatedAnswers);

        if (isLastQuestion) {
            completeQuestionnaire(updatedAnswers);
            navigate('/dashboard');
        } else {
            setCurrentIndex((prev) => prev + 1);
            setSelectedValue(answers[questions[currentIndex + 1]?.id] ?? null);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setSelectedValue(answers[questions[currentIndex - 1]?.id] ?? null);
        }
    };

    // Category badge color
    const getCategoryColor = () => {
        switch (currentQuestion.category) {
            case 'bigFive':
                return 'bg-violet-500/10 text-violet-300 border-violet-500/20';
            case 'values':
                return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
            case 'lifeGoals':
                return 'bg-sky-500/10 text-sky-300 border-sky-500/20';
        }
    };

    const getCategoryLabel = () => {
        switch (currentQuestion.category) {
            case 'bigFive':
                return 'Big Five Personality';
            case 'values':
                return 'Core Values';
            case 'lifeGoals':
                return 'Life Goals';
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
                <ProgressBar current={currentIndex + 1} total={questions.length} />
            </div>

            {/* Question Card */}
            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 sm:p-8">
                {/* Category Badge */}
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${getCategoryColor()}`}
                >
                    {getCategoryLabel()}
                </span>

                {/* Question Text */}
                <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4 mb-8 leading-relaxed">
                    {currentQuestion.text}
                </h2>

                {/* Likert Scale Options */}
                <div className="space-y-3">
                    {likertLabels.map((label, index) => {
                        const value = index + 1;
                        const isSelected = selectedValue === value;

                        return (
                            <button
                                key={value}
                                onClick={() => handleSelect(value)}
                                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-200 text-left ${isSelected
                                        ? 'bg-violet-600/20 border-violet-500/40 text-white'
                                        : 'bg-slate-800/40 border-white/5 text-slate-300 hover:bg-slate-800/60 hover:border-white/10'
                                    }`}
                            >
                                <div
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected
                                            ? 'border-violet-500 bg-violet-500'
                                            : 'border-slate-600'
                                        }`}
                                >
                                    {isSelected && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <span className="font-medium">{label}</span>
                                    <span className="ml-2 text-sm text-slate-500">({value})</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${currentIndex === 0
                                ? 'text-slate-600 cursor-not-allowed'
                                : 'text-slate-300 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={selectedValue === null}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${selectedValue === null
                                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5'
                            }`}
                    >
                        {isLastQuestion ? 'See Results' : 'Next'}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
