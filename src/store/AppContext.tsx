import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, PersonalityProfile, Answers, MatchResult } from '../types';
import { questions } from './questions';
import { dummyUsers } from './dummyUsers';
import { findTopMatches } from './similarity';

// ============================================================
// PsyMatch Demo - Application Context
// ============================================================

interface AppState {
    /** All registered users (seeded + new) */
    users: User[];
    /** The current logged-in user */
    currentUser: User | null;
    /** Top matches for the current user */
    matches: MatchResult[];
    /** Register a new user with name + email */
    registerUser: (name: string, email: string) => void;
    /** Complete the questionnaire and compute profile */
    completeQuestionnaire: (answers: Answers) => void;
    /** Get a user by id */
    getUserById: (id: string) => User | undefined;
}

const AppContext = createContext<AppState | undefined>(undefined);

/**
 * Normalize a set of Likert answers (1-5) for a given trait to 0-100 scale.
 * Handles reverse-scored items automatically.
 */
function calculateTraitScore(
    traitQuestions: typeof questions,
    answers: Answers
): number {
    if (traitQuestions.length === 0) return 50;

    let total = 0;
    for (const q of traitQuestions) {
        const raw = answers[q.id] ?? 3; // default to neutral
        const score = q.reverseScored ? 6 - raw : raw;
        total += score;
    }

    // Normalize: min possible = length * 1, max possible = length * 5
    const minPossible = traitQuestions.length * 1;
    const maxPossible = traitQuestions.length * 5;
    const normalized = ((total - minPossible) / (maxPossible - minPossible)) * 100;

    return Math.round(normalized);
}

/**
 * Build a complete PersonalityProfile from questionnaire answers.
 */
function buildProfile(answers: Answers): PersonalityProfile {
    const getTraitQuestions = (category: string, trait: string) =>
        questions.filter((q) => q.category === category && q.trait === trait);

    return {
        bigFive: {
            openness: calculateTraitScore(getTraitQuestions('bigFive', 'openness'), answers),
            conscientiousness: calculateTraitScore(getTraitQuestions('bigFive', 'conscientiousness'), answers),
            extraversion: calculateTraitScore(getTraitQuestions('bigFive', 'extraversion'), answers),
            agreeableness: calculateTraitScore(getTraitQuestions('bigFive', 'agreeableness'), answers),
            neuroticism: calculateTraitScore(getTraitQuestions('bigFive', 'neuroticism'), answers),
        },
        values: {
            stabilityVsRisk: calculateTraitScore(getTraitQuestions('values', 'stabilityVsRisk'), answers),
            moneyVsMeaning: calculateTraitScore(getTraitQuestions('values', 'moneyVsMeaning'), answers),
            familyVsIndependence: calculateTraitScore(getTraitQuestions('values', 'familyVsIndependence'), answers),
            growthVsComfort: calculateTraitScore(getTraitQuestions('values', 'growthVsComfort'), answers),
            securityVsFreedom: calculateTraitScore(getTraitQuestions('values', 'securityVsFreedom'), answers),
        },
        lifeGoals: {
            longTermPlanning: calculateTraitScore(getTraitQuestions('lifeGoals', 'longTermPlanning'), answers),
            explorationDrive: calculateTraitScore(getTraitQuestions('lifeGoals', 'explorationDrive'), answers),
            careerFocus: calculateTraitScore(getTraitQuestions('lifeGoals', 'careerFocus'), answers),
            relationshipPriority: calculateTraitScore(getTraitQuestions('lifeGoals', 'relationshipPriority'), answers),
            personalDevelopment: calculateTraitScore(getTraitQuestions('lifeGoals', 'personalDevelopment'), answers),
        },
    };
}

/** Generate a unique id */
function generateId(): string {
    return 'user-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ============================================================
// Provider Component
// ============================================================

export function AppProvider({ children }: { children: ReactNode }) {
    const [users, setUsers] = useState<User[]>([...dummyUsers]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [matches, setMatches] = useState<MatchResult[]>([]);
    const [pendingRegistration, setPendingRegistration] = useState<{
        name: string;
        email: string;
    } | null>(null);

    const registerUser = useCallback((name: string, email: string) => {
        setPendingRegistration({ name, email });
    }, []);

    const completeQuestionnaire = useCallback(
        (answers: Answers) => {
            if (!pendingRegistration) return;

            const profile = buildProfile(answers);
            const newUser: User = {
                id: generateId(),
                name: pendingRegistration.name,
                email: pendingRegistration.email,
                profile,
                createdAt: new Date().toISOString(),
            };

            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);
            setCurrentUser(newUser);

            // Find top matches
            const topMatches = findTopMatches(newUser, updatedUsers, 3, 70);
            setMatches(topMatches);

            setPendingRegistration(null);
        },
        [pendingRegistration, users]
    );

    const getUserById = useCallback(
        (id: string) => users.find((u) => u.id === id),
        [users]
    );

    return (
        <AppContext.Provider
            value={{
                users,
                currentUser,
                matches,
                registerUser,
                completeQuestionnaire,
                getUserById,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

// ============================================================
// Custom Hook
// ============================================================

export function useApp(): AppState {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}