# PsyMatch Demo

A personality similarity platform built with React 18, TypeScript, Vite, and Tailwind CSS.

## Project Status

- **Project Type**: React + TypeScript + Vite SPA
- **Entry Point**: `src/main.tsx`
- **Build System**: Vite 7.0.0
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 6.x
- **State Management**: React Context API

## Features

- 20-question personality questionnaire (Big Five, Values, Life Goals)
- Likert scale (1-5) with score normalization to 0-100
- Cosine similarity engine for personality matching
- Dashboard with personality bar charts and top 3 matches
- Mock chat interface for matched users
- 5 seeded dummy users for immediate testing
- Fully client-side, no backend required

## Architecture

```
src/
├── App.tsx                    # Router + Provider setup
├── main.tsx                   # Entry point
├── index.css                  # Global styles + Tailwind
├── types/index.ts             # TypeScript type definitions
├── store/
│   ├── AppContext.tsx          # React Context (state management)
│   ├── questions.ts           # 20 questionnaire questions
│   ├── dummyUsers.ts          # 5 seeded dummy users
│   └── similarity.ts          # Cosine similarity engine
├── pages/
│   ├── HomePage.tsx           # Landing page
│   ├── RegisterPage.tsx       # Name + email form
│   ├── QuestionnairePage.tsx  # Multi-step questionnaire
│   ├── DashboardPage.tsx      # Profile + matches
│   └── ChatPage.tsx           # Mock chat UI
├── components/
│   ├── ProgressBar.tsx        # Questionnaire progress
│   ├── MatchCard.tsx          # Match user card
│   └── PersonalityChart.tsx   # Personality bar chart
└── layouts/
    └── Layout.tsx             # App shell layout
```

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Landing page with start button |
| `/register` | Register | Name + email form |
| `/questionnaire` | Questionnaire | 20-question multi-step form |
| `/dashboard` | Dashboard | Personality summary + top matches |
| `/chat/:id` | Chat | Mock chat with matched user |

## Similarity Engine

- Converts personality profiles to 15-dimensional vectors
- Computes cosine similarity between users
- Filters matches above 70% similarity threshold
- Returns top 3 most similar users
