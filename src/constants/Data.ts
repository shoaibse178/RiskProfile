export interface Option {
    key: string;
    label: string;
    score: number;
}

export interface Question {
    id: number;
    label: string;
    options: Option[];
}

export const QUESTIONS = [
    {
        id: 1,
        label: "How would you describe your risk tolerance?",
        options: [
            { key: "low", label: "Low", score: 1 },
            { key: "medium", label: "Medium", score: 2 },
            { key: "high", label: "High", score: 3 },
        ]
    },
    {
        id: 2,
        label: "How often do you review your investment portfolio?",
        options: [
            { key: "rarely", label: "Rarely", score: 1 },
            { key: "occasionally", label: "Occasionally", score: 2 },
            { key: "frequently", label: "Frequently", score: 3 },
        ]
    },
    {
        id: 3,
        label: "How would you react to a market downturn?",
        options: [
            { key: "panic", label: "Panic and sell", score: 1 },
            { key: "hold", label: "Hold and wait", score: 2 },
            { key: "buy", label: "Buy more", score: 3 },
        ]
    },
    {
        id: 4,
        label: "What percentage of your income do you save for investments?",
        options: [
            { key: "less_than_10", label: "Less than 10%", score: 1 },
            { key: "10_to_20", label: "10% to 20%", score: 2 },
            { key: "more_than_20", label: "More than 20%", score: 3 },
        ]
    },
    {
        id: 5,
        label: "Do you have a specific financial goal for your investments?",
        options: [
            { key: "yes", label: "Yes", score: 2 },
            { key: "no", label: "No", score: 1 },
        ]
    },
    {
        id: 6,
        label: "How diversified is your investment portfolio?",
        options: [
            { key: "not_diversified", label: "Not diversified", score: 1 },
            { key: "somewhat_diversified", label: "Somewhat diversified", score: 2 },
            { key: "very_diversified", label: "Very diversified", score: 3 },
        ]
    },
    {
        id: 7,
        label: "What is your preferred type of investment?",
        options: [
            { key: "stocks", label: "Stocks", score: 3 },
            { key: "bonds", label: "Bonds", score: 2 },
            { key: "real_estate", label: "Real Estate", score: 1 },
        ]
    },
    {
        id: 8,
        label: "How do you keep informed about market trends?",
        options: [
            { key: "social_media", label: "Social media", score: 1 },
            { key: "news_outlets", label: "News outlets", score: 2 },
            { key: "financial_advisors", label: "Financial advisors", score: 3 },
        ]
    },
    {
        id: 9,
        label: "What is your reaction to investment losses?",
        options: [
            { key: "accept", label: "Accept and learn", score: 3 },
            { key: "reassess", label: "Reassess strategy", score: 2 },
            { key: "stop_investing", label: "Stop investing", score: 1 },
        ]
    },
    {
        id: 10,
        label: "How do you prioritize your investments?",
        options: [
            { key: "safety_first", label: "Safety first", score: 1 },
            { key: "balanced_approach", label: "Balanced approach", score: 2 },
            { key: "maximize_returns", label: "Maximize returns", score: 3 },
        ]
    }
];