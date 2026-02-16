# News Aggregator Prototype

## Overview
This project is a single-file, deterministic news aggregator prototype intended for demonstration in a GitHub repository. It simulates the aggregation of the last 24 hours of news without any live data sources.

## Purpose
The purpose is to provide a UI and ranking simulation that can be reviewed quickly without build tools, dependencies, or a local server. It is designed to be portable and easy to open in any modern browser.

## Scope
The prototype focuses on three fixed categories and a static ranking model. It does not include any live ingestion, persistence, or user personalization.

## Features
- Three fixed categories: Canada News, Economic News, AI & Tech News
- Top three items highlighted per category, with expandable remaining items
- Deterministic ranking based on importance score and recency
- Accessible toggle controls with ARIA attributes

## Technical Constraints
This is a single-file prototype with no dependencies. All HTML, CSS, and JavaScript are embedded in `index.html` so it can be opened directly without a build process or external libraries.

## Architecture
The application is a static HTML document with inline CSS and a self-contained JavaScript IIFE. Rendering and interactions happen once at load, and expansion toggles only adjust visibility without re-sorting or re-rendering entire sections.

## Data Model
The data is mocked in a strict `NEWS_DATA` object with three arrays of five items each. Each item includes a title, source, summary, URL, ISO timestamp within the last 24 hours, and a manually assigned importance score. Ranking occurs once on load by sorting on importance score (descending) and then recency.

## Future Enhancements
Potential enhancements include adding live ingestion from approved RSS feeds or APIs, improving ranking logic, and adding automated freshness checks once a backend is available.

## Limitations
This prototype does not include a backend, scraping, real-time data ingestion, analytics, authentication, filtering, search, or pagination. All content is fictional and used purely for demonstration.

## How to Run
1. Download `index.html` and `README.md`.
2. Open `index.html` in a modern browser.
