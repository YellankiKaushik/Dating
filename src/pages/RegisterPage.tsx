import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';

// ============================================================
// PsyMatch Demo - Register Page
// ============================================================

export default function RegisterPage() {
    const { registerUser } = useApp();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    const validate = (): boolean => {
        const errs: { name?: string; email?: string } = {};
        if (!name.trim()) errs.name = 'Name is required';
        if (!email.trim()) {
            errs.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errs.email = 'Please enter a valid email';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        registerUser(name.trim(), email.trim());
        navigate('/questionnaire');
    };

    return (
        <div className="flex items-center justify-center min-h-[65vh]">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        Let's get started
                    </h1>
                    <p className="text-slate-400">
                        Enter your details to begin the personality assessment
                    </p>
                </div>

                {/* Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6"
                >
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 border ${errors.name ? 'border-red-500/50' : 'border-white/5'
                                } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition`}
                        />
                        {errors.name && (
                            <p className="mt-1.5 text-sm text-red-400">{errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className={`w-full px-4 py-3 rounded-xl bg-slate-800/80 border ${errors.email ? 'border-red-500/50' : 'border-white/5'
                                } text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition`}
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        Continue to Assessment
                    </button>
                </form>
            </div>
        </div>
    );
}
