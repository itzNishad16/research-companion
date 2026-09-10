# Research Companion

Build a premium, futuristic AI research platform called "ResearchAI".

This is a university AI-agent project for managing and analyzing research papers. The application should look like a real modern AI SaaS product, NOT a basic college CRUD application.

IMPORTANT:
Build the frontend only for now.
Do NOT implement backend APIs, authentication, Supabase, n8n, or AI functionality yet.
Use realistic mock data so the interface looks complete.

DESIGN DIRECTION:

Use a sophisticated dark-first visual design inspired by modern products such as Linear, Perplexity, Notion, and premium AI research tools.

The visual style should feel:

Intelligent

Futuristic

Premium

Academic

Minimal

Technical

Professional

Avoid:

Generic Bootstrap-style layouts

Excessive bright colors

Rainbow gradients

Huge decorative graphics

Cartoonish AI robots

Cluttered dashboards

Overly rounded "toy-like" cards

COLOR SYSTEM:

Use a dark charcoal/near-black background with subtle layered surfaces.

Use a restrained accent system:

Electric violet/indigo for AI-related elements

Cool blue for information

Soft neutral text

Subtle borders

Very subtle gradients and glows

Use gradients sparingly and only where they improve hierarchy.

GLOBAL LAYOUT:

Create a persistent left sidebar with:

ResearchAI logo
"AI Research Workspace"

Navigation:

Overview

Discover Papers

My Library

AI Research Agent

Research Insights

Bottom:

Settings

User profile

Add a compact top bar containing:

Global search

AI Agent status

Notification icon

User profile

DASHBOARD / OVERVIEW:

Create a visually impressive research command center.

Hero section:

"Good evening, Researcher."

Subtitle:
"Your AI research workspace is ready."

Add a prominent AI Agent command bar:

"Ask ResearchAI anything about your research..."

Include a small animated AI status indicator:
"Agent Online"

Below it, create metric cards:

Saved Papers
Research Topics
Papers Analyzed
Research Insights

Add a "Continue Research" section showing recently accessed papers.

Add a "Research Activity" visualization showing papers discovered/analyzed over time.

Add a "Trending Research Topics" section with topic chips.

DISCOVER PAPERS PAGE:

Create a premium research search experience.

Large search interface:

"Search millions of research papers..."

Include:

Search button

Year filter

Topic filter

Sort control

Paper results should appear as elegant cards.

Each paper card should include:

Paper title

Authors

Publication year

Journal/conference

Abstract preview

Research topic tags

Citation count

Relevance score

"AI Summary"

"Save"

"Open Paper"

Add subtle hover animations.

MY LIBRARY PAGE:

Create a personal research library.

Include:

Saved papers

Search

Filters

Topic grouping

Recently added

Favorites

Allow switching between:

Grid view

Compact list view

Each paper should have quick actions:

Summarize

Analyze

Remove

Open

AI RESEARCH AGENT PAGE:

This should be the centerpiece of the application.

Create a beautiful AI research assistant interface.

At the top:

"Research Agent"

Subtitle:
"Your AI partner for discovering, understanding, and organizing research."

Show an agent status:

● Agent Online
Tools available:
Paper Search
Paper Analysis
Library
Research Insights

Create a large chat interface.

AI messages should look sophisticated and structured rather than simple ChatGPT bubbles.

Include example prompts:

"Find recent papers about AI-powered queue prediction."

"Compare the methodologies used in my saved papers."

"Summarize this research paper."

"Identify potential research gaps."

"Suggest research topics based on my library."

When showing an AI response, support structured sections such as:

Summary
Key Findings
Methodology
Research Gap
Relevant Papers

Create a visual "Agent Activity" component that can later display states such as:

Understanding request
Searching research papers
Analyzing results
Consulting library
Generating response

Make this feel like an actual AI agent rather than a static chatbot.

RESEARCH INSIGHTS PAGE:

Create an analytics-style research intelligence dashboard.

Include:

Most researched topics

Papers by year

Research areas

Saved papers over time

Most common keywords

Methodology distribution

Also create an "AI Research Insights" panel containing generated observations such as:

"Machine learning appears frequently across your saved papers."

"Most of your recent research focuses on prediction systems."

Use charts that look modern and minimal.

PAPER DETAIL VIEW:

When a paper is opened, create a beautiful research-paper detail layout.

Include:

Title
Authors
Publication information
Abstract
Keywords
Citation information

Add a prominent AI section:

"AI Analysis"

Tabs:

Overview
Methodology
Key Findings
Research Gap
Limitations
Future Work

Include buttons:

AI Summarize
Compare
Save to Library

MICRO-INTERACTIONS:

Add subtle, professional animations:

Smooth page transitions

Hover states

Button feedback

Card elevation

Loading skeletons

AI thinking animation

Search loading state

Agent activity transitions

Do NOT over-animate the application.

RESPONSIVE DESIGN:

The application must work well on:

Desktop

Laptop

Tablet

Mobile

TECHNICAL STRUCTURE:

Create reusable components for:

Sidebar

Top navigation

Paper cards

Search interface

AI chat

Agent activity indicator

Metric cards

Charts

Research tags

Paper detail sections

Keep the code modular and easy to connect later to:

n8n webhooks

Supabase

Research paper APIs

Gemini API

Use mock data for now.

MOST IMPORTANT:

The final result should look like a polished AI research product that could realistically be shown in a university project demonstration.

It should immediately communicate:

"THIS IS AN AI AGENT FOR RESEARCH."

Do not make it look like a generic student management dashboard.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f125f24d-c3b4-4160-9a99-0e05e64581af).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
