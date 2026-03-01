import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    img: "/images/projects/project-thumb-2.JPG",
    alt: "project_1",
    title: "Tic Tac Toe",
    tool: ["HTML", "CSS", "JavaScript"],
    desc: `Built with just HTML, CSS, and vanilla JavaScript — no frameworks, no fuss, just good ol’ DOM magic. This classic 3x3 battle of Xs and Os comes with smooth UI, responsive design, and a sprinkle of JavaScript logic to keep the game fun and fair. Whether you're feeling nostalgic or just want to flex your brain, this game’s got you. Try to beat your friend, or just play both sides like a strategic mastermind.`,
    type: "Web Game",
    link: "/project/tictactoe",
    github: "https://github.com/nauffal-rizky/Tic-tac-toe",
  },
  {
    id: "2",
    img: "/images/projects/project-thumb-3.JPG",
    alt: "project_2",
    title: "Snake Game",
    tool: ["HTML", "CSS", "JavaScript"],
    desc: `I built this retro-inspired Snake game using pure HTML, CSS, and JavaScript — no libraries, no shortcuts, just raw code and good vibes. Move the snake, grab the food, grow like crazy — and try not to crash into yourself (easier said than done). It's a simple project, but a fun way to flex DOM manipulation, keyboard input handling, and basic game loop logic. Ready to waste some time productively?`,
    type: "Web Game",
    link: "/project/snakegame",
    github: "https://github.com/nauffal-rizky/Snake",
  },
  {
    id: "3",
    img: "/images/projects/project-thumb-1.JPG",
    alt: "project_3",
    title: "Memory Game",
    tool: ["HTML", "CSS", "JavaScript"],
    desc: `Flip the cards, test your memory, and try not to rage-quit when you almost match the last pair. This project was all about bringing back that classic "concentration game" vibe, wrapped in a clean UI and smooth flip animations — all handcrafted from scratch. Built for fun, practice, and a pinch of nostalgia.`,
    type: "Web Game",
    link: "/project/memorygame",
    github: "https://github.com/nauffal-rizky/MemoryGame",
  },
  {
    id: "4",
    img: "/images/projects/project-thumb-4.png",
    alt: "project_4",
    title: "Wedding Invitation 1",
    tool: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    desc: `A clean and charming digital wedding invite built entirely with HTML, CSS, and vanilla JavaScript — no frameworks, no fuss. Just good ol’ handcrafted code straight from the heart. From elegant layout to smooth interactions, this project proves that simplicity can be stunning. It’s fast, responsive, and totally custom — perfect for couples who like their love stories minimal yet meaningful.`,
    type: "Landing Page",
    link: "/project/wedInv_1/wedInv_1",
    github: "https://github.com/nauffal-rizky?tab=repositories",
  },
  {
    id: "5",
    img: "/images/projects/project-thumb-5.png",
    alt: "project_5",
    title: "Wedding Invitation 2",
    tool: ["HTML", "CSS", "JavaScript"],
    desc: `Think of this as the glammed-up sibling of the first one. Built with HTML, CSS, JavaScript, and Bootstrap, this version embraces that modern look with grid systems, components, and mobile-first responsiveness baked right in. It’s elegant, it’s interactive, and it plays nice on any device. Whether you're RSVP-ing from a phone or a desktop, it's ready to party.`,
    type: "Landing Page",
    link: "/project/wedInv_2/wedInv_2",
    github: "https://github.com/nauffal-rizky?tab=repositories",
  },
  {
    id: "6",
    img: "/images/projects/project-thumb-6.png",
    alt: "project_6",
    title: "Color Flipper",
    tool: ["HTML", "CSS", "JavaScript"],
    desc: `A simple (but oddly satisfying) web app I built using nothing but good ol' HTML, CSS, and JavaScript. Click a button and—boom!—the background color changes to a random one. It’s the digital version of a mood ring, minus the emotional baggage. Perfect for learning how to manipulate the DOM and generate random values. No frameworks, no fuss—just pure vanilla fun.`,
    type: "Web App",
    link: "/project/color_flipper/",
    github: "https://github.com/nauffal-rizky?tab=repositories",
  },
  {
    id: "7",
    img: "/images/projects/project-thumb-7.png",
    alt: "project_7",
    title: "Grocery Bud",
    tool: ["HTML", "CSS", "JavaScript"],
    desc: `Built with just HTML, CSS, and JavaScript, this little web app helps you keep track of your grocery list like a boss. You can add, edit, and remove items—no frameworks, no databases, just good old vanilla JS doing all the heavy lifting. It’s clean, responsive, and ridiculously simple... just like your dream grocery run (minus the long checkout lines). Made for people who love their groceries organized—and their code even cleaner.`,
    type: "Web App",
    link: "/project/grocery",
    github: "https://github.com/nauffal-rizky?tab=repositories",
  },
];

// Utility functions for random selection
export function getRandomProjects(
  count: number,
  allProjects: Project[] = projects,
): Project[] {
  const shuffled = [...allProjects].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getShuffledProjects(
  allProjects: Project[] = projects,
): Project[] {
  return [...allProjects].sort(() => 0.5 - Math.random());
}
