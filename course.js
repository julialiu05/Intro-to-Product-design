/* ============================================================================
   COURSE DATA — this is the only file you need to edit week to week.

   Quick edits:
     • CURRENT_WEEK ................ which week is highlighted as "this week"
     • weeks[n].status ............. "published" | "draft"  (draft = greyed, no page)
     • weeks[n].slides ............. add a deck; delete it to fall back to the
                                     auto-generated deck built from agenda +
                                     readings + assignment

   Slide layouts available: title, section, statement, points, two, quote,
   exercise, figure.  See SLIDE CHEATSHEET at the bottom of this file.
   ========================================================================== */

const COURSE = {
  code: "DES 198",
  title: "Introduction to Product Design",
  subtitle: "A 2-unit DeCal on how software gets designed — from a vague complaint to a thing people can use.",
  term: "Fall 2026",
  units: 2,
  grading: "Pass / No Pass",
  meets: "Wednesdays, 6:30–8:00pm",
  room: "Wheeler 108",
  enrollment: "CCN posted on decal.berkeley.edu — no prerequisites, no portfolio required.",
  contact: "julia[dot]liu05[at]berkeley[dot]edu",
  office_hours: "Thursdays 3–4pm, Moffitt 4th floor, or by appointment",

  facilitators: [
    { name: "Julia Liu", role: "Facilitator", detail: "Cognitive Science + Design Innovation" },
  ],
  sponsor: { name: "TBD", role: "Faculty Sponsor", detail: "Department of Design Innovation" },

  // Which week to surface at the top of the schedule. Bump this every Wednesday.
  CURRENT_WEEK: 3,

  // The header block, printed the way a warehouse prints it.
  receipt: {
    banner: "WHOLESALE",
    warehouse: "#0198 BERKELEY",
    address1: "2650 BANCROFT WAY",
    address2: "BERKELEY, CA 94704",
    member: "1118 1205 0198",
    op: "4471",
    name: "LIU",
    register: "0198 03 042 0007",
  },

  description: [
    "Most design classes teach you to make things look good. This one is about the part before that: figuring out what to build, for whom, and how you'd know if it worked. We treat design as a sequence of decisions you can defend, not a matter of taste you either have or don't.",
    "No prior design experience is expected. If you have never opened Figma, you are the intended student.",
  ],

  outcomes: [
    "Run a user interview that produces evidence rather than compliments.",
    "Turn scattered research into a problem statement narrow enough to build against.",
    "Move from sketch to clickable prototype without getting stuck on visuals.",
    "Use type, color, and grid deliberately, and say why each choice was made.",
    "Give and take critique that changes the work instead of protecting feelings.",
    "Test a prototype with five people and report what actually broke.",
  ],

  policies: [
    {
      heading: "Attendance",
      body: "This is a studio, so the room is the class. Two unexcused absences are fine. A third means a conversation, a fourth means No Pass. Email before class, not after.",
    },
    {
      heading: "Weekly work",
      body: "Assignments are due Tuesday 11:59pm so we can look at them together on Wednesday. They are graded complete / incomplete. Incomplete means you didn't do it, not that it wasn't good — rough is expected and rough is the point.",
    },
    {
      heading: "Passing",
      body: "Attendance, ten of thirteen weekly assignments complete, and a final project presented in Week 13. That's the whole bar.",
    },
    {
      heading: "Tools",
      body: "Figma (free education plan), paper, and a phone camera. Nothing else is required and nothing else needs to be bought.",
    },
    {
      heading: "Using AI",
      body: "Allowed and expected — we spend Week 12 on it. The one rule: say where you used it. A prototype generated in one prompt with no account of the decisions inside it is not an assignment, it is a screenshot.",
    },
    {
      heading: "Accommodations",
      body: "Tell me what you need and I'll do it. You do not need a DSP letter to ask for an extension or a different format.",
    },
  ],

  // ==========================================================================
  // THE SCHEDULE
  // ==========================================================================
  weeks: [
    {
      week: 1,
      date: "Sep 2",
      title: "What product design actually is",
      status: "published",
      summary:
        "The job isn't making screens. We take apart three familiar products and find the decisions hiding inside them.",
      agenda: [
        "Introductions, and the one product you'd fix if you could",
        "Teardown: the BART ticket machine, Venmo's home feed, and a hospital intake form",
        "Where design sits next to engineering, research, and whoever is paying",
        "The vocabulary we'll use all semester: user, need, constraint, tradeoff",
      ],
      readings: [
        { title: "The Design of Everyday Things, ch. 1: The Psychopathology of Everyday Things", author: "Don Norman", note: "~25 pages. Scanned in the course packet." },
        { title: "A Brief Rant on the Future of Interaction Design", author: "Bret Victor", note: "Short essay. Read the rant, skip the responses for now." },
      ],
      assignment: {
        title: "Bad Design Log",
        due: "Tue Sep 8, 11:59pm",
        body: "Photograph three things this week that made you hesitate, guess, or get it wrong — a door, an app, a sign, a checkout. For each one write two sentences: what you expected, and what happened. Do not propose fixes. We are practicing noticing, not solving.",
        deliverable: "One PDF or Figma page, three photos, six sentences.",
      },
      materials: [
        { label: "Bad Design Log template", kind: "Figma" },
        { label: "Class roster + Slack invite", kind: "Link" },
      ],
      slides: [
        { layout: "title" },
        {
          layout: "statement",
          text: "Design is the record of decisions someone made on your behalf.",
          sub: "Most of them you never see. That's the job working.",
        },
        {
          layout: "points",
          heading: "What this class is not",
          points: [
            "Not a Figma tutorial. Figma is a tool, we'll pick it up sideways.",
            "Not a portfolio bootcamp. You'll leave with one project, not eight.",
            "Not about taste. Taste is downstream of judgment, and judgment is teachable.",
          ],
        },
        {
          layout: "points",
          heading: "What it is",
          points: [
            "Fourteen weeks of deciding what to build and defending it.",
            "One project, carried from a complaint to a tested prototype.",
            "A room that will tell you the truth about your work.",
          ],
        },
        { layout: "section", text: "Teardown", num: "01" },
        {
          layout: "two",
          heading: "The BART ticket machine",
          left: { label: "What it asks you", body: "Choose an amount before you know the fare. Feed bills one at a time. Understand that 'Add Fare' and 'New Ticket' are different buttons doing nearly the same thing." },
          right: { label: "What you wanted", body: "To get to Rockridge. The machine has never once asked where you are going." },
        },
        {
          layout: "quote",
          quote: "The machine is not badly made. It is well made for a question nobody is asking.",
          attribution: "The whole class in one sentence",
        },
        {
          layout: "points",
          heading: "Four words we'll use all semester",
          points: [
            "User — a specific person in a specific situation, never 'people'.",
            "Need — what they're trying to get done, stated without your solution in it.",
            "Constraint — what you can't change: budget, physics, law, attention.",
            "Tradeoff — what you gave up to get the thing you chose.",
          ],
        },
        {
          layout: "exercise",
          heading: "Ten minutes, in pairs",
          prompt: "Pick the app on your phone you use most. Find one decision inside it that could plausibly have gone the other way. Say what was traded for what.",
          time: "10 min, then four pairs report out",
        },
        { layout: "assignment" },
      ],
    },

    {
      week: 2,
      date: "Sep 9",
      title: "Talking to users without leading them",
      status: "published",
      summary:
        "Almost every question you instinctively want to ask is the wrong one. We practise until they stop being leading.",
      agenda: [
        "Review of the Bad Design Logs — patterns across the room",
        "Why 'would you use this?' produces a lie every time",
        "The five questions that actually work",
        "Live interview, facilitated, with the room critiquing the questions",
        "Paired practice",
      ],
      readings: [
        { title: "Just Enough Research, ch. 3: The Basics", author: "Erika Hall", note: "The chapter on interviewing. ~20 pages." },
        { title: "The Mom Test, ch. 1", author: "Rob Fitzpatrick", note: "Short. The premise: never ask if your idea is good." },
      ],
      assignment: {
        title: "Two interviews",
        due: "Tue Sep 15, 11:59pm",
        body: "Interview two people about a routine they have that involves some friction — commuting, cooking, studying, managing money, whatever. Twenty minutes each. Ask about last time, not about generally. Record if they consent, take notes if not. Then write the three things you heard that you did not expect.",
        deliverable: "Notes from both, plus three surprises. One page is enough.",
      },
      materials: [
        { label: "Interview guide + consent script", kind: "Doc" },
        { label: "Question bank: leading vs. open", kind: "Doc" },
      ],
      slides: [
        { layout: "title" },
        {
          layout: "statement",
          text: "People will lie to you to be kind.",
          sub: "Not out of malice. Because you asked a question that made agreement the polite answer.",
        },
        {
          layout: "two",
          heading: "The same question, two ways",
          left: { label: "Leading", body: "\"Would you use an app that helps you budget?\"\n\nAnswer: yes. Always yes. It costs them nothing to say yes and it makes you happy." },
          right: { label: "Open", body: "\"Walk me through the last time you checked your account balance. What were you about to do?\"\n\nAnswer: a story, with facts in it." },
        },
        {
          layout: "points",
          heading: "Five questions that work",
          points: [
            "Tell me about the last time you did X.",
            "What were you doing right before that?",
            "What's the worst part of it?",
            "What have you tried instead?",
            "…and then silence. Count to five. They'll keep going.",
          ],
        },
        {
          layout: "points",
          heading: "Three you should stop asking",
          points: [
            "Would you use this? — hypothetical, so the answer is fiction.",
            "How much would you pay? — nobody knows, and they'll guess high to be nice.",
            "Don't you find it annoying when…? — you just wrote their answer for them.",
          ],
        },
        {
          layout: "quote",
          quote: "Opinions are worthless. Ask about their life instead.",
          attribution: "Rob Fitzpatrick, The Mom Test",
        },
        { layout: "section", text: "Live interview", num: "02" },
        {
          layout: "exercise",
          heading: "Paired practice",
          prompt: "Ten minutes each way. Subject: how you decide what to eat on a weekday. Listener writes down every question they asked, verbatim. Afterward, mark which ones were leading.",
          time: "25 min total",
        },
        { layout: "assignment" },
      ],
    },

    {
      week: 3,
      date: "Sep 16",
      title: "From notes to a problem worth solving",
      status: "published",
      summary:
        "Twenty pages of notes and no idea what to build. Clustering, naming, and narrowing until the problem is small enough to attack.",
      agenda: [
        "Affinity mapping the room's interview notes, live",
        "Insight vs. observation vs. quote",
        "Writing a problem statement that constrains you usefully",
        "Choosing final project directions",
      ],
      readings: [
        { title: "Design Thinking Bootleg: Define mode", author: "Stanford d.school", note: "The cards on point-of-view statements and 'How Might We'." },
        { title: "Badass: Making Users Awesome, ch. 2", author: "Kathy Sierra", note: "On designing for what the user becomes, not what the product does." },
      ],
      assignment: {
        title: "Problem statement + three How Might We's",
        due: "Tue Sep 22, 11:59pm",
        body: "From your two interviews, write one problem statement in the form: [specific person] needs [need stated as a verb] because [insight you didn't already know]. Then three How Might We questions at different altitudes — one narrow, one medium, one uncomfortably broad. This becomes your final project.",
        deliverable: "Half a page. Bring it printed; we'll trade and critique in Week 4.",
      },
      materials: [
        { label: "Affinity map board", kind: "FigJam" },
        { label: "Problem statement examples, good and bad", kind: "Doc" },
      ],
    },

    {
      week: 4,
      date: "Sep 23",
      title: "Ideation, and why your first idea is a trap",
      status: "published",
      summary:
        "Volume before judgment, then the harder skill: killing ideas on purpose, with a reason you can say out loud.",
      agenda: [
        "Crazy 8s, twice, with a hard timer",
        "Why the first idea is almost always the one you already had before class",
        "Constraint games: same problem, ten dollars, no screen, one button",
        "Convergence: dot voting is a tool, not a verdict",
      ],
      readings: [
        { title: "Sprint, ch. 9–10", author: "Jake Knapp", note: "The sketching and deciding chapters." },
        { title: "Ten Principles for Good Design", author: "Dieter Rams", note: "One page. Argue with it." },
      ],
      assignment: {
        title: "Twelve ideas, three survivors",
        due: "Tue Sep 29, 11:59pm",
        body: "Twelve sketched concepts against your problem statement — genuinely twelve, including the stupid ones. Then pick three and write one sentence each on why it survived. Then write one sentence on why you killed your favorite.",
        deliverable: "One page of sketches, photographed. Four sentences.",
      },
      materials: [{ label: "Crazy 8s sheet, printable", kind: "PDF" }],
    },

    {
      week: 5,
      date: "Sep 30",
      title: "Structure: flows, states, and information architecture",
      status: "published",
      summary:
        "What screens exist, in what order, and what happens when things go wrong. Most bad products are structurally bad, not visually bad.",
      agenda: [
        "Drawing a user flow that survives contact with reality",
        "The states everyone forgets: empty, loading, error, too much, offline",
        "Navigation models, and how to pick one",
        "Flow critique in threes",
      ],
      readings: [
        { title: "Don't Make Me Think, ch. 2–3", author: "Steve Krug", note: "Short chapters, fast read." },
        { title: "10 Usability Heuristics for User Interface Design", author: "Jakob Nielsen, NN/g", note: "Reference for the rest of the semester." },
      ],
      assignment: {
        title: "Flow + state map",
        due: "Tue Oct 6, 11:59pm",
        body: "Map the main path through your concept, start to finish. Then annotate every point where it can fail or stall, and say what the product shows there. Empty state included — that's the one everyone skips.",
        deliverable: "One flow diagram, minimum four annotated states.",
      },
      materials: [{ label: "Flow + states starter file", kind: "FigJam" }],
    },

    {
      week: 6,
      date: "Oct 7",
      title: "Low-fidelity prototyping",
      status: "published",
      summary:
        "Paper, then Figma. A thing you can put in a stranger's hands by Friday, not a thing you're proud of.",
      agenda: [
        "Paper prototypes and why they test better than you expect",
        "Figma from zero: frames, auto layout, components, prototype links",
        "Fidelity as a decision — what your fidelity is secretly promising",
        "Build session, in class",
      ],
      readings: [
        { title: "Paper Prototyping, ch. 1", author: "Carolyn Snyder", note: "The case for paper. Skim the rest." },
        { title: "Figma: Auto Layout", author: "Figma Learn", note: "Watch before class. Fifteen minutes." },
      ],
      assignment: {
        title: "Clickable v1",
        due: "Tue Oct 13, 11:59pm",
        body: "A prototype someone can click through end to end without you narrating. Grey boxes and Times New Roman are fine and encouraged. If it looks finished you spent time on the wrong thing.",
        deliverable: "Figma prototype link, main path clickable.",
      },
      materials: [{ label: "Figma starter kit, wireframe components", kind: "Figma" }],
    },

    {
      week: 7,
      date: "Oct 14",
      title: "Type, color, and the grid",
      status: "published",
      summary:
        "Three systems that do most of the work, taught as rules you can follow before you have the instinct to break them.",
      agenda: [
        "Typographic hierarchy: size, weight, space, and nothing else",
        "Measure, leading, tracking — the settings nobody touches and everybody should",
        "Color with a job: one ink, one ground, one accent you have to earn",
        "Grids, columns, and why alignment reads as competence",
      ],
      readings: [
        { title: "Thinking with Type, part 1: Letter", author: "Ellen Lupton", note: "Look at it as much as read it." },
        { title: "Practical Typography: Type Composition", author: "Matthew Butterick", note: "The summary of key rules." },
      ],
      assignment: {
        title: "One screen, three type treatments",
        due: "Tue Oct 20, 11:59pm",
        body: "Take one screen from your v1. Set it three ways, changing only type and spacing — no color, no images, no new elements. Then say which reads fastest and why you think so.",
        deliverable: "Three versions side by side, plus two sentences.",
      },
      materials: [{ label: "Type scale + spacing reference", kind: "Figma" }],
    },

    {
      week: 8,
      date: "Oct 21",
      title: "Visual systems, not visual decoration",
      status: "published",
      summary:
        "Making twenty screens look like one product, and the moment a style guide starts saving you time instead of costing it.",
      agenda: [
        "Building a small design system: color tokens, spacing scale, text styles",
        "Components and variants in Figma, practically",
        "Dark mode as a real decision rather than an inversion",
        "Accessibility: contrast, target size, focus, motion",
      ],
      readings: [
        { title: "Design Systems, ch. 1–2", author: "Alla Kholmatova", note: "On what makes a system cohere." },
        { title: "WCAG 2.2 at a glance", author: "W3C", note: "Reference. Know contrast ratios and target sizes." },
      ],
      assignment: {
        title: "Style pass on the whole prototype",
        due: "Tue Oct 27, 11:59pm",
        body: "Apply one consistent system across every screen. Every color, size, and spacing value should come from a defined set. Check contrast on the smallest text you used.",
        deliverable: "Updated prototype plus a one-page system sheet.",
      },
      materials: [{ label: "Token starter file", kind: "Figma" }, { label: "Contrast checker links", kind: "Link" }],
    },

    {
      week: 9,
      date: "Oct 28",
      title: "Interaction and motion",
      status: "published",
      summary:
        "What happens between the screens. Feedback, latency, and motion that explains rather than performs.",
      agenda: [
        "Response, feedback, and the three latency thresholds",
        "Transitions that carry meaning: where did this thing come from",
        "Micro-interactions, and when they become noise",
        "Prototyping motion in Figma without losing a night to it",
      ],
      readings: [
        { title: "Designing Interface Animation, ch. 1–2", author: "Val Head", note: "On motion with a purpose." },
        { title: "Response Times: The 3 Important Limits", author: "Jakob Nielsen, NN/g", note: "0.1s, 1s, 10s. Short." },
      ],
      assignment: {
        title: "Three moments of feedback",
        due: "Tue Nov 3, 11:59pm",
        body: "Pick three moments in your flow where the user does something and the product must answer. Design the answer for each: what changes, how fast, and what it tells them.",
        deliverable: "Three short screen recordings, or an annotated prototype.",
      },
      materials: [{ label: "Smart Animate examples", kind: "Figma" }],
    },

    {
      week: 10,
      date: "Nov 4",
      title: "Critique",
      status: "published",
      summary:
        "How to present work so it can be helped, how to give feedback that lands, and how to hear it without defending.",
      agenda: [
        "How to set up a crit: state the goal, the constraint, and the question",
        "Feedback formats that work, and 'I like / I wish' and why it's weak",
        "Full studio crit, everyone presents, six minutes each",
      ],
      readings: [
        { title: "How to Give Feedback", author: "Julie Zhuo", note: "From The Year of the Looking Glass." },
        { title: "Discussing Design: The Critique Method", author: "Adam Connor & Aaron Irizarry", note: "Chapter on running critique." },
      ],
      assignment: {
        title: "Crit response",
        due: "Tue Nov 10, 11:59pm",
        body: "Write down the three pieces of feedback you got that you disagreed with. For each: make the strongest case for the other side, then decide. You may still disagree — but you have to have argued the other position first.",
        deliverable: "Three short paragraphs, plus what you changed.",
      },
      materials: [{ label: "Crit sign-up sheet", kind: "Doc" }],
    },

    {
      week: 11,
      date: "Nov 11",
      title: "Usability testing",
      status: "published",
      summary:
        "Five people, one script, no helping. Watching a stranger fail at the thing you built is the fastest week of the term.",
      agenda: [
        "Writing tasks instead of asking questions",
        "The hardest rule: do not help, do not explain, do not flinch",
        "Running a session in fifteen minutes",
        "Turning observations into a ranked list of what to fix",
      ],
      readings: [
        { title: "Rocket Surgery Made Easy, ch. 1–4", author: "Steve Krug", note: "The whole method, quickly." },
        { title: "Why You Only Need to Test with 5 Users", author: "Jakob Nielsen, NN/g", note: "The argument for small n." },
      ],
      assignment: {
        title: "Test with five",
        due: "Tue Nov 17, 11:59pm",
        body: "Five sessions with people who aren't in this class. Same three tasks each time. Log every point where someone hesitated, backtracked, or asked you a question. Rank the problems by how many people hit them.",
        deliverable: "Test script, raw notes, ranked list of issues.",
      },
      materials: [{ label: "Test script template", kind: "Doc" }, { label: "Observation log", kind: "Sheet" }],
    },

    {
      week: 12,
      date: "Nov 18",
      title: "Designing with and for AI",
      status: "published",
      summary:
        "Two problems: using these tools in your own process, and designing for systems that are slow, probabilistic and sometimes wrong.",
      agenda: [
        "AI in the process: where it genuinely helps and where it flattens your work",
        "Designing for uncertainty — confidence, correction, and undo",
        "Why the chat box is a default, not an answer",
        "Live: rebuilding one of your screens as a non-chat AI interaction",
      ],
      readings: [
        { title: "Why Chatbots Are Not the Future", author: "Amelia Wattenberger", note: "Short, visual, argumentative." },
        { title: "The Expanding Dark Forest and Generative AI", author: "Maggie Appleton", note: "On what these tools do to the field." },
        { title: "Magic Ink", author: "Bret Victor", note: "Optional, long, worth it. Read the first section." },
      ],
      assignment: {
        title: "One AI moment, no chat box",
        due: "Tue Nov 24, 11:59pm",
        body: "Find one place in your product where a model could genuinely help. Design that interaction without a chat interface. Show what happens when the model is confident, when it's unsure, and when it's wrong.",
        deliverable: "Three states, designed. One paragraph on the failure case.",
      },
      materials: [{ label: "Reference: non-chat AI interfaces", kind: "Link" }],
    },

    {
      week: 13,
      date: "Dec 2",
      title: "Final presentations",
      status: "draft",
      summary:
        "Eight minutes each: the problem, what changed your mind, the prototype, and what broke in testing.",
      agenda: [
        "Presentations, eight minutes plus two for questions",
        "What to do with this after the semester",
        "Course feedback, honestly",
      ],
      readings: [],
      assignment: {
        title: "Final project",
        due: "Presented in class, Dec 2",
        body: "The full arc: problem statement, research, prototype, test results, and what you'd do next. Show the version that failed alongside the one that worked — the change is the interesting part.",
        deliverable: "Presentation plus a link to the final prototype.",
      },
      materials: [{ label: "Presentation order + timing", kind: "Doc" }],
    },
  ],
};

/* ============================================================================
   SLIDE CHEATSHEET

   Add a `slides: [...]` array to any week. If you leave it out, the deck is
   generated automatically from that week's title, agenda, readings, and
   assignment — so every week has a usable deck from day one.

   { layout: "title" }
       Auto-fills course code, week number, title, and date.

   { layout: "section", text: "Teardown", num: "01" }
       Full-bleed divider.

   { layout: "statement", text: "One big line.", sub: "Optional second line." }

   { layout: "points", heading: "Heading", points: ["one", "two", "three"] }

   { layout: "two",
     heading: "Optional",
     left:  { label: "Leading", body: "Use \n for line breaks." },
     right: { label: "Open",    body: "..." } }

   { layout: "quote", quote: "...", attribution: "Who said it" }

   { layout: "exercise", heading: "In pairs", prompt: "Do this.", time: "10 min" }

   { layout: "figure", src: "img/thing.png", caption: "What we're looking at" }

   { layout: "assignment" }
       Auto-fills this week's assignment block. Good last slide.

   Any slide can take  note: "presenter note"  — press N in the deck to show it.
   ========================================================================== */

if (typeof module !== "undefined") module.exports = COURSE;
