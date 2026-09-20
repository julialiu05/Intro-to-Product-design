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
  meets: "Thursdays, 6:00–8:00pm",
  room: "SOCS 104",
  enrollment: "CCN posted on decal.berkeley.edu — no prerequisites, no portfolio required.",
  contact: "julia[dot]liu05[at]berkeley[dot]edu",
  office_hours: "Thursdays 3–4pm, Moffitt 4th floor, or by appointment",

  /* Shown in the Read Me. Emails are written with
     [at] and [dot] so scrapers do not pick them up off a public repo. */
  facilitators: [
    { name: "Julia Liu", role: "Facilitator", email: "julia[dot]liu05[at]berkeley[dot]edu" },
    { name: "Jennifer",  role: "Facilitator", email: "jennifer_tian[at]berkeley[dot]edu" },
    { name: "Inder",     role: "TA",          email: "inderveersingh[at]berkeley[dot]edu" },
    { name: "Niya",      role: "TA",          email: "niyacrowder[at]berkeley[dot]edu" },
  ],

  /* Shown in the Read Me. */
  attendance: [
    "Two unexcused absences are permitted over the semester.",
    "Beyond that, please speak with the teaching staff.",
    "If you need to miss a class, let us know in advance where possible.",
  ],
  sponsor: { name: "TBD", role: "Faculty Sponsor", detail: "Department of Design Innovation" },

  // Which week to surface, AND which theme the whole site wears.
  // Bump this every Wednesday and the site changes its skin.
  CURRENT_WEEK: 1,

  // How many week folders sit on the desktop (index.html), counting from 1.
  // The desktop fills up as the course runs: add one each week you release.
  // Nothing else uses this, so it is safe to keep behind CURRENT_WEEK.
  DESKTOP_WEEKS: 1,

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
      body: "This is a studio, so the room is the class. Two unexcused absences are permitted over the semester. Beyond that, please speak with the teaching staff. If you need to miss a class, let us know in advance where possible.",
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
      summary: "",
      agenda: [
        "Hellos, and one product you quietly resent",
        "Introductions: your facilitator and your TAs",
        "How the class runs, and the shape of the semester",
        "A brief look at what design even is, starting with six chairs",
        "The nametag brief, which is the homework",
      ],
      readings: [
        {
          title: "Don't trust the design process",
          author: "Jenny Wen",
          kind: "Essay",
          url: "https://jennywen.ca/notes/dont-trust-the-design-process",
          note: "Short. Read it early, because we are about to teach you a process and you should hold it loosely from the start. A process is scaffolding for when you are stuck, not a guarantee that anything good comes out the other end.",
        },
        {
          title: "The design process is dead. Here’s what’s replacing it.",
          author: "Jenny Wen",
          kind: "Video",
          url: "https://www.youtube.com/watch?v=eh8bcBIAAFo",
          note: "The same argument as her essay, made out loud and taken further. Watch it after the essay, not before.",
        },
        {
          title: "Design Engineering at Vercel",
          author: "Glenn Hitchcock and others",
          kind: "Post",
          optional: true,
          url: "https://vercel.com/blog/design-engineering-at-vercel",
          note: "What the third column on the three jobs slide looks like at a company that takes it seriously.",
        },
        {
          title: "Explain it like I’m 5: What is a Product Designer?",
          author: "Henry Wu",
          kind: "Essay",
          url: "https://medium.com/hubspot-product/explain-it-like-im-5-what-is-a-product-designer-121aad98c047",
          note: "The grocery store explanation we go through in class.",
        },
        {
          title: "Product design in 2026: the beginning of a fantastic voyage?",
          author: "Kike Peña",
          kind: "Essay",
          url: "https://uxdesign.cc/product-design-in-2026-the-beginning-of-a-fantastic-voyage-fb6866c907ac",
          note: "We go through this in class. Read it again afterwards, once you have something to argue with.",
        },
        {
          title: "IDEO Shopping Cart",
          author: "ABC Nightline",
          kind: "Video",
          url: "https://www.youtube.com/watch?v=M66ZU2PCIcM",
          note: "Eight minutes, filmed in 1999. A design team is given five days to redesign the shopping cart. Watch how much of it is arguing and watching people, and how little is drawing.",
        },
        {
          title: "The Design of Everyday Things, ch. 1",
          author: "Don Norman",
          kind: "Book chapter",
          note: "About 25 pages, in the course packet. The doors you push when you should pull. Read it once, quickly, and do not take notes.",
        },
        {
          title: "Objectified",
          author: "Gary Hustwit",
          kind: "Film",
          optional: true,
          note: "Feature length. Industrial designers talking about the objects around them. Good background for the whole semester, not homework.",
        },
        {
          title: "A Brief Rant on the Future of Interaction Design",
          author: "Bret Victor",
          kind: "Essay",
          optional: true,
          url: "http://worrydream.com/ABriefRantOnTheFutureOfInteractionDesign/",
          note: "Short and annoyed, in a useful way. Read the rant, skip the responses for now.",
        },
      ],
      assignment: {
        title: "Make your own nametag",
        due: "Wed Sep 23, 11:59pm",
        /* ISO date so the Calendar app can mark it. Keep the two in step. */
        dueDate: "2026-09-23",
        body: "A nametag of your choice. Paper, an object, or digital. Let your creativity run wild.",
        deliverable: "Bring it to class, or send it over if it only exists on a screen.",
      },
      materials: [
        { label: "Nametag template", kind: "Figma" },
        { label: "Class Slack", kind: "Link" },
      ],
      /* Day one. One slide per person for the introductions, the class
         structure, a brief look at what design is, then the homework.

         Slides carry only what goes on the screen. Nothing here explains
         itself to the room: that is what the person standing up is for. */
      slides: [
        { layout: "title" },

        { layout: "section", text: "Introductions", num: "01" },

        /* One slide each. Photos go in img/w1/ under these names; until a file
           exists the slide still renders and leaves the frame empty. Intros are
           reproduced exactly as each person wrote them. */
        {
          layout: "person",
          role: "Facilitator",
          name: "Julia Liu",
          detail: "",
          photo: "img/w1/julia.jpg",
          lines: [
            "Hello! I am Julia and I’m a senior studying Art and Data science. I love baking and anything art related!",
          ],
        },
        {
          layout: "person",
          role: "Facilitator",
          name: "Jennifer",
          detail: "",
          photo: "img/w1/jennifer.jpg",
          lines: [
            "hello ;) I’m Jennifer, a 3rd year studying applied math and ds (+ the design certificate)! Some things I love are jewelry-making, whale sharks, classical cryptography, 30% sugar fruit milk tea, and teaching this decal <3",
          ],
        },
        {
          layout: "person",
          role: "TA",
          name: "Inder",
          detail: "inderveersingh[at]berkeley[dot]edu",
          photo: "img/w1/inder.jpg",
          lines: [
            "Hello everyone! My name is Inder and i’m a 2nd-year majoring in Bioengineering! Some of my favorite hobbies are eating new foods, trying new coffee spots, playing Roblox, working out, and listening to music😎😎",
          ],
        },
        {
          layout: "person",
          role: "TA",
          name: "Niya",
          detail: "",
          photo: "img/w1/niya.jpg",
          lines: [
            "Hi!!! I’m Niya and I am a 2nd year majoring in architecture and minoring in sustainable design + structural engineering! I love doing ceramics, playing tennis, and anything outdoors 😌",
          ],
        },

        { layout: "section", text: "How this class runs", num: "02" },
        {
          layout: "points",
          heading: "Expectations",
          points: [
            "Come to class.",
            "Bring work, finished or not.",
            "Turn in your homework.",
            "Due Wednesdays, 11:59pm.",
            "Have fun and be creative!",
          ],
        },
        {
          layout: "points",
          heading: "Semester at a glance",
          points: [
            "First two weeks are intros into design.",
            "Week 3 to week 10 is project weeks.",
            "Week 10+ is portfolios.",
            "We will have a Midterm and Final Project that are worth quite a bit of your grade.",
          ],
        },

        { layout: "section", text: "What is design?", num: "03" },
        {
          layout: "gallery",
          heading: "All six of these are chairs",
          items: [
            { src: "img/w1/chair-folding.jpg", label: "National Public Seating 50 Series", note: "$18" },
            { src: "img/w1/chair-ikea.jpg",    label: "BALTSAR Ikea Chair",                note: "$169" },
            { src: "img/w1/chair-ulloo.jpg",   label: "ULLOO 42 Chair",                    note: "$1999" },
            { src: "img/w1/chair-bloom.jpg",   label: "Bloom lounge chair",                note: "$3430" },
            { src: "img/w1/chair-up5.jpg",     label: "UP5 “Mama” Chair",        note: "$4145" },
            { src: "img/w1/chair-eames.jpg",   label: "Eames Lounge Chair",                note: "$6495" },
          ],
        },
        {
          layout: "figure",
          src: "img/w1/uncomfortable.jpg",
          caption: "© Katerina Kamprani, The Uncomfortable",
        },

        /* The four principles from the GDP Decal deck, each stated and then
           undercut. Side by side rather than on two slides: the argument is
           the tension between them, so both halves want to be visible at once. */
        { layout: "section", text: "What is good design?", num: "04" },
        {
          layout: "two",
          heading: "Design should be simple.",
          left: {
            label: "The case",
            body: "Good design is as little design as possible. Simple designs are lasting and universal.",
          },
          right: {
            label: "However",
            body: "Good design grabs the user with a wow factor. It should strive for a balance between simplicity and authenticity.",
          },
        },
        {
          layout: "gallery",
          items: [
            { src: "img/w1/apple-card.jpg",    label: "Apple" },
            { src: "img/w1/blandification.jpg", label: "“Blandification”" },
            { src: "img/w1/dropbox-2017.jpg",  label: "Dropbox Redesign", note: "2017" },
            { src: "img/w1/dropbox-2019.jpg",  label: "Dropbox Redesign", note: "2019" },
          ],
        },
        {
          layout: "two",
          heading: "Form follows function.",
          left: {
            label: "The case",
            body: "Design must be driven by the purpose of the object rather than aesthetics. Achieve purity through reduction and restraint.",
          },
          right: {
            label: "However",
            body: "You can argue form IS function. Utilitarian restrictions can stifle innovation and wonder.",
          },
        },
        {
          layout: "gallery",
          items: [
            { src: "img/w1/bauhaus-chess.jpg",   label: "Bauhaus chess set" },
            { src: "img/w1/cut-the-mustard.jpg", label: "“Cut the Mustard” exhibition poster" },
            { src: "img/w1/invite-minimal.jpg",  label: "Utilitarian wedding invitations" },
            { src: "img/w1/invite-andersen.jpg", label: "Wedding invitation", note: "Kelli Andersen" },
          ],
        },
        {
          layout: "two",
          heading: "Ego has no place in design.",
          left: {
            label: "The case",
            body: "You must not design for yourself, you must design solely for the user. Designers are not users.",
          },
          right: {
            label: "However",
            body: "Ego and personal experience are instrumental in crafting sincerity, passion and poignancy. Design as expression.",
          },
        },
        {
          layout: "gallery",
          items: [
            { src: "img/w1/contrast.jpg",      label: "Inaccessible websites" },
            { src: "img/w1/mri-plain.jpg",     label: "A scanner" },
            { src: "img/w1/mri-adventure.jpg", label: "The same scanner, adventure series" },
            { src: "img/w1/casino-city.jpg",   label: "“Casino City”", note: "Suzy Chan" },
            { src: "img/w1/haribo.jpg",        label: "“Haribo Cult”", note: "Suzy Chan" },
          ],
        },
        {
          layout: "two",
          heading: "Design should be instinctive.",
          left: {
            label: "The case",
            body: "Anticipate how people will use it and make it seamless. Never make the user work.",
          },
          right: {
            label: "However: design should be distinctive.",
            body: "There can be delight in working through a design, and in navigating new experiences.",
          },
        },
        {
          layout: "gallery",
          items: [
            { src: "img/w1/push-pull.jpg",   label: "Which one is it" },
            { src: "img/w1/glass-doors.jpg", label: "Or this one" },
            { src: "img/w1/guardian.jpg",    label: "Guardian Puzzle Special", note: "Mariane Batjes" },
          ],
        },
        {
          layout: "statement",
          text: "There is no universally good design approach.",
          sub: "A design approach can only be considered good with respect to some particular niche.",
        },
        {
          layout: "figure",
          src: "img/w1/nonlinear.jpg",
          caption: "Design is nonlinear and iterative. Each iteration makes your design better, and you can always return to the previous step.",
        },
        { layout: "statement", text: "So what does that mean for product design?" },
        { layout: "section", text: "What is product design?", num: "05" },
        {
          layout: "statement",
          text: "A Product Designer, at its core, is a problem solver.",
          sub: "Henry Wu, HubSpot",
        },
        {
          layout: "points",
          heading: "A product designer has many names",
          points: [
            "Experience Designer (XD)",
            "Information Architect (IA)",
            "Interaction Designer (IX)",
            "Experience Architect (XA)",
            "User Interface (UI) Designer",
            "User Experience (UX) Designer",
            "A product designer may be responsible for some or all of the above.",
          ],
        },
        {
          layout: "statement",
          text: "We don’t just use design to make things look pretty. We use design to solve problems.",
        },
        {
          layout: "points",
          heading: "Let’s say I’m hungry",
          points: [
            "A grocery store is one answer.",
            "So are delivery, restaurants, food trucks and vending machines.",
            "So are Netflix, books and going to sleep.",
          ],
        },
        {
          layout: "columns",
          heading: "Three core types of design",
          items: [
            {
              label: "System design",
              body: "The whole thing, and how its parts work together.",
            },
            {
              label: "Process design",
              body: "The steps someone moves through to get something done.",
            },
            {
              label: "Interface design",
              body: "The part a person actually sees and touches.",
            },
          ],
        },
        {
          layout: "points",
          heading: "What a product designer (used to) make",
          points: [
            "Journey map. A diagram of the steps a person takes to complete a task, and what they need at each one.",
            "Wireframe. A low-fidelity layout showing structure and content, before any visual design.",
            "Prototype. A version made to be tested, from paper to fully clickable.",
            "High-fidelity design. The final visual design: layout, colour, type and spacing, for engineers to build from.",
          ],
        },
        {
          layout: "points",
          heading: "What the job actually looks like",
          points: [
            "Research our users and problems.",
            "Design and prototype.",
            "Test with our users.",
            "Design some more.",
            "Launch a product.",
            "Measure and iterate.",
          ],
          tap: "🔁 ×10",
        },
        {
          layout: "statement",
          text: "A constant loop of analyzing, designing, testing, launching, monitoring, and evolving.",
          sub: "All of this is done because we are solving problems.",
        },

        {
          layout: "statement",
          text: "Deciding what to build, for whom, and why. Then making sure it gets built.",
        },
        {
          layout: "points",
          heading: "Four questions behind every decision",
          points: [
            "Who is this for? A specific person in a specific situation, never just people.",
            "What are they trying to get done? Stated without your solution inside it.",
            "What cannot change? Budget, physics, law, attention.",
            "What did you give up to get the thing you chose?",
          ],
        },
        {
          layout: "columns",
          heading: "Three jobs people confuse",
          items: [
            {
              label: "UI/UX design",
              body: "The screens and the path through them.",
              list: [
                "How it looks and how it feels to use",
                "Layout, type, colour, states, flows",
                "Hands off an interface",
              ],
            },
            {
              label: "Product design",
              body: "What to build, for whom, and why.",
              list: [
                "Research, problem framing, tradeoffs",
                "Talks to users, business and engineering",
                "Hands off a decision, and the interface",
              ],
            },
            {
              label: "Design engineering",
              body: "Making the thing real.",
              list: [
                "Turns the design into working code",
                "Owns feel: motion, performance, edge cases",
                "Hands off the product itself",
              ],
            },
          ],
        },
        {
          layout: "statement",
          text: "The lines between them are moving.",
        },


        /* From "Product design in 2026: the beginning of a fantastic voyage?"
           by Kike Peña, UX Collective, April 2026. The wording is his. */
        { layout: "section", text: "Product design in 2026", num: "06" },
        {
          layout: "statement",
          text: "The invisible walls for designers have been broken down.",
          sub: "Kike Peña, UX Collective, April 2026",
        },
        {
          layout: "points",
          heading: "Two walls that fell",
          points: [
            "The conversation wall. Designers used to be handed decisions. Now they sit in the room where decisions get made.",
            "The code wall. Designers used to be told what was possible to build. Now they can build it themselves.",
          ],
        },
        {
          layout: "quote",
          quote: "New designers should be measured on how big their imagination is, instead of how much they know about tools.",
          attribution: "Carlos Pinilla",
        },
        {
          layout: "points",
          heading: "The new designer/builder",
          points: [
            "You can speak three languages now: business, design and code.",
            "Tools on their own make generic work. Your imagination is the part that is not generic.",
          ],
        },
        {
          layout: "statement",
          text: "Stop handing over pictures of a product.",
          sub: "Hand over the product.",
        },
        {
          layout: "statement",
          text: "So how can we start?",
        },
        { layout: "section", text: "Homework", num: "07" },
        { layout: "assignment" },
        {
          layout: "nametag",
          heading: "One example, since digital counts",
          name: "your name",
          caption: "Type on it. Click it to change colour. Move your cursor across it.",
        },
      ],
    },
  ],
};

