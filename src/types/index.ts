// ============================================================
// PsyMatch Demo - Type Definitions
// ============================================================

/** Big Five personality traits */
export interface BigFiveTraits {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
}

/** Value preferences (0-100 scale, higher = second option) */
export interface ValueTraits {
    stabilityVsRisk: number;
    moneyVsMeaning: number;
    familyVsIndependence: number;
    growthVsComfort: number;
    securityVsFreedom: number;
}

/** Life goal priorities (0-100 scale) */
export interface LifeGoalTraits {
    longTermPlanning: number;
    explorationDrive: number;
    careerFocus: number;
    relationshipPriority: number;
    personalDevelopment: number;
}

/** Complete personality profile */
export interface PersonalityProfile {
    bigFive: BigFiveTraits;
    values: ValueTraits;
    lifeGoals: LifeGoalTraits;
}

/** A user in the system */
export interface User {
    id: string;
    name: string;
    email: string;
    profile: PersonalityProfile;
    createdAt: string;
}

/** A match result with similarity score */
export interface MatchResult {
    user: User;
    similarity: number; // 0-100 percentage
}

/** A question in the questionnaire */
export interface Question {
    id: number;
    text: string;
    category: 'bigFive' | 'values' | 'lifeGoals';
    trait: string;
    reverseScored?: boolean;
}

/** User answers map: questionId -> answer (1-5) */
export type Answers = Record<number, number>;

/** Chat message in mock chat */
export interface ChatMessage {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
}