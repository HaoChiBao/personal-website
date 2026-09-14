import type { ProjectEntry } from "../types";

const goals: ProjectEntry = {
  id: "goals",
  name: "Goals",
  title: "2000 Elo and an Ironman",
  blurb:
    "Two long projects with a ladder: chess from 1000 to 2000 Elo, and a full Ironman.",
  dates: "in progress",
  section: "projects",
  labels: ["indie"],
  stack: [],
  links: [],
  role: "Personal",
  summary:
    "Two goals I am treating like projects: get from 1000 to 2000 Elo in chess, and finish an Ironman. Each one has a ladder. The interesting gap is not the start — it is the jump from “competent” to “actually hard.”",
  contributions: [
    "Chess: daily tactics, slow rated games, and a written review of every loss.",
    "Chess 1500→2000: candidate-move calculation, endgames, and playing up.",
    "Ironman: aerobic base, brick sessions, and a distance ladder (5k → Olympic → 70.3 → 140.6).",
  ],
  outcomes: [
    "Current chess floor: 1000 Elo.",
    "Target chess: 2000 Elo.",
    "Target endurance: finish a full Ironman (2.4 / 112 / 26.2) inside the cutoff.",
  ],
  caseStudy: {
    headline: "Goals",
    blocks: [
      {
        type: "paragraph",
        text: "Two goals I am treating like projects: 2000 Elo in chess, starting at 1000, and a full Ironman. Both have a “club level” in the middle. That middle is where people stall.",
      },
      {
        type: "heading",
        text: "Chess — 1000 to 2000",
      },
      {
        type: "paragraph",
        text: "1000 is beginner chess: hanging pieces, missing one-move tactics, no plan after the opening. Getting to 1500 is mostly hygiene. You stop giving material away, you know forks, pins, and skewers, and you follow opening principles instead of memorizing ten-move traps. A 1500 still blunders, still panics in time trouble, and still plays hope chess in the endgame.",
      },
      {
        type: "paragraph",
        text: "2000 is a different game. The gap from 1500 to 2000 is not “more puzzles.” It is calculation with candidate moves, a real endgame toolkit (opposition, Lucena, basic rook endings), and positional plans — weak squares, pawn structure, which pieces belong where. At 1500 the mistakes are loud. At 2000 the mistakes are quiet: the wrong plan, a slow conversion, a slightly worse ending you cannot hold. The floor also rises. A 1500 can dump 300 points in a week. A 2000 still loses, but they lose like a 1800, not like a 1200.",
      },
      {
        type: "heading",
        text: "How I get there",
      },
      {
        type: "list",
        items: [
          "1000→1500: 15–20 minutes of tactics every day, slow games (15+10 or longer), review every loss for hanging pieces before opening an engine.",
          "1500→2000: calculate candidate moves on paper/board, study a short endgame manual, play people stronger than me, annotate a master game each week.",
          "Volume: rated games on a real time control, not bullet as training.",
          "Measure: rating snapshots at 1200, 1500, 1800, 2000 — not a vibes-based “I feel sharper.”",
        ],
      },
      {
        type: "heading",
        text: "Ironman — the ladder",
      },
      {
        type: "paragraph",
        text: "A full Ironman is 2.4 miles swim, 112 miles bike, 26.2 miles run, usually with a 17-hour cutoff. Showing up off the couch is how people DNF. The analog to 1500 vs 2000 is Olympic / 70.3 vs 140.6: you can be “fit” and still not be Ironman-fit.",
      },
      {
        type: "list",
        items: [
          "Floor: a consistent 5k and being comfortable in a pool (the swim is the usual limiter).",
          "Olympic (~1.5k / 40k / 10k): prove you can race three sports in one day. Beginner finish is often around 3 hours.",
          "70.3 (half): 1.2 mile swim, 56 bike, 13.1 run. This is the club-level fitness checkpoint — like 1500 Elo. If the half falls apart, the full will too.",
          "140.6: the full. Not faster — finished. Nutrition, pacing, and not walking the marathon because the bike was an ego ride.",
        ],
      },
      {
        type: "heading",
        text: "How I get there",
      },
      {
        type: "list",
        items: [
          "Aerobic base: most work in zone 2 so I can still train tomorrow.",
          "All three sports each week, plus one brick (bike then run) so the marathon does not feel invented on the day.",
          "One long session per sport on a weekly rhythm; build volume, then a recovery week.",
          "Swim technique before swim volume. Bike fitness before run heroics. Practice eating on the bike.",
          "Measure: Olympic, then 70.3, then a full — not a surprise 140.6.",
        ],
      },
    ],
  },
};

export default goals;
