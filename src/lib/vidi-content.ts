/*
 * Vidi — presentation copy.
 * All site text lives here so final edits are one-file changes.
 * Replace values freely; do not add fabricated photos, results, or testimonials.
 */

import architectureDiagram from "@/assets/system-architecture-diagram.png.asset.json";
import caneBlindSpot from "@/assets/cane-blind-spot.mp4.asset.json";
import caneBlindSpotPoster from "@/assets/cane-blind-spot-poster.jpg.asset.json";
import glassesAvoidBranch from "@/assets/glasses-avoid-branch.mp4.asset.json";
import glassesAvoidBranchPoster from "@/assets/glasses-avoid-branch-poster.jpg.asset.json";
import headshotCard1 from "@/assets/team-headshot-card1.png.asset.json";
import headshotCard2 from "@/assets/team-headshot-card2.png.asset.json";
import headshotCard3 from "@/assets/team-headshot-card3.png.asset.json";
import headshotCard4 from "@/assets/team-headshot-card4.png.asset.json";
import headshotCard5 from "@/assets/team-headshot-card5.png.asset.json";
import smartGlassesShowcase from "@/assets/smart-glasses-multiview-showcase.png.asset.json";
import visionLossStat from "@/assets/vision-loss-stat.png.asset.json";

export const site = {
  name: "Vidi",
  tagline: "Visual information, on your terms.",
  domain: "vidiai.us",
};

// Add a project image/video URL or a path in /public here when available.
// Video should also have a caption track and transcript before presentation.
export type PresentationMedia = {
  src: string;
  kind: "image" | "video";
  alt: string;
  caption: string;
  captionsSrc?: string;
  poster?: string;
  transcript?: string;
};

export const presentationMedia: Record<string, PresentationMedia> = {
  problem: { src: caneBlindSpot.url, kind: "video", alt: "Animated diagram titled 'The cane's blind spot': a white cane sweeps the ground ahead of a walking figure and clears a tree trunk, but a low branch at chest and head level sits above the cane's reach, so the figure walks toward it unaware.", caption: "The cane's blind spot · Chest and above: the cane can't reach", poster: caneBlindSpotPoster.url },
  comparison: { src: "", kind: "image", alt: "Our Be My Eyes comparison", caption: "Be My Eyes · Live volunteer assistance" },
  problemGraph: {
    src: visionLossStat.url,
    kind: "image",
    alt: "Horizontal bar chart titled 'Vision loss worldwide, 2020': 1.1 billion people live with vision loss, split into blind 43 million, moderate to severe distance vision impairment 295 million, mild distance vision impairment 258 million, and near vision impairment 510 million.",
    caption: "Vision loss worldwide, 2020 · 1.1 billion people",
  },
  prototype: {
    src: smartGlassesShowcase.url,
    kind: "image",
    alt: "Five-view product sheet of the white smart glasses prototype: front view, left side view, right side view, top view and back view, showing the camera above the nose bridge and two stacked sensors on each front corner.",
    caption: "Smart glasses · Front, side, top and back views",
  },
  detail: { src: glassesAvoidBranch.url, kind: "video", alt: "Animated diagram titled 'The cane's blind spot': a stick figure wearing gold glasses walks with a white cane toward a tree whose low branch sits at head height, above the cane's reach; audio waves appear behind the head, then a blue check mark badge, while the caption reads 'but our glasses warn: Branch ahead at head height.'", caption: "Glasses warning · “Branch ahead at head height.”", poster: glassesAvoidBranchPoster.url },
  walk: { src: "", kind: "video", alt: "Two-zone distance sensor bench test", caption: "Distance sensing · Bench test" },
  scene: { src: "", kind: "video", alt: "Vidi camera and voice workflow", caption: "Camera and voice · In integration" },
  chess: { src: "", kind: "image", alt: "Activity-aware assistance concept", caption: "Activity awareness · Future scenario" },
  architecture: {
    src: architectureDiagram.url,
    kind: "image",
    alt: "System architecture diagram: HC-SR04 #1, the left ultrasonic distance sensor, and HC-SR04 #2, the right ultrasonic distance sensor, both feed the ESP32 microcontroller for timing, filtering and measurements, which sends USB, JSON at 115200 baud to the Raspberry Pi 5 main computer running AI, sensor fusion and speech output.",
    caption: "System architecture · Sensors → ESP32 → Raspberry Pi 5",
  },
};

