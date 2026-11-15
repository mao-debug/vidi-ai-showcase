/*
 * VIDI — presentation copy.
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
  name: "VIDI",
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
  problem: { src: caneBlindSpot.url, kind: "video", alt: "Animated diagram titled 'The cane's blind spot': a traditional white cane sweeps the ground ahead of a walking figure and clears a tree trunk, but a low branch at chest and head level sits above the cane's reach, so the figure walks toward it unaware.", caption: "The cane's blind spot · Chest and above: the cane can't reach", poster: caneBlindSpotPoster.url },
  comparison: { src: "", kind: "image", alt: "Our Be My Eyes comparison", caption: "Be My Eyes · Live volunteer assistance" },
  problemGraph: {
    src: visionLossStat.url,
    kind: "image",
    alt: "The chart shows that 1.1 billion people lived with vision loss worldwide in 2020. Of these, 43 million were blind, 295 million had moderate to severe distance vision impairment, 258 million had mild distance vision impairment, and 510 million had near vision impairment.",
    caption: "Vision loss worldwide, 2020 · 1.1 billion people",
  },
  prototype: {
    src: smartGlassesShowcase.url,
    kind: "image",
    alt: "Five views of the white smart glasses prototype show the camera above the nose bridge and two stacked sensors on each front corner.",
    caption: "Smart glasses · Front, side, top and back views",
  },
  detail: { src: glassesAvoidBranch.url, kind: "video", alt: "Animated diagram titled 'The cane's blind spot': a stick figure wearing gold glasses walks with a traditional white cane toward a tree whose low branch sits at head height, above the cane's reach; audio waves appear behind the head, then a blue check mark badge, while the caption reads 'but our glasses warn: Branch ahead at head height.'", caption: "Glasses warning · “Branch ahead at head height.”", poster: glassesAvoidBranchPoster.url },
  walk: { src: "", kind: "video", alt: "Two-zone distance sensor bench test", caption: "Distance sensing · Bench test" },
  scene: { src: "", kind: "video", alt: "VIDI camera and voice workflow", caption: "Camera and voice · In integration" },
  chess: { src: "", kind: "image", alt: "Activity-aware assistance concept", caption: "Activity awareness · Future scenario" },
  architecture: {
    src: architectureDiagram.url,
    kind: "image",
    alt: "Two HC-SR04 sensors connect to the ESP32. The Raspberry Pi 5 requests a pair of distance readings from the ESP32 over USB serial at 115,200 baud.",
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
  navigation: [{ label: "Problem", href: "#problem" }, { label: "Solution", href: "#prototype" }, { label: "Engineering", href: "#engineering" }, { label: "How it works", href: "#how-it-works" }, { label: "What’s next", href: "#next-steps" }, { label: "Team", href: "#team" }],
  hero: { title: "VIDI", meaning: "Reimagining how people who are blind or have low vision interact with the world", caption: "Caesar and the glasses · Concept image", kicker: "A new perspective on independence", scroll: "A closer look" },
  problem: {
    title: "The problem people with vision loss face",
    captions: ["Limited technology", "Limited sensory information", "No warnings about overhead hazards"],
    details: [
      "Technology has advanced rapidly, while the basic design of the traditional white cane has changed little.",
      "A traditional white cane helps detect obstacles at ground level and provides limited information about the wider surroundings.",
      "Overhead hazards such as low branches and open cabinet doors can sit beyond the reach of a traditional white cane.",
    ],
    comparisonTitle: "Human assistance. Wearable possibility.",
    comparison: "Be My Eyes connects people with sighted volunteers. We’re exploring a wearable interface the wearer controls.",
  },
  prototype: { title: "Meet VIDI", subtitle: "Visual information, on your terms.",
    solution: {
      kicker: "What VIDI does",
      title: "One frame. Two ways to sense the scene.",
      points: [
        "Measure distance in the dark. Two ultrasonic sensors measure the distance to nearby obstacles in complete darkness and require minimal computation.",
        "Turn visual information into speech. A camera captures the scene so VIDI can classify objects, recognize text, and speak useful information aloud.",
        "Complement everyday mobility tools. VIDI is designed to work alongside a traditional white cane or guide dog, giving blind and low-vision users more information about their surroundings and helping with everyday tasks.",
      ],
      status: "We bench-tested the sensors and confirmed that the Pi detects the camera.",
    },
    bottomNote: {
      kicker: "Features",
      line: "Object Detection & Recognition | Conversational AI | Scene Description | Text Recognition",
    } },
  hardware: { title: "Sense. Process. Speak.", paths: [{ label: "Distance", steps: ["Ultrasonic sensors", "ESP32", "Left and right distance readings"] }, { label: "Vision & voice", steps: ["IMX708 camera", "Raspberry Pi 5", "Gemini online", "Bluetooth headset"] }], status: "We bench-tested the sensors and confirmed that the Pi detects the camera.", note: "One camera. Two distance sensors. Gemini requires an internet connection.", sideBox: { kicker: "Where it stands", title: "One camera. Two distance sensors.", points: ["Two HC-SR04 sensors feed the ESP32, which times the echoes and calculates distance.", "The Raspberry Pi 5 requests a pair of independent distance readings over USB serial.", "The ultrasonic sensors have been bench-tested, and the Pi detects the camera."], status: "Gemini requires an internet connection." } },
  engineering: {
    title: "Engineering and design",
    subtitle: "A modular frame built to be rebuilt.",
    mechanical: {
      kicker: "Mechanical design",
      title: "Modular, 3D-printed, and serviceable",
      body: "VIDI uses a modular, 3D-printed glasses frame that integrates multiple sensing and processing components. Reinforced, ergonomic temple arms carry curved over-ear supports, removable electronics mounts, and adjustable ultrasonic sensor holders — so any component can be replaced or modified without redesigning the entire frame.",
      tags: ["3D-printed frame", "Removable mounts", "Adjustable sensor holders", "Over-ear supports"],
    },
    architecture: {
      kicker: "Hardware architecture",
      items: [
        { part: "Raspberry Pi 5", role: "Main computer for camera processing, AI integration, and speech interaction — housed in its original enclosure with the internal cooling fan." },
        { part: "ESP32", role: "The microcontroller collects distance measurements from two HC-SR04 ultrasonic sensors." },
        { part: "Dual ultrasonic sensors", role: "Mounted on opposite sides of the frame for independent left and right proximity measurements." },
        { part: "IMX708 camera", role: "Centrally mounted, rotated 90° so its 7.5-inch ribbon cable routes toward the right temple while the lens stays forward-facing." },
        { part: "Bluetooth headset", role: "Hands-free voice interaction and audible feedback." },
      ],
      comms: "ESP32 → Raspberry Pi 5 · USB serial · 115,200 baud",
    },
    evolution: {
      kicker: "Design evolution",
      title: "Five iterations, five problems solved.",
      steps: [
        "Redesigned the ultrasonic mounts after the original supports obstructed sensor installation.",
        "Reinforced the temple arms to carry the electronics.",
        "Separated the ear-contact structure from the external electronics supports to improve wearability.",
        "Rotated the camera board to work within the limited ribbon-cable length.",
        "Developed a ventilated Raspberry Pi enclosure mount while retaining its cooling system.",
      ],
    },
    innovation: {
      kicker: "Innovation & limitations",
      body: "VIDI combines camera-based visual interpretation with independently acquired ultrasonic proximity measurements. The modular design emphasizes accessibility, adaptability, and iterative prototyping — and is intended to complement traditional mobility aids, not replace them.",
      limitations: ["Electronics weight distribution", "Thermal management", "Sensor blind spots", "Wiring durability", "Real-world validation still ahead"],
      status: "Bench-tested functions are labeled as such; proposed capabilities stay marked as unverified.",
    },
  },
  next: {
    title: "From prototype to everyday wear.",
    subtitle: "We built VIDI in a weekend. Here’s where it goes from here.",
    cards: [
      { label: "01 · TODAY", title: "A working prototype", text: "We’ve bench-tested the ultrasonic sensors, confirmed that the Pi detects the camera, and used Gemini to provide spoken answers. The prototype fits in a 3D-printed frame." },
      { label: "02 · NEXT", title: "Real-world testing", text: "Test VIDI with people who are blind or have low vision, tune the warning distances, and reduce false alarms. Their feedback will guide what we build next." },
      { label: "03 · LATER", title: "Smaller and lighter", text: "Develop a custom circuit board to replace the Pi and ESP32 and build a weatherproof frame." },
    ],
  },
  team: { title: "Meet the team", subtitle: "The five people behind VIDI.", status: "Headshots, majors, and LinkedIn links in place", members: teamMembers },
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
    "The name VIDI reflects the idea of turning what a camera sees into information the wearer can use.",
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
  note: "Built for our final hackathon presentation.",
};

export const ultrasonicExplanation = {
  echo: {
    title: "Ultrasonic time of flight",
    formula: "Distance = speed of sound × round-trip time ÷ 2",
  },
  timing: {
    title: "How the ESP32 controls ranging",
    triggerGapMs: 100,
    echoDeadlineMs: 30,
    steps: [
      { title: "Request a pair", signal: "Pi → ESP32", detail: "The Pi sends R1 with a unique request ID. The ESP32 starts a fresh pair when the trigger gap allows." },
      { title: "Measure left", signal: "Left TRIG", detail: "The ESP32 captures the first complete left ECHO pulse or records why a usable reading is unavailable." },
      { title: "Measure right", signal: "Right TRIG", detail: "After the minimum trigger gap, the ESP32 measures the right channel. Sequential firing reduces acoustic crosstalk." },
      { title: "Return both readings", signal: "ESP32 → Pi", detail: "Once the right attempt finishes, the ESP32 sends a single reply with each channel’s status, distance, and measurement age." },
    ],
  },
  transport: {
    title: "From the ESP32 to the Raspberry Pi",
    nodes: ["Left and right sensors", "ESP32", "USB serial", "Raspberry Pi 5"],
    baud: 115200,
    note: "The Pi identifies the firmware with H1 and requests a fresh measurement pair with R1. Each sample reply is one line of JSON. A channel with no usable reading returns a status and a null distance.",
  },
};
