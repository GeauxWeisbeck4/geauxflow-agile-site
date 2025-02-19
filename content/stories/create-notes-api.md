---
title: Create Notes API
description: Setting up the Notes API for rendering API endpoint and returning notes data
date: 2025-02-19 11:25:00.00 +7
tags:
  - in-progress
  - Sprint15
  - Week8
layout: layouts/story.njk
---

`Status`: *In-Progress*
`Progress`: *20%*
`Sprint`: **[[Sprint_15-2025_02_10-2025_02_23]]**

## Notes API Story

The [11ty-notes starter template](https://github.com/shadowtime2000/11ty-notes) is one of my favorite 11ty projects because the creator has such a simple and ingenious way of sharing and rendering his notes. That is where this whole idea comes from and showed me how to do it myself with some newer JavaScript and 11ty practices.

## Objectives

- [ ] **Create an API that takes markdown notes collection and returns it as a JSON response to an endpoint**
- [ ] **Create a layout that takes the API endpoint and returns note cards**
  - [ ] *At first we just want to simply return notes*
  - [ ] *Later, we're going to add more features to this*
    - [ ] Category Note Home Page Card with all related notes
    - [ ] Bullet structure like Logseq
    - [ ] Contain scripts/tools that show Pomodoro timers, check boxes, timestamps etc.
    - [ ] Note graph showing relationships amongst notes
    - [ ] References, citations, foot notes, etc.
    - [ ] GitHub Flavored Markdown
    - [ ] MDX
  - [ ] **Style the note card to something aesthetically pleasing**
    - [ ] *[11ty-notes](https://github.com/shadowtime2000/11ty-notes) uses Halfmoon and I like it's look - is an option*
    - [ ] *Create my own design system (way future)*
  - [ ] **Write tests to ensure functionality**
  - [ ] **Add shit to `.eleventy.config.js` file**

## To Do List

- [x] Create basic notes API that achieves objective one
- [ ] Return notes as note cards
- [ ] Style notes
- [ ] Plan further

## Notes

- I tried out the new file naming convention I noticed in the `eleventy-base-blog` for the `content.11tydata.js` file. Similar concept for `/api/notes.11tydata.js` and hopefully it should work. If not, I'll fucking fix it.

## Recap