/* ============================================================================
   SLIDE CHEATSHEET

   Add a `slides: [...]` array to any week. If you leave it out, the deck is
   generated automatically from that week's title, agenda, readings and
   assignment, so every week has a usable deck from day one.

   All thirteen layouts are below. Week 1 uses every one of them, so scroll up
   for a real example of any of these. CONTINUE.md explains them at length.

   { layout: "title" }
       Auto-fills course code, week number, title and date.

   { layout: "section", text: "Teardown", num: "01" }
       Full-bleed divider. Number them.

   { layout: "statement", text: "One big line.", sub: "Optional second line." }

   { layout: "points", heading: "Heading", points: ["one", "two", "three"] }

   { layout: "two",
     heading: "Optional",
     left:  { label: "The case", body: "Use \n for line breaks." },
     right: { label: "However",  body: "..." } }
       Two columns. Best for a claim and its counter-claim.

   { layout: "columns",
     heading: "Three jobs people confuse",
     items: [ { label: "UI/UX design",
                body: "The screens and the path through them.",
                list: ["optional", "bullets"] }, ... ] }
       Like "two", but for three or more, each with its own list.

   { layout: "quote", quote: "...", attribution: "Who said it" }
       Do not type the quotation marks. The layout draws them.

   { layout: "person",
     role: "TA", name: "Their name", detail: "name[at]berkeley[dot]edu",
     photo: "img/w1/theirname.jpg",
     lines: ["Their introduction, in their own words."] }
       Portraits crop to 4:5. `photo` is optional: without it the slide still
       renders and leaves the frame empty until you have the picture.

   { layout: "gallery",
     heading: "All six of these are chairs",
     items: [ { src: "img/w1/chair-eames.jpg", label: "Eames Lounge Chair",
                note: "$6495" }, ... ],
     caption: "Optional line underneath." }
       A row of captioned images. `note` is set apart from the label, which is
       what makes a row of prices read as a range. Six items get a six-across
       grid; other counts wrap. Images are fitted, not cropped.

   { layout: "figure", src: "img/w1/thing.jpg", caption: "What we're looking at" }
       One image, full width. Credit the source in the caption.

   { layout: "exercise", heading: "In pairs", prompt: "Do this.", time: "10 min" }

   { layout: "nametag", heading: "...", name: "your name", caption: "..." }
       The interactive nametag: type on it, click to recolour, it tilts toward
       the pointer. Specific to the Week 1 homework.

   { layout: "assignment" }
       Auto-fills this week's assignment block. Good last slide.

   Any slide can also take:
     note: "presenter note"   shown under the card in the deck
     tap:  "\u{1F501} \u00D710"        a badge that appears when the card is clicked,
                              and goes away when it is clicked again
   ========================================================================== */

if (typeof module !== "undefined") module.exports = COURSE;
