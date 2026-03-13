import { User } from '../types';

// ============================================================
// PsyMatch Demo - Seeded Dummy Users (5 users)
// ============================================================

export const dummyUsers: User[] = [
    {
        id: 'user-1',
        name: 'Alex Rivera',
        email: 'alex@example.com',
        profile: {
            bigFive: {
                openness: 85,
                conscientiousness: 70,
                extraversion: 60,
                agreeableness: 75,
                neuroticism: 35,
            },
            values: {
                stabilityVsRisk: 72,
                moneyVsMeaning: 80,
                familyVsIndependence: 45,
                growthVsComfort: 88,
                securityVsFreedom: 65,
            },
            lifeGoals: {
                longTermPlanning: 78,
                explorationDrive: 82,
                careerFocus: 70,
                relationshipPriority: 65,
                personalDevelopment: 90,
            },
        },
        createdAt: '2026-01-15T10:00:00Z',
    },
    {
        id: 'user-2',
        name: 'Jordan Kim',
        email: 'jordan@example.com',
        profile: {
            bigFive: {
                openness: 45,
                conscientiousness: 90,
                extraversion: 30,
                agreeableness: 60,
                neuroticism: 55,
            },
            values: {
                stabilityVsRisk: 25,
                moneyVsMeaning: 40,
                familyVsIndependence: 30,
                growthVsComfort: 50,
                securityVsFreedom: 20,
            },
            lifeGoals: {
                longTermPlanning: 95,
                explorationDrive: 30,
                careerFocus: 88,
                relationshipPriority: 80,
                personalDevelopment: 60,
            },
        },
        createdAt: '2026-01-20T14:30:00Z',
    },
    {
        id: 'user-3',
        name: 'Sam Patel',
        email: 'sam@example.com',
        profile: {
            bigFive: {
                openness: 92,
                conscientiousness: 55,
                extraversion: 80,
                agreeableness: 85,
                neuroticism: 25,
            },
            values: {
                stabilityVsRisk: 78,
                moneyVsMeaning: 90,
                familyVsIndependence: 60,
                growthVsComfort: 95,
                securityVsFreedom: 85,
            },
            lifeGoals: {
                longTermPlanning: 50,
                explorationDrive: 95,
                careerFocus: 45,
                relationshipPriority: 70,
                personalDevelopment: 88,
            },
        },
        createdAt: '2026-02-01T09:15:00Z',
    },
    {
        id: 'user-4',
        name: 'Morgan Chen',
        email: 'morgan@example.com',
        profile: {
            bigFive: {
                openness: 65,
                conscientiousness: 80,
                extraversion: 50,
                agreeableness: 70,
                neuroticism: 40,
            },
            values: {
                stabilityVsRisk: 55,
                moneyVsMeaning: 60,
                familyVsIndependence: 50,
                growthVsComfort: 70,
                securityVsFreedom: 50,
            },
            lifeGoals: {
                longTermPlanning: 75,
                explorationDrive: 60,
                careerFocus: 72,
                relationshipPriority: 68,
                personalDevelopment: 75,
            },
        },
        createdAt: '2026-02-05T16:45:00Z',
    },
    {
        id: 'user-5',
        name: 'Taylor Brooks',
        email: 'taylor@example.com',
        profile: {
            bigFive: {
                openness: 30,
                conscientiousness: 40,
                extraversion: 90,
                agreeableness: 50,
                neuroticism: 70,
            },
            values: {
                stabilityVsRisk: 82,
                moneyVsMeaning: 35,
                familyVsIndependence: 75,
                growthVsComfort: 40,
                securityVsFreedom: 80,
            },
            lifeGoals: {
                longTermPlanning: 30,
                explorationDrive: 70,
                careerFocus: 55,
                relationshipPriority: 40,
                personalDevelopment: 45,
            },
        },
        createdAt: '2026-02-10T11:20:00Z',
    },
];