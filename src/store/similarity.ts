import { PersonalityProfile, User, MatchResult } from '../types';

// ============================================================
// PsyMatch Demo - Cosine Similarity Engine
// ============================================================

/**
 * Convert a PersonalityProfile into a flat numeric vector of 15 values (0-100).
 * Order: bigFive(5) + values(5) + lifeGoals(5)
 */
export function profileToVector(profile: PersonalityProfile): number[] {
    return [
        // Big Five
        profile.bigFive.openness,
        profile.bigFive.conscientiousness,
        profile.bigFive.extraversion,
        profile.bigFive.agreeableness,
        profile.bigFive.neuroticism,
        // Values
        profile.values.stabilityVsRisk,
        profile.values.moneyVsMeaning,
        profile.values.familyVsIndependence,
        profile.values.growthVsComfort,
        profile.values.securityVsFreedom,
        // Life Goals
        profile.lifeGoals.longTermPlanning,
        profile.lifeGoals.explorationDrive,
        profile.lifeGoals.careerFocus,
        profile.lifeGoals.relationshipPriority,
        profile.lifeGoals.personalDevelopment,
    ];
}

/**
 * Compute the dot product of two vectors.
 */
function dotProduct(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += a[i] * b[i];
    }
    return sum;
}

/**
 * Compute the magnitude (Euclidean norm) of a vector.
 */
function magnitude(v: number[]): number {
    let sum = 0;
    for (let i = 0; i < v.length; i++) {
        sum += v[i] * v[i];
    }
    return Math.sqrt(sum);
}

/**
 * Compute cosine similarity between two vectors.
 * Returns a value between 0 and 1 (for non-negative vectors).
 */
export function cosineSimilarity(a: number[], b: number[]): number {
    const dot = dotProduct(a, b);
    const magA = magnitude(a);
    const magB = magnitude(b);

    if (magA === 0 || magB === 0) return 0;

    return dot / (magA * magB);
}

/**
 * Find the top N most similar users to the given user.
 * Returns matches sorted by similarity (descending), filtered by minSimilarity.
 */
export function findTopMatches(
    currentUser: User,
    allUsers: User[],
    topN: number = 3,
    minSimilarity: number = 70
): MatchResult[] {
    const currentVector = profileToVector(currentUser.profile);

    const matches: MatchResult[] = allUsers
        .filter((u) => u.id !== currentUser.id)
        .map((user) => {
            const userVector = profileToVector(user.profile);
            const similarity = cosineSimilarity(currentVector, userVector) * 100;
            return { user, similarity: Math.round(similarity * 10) / 10 };
        })
        .filter((m) => m.similarity >= minSimilarity)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topN);

    return matches;
}

