/*
 * Vidi AI — presentation copy.
 * All site text lives here so final edits are one-file changes.
 * Replace values freely; do not add fabricated photos, results, or testimonials.
 */

export const site = {
  name: "Vidi AI",
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
  transcript?: string;
};

export const presentationMedia: Record<string, PresentationMedia> = {
  prototype: { src: "", kind: "image", alt: "Our Vidi AI glasses prototype", caption: "The Vidi AI prototype" },
  walk: { src: "", kind: "video", alt: "Two-zone distance sensor bench test", caption: "Distance sensing · Bench test" },
  scene: { src: "", kind: "video", alt: "Vidi AI camera and voice workflow", caption: "Camera and voice · In integration" },
  chess: { src: "", kind: "image", alt: "Activity-aware assistance concept", caption: "Activity awareness · Future scenario" },
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
    "The name Vidi AI reflects the idea of turning what a camera sees into information the wearer can use.",
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
        "Raspberry Pi 4",
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
  // Editable team names — replace with the real roster.
  team: ["Team member one", "Team member two", "Team member three", "Team member four"],
  note: "Built as a hackathon final presentation.",
};
