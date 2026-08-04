# Ultramarine Dream

## Status
`wip` — art direction documented; UI is a placeholder (`pages/Home.jsx`). Implement against this file + `ASSETS.md`.

## Visual Identity
Dreamy, ethereal, cinematic. Inspired by grainy airbrush imagery, soft diffusion blur, and fog-like gradients. The interface should feel like a blurred memory: glowing edges, minimal abstract silhouettes, and deep monochrome ultramarine as the hero color.

## Goals
- Premium, experimental, mysterious, calm.
- Functional and readable: strong hierarchy, accessible contrast, and keyboard-friendly interactions.
- Atmosphere first: blur, glow, grain, and negative space over hard borders and sharp contrast.

## Color System
Primary palette (monochrome blues):
- Primary Ultramarine (ink): `#000B5C`
- Cobalt: `#003CFF`
- Pale Icy Glow (accent): `#BFE0FF`

Surface & background tokens:
- Background: near-white cool fog with soft blue pigment gradients.
- Surfaces: frosted, semi-transparent layers using `backdrop-filter` + subtle borders.
- Inverse: near-white text on deep navy surfaces (dark theme).

Usage rules:
- Avoid warm tones (or any strong orange/yellow/green).
- Avoid loud multicolor gradients; prefer ultramarine-only and low-saturation tints.
- Prefer glow + blur to hard outlines.

## Typography
Fonts in this repo:
- UI / body: `Aeonik` (default) for clean, modern editorial UI feel.
- Headlines / editorial emphasis: `Tiempos Headline` (and `Tiempos Fine` as fallback).

Pairing (recommended):
- Headline: `Tiempos Headline`, light weight, tight tracking.
- Body: `Aeonik`, regular/medium weight, comfortable line height.

Hierarchy (suggested scale):
- Display / hero: 2.5rem to 3.5rem, `Tiempos Headline`, weight ~300-400.
- Section title: 1.2rem to 2rem, `Tiempos Headline`, weight ~300-400.
- Body: 1rem to 1.2rem, `Aeonik`, weight 400-500.
- Meta labels / captions: 0.8rem to 0.95rem, `Aeonik`, muted.

## Components & Styling Guidelines

### Surfaces (Cards, Panels, Sidebars)
- Rounded corners via radius tokens.
- Frosted layers: `backdrop-filter: blur(...)` and layered gradients.
- Subtle border + soft shadow/glow.

Do: translucent backgrounds, soft edges, atmospheric shapes behind content.  
Avoid: hard-edged borders, opaque blocks, high-contrast outlines.

### Buttons
- Pill or medium radius; luminous soft ultramarine tint.
- Calm hover: opacity, glow, slight lift.

### Navigation
- Minimal frosted container; glow on hover/focus (not underline-only).

### Motion & Accessibility
- Slow drifts, soft fades, blur transitions.
- Respect `prefers-reduced-motion: reduce`.
- Use `:focus-visible` consistently.

## Shared assets
Reuse media from `src/assets` (fonts, pfp, videos). See also `ASSETS.md` in this folder for production direction.

## Switching
`?design=ultramarine-dream` or Dev switcher → **Ultramarine Dream**
