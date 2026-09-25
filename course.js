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
  DESKTOP_WEEKS: 2,

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

    {
      week: 2,
      date: "TBD",
      title: "Graphic Design Principles",
      status: "draft",
      summary: "",
      /* Overrides the deck's default backdrop (img/wall-1.jpg) for this week
         only. Leave this out on any other week to keep the default. */
      background: "img/w2/floral-sky-background.jpg",
      agenda: [],
      readings: [],
      assignment: {
        title: "Recommunicate a bad design",
        due: "Wed Sep 30, 11:59pm",
        /* ISO date so the Calendar app can mark it. Keep the two in step. */
        dueDate: "2026-09-30",
        body: "Find a poster or web design that isn't working, then reinvent it so it actually gets its message across. Redesign it in Figma, Canva, whatever, or change the medium entirely: a bad poster could become a shirt, a sticker, anything more effective. The point is to practice manipulating color and typography on purpose, so lean into that.",
        deliverable: "Bring both the original and your redesign, in class or sent over if it's digital.",
      },
      materials: [],
      /* Scaffold only. Julia has a Google Slides deck for this lecture that
         still needs to be transcribed in, plus a few extra slides on
         general graphic design principles to round it out. Every section
         below is a placeholder, marked with a note, waiting on that
         material rather than invented content. */
      slides: [
        { layout: "title" },

        { layout: "section", text: "Nametag Project Critique", num: "01" },
        /* Student nametag submissions, split fairly evenly across three
           slides for discussion. No labels, on purpose: it's a live
           critique, not a captioned gallery. */
        {
          layout: "gallery",
          items: [
            { src: "img/w2/critique/critique-01.jpg" },
            { src: "img/w2/critique/critique-02.jpg" },
            { src: "img/w2/critique/critique-03.jpg" },
            { src: "img/w2/critique/critique-04.jpg" },
            { src: "img/w2/critique/critique-05.jpg" },
            { src: "img/w2/critique/critique-06.jpg" },
            { src: "img/w2/critique/critique-07.jpg" },
            { src: "img/w2/critique/critique-08.jpg" },
          ],
        },
        {
          layout: "gallery",
          items: [
            { src: "img/w2/critique/critique-09.jpg" },
            { src: "img/w2/critique/critique-10.jpg" },
            { src: "img/w2/critique/critique-11.jpg" },
            { src: "img/w2/critique/critique-12.jpg" },
            { src: "img/w2/critique/critique-13.jpg" },
            { src: "img/w2/critique/critique-14.jpg" },
            { src: "img/w2/critique/critique-15.jpg" },
          ],
        },
        {
          layout: "gallery",
          items: [
            { src: "img/w2/critique/critique-16.jpg" },
            { src: "img/w2/critique/critique-17.jpg" },
            { src: "img/w2/critique/critique-18.jpg" },
            { src: "img/w2/critique/critique-19.jpg" },
            { src: "img/w2/critique/critique-20.jpg" },
            { src: "img/w2/critique/critique-21.jpg" },
            { src: "img/w2/critique/critique-22.jpg" },
            { src: "img/w2/critique/critique-23.jpg" },
          ],
        },

        { layout: "section", text: "Why Style Choices Matter", num: "02" },
        {
          layout: "gallery",
          items: [
            { src: "img/w2/bad-design-store-window.jpg" },
            { src: "img/w2/bad-design-burger-flyer.jpg" },
            { src: "img/w2/bad-design-shirt.jpg" },
          ],
        },
        {
          layout: "statement",
          text: "Color, type and layout aren't graphic design extras.",
          sub: "They're how a product earns trust before anyone reads a word.",
        },
        {
          layout: "quote",
          quote: "Design is not just what it looks like and feels like. Design is how it works.",
          attribution: "Steve Jobs",
        },
        {
          layout: "points",
          heading: "Why a product designer still needs this",
          points: [
            "Color carries meaning: it signals errors, success, and what's clickable.",
            "Typography sets hierarchy: it tells someone what to read first.",
            "Layout and spacing reduce the effort it takes to understand a screen.",
            "Get these wrong, and the product feels untrustworthy before anyone uses it.",
          ],
        },
        {
          layout: "quote",
          quote: "Good design is as little design as possible.",
          attribution: "Dieter Rams",
        },
        {
          layout: "statement",
          text: "The same choices that make a poster feel messy make a product feel broken.",
        },
        /* No per-image labels or caption on purpose: this is an in-class
           exercise, and pre-labeling what's wrong would give it away. */
        {
          layout: "gallery",
          heading: "Examples: when style choices work against you",
          items: [
            { src: "img/w2/bad-design-meltdown-poster.jpg" },
            { src: "img/w2/bad-design-community-poster.jpg" },
            { src: "img/w2/bad-design-fundraiser-poster.jpg" },
            { src: "img/w2/bad-design-ogden-poster.jpg" },
          ],
        },
        {
          layout: "statement",
          text: "It's tempting to say all of this is just taste.",
        },
        {
          layout: "statement",
          text: "But almost everyone looking at those posters agreed something was off.",
          sub: "Design isn't arbitrary, even though it is subjective.",
        },
        {
          layout: "exercise",
          heading: "Discuss",
          prompt: "What do you think “good” design should be considered as?",
        },
        {
          layout: "points",
          heading: "What “good” usually turns out to mean",
          points: [
            "It's accessible: people with different abilities can still use it.",
            "It gets you the important information fast, without digging.",
            "It's consistent: the same pattern behaves the same way everywhere.",
            "It's honest: it doesn't trick you into clicking the wrong thing.",
            "It still holds up under stress: a small screen, bad lighting, low signal.",
          ],
        },

        { layout: "section", text: "Color", num: "03" },
        {
          layout: "statement",
          text: "tinyurl.com/2tejyasr",
          sub: "Classwork: make a copy of the template and fill it in yourself.",
          note: "Color association: a color that represents you, your hometown, Sunday, what relaxes you, a triangle, a circle, one you really don't like, and nostalgia. List the HEX code for each.",
        },
        /* A live demo rather than a description: the slide itself is the bad
           example, then the good one. bg/fg override the card's colors, see
           the SLIDE CHEATSHEET at the bottom of this file. */
        {
          layout: "statement",
          text: "why this isn't a good slide",
          bg: "#3a0a0a",
          fg: "#4a0a5c",
        },
        {
          layout: "statement",
          text: "and why this is a better slide",
          bg: "#fff6f6",
          fg: "#3a0a0a",
        },
        /* From here down: transcribed from Julia and Pat's "Week Three:
           Color" slide deck (a past run of this course), pulled in with
           python-pptx. On-screen text became each slide's visible content;
           the speaker notes became the `note` on each slide, same as the
           deck already does elsewhere. The recurring "GDP Decal" watermark
           and running footer weren't real content, so they're left out.
           HW3's due date belongs to that past term, not this one: it's kept
           here as reference material only, not wired into this week's real
           `assignment` above. */
        {
          layout: "points",
          heading: "Objectives",
          points: [
            "Uses of color",
            "Components of color",
            "Color in Design",
            "Resources for finding color",
            "In-Class Challenge!!!",
          ],
        },
        {
          layout: "points",
          heading: "How is color used?",
          points: ["Draws Attention", "Evoke Mood", "Communication"],
        },
        {
          layout: "gallery",
          heading: "Drawing attention",
          items: [
            { src: "img/w2/color/w3-attention-website-before.jpg", label: "Before", note: "Bland, low contrast" },
            { src: "img/w2/color/w3-attention-website-after.jpg", label: "After", note: "A muted palette, one bold accent" },
          ],
          note: "The first website's colors are bland, not much contrast, not very eye-catching. The second has a more muted color, and a bold color to draw your eyes to it, e.g. the register button has the bold red to draw users to that action.",
        },
        {
          layout: "points",
          heading: "Evoke mood",
          points: [
            "Warm colors (red, yellow, orange) can spark comfort and warmth, or hostility and anger.",
            "Cool colors (green, blue, purple) often spark calmness, sometimes sadness.",
            "Even emoji hearts carry it: black heart is grief, red is love, orange is friendship.",
          ],
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-mood-error-blue.jpg",
          note: "Ask the class what they associate with this bright blue. It's the color we associate with something being wrong, hence why it's the background to error messages.",
        },
        {
          layout: "gallery",
          heading: "Communication, underfoot",
          items: [
            { src: "img/w2/color/w3-communication-subway-1.jpg" },
            { src: "img/w2/color/w3-communication-subway-2.jpg" },
            { src: "img/w2/color/w3-communication-subway-3.jpg" },
          ],
          note: "Yellow means stand behind, on the subway platform or the bus (“get behind the yellow line”).",
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-van-gogh-cafe.jpg",
          caption: "Café Terrace at Night, Vincent van Gogh",
          note: "Is the café's interior actually yellow, or is that the lighting? We put certain colors on a 2D space to convey something defined in 3D space. Colors can appear differently under different light.",
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-dress-illusion.jpg",
          note: "Its original color is blue and black, but it appears white and gold under bright light.",
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-munsell-system.jpg",
          caption: "The Munsell Color System",
          note: "Perception of color splits into two systems: the color of an object as it is, or how it looks under different light. On the right is the Munsell Color System.",
        },
        {
          layout: "points",
          heading: "Components of Colors",
          points: [
            "Hue: pure color, before any white or black is added.",
            "Value: how much black or white you add into a color.",
            "Chroma: the purity of a color.",
            "Saturation: the intensity of a color, the amount of hue.",
          ],
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-van-gogh-cafe.jpg",
          caption: "The same painting, looking again",
          note: "The interior may not objectively be yellow, but it reads as yellow under that light. The buildings aren't really fading to black, that's the color under darker light.",
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-highlights-shadows.jpg",
          caption: "Highlights and Shadows",
          note: "Shadows and highlights bring your work to life: less flat with shadows, more visible with highlights.",
        },
        {
          layout: "two",
          heading: "Two ways to do it",
          left: { label: "Darker + unsaturated", body: "A darker chroma shadow with an unsaturated highlight can show dimension." },
          right: { label: "Saturated + lighter", body: "A saturated shadow with a lighter value highlight feels more cohesive, and vibrant." },
        },
        {
          layout: "points",
          heading: "Color in design",
          points: ["How colors are organized", "How brands use colors", "Effects of color choices"],
          note: "Color choices directly affect how users feel about a brand or product, whether that's welcoming, luxurious, or professional.",
        },
        {
          layout: "gallery",
          heading: "Color Groups",
          items: [
            { src: "img/w2/color/w3-colors-primary.jpg", label: "Primary", note: "Blue, red, yellow" },
            { src: "img/w2/color/w3-colors-secondary.jpg", label: "Secondary", note: "Violet, orange, green" },
            { src: "img/w2/color/w3-colors-tertiary.jpg", label: "Tertiary", note: "Red-orange, yellow-orange, blue-green, blue-violet" },
          ],
          note: "Primary colors can't be made by mixing colors, they're the basis of all colors. Mix primaries to get secondaries, mix those to get tertiaries. Enlightenment scholars were extremely intent on discovering “pure colors,” which brought us modern color theory: monochrome, analogous, and complementary schemes.",
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-scheme-monochrome.jpg",
          caption: "Scheme: Monochrome",
          note: "Mono = one. Same hue, but shade, tint, and tone can change. Not exclusively black and white.",
        },
        {
          layout: "gallery",
          heading: "Scheme: Analogous",
          items: [
            { src: "img/w2/color/w3-scheme-analogous-1.jpg" },
            { src: "img/w2/color/w3-scheme-analogous-2.jpg" },
          ],
          note: "Analogous means color groups next to each other on the wheel that are similar, like red, violet, and red-violet.",
        },
        {
          layout: "gallery",
          heading: "Scheme: Complementary",
          items: [
            { src: "img/w2/color/w3-scheme-complementary-1.jpg" },
            { src: "img/w2/color/w3-scheme-complementary-2.jpg" },
          ],
          note: "Complementary: colors on opposite ends of the wheel. Split complementary starts with a color, finds its complement, then takes the colors next to that complement. Triad is three points, tetrad is four.",
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-simultaneous-contrast.jpg",
          caption: "Simultaneous contrast: the same orange, twice",
          note: "Color is always seen in relation to what surrounds it. A dark color next to a light one makes both look brighter. Warmer colors look warmer next to cool ones. Here, both oranges are the same color, the white and black around them just change how we read it.",
        },
        {
          layout: "gallery",
          heading: "What does red mean?",
          items: [
            { src: "img/w2/color/w3-meaning-red-1.jpg" },
            { src: "img/w2/color/w3-meaning-red-2.jpg" },
            { src: "img/w2/color/w3-meaning-red-3.jpg" },
          ],
          note: "Hot, fire, danger, anger. Also love, passion, importance. Red is scientifically proven to raise your heart rate and blood pressure, and it's the hardest color to execute well but the most memorable.",
        },
        {
          layout: "gallery",
          heading: "What does yellow mean?",
          items: [
            { src: "img/w2/color/w3-meaning-yellow-1.jpg" },
            { src: "img/w2/color/w3-meaning-yellow-2.jpg" },
            { src: "img/w2/color/w3-meaning-yellow-3.jpg" },
          ],
          note: "Fun, childish, playful. It's why so many fast food chains pair red and yellow: red triggers appetite and attention, yellow brings comfort and happiness.",
        },
        {
          layout: "gallery",
          heading: "What does blue mean?",
          items: [
            { src: "img/w2/color/w3-meaning-blue-1.jpg" },
            { src: "img/w2/color/w3-meaning-blue-2.jpg" },
            { src: "img/w2/color/w3-meaning-blue-3.jpg" },
          ],
          note: "A stable color, and the most common in logo design because of its neutrality. Dark blues read reliable, light blues read friendly. In Western culture it's also associated with sadness.",
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-brand-swap-cocapepsi.jpg",
          caption: "Swap the colors, and it looks wrong",
          note: "These brands have successfully represented themselves with iconic colors.",
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-brand-swap-2.jpg",
          note: "More inverted color examples for logos.",
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-brand-swap-3.jpg",
          note: "Tiffany blue, Valentino pink, Cartier red.",
        },
        {
          layout: "statement",
          text: "Isoluminance",
          sub: "When colors are matched so carefully in brightness that only the color itself does the work, not the light.",
          note: "Uniform light intensity, differentiated only by color, not brightness. Technically possible in design, but less accessible: eye-strain colors.",
        },
        { layout: "statement", text: "This is hard to read", bg: "#FF00FF", fg: "#00FF00" },
        { layout: "statement", text: "This is also hard to read", bg: "#674EA7", fg: "#3D85C6" },
        { layout: "statement", text: "Don’t even bother", bg: "#00FFFF", fg: "#FFFF00" },
        {
          layout: "figure",
          src: "img/w2/color/w3-contrast-example.jpg",
          caption: "Contrast",
          note: "A great difference between two things, here two juxtaposed colors with a noticeable difference. Greenish blue against gray makes the blue stand out.",
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-balance-example.jpg",
          caption: "Balance",
          note: "A balanced arrangement needs a dominant color temperature, so a subordinate color can stand out against it. Too many colors clashing, like here, means nothing stands out: distracting, hard to read, not accessible.",
        },
        {
          layout: "figure",
          src: "img/w2/color/w3-legibility-example.jpg",
          caption: "Legibility",
          note: "The degree to which something is easy to read, how individual characters can be told apart.",
        },
        {
          layout: "points",
          heading: "Resources for practice",
          points: ["Coolors: coolors.co", "Adobe Color", "Color game: color.method.ac"],
          note: "Coolors: a color palette generator, lock colors you like and hit space bar to cycle the rest. Adobe Color: build and share color themes. The color game: use your cursor to match a given color.",
        },
        { layout: "section", text: "Typography", num: "04" },
        /* From here down: transcribed from Julia and Pat's "Week Four:
           Typography" slide deck, the same way the Color section was. One
           real departure: this lecture's whole point on a few slides is what
           a typeface actually looks like, so those points carry a `font`
           (see the SLIDE CHEATSHEET) to render in the real typeface rather
           than describing it. Everywhere else, including the transition
           statements like "Type sends us signals," uses the site's own type,
           the same as every other slide on the site. */
        { layout: "statement", text: "Why type matters." },
        {
          layout: "points",
          heading: "Which do you believe?",
          points: [
            { text: "The driving distance between Berkeley and Embarcadero in SF is 10 miles (Baskerville)", font: "Baskervville" },
            { text: "The driving distance between Berkeley and Embarcadero in SF is 11.5 miles (Georgia)", font: "Georgia" },
            { text: "The driving distance between Berkeley and Embarcadero in SF is 12.6 miles (Helvetica)", font: "Helvetica Neue" },
            { text: "The driving distance between Berkeley and Embarcadero in SF is 13 miles (Comic Sans)", font: "Comic Sans MS" },
            { text: "The driving distance between Berkeley and Embarcadero in SF is 16 miles (Trebuchet)", font: "Trebuchet MS" },
            { text: "The driving distance between Berkeley and Embarcadero in SF is 20 miles (Arial)", font: "Arial" },
          ],
          note: "Which statement do you believe the most? The “correct” one is Helvetica. Different fonts can evoke different emotions, trust, and associations: Baskerville feels more professional, closer to a newspaper. Comic Sans feels goofy. Serif text tends to read as more academic.",
        },
        {
          layout: "points",
          heading: "Type + Truth",
          points: ["Can your typographical choices affect your grades?"],
          note: "Writing essays in different fonts: does it change the grade?",
        },
        {
          layout: "gallery",
          heading: "The average grade, by font",
          items: [
            { src: "img/w2/typography/w4-grades-bar-1.jpg", label: "1" },
            { src: "img/w2/typography/w4-grades-bar-2.jpg", label: "2" },
            { src: "img/w2/typography/w4-grades-bar-3.jpg", label: "3" },
          ],
          note: "Trebuchet looks like something off a blog rather than an academic journal. Nowadays our essays are, by default, in Times New Roman. Baskerville still retains that academic feel, but feels a bit more elevated.",
        },
        { layout: "statement", text: "Type sends us signals." },
        {
          layout: "gallery",
          heading: "What messages should I trust?",
          items: [
            { src: "img/w2/typography/w4-trust-logo-1.jpg" },
            { src: "img/w2/typography/w4-trust-logo-2.jpg" },
            { src: "img/w2/typography/w4-trust-logo-3.jpg" },
            { src: "img/w2/typography/w4-trust-logo-4.jpg" },
            { src: "img/w2/typography/w4-trust-logo-5.jpg" },
            { src: "img/w2/typography/w4-trust-logo-6.jpg" },
          ],
          note: "Top row: professional, well-established, long-standing news sources. Bottom row: some are just as established, but the logo sets a different tone, more entertainment than news.",
        },
        {
          layout: "gallery",
          heading: "What kind of product am I buying?",
          items: [
            { src: "img/w2/typography/w4-product-tiffany.jpg" },
            { src: "img/w2/typography/w4-product-mcdonalds.jpg" },
          ],
          note: "Swapping the logos of well-established brands looks weird. Tiffany & Co. is known for elegance, hence serifs, a classic look. McDonald's with serifs would read as fine dining rather than fast food. Type sets expectations for what you're buying.",
        },
        {
          layout: "gallery",
          heading: "How should I feel?",
          items: [
            { src: "img/w2/typography/w4-feeling-1.jpg" },
            { src: "img/w2/typography/w4-feeling-2.jpg" },
            { src: "img/w2/typography/w4-feeling-3.jpg" },
            { src: "img/w2/typography/w4-feeling-4.jpg" },
          ],
          caption: "Glyphworld, Leah Maldonado",
          note: "Leah Maldonado makes expressionist type design to express emotion, fonts that correspond to different traits, like an alignment chart.",
        },
        {
          layout: "points",
          heading: "Agenda",
          points: ["Anatomy of typography", "Typeface selection", "Typographic layout"],
        },
        { layout: "statement", text: "Anatomy of Typography." },
        {
          layout: "points",
          heading: "Typeface vs. Font",
          points: ["Typeface: font family of the same design.", "Font: a specific flavor of a typeface."],
        },
        { layout: "figure", src: "img/w2/typography/w4-anatomy-diagram.jpg" },
        {
          layout: "points",
          heading: "Character vs. Glyph",
          points: [
            "Character: symbol representing a letter, number, or punctuation mark.",
            "Glyph: specific shape, design, representation of a character.",
          ],
          note: "The character “a” can be represented by many glyphs, set in different typefaces.",
        },
        {
          layout: "points",
          heading: "Characters",
          points: ["A: Letter", "5: Number", "!: Punctuation"],
        },
        { layout: "figure", src: "img/w2/typography/w4-glyphs-a.jpg", caption: "Glyphs of character “a”" },
        {
          layout: "points",
          heading: "Measuring Fonts",
          points: ["Point size: distance from the lowest to highest point of the text.", "Point: a unit of measurement. 72pt = 1 inch."],
        },
        {
          layout: "points",
          heading: "Balance in Font",
          points: ["Stress and stroke create contrast.", "Optical balance beats mathematical balance."],
          note: "The variation in thickness of a letter's stroke is like pressure. What you see is different from the actual mathematical ratio.",
        },
        {
          layout: "exercise",
          heading: "Kerning Game",
          prompt: "type.method.ac: a letter-spacing game. It names a font, and you move the letters until they look evenly spaced. Trains your eye to space letters individually.",
          time: "5 min",
        },
        {
          layout: "points",
          heading: "Typeface Classifications",
          points: [
            { text: "Serif Typefaces (Old Style, Transitional, Modern, Slab)", font: "Times New Roman" },
            { text: "Sans Serif Typefaces (Grotesque, Neo-Grotesque, Humanist, Geometric)", font: "Comic Sans MS" },
            { text: "Display Typefaces (Script, Blackletter, Inline, Relief, Experimental)", font: "Impact" },
          ],
        },
        { layout: "statement", text: "Typeface selection." },
        {
          layout: "points",
          heading: "Pair by difference",
          points: ["Use contrast to emphasize hierarchy and create visual interest.", "Vary font “volume” to create balance."],
          note: "We often use fonts from the same family, but pairing different fonts is normal too.",
        },
        {
          layout: "gallery",
          heading: "Pairing font by difference",
          items: [
            { src: "img/w2/typography/w4-pair-diff-1.jpg", label: "(a) Helvetica, (b) Univers" },
            { src: "img/w2/typography/w4-pair-diff-2.jpg", label: "(a) Clarendon, (b) Rockwell" },
            { src: "img/w2/typography/w4-pair-diff-3.jpg", label: "(a) Clarendon, (b) Garamond" },
          ],
          note: "The first two pair fonts from the same category. The last pairs fonts from different categories: Clarendon is a slab serif, Garamond is an old serif font from the 16th century.",
        },
        {
          layout: "points",
          heading: "Pair by family",
          points: ["Guaranteed harmony between elements.", "Create hierarchy using font variations.", "Don’t stretch or distort the fonts."],
          note: "An easy way to pair fonts: stay cohesive by family.",
        },
        {
          layout: "gallery",
          heading: "Pairing font by family",
          items: [
            { src: "img/w2/typography/w4-pair-family-1.jpg" },
            { src: "img/w2/typography/w4-pair-family-2.jpg" },
          ],
          caption: "Chivo font family",
          note: "These slides are an example: Chivo for large bodies of text, Chivo Bold for headlines.",
        },
        {
          layout: "points",
          heading: "Pair by similarity",
          points: ["Closely analyze fonts next to each other at the same point size.", "Use font variants to create contrast.", "Be intentional with the function of each typeface."],
          note: "Pair fonts with similar styles. Different typeface, similar size.",
        },
        {
          layout: "gallery",
          heading: "Pairing font by similarity",
          items: [
            { src: "img/w2/typography/w4-pair-sim-1.jpg", label: "(a) Helvetica, (b) Univers" },
            { src: "img/w2/typography/w4-pair-sim-2.jpg", label: "(top) Helvetica, (bottom) Univers" },
          ],
          note: "Different families that appear similar work well together. The main difference between Helvetica and Univers is the spacing and width.",
        },
        {
          layout: "figure",
          src: "img/w2/typography/w4-pair-sim-magazine.jpg",
          caption: "Making Helvetica and Univers work",
          note: "Both are sans serif, and stylistically very similar.",
        },
        {
          layout: "statement",
          text: "Pairing is about balancing similarity and difference.",
          note: "Even with these examples, don't be afraid to explore other methods.",
        },
        { layout: "statement", text: "Type + layout." },
        {
          layout: "points",
          heading: "Using the Grid",
          points: ["Guides content placement and line breaks.", "Grids can aid accessibility.", "Don’t be afraid to break the grid and experiment!"],
        },
        {
          layout: "gallery",
          heading: "Grid Terminology",
          items: [
            { src: "img/w2/typography/w4-grid-format.jpg", label: "Format" },
            { src: "img/w2/typography/w4-grid-margins.jpg", label: "Margins" },
          ],
          note: "The format is sectioned into four-sided polygons, separated by lines. The margins are the boundaries of the grid.",
        },
        {
          layout: "gallery",
          heading: "Grid Terminology",
          items: [
            { src: "img/w2/typography/w4-grid-gutters.jpg", label: "Gutters" },
            { src: "img/w2/typography/w4-grid-flowlines.jpg", label: "Flowlines / baselines" },
          ],
          note: "Gutters are the space between columns and rows. Flowlines and baselines are horizontal lines that break the space into bands, guiding the eye and imposing a start and stop.",
        },
        {
          layout: "gallery",
          heading: "Grid Types",
          items: [
            { src: "img/w2/typography/w4-grid-multicolumn.jpg", label: "Multi-column grid" },
            { src: "img/w2/typography/w4-grid-modular.jpg", label: "Modular grid" },
          ],
        },
        {
          layout: "gallery",
          heading: "Swiss Typography",
          items: [
            { src: "img/w2/typography/w4-swiss-1.jpg" },
            { src: "img/w2/typography/w4-swiss-2.jpg" },
            { src: "img/w2/typography/w4-swiss-3.jpg" },
          ],
          note: "Swiss poster designs, following modular grid guidelines.",
        },
        {
          layout: "gallery",
          heading: "Grid Types",
          items: [
            { src: "img/w2/typography/w4-grid-other-1.jpg" },
            { src: "img/w2/typography/w4-grid-other-2.jpg" },
          ],
          note: "More types of grids that don't follow the conventional patterns.",
        },
        {
          layout: "gallery",
          heading: "Using an Axis",
          items: [
            { src: "img/w2/typography/w4-axis-1.jpg" },
            { src: "img/w2/typography/w4-axis-2.jpg" },
            { src: "img/w2/typography/w4-axis-3.jpg" },
          ],
          note: "Grid outlines don't always run along the x-axis. Elements just need to align to the central axis, no matter which way it turns.",
        },
        {
          layout: "gallery",
          heading: "Radial System",
          items: [
            { src: "img/w2/typography/w4-radial-1.jpg" },
            { src: "img/w2/typography/w4-radial-2.jpg" },
          ],
          note: "Follows a circular topology: elements revolve around a center point, like planets around the sun.",
        },
        {
          layout: "gallery",
          heading: "“Breaking” the grid",
          items: [
            { src: "img/w2/typography/w4-break-grid-1.jpg" },
            { src: "img/w2/typography/w4-break-grid-2.jpg" },
            { src: "img/w2/typography/w4-break-grid-3.jpg" },
          ],
          note: "Breaking the rules is actually harder, because you need to know the rules before you can break them.",
        },
        {
          layout: "points",
          heading: "Structural Typography",
          points: ["Form of type informs the grid.", "Abstracting type + typographic color.", "Type to reinforce imagery."],
        },
        {
          layout: "gallery",
          items: [
            { src: "img/w2/typography/w4-structural-1.jpg" },
            { src: "img/w2/typography/w4-structural-2.jpg" },
          ],
          note: "The text is perfectly aligned with the visual illustration, the question mark guides the text.",
        },
        {
          layout: "gallery",
          items: [
            { src: "img/w2/typography/w4-contrast-1.jpg" },
            { src: "img/w2/typography/w4-contrast-2.jpg" },
          ],
          note: "Blocked-out shapes with visual contrast, thick and thin fonts. The most important info is bolded, easier for the eye to catch.",
        },
        {
          layout: "points",
          heading: "Manipulating Typography",
          points: [
            "Play with color, transparency, texture, material, image masking.",
            "Play with line art, outline, 3D forms.",
            "Play with overlap, geometric shape, unique containers.",
          ],
          note: "Most designers manipulate typography to make their branding distinguishable. The following slides show different ways to manipulate type.",
        },
        {
          layout: "gallery",
          heading: "Staircase",
          items: [
            { src: "img/w2/typography/w4-staircase-1.jpg" },
            { src: "img/w2/typography/w4-staircase-2.jpg" },
            { src: "img/w2/typography/w4-staircase-3.jpg" },
          ],
          note: "A diagonal arrangement of type, reminiscent of stairs going up or down across the format.",
        },
        {
          layout: "gallery",
          heading: "Letterspace",
          items: [
            { src: "img/w2/typography/w4-letterspace-1.jpg" },
            { src: "img/w2/typography/w4-letterspace-2.jpg" },
            { src: "img/w2/typography/w4-letterspace-3.jpg" },
          ],
          note: "Words divided into individual letters or syllables, arranged randomly, and still legible after moving the letters around.",
        },
        {
          layout: "gallery",
          heading: "Repetition",
          items: [
            { src: "img/w2/typography/w4-repetition-1.jpg" },
            { src: "img/w2/typography/w4-repetition-2.jpg" },
          ],
          note: "Repetition puts emphasis on certain words.",
        },
        {
          layout: "gallery",
          heading: "Type on path",
          items: [
            { src: "img/w2/typography/w4-typeonpath-1.jpg" },
            { src: "img/w2/typography/w4-typeonpath-2.jpg" },
            { src: "img/w2/typography/w4-typeonpath-3.jpg" },
          ],
          note: "Playful and fun to look at.",
        },
        {
          layout: "gallery",
          heading: "Hyphens",
          items: [
            { src: "img/w2/typography/w4-hyphens-1.jpg" },
            { src: "img/w2/typography/w4-hyphens-2.jpg" },
            { src: "img/w2/typography/w4-hyphens-3.jpg" },
          ],
          note: "Words divided across two or more lines, sometimes to fit the format, sometimes for no particular reason. A fun, intentional-looking way to fix a word that doesn't fit on one line.",
        },
        {
          layout: "exercise",
          heading: "In-Class Challenge",
          prompt: "Illustrating an artist tag or signature! Get in groups of 2–3, make up an artist group name, and create an artist tag or signature.",
        },
        {
          layout: "gallery",
          heading: "In-Class Challenge examples",
          items: [
            { src: "img/w2/typography/w4-challenge-example-1.jpg" },
            { src: "img/w2/typography/w4-challenge-example-2.jpg" },
            { src: "img/w2/typography/w4-challenge-example-3.jpg" },
            { src: "img/w2/typography/w4-challenge-example-4.jpg" },
          ],
        },
        {
          layout: "points",
          heading: "Resources",
          points: ["dafont.com", "fontspace.com", "Adobe Fonts"],
          note: "I use dafont.com all the time, especially when I have a reference photo and want to manipulate the text to make it my own.",
        },

        { layout: "section", text: "Homework", num: "05" },
        { layout: "assignment" },
        {
          layout: "gallery",
          heading: "Example: a poster redesign",
          items: [
            { src: "img/w2/examples/poster-redesign-before.jpg", label: "Initial Design" },
            { src: "img/w2/examples/poster-redesign-after-1.jpg", label: "Redesign" },
            { src: "img/w2/examples/poster-redesign-after-2.jpg", label: "Redesign" },
          ],
        },
        {
          layout: "gallery",
          heading: "Example: a UI redesign",
          items: [
            { src: "img/w2/examples/ui-redesign-before.jpg", label: "Initial Design" },
            { src: "img/w2/examples/ui-redesign-after.jpg", label: "Redesign" },
          ],
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
       A point can also be { text: "...", font: "Georgia" } when the point is
       what a typeface actually looks like, not just a description of it.

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
     bg:   "#3a0a0a"          fills the whole slide with this background
     fg:   "#3a0a0a"          sets the text color on a bg/fg slide
                              (bg/fg are for demonstrating a color choice
                              live, e.g. a slide that is deliberately hard to
                              read. Set either one and the slide goes
                              full-bleed instead of sitting in a white card.
                              Leave them out and it's a normal slide.)
   ========================================================================== */

if (typeof module !== "undefined") module.exports = COURSE;
