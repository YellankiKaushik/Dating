import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ChatMessage } from '../types';

// ============================================================
// PsyMatch Demo - Chat Page (Mock UI)
// ============================================================

// Predefined bot responses for the mock
const botResponses = [
    "That's really interesting! I feel the same way.",
    "I totally agree. We have a lot in common!",
    "Great point! I've been thinking about that too.",
    "Thanks for sharing. It's nice to connect with someone similar.",
    "I couldn't agree more. What else is on your mind?",
    "That resonates with me deeply. Tell me more!",
    "Wow, we really are alike! What about hobbies?",
    "I appreciate you saying that. Communication is key!",
];

export default function ChatPage() {
    const { id } = useParams<{ id: string }>();
    const { currentUser, getUserById } = useApp();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const chatPartner = id ? getUserById(id) : undefined;

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (!currentUser || !chatPartner) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Chat unavailable</h2>
                    <p className="text-slate-400 mb-6">
                        {!currentUser
                            ? 'Please complete the assessment first.'
                            : 'User not found.'}
                    </p>
                    <Link
                        to={currentUser ? '/dashboard' : '/register'}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold"
                    >
                        {currentUser ? 'Back to Dashboard' : 'Take Assessment'}
                    </Link>
                </div>
            </div>
        );
    }

    const partnerInitials = chatPartner.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;

        // Add user message
        const userMsg: ChatMessage = {
            id: 'msg-' + Date.now(),
            senderId: currentUser.id,
            text,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');

        // Simulate bot response after delay
        setTimeout(() => {
            const botMsg: ChatMessage = {
                id: 'msg-' + Date.now() + '-bot',
                senderId: chatPartner.id,
                text: botResponses[Math.floor(Math.random() * botResponses.length)],
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 800 + Math.random() * 1200);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="max-w-2xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
            {/* Chat Header */}
            <div className="flex items-center gap-4 pb-5 border-b border-white/5 mb-4">
                <Link
                    to="/dashboard"
                    className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold">
                    {partnerInitials}
                </div>
                <div>
                    <h2 className="font-semibold text-white">{chatPartner.name}</h2>
                    <p className="text-xs text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Online (demo)
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
                {messages.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-slate-500">
                            <p className="text-sm">Start a conversation with {chatPartner.name}</p>
                            <p className="text-xs mt-1">This is a demo chat interface</p>
                        </div>
                    </div>
                )}

                {messages.map((msg) => {
                    const isOwn = msg.senderId === currentUser.id;
                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${isOwn
                                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-md'
                                        : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-bl-md'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="pt-4 border-t border-white/5 mt-4">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-800/80 border border-white/5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition text-sm"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className={`p-3 rounded-xl transition-all ${input.trim()
                                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30'
                                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            }`}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
