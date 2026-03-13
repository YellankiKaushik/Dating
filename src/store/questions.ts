import { Question } from '../types';

// ============================================================
// PsyMatch Demo - Questionnaire Data (20 Questions)
// ============================================================

export const questions: Question[] = [
    // ======== Big Five Traits (10 questions) ========

    // Openness (2)
    {
        id: 1,
        text: "I enjoy exploring new ideas and abstract concepts.",
        category: "bigFive",
        trait: "openness",
    },
    {
        id: 2,
        text: "I prefer routine and predictable situations.",
        category: "bigFive",
        trait: "openness",
        reverseScored: true,
    },

    // Conscientiousness (2)
    {
        id: 3,
        text: "I always complete tasks thoroughly and on time.",
        category: "bigFive",
        trait: "conscientiousness",
    },
    {
        id: 4,
        text: "I tend to procrastinate on important tasks.",
        category: "bigFive",
        trait: "conscientiousness",
        reverseScored: true,
    },

    // Extraversion (2)
    {
        id: 5,
        text: "I feel energized when I am around other people.",
        category: "bigFive",
        trait: "extraversion",
    },
    {
        id: 6,
        text: "I prefer spending time alone rather than at social events.",
        category: "bigFive",
        trait: "extraversion",
        reverseScored: true,
    },

    // Agreeableness (2)
    {
        id: 7,
        text: "I go out of my way to help others, even strangers.",
        category: "bigFive",
        trait: "agreeableness",
    },
    {
        id: 8,
        text: "I tend to be skeptical of other people\u2019s intentions.",
        category: "bigFive",
        trait: "agreeableness",
        reverseScored: true,
    },

    // Neuroticism (2)
    {
        id: 9,
        text: "I often feel anxious or worried about things.",
        category: "bigFive",
        trait: "neuroticism",
    },
    {
        id: 10,
        text: "I remain calm and composed even under pressure.",
        category: "bigFive",
        trait: "neuroticism",
        reverseScored: true,
    },

    // ======== Values (5 questions) ========

    {
        id: 11,
        text: "I prefer taking calculated risks over playing it safe.",
        category: "values",
        trait: "stabilityVsRisk",
    },
    {
        id: 12,
        text: "Finding meaningful work matters more to me than a high salary.",
        category: "values",
        trait: "moneyVsMeaning",
    },
    {
        id: 13,
        text: "I value my independence more than being close to family.",
        category: "values",
        trait: "familyVsIndependence",
    },
    {
        id: 14,
        text: "I prioritize personal growth even when it is uncomfortable.",
        category: "values",
        trait: "growthVsComfort",
    },
    {
        id: 15,
        text: "I would rather have freedom and flexibility than financial security.",
        category: "values",
        trait: "securityVsFreedom",
    },

    // ======== Life Goals (5 questions) ========

    {
        id: 16,
        text: "I have a clear long-term plan for where I want to be in 10 years.",
        category: "lifeGoals",
        trait: "longTermPlanning",
    },
    {
        id: 17,
        text: "I feel drawn to exploring different cultures and places.",
        category: "lifeGoals",
        trait: "explorationDrive",
    },
    {
        id: 18,
        text: "Career advancement is one of my top priorities.",
        category: "lifeGoals",
        trait: "careerFocus",
    },
    {
        id: 19,
        text: "Building and maintaining deep relationships is essential to my happiness.",
        category: "lifeGoals",
        trait: "relationshipPriority",
    },
    {
        id: 20,
        text: "I actively seek opportunities for self-improvement every day.",
        category: "lifeGoals",
        trait: "personalDevelopment",
    },
];