// Editable team roster: one headshot slot and one LinkedIn link per member.
// headshot: a photo in src/assets imported at the top of this file, or a full https photo URL.
// linkedin: the full profile URL, e.g. https://www.linkedin.com/in/username
export type TeamMember = {
  name: string;
  role: string;
  headshot: string;
  linkedin: string;
};

export const teamMembers: TeamMember[] = [
  { name: "Marcos Gomes", role: "Computer Science", headshot: headshotCard1.url, linkedin: "https://www.linkedin.com/in/gomesmarcos5/" },
  { name: "Simao Andrade", role: "Electrical Engineering", headshot: headshotCard2.url, linkedin: "https://www.linkedin.com/in/andradesimao/" },
  { name: "Stephen Bate", role: "Biomedical Engineering", headshot: headshotCard3.url, linkedin: "https://www.linkedin.com/in/stephen-bate1/" },
  { name: "Walter Medina Rodrigues", role: "Accounting", headshot: headshotCard4.url, linkedin: "https://www.linkedin.com/in/walter-medina-rodrigues/" },
  { name: "Abraham Kifle", role: "Managerial Economics", headshot: headshotCard5.url, linkedin: "https://www.linkedin.com/in/abrahamk432/" },
];

export const presentation = {
  navigation: [{ label: "Problem", href: "#problem" }, { label: "Solution", href: "#prototype" }, { label: "How It Works", href: "#how-it-works" }, { label: "What’s next", href: "#next-steps" }, { label: "Team", href: "#team" }],
  hero: { title: "VIDI", meaning: "Reimagining the way Blind and Visually imparied people interact with the world", caption: "Caesar & the glasses · Concept image", kicker: "A new perspective on independence", scroll: "A closer look" },
  problem: { title: "The Problem Visually Impaired People Face", captions: ["Outdated Technology", "Not Enough Sensory Information", "No Warnings of Overhead Hazards"], details: ["Technology has rapidly improved in all areas of life but White Canes for the blind have not changed.", "White Canes are good at detecting what is on the ground in front of someone but they lack in sensory information and navigation.", "White canes have a blind spot and cannot detect any hazards that are above the cane so visually impaired people are still at risk of getting hit with things like branches or cabinets."], comparisonTitle: "Human assistance. Wearable possibility.", comparison: "Be My Eyes connects people with sighted volunteers. We’re exploring a wearable interface the wearer controls." },
  prototype: { title: "Meet Vidi.", subtitle: "Visual information, on your terms.",
    solution: {
      kicker: "What Vidi does",
      title: "One frame. Two ways to sense the scene.",
      points: [
        "Two ultrasonic sensors report left and right distance readings.",
        "The camera sends a visual question to Gemini and the answer returns as speech.",
        "Made to sit alongside a cane or dog, not replace it.",
      ],
      status: "Sensors bench-tested. The Pi detects the camera.",
    },
    bottomNote: {
      kicker: "Features",
      line: "Object Recognition | Conversational AI | Navigation | text Recognition",
    } },
  hardware: { title: "Sense. Process. Speak", paths: [{ label: "Distance", steps: ["Ultrasonic sensors", "ESP32", "Left / right distance readings"] }, { label: "Vision & voice", steps: ["IMX708 camera", "Raspberry Pi 5", "Gemini online", "Bluetooth headset"] }], status: "Sensors bench-tested. The Pi detects the camera.", note: "One camera. Two distance sensors. Gemini requires internet.", sideBox: { kicker: "Where it stands", title: "One camera. Two distance sensors.", points: ["Two HC-SR04 sensors feed the ESP32, which handles timing, filtering and measurements.", "The ESP32 sends JSON readings over USB to the Raspberry Pi 5 for AI, sensor fusion and speech output.", "The ultrasonic sensors have been bench-tested, and the Pi detects the camera."], status: "Gemini requires internet." } },
  next: {
    title: "From prototype to everyday wear.",
    subtitle: "We built VIDI in a weekend. Here’s where it goes from here.",
    cards: [
      { label: "01 · TODAY", title: "A working prototype", text: "The ultrasonic sensors are bench-tested, the Pi detects the camera, and Gemini returns spoken answers. All of it fits in a 3D-printed frame." },
      { label: "02 · NEXT", title: "Real-world testing", text: "Put VIDI on blind and low-vision users, tune the warning distances, and cut false alarms. Their feedback decides what we build next." },
      { label: "03 · LATER", title: "Smaller, lighter, longer-lasting", text: "A custom circuit board in place of the Pi and ESP32, all-day battery life, and a weatherproof frame people can wear anywhere." },
    ],
  },
  team: { title: "Meet the team.", subtitle: "The five people behind Vidi.", status: "Headshots, majors and LinkedIn links in place", members: teamMembers },
};

