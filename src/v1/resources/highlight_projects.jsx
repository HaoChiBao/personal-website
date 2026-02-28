import nodes_video from '../../assets/videos/nodes.mp4';
import boardy_video from '../../assets/videos/boardy.mp4';
import uofthacks from '../../assets/videos/uofthacks.mp4';
import rbc from '../../assets/images/rbc-logo.jpg'

import boardy_tag from '../../assets/images/tag-boardy.png';
import nodes_tag from '../../assets/images/tag-nodes.png';
import rbc_tag from '../../assets/images/tag-rbc.png';

const Tag = (name, img_src = null) => {
    return (
        <span className={`tag ${name}`}>
            {img_src && <img src={img_src} alt={name} />}
            <p>{name}</p>
        </span>
    )
}
const highlight_projects = [
    {
        tags: [Tag("Boardy", boardy_tag), Tag("Feature Shipped")],
        video: boardy_video,
        title: "Making the worlds most connected ai even more connected",
        description: 'Enhanced the connectivity of Boardy AI by integrating new APIs and improving real-time data processing capabilities.',

        id: 'boardy',
        date: '2025.02.30 - 2025.05.30',
        role: 'Contract Work',
        
        overview: {
            summary: "Boardy is a platform that lets different AI agents talk to each other, share context, and coordinate work in real-time. In most agent stacks, every new integration becomes a one-off: custom adapters, brittle auth flows, hand-rolled schemas, and a growing mess of glue code. Boardy’s goal is to make that problem disappear by giving developers a clean backbone for agent-to-agent communication, so you can focus on the behavior of your agents instead of the plumbing that connects them.\n\nI joined as a contract developer after a hackathon prototype caught the team’s attention. The ask was simple on paper: make Boardy “more connected.” In practice, that meant taking an already ambitious agent platform and turning it into something that felt reliable, fast, and production-ready. Over the contract, we expanded the number of external systems Boardy could talk to, improved how events and messages moved through the system, and tightened the feedback loop so agents could react to new information instantly.\n\nA big theme of the work was building for real-time. Agents are only useful if they can respond quickly to changing context: a new message, a tool result, an updated piece of memory, or a user interruption mid-task. We improved the way Boardy processes streaming updates so multiple agents can operate together without stepping on each other. The result was smoother coordination, less latency, and better consistency when agents needed to collaborate or hand work off between each other.\n\nWe also treated “connectivity” as more than just adding APIs. It’s about trust and clarity: predictable schemas, clean contracts, error handling that doesn’t silently fail, and observability so you can tell what an agent did and why. By the end, Boardy felt less like a cool demo and more like an ecosystem you could actually build on, deploy, and maintain.\n\nIf you’re a developer building agentic systems, Boardy is trying to be the missing layer between your agents and the world: a practical way to connect tools, services, and other agents into one coordinated, real-time network—without the headache of building custom integrations from scratch.",
            worked_as: "Contract Software Developer",
            worked_with: ["Typescript", "Agentic Voice Agents", "Python", "Railway Deployment", "SQL", "Supabase", "GraphQL"]
        },
        caption: "Figure 1. pulling an all-nighter at the Boardy offices",
        story: `I first ran into the Boardy team the same way a lot of good things start: at a hackathon. My friend Owen Gretzinger and I built a prototype at QHacks 2025 that focused on agent-to-agent communication and “live” coordination. We didn’t win anything, but Owen posted a recap and the Boardy team reached out almost immediately.

They liked the direction of what we built and asked if we could help ship a similar capability inside their product. That’s how the contract started.

The first week was mostly about understanding the system end-to-end: where messages entered, how agents stored memory, what the real-time pipeline looked like, and where the bottlenecks were. Once we mapped the flow, the work became clear: improve the connective tissue between agents and external tools, make event streaming more reliable, and make the whole experience feel “instant” to developers testing agents.

A lot of the contract was classic engineering reality: edge cases, retries, inconsistent payloads, rate limits, and debugging things that only break under load. We spent a lot of time hardening the platform so that if one tool misbehaved, the entire agent network didn’t collapse.

Some nights were genuinely chaotic (in a fun way). We’d deploy a change, watch logs spike, realize an assumption was wrong, patch it, and immediately see agents behave better. Those feedback loops were addictive. It felt like tuning an instrument: tiny changes, huge improvement in the “music” the system produced.

By the end of the contract, Boardy had new integrations online, better real-time behavior, and a cleaner internal structure for adding more tools in the future. The biggest win wasn’t a single feature—it was making the platform feel dependable enough that developers could build on it with confidence.`,
        contributions: `- Integrated multiple new API connectors so agents could pull and push data to more external systems.
- Improved the real-time event pipeline so agent messages and tool results streamed with lower latency and fewer dropped updates.
- Added stronger validation + normalization around incoming/outgoing payloads to reduce brittle one-off parsing.
- Implemented safer retry + backoff behavior for tool calls to handle rate limits and transient failures without breaking sessions.
- Tightened observability: improved logging, clearer error surfaces, and easier tracing of “what happened” across multiple agents.
- Helped stabilize deployments on Railway and ensured migrations/config stayed consistent across environments (local → staging → production).
- Worked across TypeScript + Python surfaces wherever it made sense, prioritizing developer experience and system reliability.
- Collaborated directly with the team to scope, ship, and iterate quickly on production feedback.`,
        outcomes: `- Shipped production improvements that made Boardy feel faster, more reliable, and easier to extend.
- Expanded the platform’s integration surface area (more APIs, smoother connectors).
- Reduced failure cases in real-time sessions through better retries, validation, and event handling.
- Deployed successfully on Railway with stable configuration and smoother iteration cycles.
- Improved the developer experience for building “connected agents” by making integrations easier to add and maintain.
- Left the codebase in a state where future integrations are simpler, safer, and less error-prone.`
    },
    {
        title: "Building a chrome extension that can find you 1000+ emails in 1 second",
        description: 'Built a productivity tool that helps users find contact information efficiently directly from their browser.',
        tags: [Tag("Nodes", nodes_tag), Tag("Product Shipped")],
        video: nodes_video,

        role: 'My Own Projects',
        date: '2025.02.30 - 2025.05.30',
        id: 'nodes',
        
        overview: {
            summary: "Finding emails on websites is usually slow and boring. Nodes is a Chrome extension that does it for you in one second. It scans the page you're on, finds every email address, and lists them in a clean panel you can copy from instantly.\n\nThe idea came from doing outreach and realizing how many workflows still involve manual scanning, copying, and pasting. Most existing tools either felt bloated, were paywalled, or forced you to leave the page and upload a list. Nodes is intentionally lightweight: open the extension, run a scan, and instantly get every email the page reveals.\n\nUnder the hood, it’s a mix of fast pattern matching, smart filtering, and UI that stays out of your way. It also had to handle the messy reality of the web: emails inside scripts, obfuscated formats, duplicates, and pages that dynamically load content. I wanted something that felt “instant” even on long pages.\n\nIn a world where speed matters (sales, recruiting, partnerships, event planning), Nodes turns a repetitive task into a one-click action. The goal wasn’t just to extract emails—it was to remove friction from a workflow people do every day.",
            worked_as: "Indie Developer",
            worked_with: ["Chrome Extension API", "Javascript", "HTML/CSS", "Supabase"]
        },
        caption: "Figure 1. Nodes extension in action",
        story: `I built Nodes because I was tired of wasting time doing the same outreach prep steps over and over. I’d open a company site, scroll the footer, check the about page, search “contact,” and still miss emails hiding in random places. Multiply that by dozens of websites and it turns into a painfully slow process.

At first, I tried a few popular “email finder” tools. Some were accurate but expensive. Others were slow, locked behind accounts, or required exporting and cleaning results. I wanted something simple: just show me every email that’s already visible on the page.

So I started with a barebones Chrome extension: a button, a scan function, and a list. The first prototype worked in minutes, but the real work started immediately after. Real websites are messy: emails appear in different formats, sometimes inside HTML attributes, sometimes in embedded scripts, sometimes split apart to avoid bots.

I iterated by testing on lots of sites and collecting failure cases. Each time it missed something, I’d add a new pattern or fix a parsing edge case. Then I focused on making it feel fast—no laggy UI, no long blocking scans, and no noisy duplicates.

Once it felt reliable, I added quality-of-life features: copy all, export options, and a clean UI that doesn’t distract from the page you’re on. The best moment was when it became something I genuinely used daily without thinking about it.`,
        contributions: `- Designed and built the full Chrome extension (UI, background logic, and content scanning) from scratch.
- Implemented fast email extraction logic with filtering and deduplication for clean results.
- Handled real-world edge cases (dynamic content, hidden text, odd formatting, and partial obfuscation patterns).
- Built a simple overlay/panel UX focused on speed: scan → list → copy/export.
- Added lightweight persistence so users can save or reference recent results (without needing heavy backend infrastructure).
- Improved performance by avoiding unnecessary DOM re-walks and keeping scans efficient on large pages.`,
        outcomes: `- Published on the Chrome Web Store and shipped a working, end-to-end product.
- Helped users turn a multi-minute workflow into a one-click action on any website.
- Reached early adoption (100+ users) and gathered feedback to guide iteration.
- Validated that “small utility tools” can win by being faster, simpler, and more focused than bloated alternatives.
- Built reusable patterns for future extensions: scanning pipelines, UI panels, and lightweight storage.`
    },
    {
        title: "Solving commercial banking problems for executives at Canada’s largest bank",
        description: 'Developed a comprehensive dashboard for commercial banking clients to manage their portfolios and visualize data.',
        tags: [Tag("RBC", rbc_tag), Tag("Internship")],
        image: rbc,

        date: '2025.04.30 - 2025.08.30',
        id: 'rbc',
        role: 'Software Developer Intern',

        overview: {
            summary: "During my internship at RBC, I worked on a dashboard used by commercial banking teams and executives to manage large client portfolios. Before this, many workflows depended on complex spreadsheets, scattered internal tools, and manual reporting. The goal of the dashboard was to turn those fragmented inputs into a single, clear interface with interactive charts, portfolio views, and faster access to the metrics leaders actually care about.\n\nWhat made this project interesting wasn’t just the UI—it was the scale and the stakes. Commercial banking decisions affect real businesses, and executives need confidence in the data in front of them. That meant building components that were accurate, responsive, and resilient, while integrating with backend services and data sources that had to stay consistent and secure.\n\nI focused on building front-end experiences that made large datasets feel navigable: clean visualizations, sensible defaults, and performance optimizations so pages loaded quickly even with heavy data. The outcome was a smoother workflow for teams reviewing portfolios and a tool that reduced the time spent wrangling raw data.\n\nThis internship taught me what “production” really means in a large organization: consistent engineering practices, code reviews, careful testing, stakeholder feedback loops, and designing for reliability over demos.",
            worked_as: "Software Developer Intern",
            worked_with: ["React", "Java", "Spring Boot", "SQL"]
        },
        caption: "Figure 1. RBC Internship",
        story: `My first weeks at RBC were about learning the environment: codebase conventions, security practices, deployment pipelines, and how teams coordinate when a product has real users across the organization.

The dashboard project had a clear pain point. People were spending too much time moving between tools, pulling reports, and translating data into something decision-makers could actually read. The product goal was to centralize information and make it “executive-friendly”: less noise, more signal.

A lot of my work involved taking requirements from stakeholders and turning them into UI that felt intuitive. “Make it clear” sounds simple, but it usually means a hundred small decisions: default filters, empty states, loading states, and how to present edge cases without confusing the user.

I also learned how much performance matters in enterprise settings. A dashboard that takes too long to load gets abandoned, even if it’s technically correct. I spent time identifying slow components, reducing unnecessary renders, and optimizing how data was fetched and displayed.

By the end, I had shipped multiple improvements that made the dashboard faster and easier to use, and I left with a much stronger understanding of how modern enterprise software gets built and maintained.`,
        contributions: `- Built and shipped React components for dashboard views, charts, and portfolio summaries.
- Integrated UI components with backend APIs (Java/Spring Boot services) and ensured correct data handling.
- Improved performance by optimizing rendering patterns, reducing expensive computations, and tightening data flows.
- Implemented better loading states, error handling, and empty states to improve usability under real conditions.
- Participated in code reviews, followed internal standards, and collaborated with designers/stakeholders to refine requirements.
- Helped validate outputs through testing and data sanity checks to ensure trust in displayed metrics.`,
        outcomes: `- Shipped features used by commercial banking teams to review portfolios and make faster decisions.
- Reduced dashboard load time by ~20% through targeted performance improvements.
- Improved clarity of key metrics through better visual hierarchy, charts, and UI defaults.
- Strengthened reliability with better error handling and more resilient UI behavior.
- Gained real-world experience in enterprise engineering practices: reviews, testing discipline, and stakeholder-driven iteration.`
    },
    {
        title: "1st place winner at UofT’s largest hackathon",
        description: 'Created a physical AI assistant that interacts via voice commands, featuring a custom-built enclosure and local LLM inference.',
        tags: [Tag("Winner"), Tag("Hackathons")],
        video: uofthacks,

        id: 'uofthacks',
        date: '2025.02.30 - 2025.05.30',
        role: 'Hackathon',

        overview: {
            summary: "Most AI lives on a screen, but we wanted to build one you could actually hold. At UofT’s largest hackathon, we built a physical, voice-controlled assistant with a 3D-printed body, a microphone/speaker setup, and a local AI model running directly on-device. The goal was to explore what “personal AI” feels like when it exists as a companion object on your desk instead of another tab in your browser.\n\nThe key constraint (and the fun part) was keeping inference local. No internet dependency, no calling out to cloud models, and no pretending latency doesn’t exist. That forced us to design a tighter loop: listen, transcribe, run inference, and respond—all within the limitations of real hardware.\n\nBeyond the AI pipeline, the project was also a design challenge. We wanted it to feel nostalgic and friendly (inspired by old toy assistants), but still modern enough to feel useful. The enclosure, the personality, and the interaction design mattered as much as the model.\n\nBy the end of the weekend, we had a working physical assistant that could hold conversations, react to user input, and demonstrate a future where AI is embodied—present in your space, not just on your screen.",
            worked_as: "Team Lead",
            worked_with: ["Python", "Hardware", "LLMs", "3D Printing"]
        },
        caption: "Figure 1. Winning moment at UofT Hacks",
        story: `We started with a simple question: what would it feel like if AI wasn’t trapped inside an app? We didn’t want another chatbot demo. We wanted something you could put on a desk, talk to, and treat like a little companion device.

Early on, we committed to running things locally. That decision shaped everything. Instead of assuming perfect internet and infinite compute, we had to make tradeoffs: smaller models, faster pipelines, and smarter prompting so responses still felt coherent.

We split up the work fast. While part of the team focused on hardware assembly and the enclosure, I focused on building the core “loop”: audio in → transcription → LLM response → audio out. The hardest part wasn’t any single step—it was getting the timing and reliability right so it felt natural.

Then came the physical design. 3D printing at a hackathon is always chaos: print queues, failed prints, parts that don’t fit, last-minute sanding, and reprinting. But when it finally snapped together and the assistant spoke for the first time from inside the enclosure, it felt unreal.

The final hours were polish: make the voice feel consistent, improve wake behavior, handle noisy environments, and make sure the demo wouldn’t randomly break on stage. When we presented, the judges loved that it wasn’t just software—it was a full experience.

Winning 1st place was surreal, but the best part was proving that “AI product” can mean hardware, personality, and presence—not just another interface.`,
        contributions: `- Led overall technical direction and helped scope the project so it could be finished within a hackathon weekend.
- Built the core on-device pipeline (audio capture, transcription integration, local LLM inference, and text-to-speech output).
- Tuned the interaction loop to reduce latency and make responses feel more conversational on limited hardware.
- Helped design and iterate on the 3D-printed enclosure to support hardware components cleanly.
- Integrated device logic with the demo flow, ensuring reliability under time pressure.
- Coordinated team workstreams and merged final components into a cohesive “end-to-end” experience.`,
        outcomes: `- Won 1st place out of 500+ participants at UofT’s largest hackathon.
- Delivered a working physical AI assistant that could hold conversations with local inference (no internet dependency).
- Demonstrated an “embodied AI” concept that stood out from typical web-only hackathon projects.
- Validated that strong product feel (hardware + personality + interaction design) can be a competitive edge.
- Walked away with a reusable blueprint for future device builds: audio loop, local inference constraints, and rapid prototyping workflows.`
    }
]

export { highlight_projects}