export const problem = {
  headline: "What’s in front of me?",
  paragraphs: [
    "For people who are blind or have low vision, getting timely visual information can take extra steps — whether that means checking an obstacle at head height, identifying a bill, or choosing what to wear.",
    "Tools like Be My Eyes show how powerful this can be: a video call connects a person with a sighted volunteer who describes what the camera sees. Human assistance is valuable, and it is not always available in the moment.",
  ],
  goal: "Our design goal: make everyday visual information available through a wearable interface the user can control — increasing autonomy while respecting the value of existing tools and human assistance.",
};

export const intro = {
  nameExplanation:
    "The name Vidi reflects the idea of turning what a camera sees into information the wearer can use.",
  mediaSlotLabel: "Prototype media slot",
  mediaSlotNote:
    "Reserved for our glasses photo or a short demo clip. Until media is added, the labeled hardware diagram below stands in.",
};

export const demoMoments = [
  {
    id: "walk",
    cue: "“I’m about to walk.”",
    status: "Bench-tested sensors",
    title: "Distance awareness in two zones",
    body: "Two ultrasonic sensors measure distance in separate zones, and the ESP32 reports the readings. The project aims to communicate nearby obstacles — including some at head height — as a supplement to a cane or other mobility aid, not a replacement.",
  },
  {
    id: "scene",
    cue: "“What’s in front of me?”",
    status: "In integration",
    title: "Ask the camera, hear the answer",
    body: "The intended interaction: the glasses camera captures the scene, the Raspberry Pi handles the request, and the wearer hears a short response through Bluetooth headphones. A follow-up like “Which side is the chair on?” keeps the conversation going. The Gemini live-camera and voice workflow is in integration and not yet confirmed demo-ready.",
  },
  {
    id: "chess",
    cue: "“I’m about to play chess.”",
    status: "Future scenario",
    title: "Tell the glasses what you’re starting",
    body: "The longer-term idea: tell the glasses what activity you are starting so the assistant can respond with relevant information. Identifying banknote denominations and choosing clothes are other future examples. All example responses here are illustrative, not recorded output.",
  },
];

export const hardware = {
  title: "How it works",
  paths: [
    {
      label: "Path 1 — Distance sensing",
      steps: ["Two ultrasonic sensors", "ESP32", "Left / right distance readings"],
    },
    {
      label: "Path 2 — Visual questions",
      steps: [
        "IMX708 camera",
        "Raspberry Pi 5",
        "Gemini (when connected to the internet)",
        "Bluetooth headset",
      ],
    },
  ],
  status:
    "The ultrasonic sensors have been bench-tested, and the Pi detects the camera.",
  stereoscopic:
    "Stereoscopic imaging, in plain terms: two cameras can estimate depth by comparing how the same object appears from slightly different viewpoints. Our current design uses one camera and two ultrasonic distance sensors — it is not a stereoscopic prototype, and Gemini does not run offline on the Pi.",
};

export const control = {
  title: "How does the wearer stay in control?",
  intro:
    "Hands-free input is still an open design challenge. The wearer needs to decide when assistance starts, what it pays attention to, and when it stops.",
  activityCues: {
    heading: "Activity cues",
    body: "Cues like “I’m about to walk” and “I’m about to play” are a concept for changing what the assistant pays attention to, so responses match the moment.",
  },
  ideas: {
    heading: "Input ideas to evaluate with users",
    items: [
      "Wake words to start and stop assistance",
      "A tactile control on the frame",
      "Possible eye tracking — which depends on individual access needs",
    ],
  },
  futureChip:
    "MAX78000 is listed only as a future option to investigate for low-power, on-device inference.",
  milestone:
    "Next milestone: test whether wearers can reliably start, redirect, and stop assistance.",
};

export const footer = {
  note: "Built as a hackathon final presentation.",
};
