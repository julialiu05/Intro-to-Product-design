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
  CURRENT_WEEK: 4,

  // How many week folders sit on the desktop (index.html), counting from 1.
  // The desktop fills up as the course runs: add one each week you release.
  // Nothing else uses this, so it is safe to keep behind CURRENT_WEEK.
  DESKTOP_WEEKS: 4,

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
      date: "Sep 24",
      title: "Graphic Design Principles",
      status: "published",
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

    {
      week: 3,
      date: "Oct 1",
      title: "Project 1 and critique",
      status: "published",
      summary: "",
      agenda: [
        "Critique of last week's redesigns",
        "Problem statement to design statement",
        "The job in 2026",
        "Example: Reels AI",
        "Find your group",
        "In class: a problem you have noticed",
        "Project 1, deliverables, and this week\u0027s write-up",
      ],
      readings: [
        {
          title: "Problem Statements in UX Discovery",
          author: "Maria Rosala, Nielsen Norman Group",
          kind: "Post",
          url: "https://www.nngroup.com/articles/problem-statements/",
          note: "Short. Read it before you write your problem statement. The rule that matters: a problem statement does not contain a solution.",
        },
        {
          title: "Design role requirements are evolving: the 2026 design job description",
          author: "Ioana Teleanu",
          kind: "Post",
          url: "https://aigoodies.beehiiv.com/p/design-job-requirements-2026",
          note: "Where the 2026 slides come from. Real job posts, read closely. Worth it even if you are not job hunting.",
        },
        {
          title: "Are You Solving the Right Problems?",
          author: "Thomas Wedell-Wedellsborg",
          kind: "Essay",
          optional: true,
          url: "https://hbr.org/2017/01/are-you-solving-the-right-problems",
          note: "Optional. On how often the problem you were handed is the wrong one.",
        },
      ],
      /* `dueDate` stays empty until the week is published, because apps.js puts
         any week carrying a dueDate onto the Calendar whether or not the week
         is a draft. Set it to "2026-10-07" with the other publish switches. */
      assignment: {
        title: "Scope and write-up",
        due: "Wed Oct 7, 11:59pm",
        dueDate: "2026-10-07",
        body: "As a group: the software you picked, the scope of what you are taking on, what you are interested in solving, and your design statement.",
        deliverable: "One write-up per group, every name on it.",
      },
      materials: [],
      /* ------------------------------------------------------------------
         Order: critique, teach, example, groups, project.

         Slides carry labels only. The explaining lives in the notes and in
         the person at the front.

         Worked example is Julia's Reels AI case study, which is this
         assignment done once already. Stills pulled from the demo videos on
         julialius.com, her own work. The 2026 section is from Ioana
         Teleanu's survey of real job postings, May 2026. Credits in
         img/w3/_credits.json.
         ------------------------------------------------------------------ */
      slides: [
        { layout: "title" },

        /* ========== 01 CRITIQUE ========== */
        { layout: "section", text: "Critique", num: "01" },
        {
          layout: "exercise",
          heading: "Critique",
          prompt: "Everyone says something about at least one that isn't theirs.",
          time: "45 min",
        },

        {
          layout: "points",
          heading: "Ask about each one",
          points: [
            "What is it getting someone to do?",
            "What did the original get wrong?",
            "Which change does the most work?",
            "What would you try next?",
          ],
        },
        {
          layout: "statement",
          text: "Decisions, not taste.",
          sub: "“The colour makes the date hard to find,” not “I don't like the colour.”",
        },
        /* Student submissions from "Recommunicate a bad design". Numbered
           rather than named, the same way Week 2 handled the nametags,
           because this repo is public. No headings and no notes on purpose:
           this is a live critique, and labelling it gives the answer away.
           Click any one to blow it up. */
        { layout: "gallery", items: [{ src: "img/w3/critique/critique-01.jpg" }] },
        { layout: "gallery", items: [{ src: "img/w3/critique/critique-02.jpg" }] },
        { layout: "gallery", items: [{ src: "img/w3/critique/critique-03.jpg" }] },
        { layout: "gallery", items: [{ src: "img/w3/critique/critique-04.jpg" }] },
        { layout: "gallery", items: [{ src: "img/w3/critique/critique-05.jpg" }] },
        {
          layout: "gallery",
          items: [
            { src: "img/w3/critique/critique-06.jpg", label: "Original" },
            { src: "img/w3/critique/critique-07.jpg", label: "Redesign" },
          ],
        },
        /* ========== 02 FRAMING ========== */
        { layout: "section", text: "Problem to design statement", num: "02" },
        {
          layout: "two",
          heading: "Two ways it goes wrong",
          left: { label: "A complaint", body: "“Instagram is bad at saving things.”" },
          right: { label: "A solution in disguise", body: "“Add a summarise button.”" },
        },
        {
          layout: "statement",
          text: "A problem statement does not contain a solution.",
          sub: "Nielsen Norman Group",
        },
        {
          layout: "points",
          heading: "A problem statement has three parts",
          points: [
            "Who, specifically.",
            "What they are trying to do.",
            "Why it is hard.",
          ],
        },
        {
          layout: "statement",
          text: "[User] needs a way to [need] because [insight].",
        },
        {
          layout: "statement",
          text: "Worked example: a delivery app.",
          sub: "The problem is people are hungry.",
        },
        {
          layout: "two",
          heading: "Same problem, two ways of saying it",
          left: { label: "How the business says it", body: "Orders drop off after 9pm.\nCart abandonment is up." },
          right: { label: "How a designer says it", body: "Someone opens the app hungry and closes it without ordering." },
        },
        {
          layout: "points",
          heading: "Break it down",
          points: [
            "Who: hungry at 9pm, alone, tired.",
            "What they want: to eat soon.",
            "Why it is hard: 400 restaurants and no way to choose.",
          ],
        },
        {
          layout: "two",
          heading: "The third blank does the work",
          left: { label: "Weak", body: "A hungry person needs a way to order food.\n\nTrue of everyone. Tells you nothing." },
          right: { label: "Stronger", body: "Someone hungry at 9pm needs to decide in under a minute, because the longer they scroll the more likely they give up and eat cereal." },
        },
        {
          layout: "two",
          heading: "Then turn it into a design statement",
          left: { label: "Problem statement", body: "Describes what is wrong.\nEnds in a full stop." },
          right: { label: "Design statement", body: "“How might we help someone decide what to eat before they lose patience?”\nEnds in a question you can answer." },
        },
        {
          layout: "two",
          heading: "How each one goes at it",
          left: { label: "Product manager", body: "Pull the funnel.\nWhere do people drop off?\nSegment by time of day.\nA/B test the home screen." },
          right: { label: "Designer", body: "Watch five people order at 9pm.\nFind the moment they give up.\nScope the problem to that moment." },
        },
        {
          layout: "two",
          heading: "What each one gives you",
          left: { label: "The data", body: "62% leave on the restaurant list.\n\nTells you where. Not why." },
          right: { label: "Watching someone", body: "They open it, scroll, close it, open it again.\n\nTells you why. Not how often." },
        },
        {
          layout: "points",
          heading: "Use both",
          points: [
            "Data finds where it happens.",
            "Watching finds why.",
            "You need the why before you can design anything.",
          ],
        },
        {
          layout: "points",
          heading: "Scope it",
          points: [
            "Too broad: redesign food delivery.",
            "Too narrow: add a surprise me button.",
            "About right: help someone decide what to eat quickly.",
          ],
        },

        /* ========== 03 THE JOB ========== */
        { layout: "section", text: "The job in 2026", num: "03" },
        {
          layout: "quote",
          quote: "A product designer can always be a product manager.",
          attribution: "Julia Liu",
        },
        {
          layout: "points",
          heading: "What that means here",
          points: [
            "You pick what to build.",
            "You defend why.",
            "You ship it.",
          ],
        },
        {
          layout: "points",
          heading: "What companies ask for in 2026",
          points: [
            "Anthropic, Vercel: prototype in HTML, CSS, JS.",
            "Cursor, Linear: iterate in code.",
            "Notion: prototype against real models.",
            "Stripe, Perplexity: designers ship production code.",
          ],
        },
        {
          layout: "chart",
          heading: "Job postings since early 2022",
          bars: [
            { label: "UX research", value: 71, display: "-71%", accent: true },
            { label: "UX design", value: 70, display: "-70%", accent: true },
          ],
          caption: "Ioana Teleanu, 2026. Researchers were laid off at roughly three times the rate of designers.",
        },
        {
          layout: "statement",
          text: "Research is part of the design job now.",
        },
        {
          layout: "points",
          heading: "So on this project",
          points: [
            "You choose the problem.",
            "You build the thing.",
            "You present the reasoning.",
          ],
        },

        /* ========== 04 EXAMPLE ========== */
        /* The finished case study, live in a window rather than screenshotted.
           Scroll it during class. The sections down its left side are the same
           nine parts the project asks for. */
        { layout: "section", text: "Example", num: "04" },
        {
          layout: "site",
          heading: "A feature added to Instagram",
          label: "Reels AI",
          src: "https://www.julialius.com/case-study-6.html#overview",
          body: "Scroll it. Watch the side nav: those sections are what your page needs.",
        },
        {
          layout: "points",
          heading: "What to look at while we scroll",
          points: [
            "Role, timeline, team, skills at the top.",
            "The user journey, drawn, not described.",
            "Competitive analysis, with the gap marked.",
            "Prototypes playing, not screenshotted.",
            "Tradeoffs, benefits against risks.",
          ],
        },
        {
          layout: "two",
          heading: "Every feature has a cost",
          left: { label: "Gives", body: "Saves time.\nPulls the recipe out.\nRuns on tap." },
          right: { label: "Costs", body: "You consume more.\nContext flattens.\nIt reads your messages." },
        },

        /* ========== 05 GROUPS ========== */
        { layout: "section", text: "Find your group", num: "05" },
        {
          layout: "visual",
          side: "right",
          heading: "Groups of 3 to 5",
          body: "Same group until the end of October.",
          points: [
            "Match schedules first.",
            "Group chat.",
            "A weekly time you can all meet.",
          ],
          src: "img/w3/penguins.jpg",
          caption: "Penguins of Madagascar, DreamWorks Animation",
        },
        {
          layout: "exercise",
          heading: "Find your group",
          prompt: "Come back with 3 to 5 names and a way to contact each other.",
          time: "15 min",
        },

        /* ========== 06 ACTIVITY ========== */
        { layout: "section", text: "In class", num: "06" },
        {
          layout: "exercise",
          heading: "On your own",
          prompt: "Think of a problem you have in your daily life. Write down what you have noticed about it.",
          time: "10 min",
        },
        {
          layout: "points",
          heading: "Write down",
          points: [
            "When it happens.",
            "What you do instead.",
            "Who else you have seen hit it.",
            "What you have noticed about it.",
          ],
        },
        {
          layout: "statement",
          text: "No solutions.",
        },
        {
          layout: "exercise",
          heading: "In your group",
          prompt: "Read them to each other. Keep the ones more than one of you has hit.",
          time: "10 min",
        },

        /* ========== 06 PROJECT ========== */
        { layout: "section", text: "Project 1", num: "07" },
        {
          layout: "statement",
          text: "You are tasked to make a software or app better with a new feature.",
        },
        {
          layout: "points",
          heading: "Why an existing app",
          points: [
            "No company to invent first.",
            "It already has users you can talk to.",
            "It already has rules to work inside.",
          ],
        },
        {
          layout: "points",
          heading: "Things that count",
          points: [
            "An app you open every day.",
            "A university system.",
            "A tool from another class.",
            "A game, a bank app, a transit app.",
          ],
        },
        {
          layout: "two",
          heading: "Due end of October",
          left: { label: "Working prototype", body: "Figma, SwiftUI, code.\nYour feature only." },
          right: { label: "Website", body: "Motion graphics.\nNine parts." },
        },
        {
          layout: "statement",
          text: "Website, not a deck.",
          sub: "Video of the prototype running on the page.",
        },
        {
          layout: "points",
          heading: "Nine parts, in this order",
          points: [
            "Overview",
            "Solution",
            "Core flows",
            "Research",
            "Explorations",
            "Prototyping and testing",
            "Design decisions",
            "Constraints",
            "Reflections",
          ],
        },
        {
          layout: "columns",
          heading: "What you made",
          items: [
            { label: "Overview", body: "The software, the problem, the feature. Under 100 words.", list: ["Reels AI: content piles up, summarise it inline"] },
            { label: "Solution", body: "The feature.", list: ["Video, not static screens"] },
            { label: "Core flows", body: "Two or three paths through it.", list: ["Friend sends a reel, you are busy, you come back"] },
          ],
        },
        {
          layout: "columns",
          heading: "How you got there",
          items: [
            { label: "Research", body: "Who you talked to.", list: ["Quote them", "Say what surprised you"] },
            { label: "Explorations", body: "Versions you dropped.", list: ["Include the dead ends"] },
            { label: "Prototyping and testing", body: "What broke.", list: ["And what you changed"] },
          ],
        },
        {
          layout: "columns",
          heading: "Why it looks like this",
          items: [
            { label: "Design decisions", body: "The three or four that mattered.", list: ["Each with the option you turned down"] },
            { label: "Constraints", body: "Time, access, skill, scope.", list: ["Reels AI: solo, one month, no Meta data"] },
            { label: "Reflections", body: "What you would redo.", list: ["Say where you used AI"] },
          ],
        },
        {
          layout: "two",
          heading: "Dates",
          left: { label: "Checkpoints", body: "Oct 8: problem and research.\nOct 15: explorations.\nOct 22: prototype in progress." },
          right: { label: "Due", body: "Thu Oct 29, in class.\nPrototype running.\nPage live.\nEvery group presents." },
        },
        {
          layout: "points",
          heading: "Graded on",
          points: [
            "Evidence for the problem.",
            "Reasons behind the decisions.",
            "Prototype works.",
            "Page is honest about what went wrong.",
          ],
        },

        /* ========== 07 THIS WEEK ========== */
        { layout: "section", text: "This week", num: "08" },
        { layout: "assignment" },
        {
          layout: "points",
          heading: "The write-up has four parts",
          points: [
            "The software you picked.",
            "The scope of what you are taking on.",
            "What you are interested in solving.",
            "Your design statement.",
          ],
        },
      ],
    },

    {
      week: 4,
      date: "Oct 8",
      title: "Research and synthesis",
      status: "published",
      background: "img/w4/pastel-blur-background.jpg",
      summary: "",
      agenda: [
        "Critique of your design statements",
        "Why research",
        "Choosing a method",
        "Interviews",
        "Surveys",
        "Competitive analysis",
        "Usability testing",
        "Some numbers",
        "Synthesis: affinity maps, personas, journeys, quotes",
        "Group work on the research phase",
      ],
      readings: [
        {
          title: "When to Use Which User-Experience Research Methods",
          author: "Christian Rohrer, Nielsen Norman Group",
          kind: "Post",
          url: "https://www.nngroup.com/articles/which-ux-research-methods/",
          note: "The landscape chart from class, explained. Read it before you pick your methods.",
        },
        {
          title: "The Mom Test",
          author: "Rob Fitzpatrick",
          kind: "Book chapter",
          url: "https://www.momtestbook.com/",
          note: "Chapter 1 only. Why everyone lies to you about your idea, and the three rules for asking questions they can't lie about.",
        },
        {
          title: "Journey Mapping 101",
          author: "Sarah Gibbons, Nielsen Norman Group",
          kind: "Post",
          url: "https://www.nngroup.com/articles/journey-mapping-101/",
          note: "The five parts of a journey map, with the Jumping Jamie example from class.",
        },
        {
          title: "Why You Only Need to Test with 5 Users",
          author: "Jakob Nielsen, Nielsen Norman Group",
          kind: "Post",
          optional: true,
          url: "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/",
          note: "Optional. Where the curve comes from, and why three small tests beat one big one.",
        },
        {
          title: "Design Thinking Bootleg",
          author: "Stanford d.school",
          kind: "Book chapter",
          optional: true,
          url: "https://dschool.stanford.edu/resources/design-thinking-bootleg",
          note: "Optional. A deck of method cards. Interview for Empathy, Extreme Users and Story Share-and-Capture are the ones for this week.",
        },
      ],
      assignment: {
        title: "Research plan",
        due: "Wed Oct 14, 11:59pm",
        dueDate: "2026-10-14",
        body: "As a group: brainstorm your feature idea, revise your design statement, pick the research methods you will use and why, and draft your interview and survey questions.",
        deliverable: "One research plan per group, every name on it.",
      },
      materials: [],
      /* ------------------------------------------------------------------
         Order: critique, teach, group work. Same shape as Week 3.

         The worked example all the way through is Week 3's delivery app,
         the person hungry at 9pm, so students watch one problem go through
         every method. The example interview answers, clusters, persona and
         journey are made up for teaching and are labelled as examples.

         Sources, with wording kept where a slide quotes them:
         - Stanford d.school, Design Thinking Bootleg (2018): interview prep,
           Interview for Empathy, Extreme Users, Story Share-and-Capture,
           the 2x2 matrix.
         - Rob Fitzpatrick, The Mom Test: the three rules, bad data.
         - Nielsen Norman Group: Rohrer's research methods landscape;
           survey best practices; leading questions; competitive usability
           evaluations; Nielsen on thinking aloud and on testing with five
           users; task scenarios; affinity diagramming; empathy mapping;
           personas; Journey Mapping 101.
         - Pew Research Center, Writing Survey Questions: the 2008 open
           versus closed question.
         - Jeff Sauro, MeasuringU: SUS, average 68 across 500 studies.
         Image credits in img/w4/_credits.json.
         ------------------------------------------------------------------ */
      slides: [
        { layout: "title" },

        /* ========== 01 CRITIQUE ========== */
        { layout: "section", text: "Critique", num: "01" },
        {
          layout: "points",
          heading: "Ask about each one",
          points: [
            "Who is it for, specifically?",
            "Is there a solution hiding in it?",
            "Is the scope about right?",
            "What would you need to find out first?",
          ],
        },
        /* This week's submissions, typed in word for word from the groups'
           write-ups, including their punctuation. Unnamed, as in Weeks 2
           and 3, because this repo is public, and no headings, so the
           critique is not steered. */
        {
          layout: "columns",
          items: [
            { label: "Software", body: "Weather app." },
            { label: "Scope", body: "Help people decide what to wear that day based on reported weather/temperature by suggesting appropriate clothing." },
            { label: "We are interested in solving", body: "wasting time in the morning deciding what to wear, fluctuating temperatures complicating outfit choices" },
            { label: "Design statement", body: "“How might we help people quickly choose outfits that align with personalized temperature preferences/comfort according to the weather temperature data?”" },
          ],
        },
        {
          layout: "columns",
          items: [
            { label: "The software we picked.", list: ["bCourses"] },
            { label: "The scope of what we are taking on.", list: ["Experience of how students keep track of their grades, important deadlines and updates"] },
            {
              label: "What we are interested in solving.",
              list: [
                "Redesigning the website to be better suited for student life/access",
                "Redesigning bCourses/canvas so people don’t need to download BetterCampus to find more templates/different formats for their canvas homepage",
                "Grade tracking and accessibility redesign",
                "Due date change tracking, seeing what assignments are due (e.g 24 hour email notification)",
                "Rearrange the sidebar to be better for daily usage",
              ],
            },
            { label: "Our design statement.", list: ["How might we help Berkeley students manage their deadlines and important course changes across all classes with confidence. Generally making bCourses to be more personalized, accessible and organized for students."] },
          ],
        },
        {
          layout: "columns",
          items: [
            { label: "Software", body: "Instagram" },
            { label: "HMW", body: "How might we help users personalize the stories they share?" },
            { label: "Problem", body: "When sharing Instagram stories/posts, you want to share to a specific group of people. Right now, Instagram only has two options: Close Friends and Followers. If you want to share something to a specific group, you need to constantly update the Close Friends list." },
            { label: "Solution", body: "Multiple Private sharing groups that you can customize yourself with labels. That way individuals can choose who they want to share their posts with." },
          ],
        },

        /* ========== 02 WHY RESEARCH ========== */
        { layout: "section", text: "Why research", num: "02" },
        {
          layout: "statement",
          text: "You are not the user.",
          sub: "Nielsen Norman Group",
        },
        {
          layout: "two",
          heading: "Where you are",
          left: { label: "Last week", body: "A design statement.\nWritten from what you noticed." },
          right: { label: "This week", body: "Find out if it is true." },
        },
        {
          layout: "points",
          heading: "Research answers three questions",
          points: [
            "Is the problem real?",
            "Who has it, and when?",
            "What do they do about it now?",
          ],
        },
        {
          layout: "statement",
          text: "Research is where the third blank comes from.",
          sub: "[User] needs a way to [need] because [insight].",
        },
        {
          layout: "figure",
          src: "img/w4/double-diamond.jpg",
          caption: "The double diamond, after the UK Design Council",
          tap: "\u{1F4CD} this week: Discover and Define",
        },

        /* ========== 03 CHOOSING A METHOD ========== */
        { layout: "section", text: "Choosing a method", num: "03" },
        {
          layout: "two",
          heading: "Two questions to ask about any method",
          left: { label: "Attitudinal or behavioural?", body: "What people say.\nOr what people do." },
          right: { label: "Qualitative or quantitative?", body: "Why, and how to fix it.\nOr how many, and how much." },
        },
        {
          layout: "figure",
          src: "img/w4/research-methods-landscape.jpg",
          caption: "A Landscape of User Research Methods. Christian Rohrer, Nielsen Norman Group, 2022",
        },
        {
          layout: "points",
          heading: "Pick by what you need to know",
          points: [
            "Is it a real problem? Interview.",
            "How many people have it? Survey.",
            "What already exists? Competitive analysis.",
            "Can people use what we made? Usability test.",
          ],
        },
        {
          layout: "statement",
          text: "This week: the first three.",
          sub: "Testing comes once you have something to test.",
        },

        /* ========== 04 INTERVIEWS ========== */
        /* d.school Bootleg wording on the prep, empathy and extreme user
           slides. The Mom Test wording on its rules and bad data. */
        { layout: "section", text: "Interviews", num: "04" },
        {
          layout: "statement",
          text: "We interview to gain empathy.",
          sub: "Stanford d.school",
        },
        {
          layout: "points",
          heading: "How to prepare for an interview",
          points: [
            "Brainstorm questions.",
            "Identify and order themes.",
            "Refine questions.",
          ],
        },
        {
          layout: "points",
          heading: "How to interview for empathy",
          points: [
            "Ask why. Even when you think you know the answer.",
            "Never say “usually” when asking a question.",
            "Encourage stories.",
            "Look for inconsistencies.",
            "Pay attention to nonverbal cues.",
            "Don't be afraid of silence.",
            "Ask questions neutrally and don't suggest answers.",
          ],
        },
        {
          layout: "statement",
          text: "“Tell me about the last time you ____.”",
          sub: "Stanford d.school",
        },
        {
          layout: "points",
          heading: "The Mom Test",
          points: [
            "Talk about their life instead of your idea.",
            "Ask about specifics in the past instead of generics or opinions about the future.",
            "Talk less and listen more.",
          ],
        },
        {
          layout: "quote",
          quote: "Customer conversations are bad by default. It’s your job to fix them.",
          attribution: "Rob Fitzpatrick, The Mom Test",
        },
        {
          layout: "points",
          heading: "Why they're bad by default",
          points: [
            "Unnatural: a stranger asking how they choose dinner.",
            "Uncomfortable: nobody wants to tell you your idea is bad.",
            "Unhelpful: so they're polite, and say what you want to hear.",
            "Your job: make it feel like an ordinary conversation about their life, so you get the truth.",
          ],
        },
        {
          layout: "statement",
          text: "Example: the delivery app from last week.",
          sub: "Someone hungry at 9pm.",
        },
        /* Don't, ask instead, and why, each why backed by two sources:
           - Your idea: Nielsen, "First Rule of Usability? Don't Listen to
             Users" (NN/g), and The Mom Test, rule 1.
           - Usually: NN/g, "6 Mistakes When Crafting Interview Questions",
             mistake 2, and the d.school Bootleg.
           - Leading: NN/g, "Leading Questions", and Pew on acquiescence bias.
           - Price: Murphy, Allen, Stevens and Weatherhead (2005), "A
             Meta-Analysis of Hypothetical Bias in Stated Preference
             Valuation", Environmental and Resource Economics 30: 28 studies,
             median ratio of hypothetical to actual value 1.35. And The Mom
             Test on asking what they pay now. */
        {
          layout: "columns",
          heading: "Don't ask about your idea",
          items: [
            { label: "Don't", body: "“Would you use an app that picks dinner for you?”" },
            { label: "Ask instead", body: "“Tell me about the last time you ordered food late at night.”" },
            {
              label: "Why",
              body: "People are bad at predicting what they'll do, and they're polite. You'll hear “yes” whether or not it's true.",
              list: ["“Definitely don't believe what people predict they may do in the future.” Jakob Nielsen"],
            },
          ],
        },
        {
          layout: "columns",
          heading: "Don't ask what they usually do",
          items: [
            { label: "Don't", body: "“Do you usually order delivery?”" },
            { label: "Ask instead", body: "“When did you last order delivery? Walk me through it.”" },
            {
              label: "Why",
              body: "“Usually” gets the tidy version they believe about themselves. One real time gets what actually happened, with details you can design for.",
              list: ["“What people typically do and what they think they typically do may be different things!” Nielsen Norman Group"],
            },
          ],
        },
        {
          layout: "columns",
          heading: "Don't suggest the answer",
          items: [
            { label: "Don't", body: "“Don't you hate scrolling through restaurants?”" },
            { label: "Ask instead", body: "“How did you pick where to order from?”" },
            {
              label: "Why",
              body: "The question tells them what you want to hear, and people tend to agree. Now you can't tell their opinion from yours.",
              list: ["A leading question “includes or implies the desired answer.” Nielsen Norman Group"],
            },
          ],
        },
        {
          layout: "columns",
          heading: "Don't ask them to guess a price",
          items: [
            { label: "Don't", body: "“How much would you pay for faster delivery?”" },
            { label: "Ask instead", body: "“What did you spend on delivery last week?”" },
            {
              label: "Why",
              body: "Naming a price costs them nothing, so they guess high. Across 28 studies, the price people said was a median 1.35 times what they really paid.",
              list: ["Murphy, Allen, Stevens and Weatherhead, 2005"],
            },
          ],
        },
        {
          layout: "points",
          heading: "Price still matters. Get it from what they do",
          points: [
            "What they pay now: “What did you spend on food this week?”",
            "What they do to avoid paying: walking to the dining hall to skip a $6 fee.",
            "Later, a real commitment beats a guess: a pre-order, a sign-up, a waitlist.",
          ],
        },
        /* The three types and the three fixes ("deflecting compliments,
           anchoring fluff, and digging beneath ideas") are The Mom Test's,
           chapter 2. The example lines are written for the delivery app. */
        {
          layout: "columns",
          heading: "Three kinds of bad data",
          items: [
            {
              label: "Compliments",
              body: "They like your idea. It feels good, and it tells you nothing.",
              list: ["“That sounds so cool.”", "Fix: deflect it, and go back to their life."],
            },
            {
              label: "Fluff",
              body: "Generics, hypotheticals, and the future. What they think they do, not what they did.",
              list: ["“I usually…”, “I would…”, “I might…”", "Fix: anchor it. “When did that last happen?”"],
            },
            {
              label: "Ideas",
              body: "Often good suggestions. Write them down. But an idea isn't evidence: it's their solution, not their problem.",
              list: ["“You should add a filter for cheap food.”", "Fix: dig beneath it. “Why would that help?” The answer is the data."],
            },
          ],
        },
        {
          layout: "two",
          heading: "When you get one, steer back",
          left: { label: "They say", body: "“Oh, I'd totally use an app that picks dinner for me!”" },
          right: { label: "You ask", body: "“When's the last time you couldn't decide what to eat? What did you end up doing?”" },
        },
        {
          layout: "points",
          heading: "Who to talk to",
          points: [
            "People who actually have the problem: someone who orders late at night.",
            "Not only your friends. They'll be too nice.",
            "Extreme users: the person who orders every night, and the one who never does.",
            "A mix: different schedules, budgets, living situations.",
          ],
        },
        {
          layout: "exercise",
          heading: "In pairs",
          prompt: "Interview your neighbour about the last time they ordered food. Then swap.",
          time: "6 min",
        },

        /* ========== 05 SURVEYS ========== */
        /* Pew Research Center for the open and closed question. Bad and
           better pairs from NN/g's survey best practices, except the scale. */
        { layout: "section", text: "Surveys", num: "05" },
        {
          layout: "two",
          heading: "Interview or survey",
          left: { label: "Interview", body: "Five people.\nWhy." },
          right: { label: "Survey", body: "Fifty people.\nHow many." },
        },
        {
          layout: "statement",
          text: "The wording changes the answer.",
          sub: "Pew Research Center",
        },
        /* Three wording experiments. Pew's question is quoted from Writing
           Survey Questions. Loftus and Palmer (1974), "Reconstruction of
           automobile destruction", Journal of Verbal Learning and Verbal
           Behavior 13. Rugg (1941), the allow and forbid split ballot. */
        {
          layout: "statement",
          text: "“What one issue mattered most to you in deciding how you voted for president?”",
          sub: "Pew Research Center, after the 2008 election. Half were given a list of five issues. Half got a blank box.",
        },
        {
          layout: "chart",
          heading: "Same question, asked two ways",
          bars: [
            { label: "Given a list", value: 58, display: "58%", accent: true },
            { label: "Blank box", value: 35, display: "35%" },
          ],
          caption: "Share who said the economy. And 43% of the blank-box group named something that wasn't on the list at all.",
        },
        {
          layout: "statement",
          text: "“About how fast were the cars going when they ___ each other?”",
          sub: "Loftus and Palmer, 1974. Everyone watched the same car crash. Only the verb changed.",
        },
        {
          layout: "chart",
          heading: "Estimated speed, by verb",
          bars: [
            { label: "smashed", value: 40.8, display: "40.8 mph", accent: true },
            { label: "collided", value: 39.3, display: "39.3 mph" },
            { label: "bumped", value: 38.1, display: "38.1 mph" },
            { label: "hit", value: 34.0, display: "34.0 mph" },
            { label: "contacted", value: 31.8, display: "31.8 mph" },
          ],
          caption: "A week later, 32% of the “smashed” group remembered broken glass, against 14% of the “hit” group. There was no broken glass.",
        },
        {
          layout: "statement",
          text: "“Do you think that the United States should allow / forbid public speeches against democracy?”",
          sub: "Rugg, 1941. Half were asked “allow”, half were asked “forbid”. Either way, it's the same ban.",
        },
        {
          layout: "chart",
          heading: "Wanted the speeches banned",
          bars: [
            { label: "Asked “allow?”", value: 62, display: "62%", accent: true },
            { label: "Asked “forbid?”", value: 46, display: "46%" },
          ],
          caption: "Same rule. “Forbid” sounds harsher than “not allow”, so fewer people would say it.",
        },
        {
          layout: "points",
          heading: "Four ways a question goes wrong",
          points: [
            "It leads.",
            "It asks two things at once.",
            "It asks about the future.",
            "The scale is lopsided.",
          ],
        },
        {
          layout: "two",
          heading: "It leads",
          left: { label: "Bad", body: "“We're committed to achieving 5-star ratings. How satisfied are you?”" },
          right: { label: "Better", body: "“Rate your experience.”" },
        },
        {
          layout: "two",
          heading: "It asks two things at once",
          left: { label: "Bad", body: "“How easy and intuitive was this website?”" },
          right: { label: "Better", body: "“How easy was this website?”\n“How intuitive was the process?”" },
        },
        {
          layout: "two",
          heading: "It asks about the future",
          left: { label: "Bad", body: "“How likely are you to use this product?”" },
          right: { label: "Better", body: "“Approximately how many times did you use this in the past 7 days?”" },
        },
        {
          layout: "two",
          heading: "The scale is lopsided",
          left: { label: "Bad", body: "Excellent\nVery good\nGood\nPoor\n\nThree good, one bad." },
          right: { label: "Better", body: "Very satisfied\nSatisfied\nNeutral\nDissatisfied\nVery dissatisfied" },
        },
        {
          layout: "points",
          heading: "Make it easy to finish",
          points: [
            "Short. Only what you need.",
            "Mostly multiple choice.",
            "One open question at the end.",
            "Add “Other” and “Not sure”.",
          ],
        },
        /* Demographics: NN/g, "Writing Good Survey Questions" (ask only
           what you will use, make questions optional, more than two gender
           options plus an opt-out). */
        {
          layout: "statement",
          text: "Demographics: ask only what you'll use.",
          sub: "“Do you need all that demographic information? Will you use it to answer your research questions?” Nielsen Norman Group",
        },
        {
          layout: "points",
          heading: "If you ask",
          points: [
            "Make them optional.",
            "Gender: more than two options, plus “Prefer not to say”.",
            "Ask what's relevant: year, where they live, how often they order.",
            "Skip what changes nothing: star sign, hobbies, full name.",
          ],
        },
        {
          layout: "statement",
          text: "Use the survey to find people to interview.",
          sub: "Last question: “Can we talk to you for 15 minutes?”",
        },
        {
          layout: "points",
          heading: "Who answered?",
          points: [
            "Your group chat is not a sample.",
            "Post where the users are.",
            "Say how many answered, and where you found them.",
          ],
        },
        /* Incentives, kept light on purpose: students should not feel they
           have to pay anyone. Backed by Singer and Ye (2013), "The Use and
           Effects of Incentives in Surveys", Annals of the American Academy
           of Political and Social Science 645, and NSSE (Indiana University)
           Survey Incentive FAQ: raffles add 3 to 6 points of response for
           college students. */
        {
          layout: "points",
          heading: "Optional: a small thank-you",
          points: [
            "Some researchers offer one to get more people to respond.",
            "Not required for this project.",
            "If you want to: a coffee, a snack, a raffle entry.",
          ],
        },

        /* ========== 06 COMPETITIVE ANALYSIS ========== */
        /* Two reasons to study competitors, both NN/g: "Competitive
           Usability Evaluations" (learn from competitors' usability work,
           find features worth integrating, study sites better than yours)
           and Jakob's Law. d.school Bootleg for the 2x2. The 2x2 is from
           Julia's Reels AI case study, the Week 3 example, rendered from
           julialius.com. SWOT diagram by Xhienne, Wikimedia Commons,
           CC BY-SA 2.5. The feature grid and SWOT contents are made up and
           labelled as examples, and use "App A" and "App B" rather than
           real company names so nothing reads as a claim about a real app. */
        { layout: "section", text: "Competitive analysis", num: "06" },
        {
          layout: "two",
          heading: "Two reasons to study competitors",
          left: { label: "Learn from them", body: "What do they already do well?\nWhat do users already expect?" },
          right: { label: "Find the gap", body: "What does nobody do yet?\nWhere could you stand out?" },
        },
        {
          layout: "quote",
          quote: "Users spend most of their time on other sites. This means that users prefer your site to work the same way as all the other sites they already know.",
          attribution: "Jakob's Law, Nielsen Norman Group",
        },
        {
          layout: "statement",
          text: "Study the good ones, not just the bad ones.",
          sub: "“It's equally important to study sites with better usability than yours.” Nielsen Norman Group",
        },
        /* Photos from Wikimedia Commons: Uber Eats cyclist in Manchester by
           shopblocks (CC BY 2.0), Blue Apron box by Yongho Kim (CC BY-SA
           4.0), bowl of cereal by Yvens Banatte (CC0). Milkshake example
           from the Christensen Institute, Jobs to Be Done: the morning
           competition "wasn't other fast food milkshakes; rather, bananas
           and bagels". */
        {
          layout: "columns",
          heading: "Three kinds of competitors",
          items: [
            {
              label: "Direct",
              body: "Does the same job, the same way. Your users already compare you to these.",
              list: ["Look for: what users expect as standard"],
            },
            {
              label: "Indirect",
              body: "Does the same job, a different way.",
              list: ["Look for: why someone picks these over an app"],
            },
            {
              label: "What they do instead",
              body: "What people do now without any product at all. Often your real competition.",
              list: ["Look for: what makes it easier than your app"],
            },
          ],
        },
        {
          layout: "gallery",
          heading: "Examples, for a delivery app",
          items: [
            { src: "img/w4/competitor-direct-delivery.jpg", label: "Direct", note: "DoorDash, Uber Eats, Grubhub" },
            { src: "img/w4/competitor-indirect-meal-kit.jpg", label: "Indirect", note: "Meal kits, grocery delivery, the dining hall" },
            { src: "img/w4/competitor-instead-cereal.jpg", label: "What they do instead", note: "Cereal, leftovers, a roommate's dinner, skipping it" },
          ],
          caption: "Photos: shopblocks, CC BY 2.0; Yongho Kim, CC BY-SA 4.0; Yvens Banatte, CC0. Wikimedia Commons",
        },
        {
          layout: "statement",
          text: "Your real competition is often not an app.",
          sub: "If ordering takes more effort than pouring cereal, cereal wins.",
        },
        {
          layout: "statement",
          text: "A fast-food chain found its morning milkshakes were competing with bananas and bagels.",
          sub: "Commuters wanted something filling they could hold in the car. Clayton Christensen, Jobs to Be Done",
        },
        {
          layout: "columns",
          heading: "Find out what they do instead",
          items: [
            {
              label: "Ask what they did instead",
              body: "Ask about a real time they didn't use any app.",
              list: ["“Last time you were hungry late and didn't order, what did you do?”"],
            },
            {
              label: "Ask why",
              body: "Their reason is what your app has to beat.",
              list: ["“Cereal was right there.” It has to be faster.", "“Delivery's too expensive.” It has to be cheaper."],
            },
            {
              label: "Listen for workarounds",
              body: "Homemade fixes show where products fall short.",
              list: ["A screenshot of the one menu they always order from", "A group chat to split one delivery fee"],
            },
            {
              label: "Doing nothing counts",
              body: "Skipping it is a choice too.",
              list: ["“I just went to bed.” Is ordering worth the effort?"],
            },
          ],
        },
        {
          layout: "points",
          heading: "Three ways to lay it out",
          points: [
            "Feature grid: what each one has.",
            "2x2: where each one sits.",
            "SWOT: one competitor, up close.",
          ],
        },
        {
          layout: "columns",
          heading: "Example feature grid",
          items: [
            { label: "App A", list: ["Filter by price: yes", "Total before checkout: no", "Reorder in one tap: yes"] },
            { label: "App B", list: ["Filter by price: yes", "Total before checkout: yes", "Reorder in one tap: no"] },
            { label: "Dining hall", list: ["Filter by price: n/a", "Total before checkout: yes", "Reorder in one tap: n/a"] },
            { label: "What you learn", list: ["Price filters are expected. Have one.", "Only one shows the total early. A gap."] },
          ],
        },
        {
          layout: "points",
          heading: "2x2",
          points: [
            "Pick two things your user cares about.",
            "Make each one an axis.",
            "Place each competitor.",
            "Look at the empty corner.",
          ],
        },
        {
          layout: "figure",
          src: "img/w4/competitive-2x2-reels-ai.jpg",
          caption: "Competitive 2x2 from the Reels AI case study, Julia Liu. Nobody is AI-powered and integrated into the feed. That's the gap.",
        },
        {
          layout: "quote",
          quote: "An empty quadrant may signal a market opportunity (or a very bad idea).",
          attribution: "Stanford d.school",
        },
        {
          layout: "figure",
          src: "img/w4/swot-analysis.jpg",
          caption: "SWOT analysis. Diagram by Xhienne, Wikimedia Commons, CC BY-SA 2.5",
        },
        {
          layout: "columns",
          heading: "Example SWOT: App A",
          items: [
            { label: "Strengths", body: "What it does well.", list: ["Huge choice", "Fast delivery"] },
            { label: "Weaknesses", body: "Where it falls short.", list: ["Slow to decide", "Fees appear at checkout"] },
            { label: "Opportunities", body: "Outside things it could use.", list: ["More students living off campus", "Late-night hunger"] },
            { label: "Threats", body: "Outside things that could hurt it.", list: ["The dining hall is cheaper", "Cooking at home"] },
          ],
        },
        {
          layout: "statement",
          text: "Keep what works. Build what's missing.",
        },

        /* ========== 07 USABILITY TESTING ========== */
        /* Nielsen on think-aloud and on five users. Curve is his formula,
           1 - (1 - 0.31)^n, rounded. Task pairs are NN/g's wording. */
        { layout: "section", text: "Usability testing", num: "07" },
        /* Intro from NN/g, "Usability Testing 101": "The only way to get UX
           design right is to test it", the three goals, and the facilitator,
           participant and tasks. */
        {
          layout: "statement",
          text: "The only way to get UX design right is to test it.",
          sub: "Nielsen Norman Group",
        },
        {
          layout: "two",
          heading: "Research, then testing",
          left: { label: "Research: this week", body: "Are we solving the right problem?" },
          right: { label: "Usability testing: once you've built something", body: "Did we solve it in a way people can actually use?" },
        },
        {
          layout: "points",
          heading: "Why test",
          points: [
            "Find the problems in your design.",
            "Find chances to make it better.",
            "Learn how your users actually behave.",
          ],
        },
        {
          layout: "statement",
          text: "You know how your design works. Your users don't.",
          sub: "What's obvious to you after weeks of work is new to them. Watching them is the only way to see that.",
        },
        {
          layout: "columns",
          heading: "A usability test has three parts",
          items: [
            { label: "Facilitator", body: "Gives the tasks and watches, without steering." },
            { label: "Participant", body: "A realistic user of the product. Often thinks aloud." },
            { label: "Tasks", body: "Realistic things they'd really do, worded so they don't give away the answer." },
          ],
        },
        {
          layout: "quote",
          quote: "Thinking aloud may be the single most valuable usability engineering method.",
          attribution: "Jakob Nielsen",
        },
        {
          layout: "points",
          heading: "Think aloud",
          points: [
            "Recruit representative users.",
            "Give them representative tasks.",
            "Let them talk. Don't help.",
          ],
        },
        {
          layout: "chart",
          heading: "Problems found, by number of people",
          bars: [
            { label: "1 person", value: 31, display: "31%" },
            { label: "2 people", value: 52, display: "52%" },
            { label: "3 people", value: 67, display: "67%" },
            { label: "5 people", value: 85, display: "85%", accent: true },
            { label: "10 people", value: 98, display: "98%" },
            { label: "15 people", value: 100, display: "~100%" },
          ],
          caption: "Jakob Nielsen, 2000. Each person finds about 31% of the problems, and the rest repeat.",
        },
        {
          layout: "quote",
          quote: "The ultimate user experience is improved much more by 3 studies with 5 users each than by a single monster study with 15 users.",
          attribution: "Jakob Nielsen",
        },
        {
          layout: "two",
          heading: "Make the task realistic",
          left: { label: "Bad", body: "“Purchase a pair of orange Nike running shoes.”" },
          right: { label: "Better", body: "“Buy a pair of shoes for less than $40.”" },
        },
        {
          layout: "two",
          heading: "Make it something they do",
          left: { label: "Bad", body: "“Go to www.fandango.com and tell me where you'd click next.”" },
          right: { label: "Better", body: "“Use www.fandango.com to find a movie you'd be interested in seeing on Sunday afternoon.”" },
        },
        {
          layout: "two",
          heading: "Don't give away the steps",
          left: { label: "Bad", body: "“Go to the website, sign in, and tell me where you would click to get your transcript.”" },
          right: { label: "Better", body: "“Look up the results of your midterm exams.”" },
        },
        {
          layout: "points",
          heading: "While they test",
          points: [
            "Watch what they do, not what they say.",
            "If they ask you, ask back: “What do you think?”",
            "Write down where they stop.",
          ],
        },
        {
          layout: "two",
          heading: "After, ask neutrally",
          left: { label: "Leading", body: "“Why did you have difficulty with the navigation?”" },
          right: { label: "Neutral", body: "“What was easy or difficult about getting to the information you wanted?”" },
        },

        /* ========== 08 NUMBERS ========== */
        /* The five times are invented for the example. SUS benchmark is Jeff
           Sauro's, MeasuringU. */
        { layout: "section", text: "Some numbers", num: "08" },
        {
          layout: "two",
          heading: "Say it honestly",
          left: { label: "Bad", body: "“80% of users wanted this.”" },
          right: { label: "Better", body: "“4 of the 5 people we talked to.”" },
        },
        {
          layout: "chart",
          heading: "Time to place an order",
          bars: [
            { label: "Person 1", value: 32, display: "32s" },
            { label: "Person 2", value: 35, display: "35s" },
            { label: "Person 3", value: 38, display: "38s" },
            { label: "Person 4", value: 41, display: "41s" },
            { label: "Person 5", value: 240, display: "240s", accent: true },
          ],
          caption: "Example data. Five people, one task.",
        },
        {
          layout: "two",
          heading: "Two kinds of average",
          left: { label: "Mean", body: "77 seconds.\nPulled up by one person." },
          right: { label: "Median", body: "38 seconds.\nWhat most people did." },
        },
        {
          layout: "statement",
          text: "Don't average Person 5 away.",
          sub: "Go find out what happened to them.",
        },
        {
          layout: "points",
          heading: "Numbers worth recording in a test",
          points: [
            "Success: did they finish?",
            "Time on task.",
            "Errors.",
            "SUS: ten questions, scored 0 to 100.",
          ],
        },
        /* SUS: the ten items verbatim, the scoring, "it isn't a percentage",
           the grades and the small-sample note are all from Jeff Sauro,
           MeasuringU, "Measuring Usability with the System Usability Scale". */
        {
          layout: "statement",
          text: "SUS: the System Usability Scale.",
          sub: "John Brooke, 1986. A short questionnaire people fill in right after a test, so you get one usability score.",
        },
        {
          layout: "points",
          heading: "The ten statements",
          points: [
            "I think that I would like to use this system frequently.",
            "I found the system unnecessarily complex.",
            "I thought the system was easy to use.",
            "I think that I would need the support of a technical person to be able to use this system.",
            "I found the various functions in this system were well integrated.",
            "I thought there was too much inconsistency in this system.",
            "I would imagine that most people would learn to use this system very quickly.",
            "I found the system very cumbersome to use.",
            "I felt very confident using the system.",
            "I needed to learn a lot of things before I could get going with this system.",
          ],
        },
        {
          layout: "two",
          heading: "How people answer",
          left: { label: "Each statement", body: "1: Strongly disagree\n2\n3\n4\n5: Strongly agree" },
          right: { label: "Notice", body: "The odd ones are good things.\nThe even ones are bad things.\n\nSo agreeing with everything doesn't give a high score." },
        },
        {
          layout: "points",
          heading: "Scoring it",
          points: [
            "Odd statements: their answer minus 1.",
            "Even statements: 5 minus their answer.",
            "Add all ten, then multiply by 2.5.",
            "You get a score from 0 to 100.",
          ],
        },
        {
          layout: "statement",
          text: "A SUS score isn't a percentage.",
          sub: "70 doesn't mean 70% usable. It's just a little above average.",
        },
        {
          layout: "statement",
          text: "68",
          sub: "The average SUS score across 500 studies. Jeff Sauro, MeasuringU",
        },
        {
          layout: "chart",
          heading: "What a score means",
          bars: [
            { label: "Average (C)", value: 68, display: "68" },
            { label: "Excellent (A)", value: 80.3, display: "80.3+", accent: true },
            { label: "Highest possible", value: 100, display: "100" },
          ],
          caption: "Jeff Sauro, MeasuringU. It works even with very small groups, so five testers is enough.",
        },
        {
          layout: "two",
          heading: "Correlation isn't causation",
          left: { label: "What the data says", body: "People who use the filter order more often." },
          right: { label: "What it might mean", body: "The filter helps.\n\nOr people who order a lot are the ones who find the filter." },
        },
        {
          layout: "points",
          heading: "When you report a survey",
          points: [
            "Say how many: n = 42.",
            "Show the counts, not just the percentages.",
            "Say who you didn't reach.",
          ],
        },

        /* ========== 09 SYNTHESIS ========== */
        /* NN/g wording on the affinity steps and tips, the empathy map
           quadrants, the persona definition and the journey map parts.
           d.school for the story share. Clusters, persona and journey for
           the delivery app are made-up examples. */
        { layout: "section", text: "Synthesis", num: "09" },
        {
          layout: "two",
          heading: "What you saw, and what it means",
          left: { label: "Observation", body: "“She scrolled for four minutes, then closed the app.”" },
          right: { label: "Insight", body: "“Too much choice makes people give up, so the hungriest people order the least.”" },
        },
        {
          layout: "points",
          heading: "Synthesis, in order",
          points: [
            "Story share.",
            "Affinity map.",
            "Persona.",
            "Journey map.",
            "Pick the quotes.",
          ],
        },
        {
          layout: "statement",
          text: "Story share-and-capture.",
          sub: "After interviewing, tell your team the stories you heard. One thing per sticky note.",
        },
        {
          layout: "figure",
          src: "img/w4/affinity-wall.jpg",
          caption: "Affinity wall, Wikipedia usability study, 2009. Photo by Parul Vora, CC BY-SA 3.0",
        },
        {
          layout: "points",
          heading: "Affinity diagram",
          points: [
            "Generate ideas as sticky notes.",
            "Organize notes into clusters or themes.",
            "Prioritize clusters and next steps.",
          ],
        },
        {
          layout: "points",
          heading: "Tips",
          points: [
            "One note, one thing.",
            "Write alone first.",
            "Group by what they say before naming the group.",
            "Small clusters count.",
          ],
        },
        {
          layout: "figure",
          src: "img/w4/affinity-wall-clustered.jpg",
          caption: "The same study, clustered. Photo by Parul Vora, CC BY-SA 3.0",
        },
        {
          layout: "columns",
          heading: "Example: three clusters",
          items: [
            { label: "Too many choices", list: ["“I just scroll forever.”", "Closed the app twice before ordering", "Picked by photo, not menu"] },
            { label: "Fees show up late", list: ["“It was $14, then $26 at checkout.”", "Checks the total before the food"] },
            { label: "Fall back on habit", list: ["“I just get what I got last time.”", "Reorders the same three places"] },
          ],
        },
        {
          layout: "columns",
          heading: "Empathy map",
          items: [
            { label: "Says", body: "Direct quotes.", list: ["“I just get what I got last time.”"] },
            { label: "Thinks", body: "What goes through their mind.", list: ["“Is this even worth $26?”"] },
            { label: "Does", body: "What they do, as opposed to what they say.", list: ["Opens and closes the app twice"] },
            { label: "Feels", body: "An adjective, and why.", list: ["Tired: has been deciding all day"] },
          ],
        },
        {
          layout: "quote",
          quote: "A persona is a fictional, yet realistic, description of a typical or target user of the product.",
          attribution: "Nielsen Norman Group",
        },
        {
          layout: "figure",
          src: "img/w4/persona-example.jpg",
          caption: "Example persona, Nielsen Norman Group",
        },
        {
          layout: "points",
          heading: "What goes in",
          points: [
            "A name and a photo.",
            "Goals.",
            "Frustrations.",
            "How and when they use it.",
            "A real quote.",
          ],
        },
        {
          layout: "statement",
          text: "Each piece of information should have a purpose for being included.",
          sub: "Nielsen Norman Group",
        },
        {
          layout: "two",
          heading: "Leave it out",
          left: { label: "Doesn't change a decision", body: "Favourite wine.\nStar sign.\nHobbies." },
          right: { label: "Does", body: "Works until 8pm.\nHas $15 for dinner.\nOrders on her phone, in bed." },
        },
        {
          layout: "columns",
          heading: "Example persona: Late-shift Lena",
          items: [
            { label: "Who", body: "Junior. Lives off campus. Works until 8pm three nights a week.", list: ["Orders on her phone", "Usually alone"] },
            { label: "Goals", list: ["Eat within 30 minutes", "Spend under $15", "Not have to think about it"] },
            { label: "Frustrations", list: ["Too many options", "Fees she finds at checkout", "Ends up eating the same thing"] },
          ],
        },
        {
          layout: "quote",
          quote: "By the time I pick something I'm not even hungry anymore, I'm just annoyed.",
          attribution: "Lena, example persona",
        },
        /* NN/g lists name, age, gender and photo among what a persona
           needs ("Personas Make Users Memorable"), and titles the section in
           "Personas vs. Jobs-to-Be-Done" "Good Personas Go Beyond
           Demographics". The roommate example is made up. */
        {
          layout: "statement",
          text: "Good personas go beyond demographics.",
          sub: "Nielsen Norman Group",
        },
        {
          layout: "two",
          heading: "A persona needs both",
          left: { label: "Demographics: who they are", body: "20. Junior.\nLives off campus.\n\nMakes the persona feel like a real person." },
          right: { label: "Behaviour: what they do", body: "Works until 8pm.\nOrders three times a week.\nHas $15 for dinner.\n\nWhat you design for." },
        },
        {
          layout: "two",
          heading: "Same demographics, different persona",
          left: { label: "Lena", body: "20, junior, off campus.\n\nGets home at 9pm and orders delivery." },
          right: { label: "Her roommate", body: "20, junior, off campus.\n\nCooks every night and never opens the app." },
        },
        {
          layout: "statement",
          text: "A persona is a pattern of behaviour, not a demographic group.",
        },
        /* Several personas: NN/g, "Segment Analytics Data Using Personas"
           ("most commonly, 3–7 personas will cover the majority of an
           audience", and a segment "should display user behavior that is
           clearly different" and "represent a sizeable chunk"). Primary
           persona: Alan Cooper and Robert Reimann, About Face ("Design each
           interface for a single, primary persona"). Wes and Kai are made
           up, like Lena. */
        {
          layout: "statement",
          text: "Most products have more than one kind of user.",
          sub: "“Most commonly, 3–7 personas will cover the majority of an audience.” Nielsen Norman Group. For one feature, 2 or 3 is plenty.",
        },
        {
          layout: "points",
          heading: "Finding your groups",
          points: [
            "Go back to your affinity map.",
            "Look for people who behave differently, not people who look different.",
            "Each group should be clearly different, and big enough to matter.",
            "One persona per group.",
          ],
        },
        {
          layout: "columns",
          heading: "Example: three groups for the delivery app",
          items: [
            { label: "Late-shift Lena", body: "Orders alone, late, tired, on a budget.", list: ["Gives up when there's too much choice"] },
            { label: "Weekend Wes", body: "Orders with friends on weekends.", list: ["Splitting the bill is the hard part"] },
            { label: "Cook-at-home Kai", body: "Cooks most nights. Orders when sick.", list: ["Wants it fast and simple, rarely"] },
          ],
        },
        {
          layout: "quote",
          quote: "Design each interface for a single, primary persona.",
          attribution: "Alan Cooper and Robert Reimann, About Face",
        },
        {
          layout: "two",
          heading: "Primary and secondary",
          left: { label: "Primary", body: "Who you design for first.\n\nHere: Lena. She's the one closing the app at 9pm." },
          right: { label: "Secondary", body: "Who you make sure it still works for.\n\nHere: Wes and Kai." },
        },
        {
          layout: "statement",
          text: "Personas help you narrow down who your feature is really for.",
        },
        {
          layout: "quote",
          quote: "A journey map is a visualization of the process that a person goes through in order to accomplish a goal.",
          attribution: "Nielsen Norman Group",
        },
        {
          layout: "figure",
          src: "img/w4/journey-map-template.jpg",
          caption: "Journey map, Nielsen Norman Group",
        },
        {
          layout: "points",
          heading: "Five parts",
          points: [
            "Actor.",
            "Scenario and expectations.",
            "Journey phases.",
            "Actions, mindsets and emotions.",
            "Opportunities.",
          ],
        },
        {
          layout: "figure",
          src: "img/w4/journey-map-mobile-plan.jpg",
          caption: "Jumping Jamie switches mobile plans. Nielsen Norman Group",
        },
        {
          layout: "columns",
          heading: "Example journey: Lena at 9pm",
          items: [
            { label: "Hungry", list: ["Opens the app on the bus", "“What do I even want?”", "Feels: fine"] },
            { label: "Browse", list: ["Scrolls 40 restaurants", "“They all look the same.”", "Feels: tired"] },
            { label: "Checkout", list: ["Sees the fees", "“$26?”", "Feels: annoyed"] },
            { label: "Gives up", list: ["Closes the app", "Eats cereal", "Feels: defeated"] },
          ],
        },
        {
          layout: "statement",
          text: "The low point is the opportunity.",
          sub: "Here: Browse.",
        },
        {
          layout: "points",
          heading: "A good quote",
          points: [
            "Is what they said, word for word.",
            "Shows a feeling or a reason, not just a fact.",
            "Makes the problem obvious without you explaining it.",
            "Stands for a pattern, not one person.",
          ],
        },
        {
          layout: "two",
          heading: "Pick the one that does the work",
          left: { label: "Weak", body: "“Yeah, it's fine I guess.”" },
          right: { label: "Strong", body: "“By the time I pick something I'm not even hungry anymore, I'm just annoyed.”" },
        },
        {
          layout: "points",
          heading: "Rules for quotes",
          points: [
            "Quote, don't paraphrase.",
            "Cut with “...”, never add.",
            "Name the role, not the person: “junior, lives off campus”.",
            "Ask before you use it.",
          ],
        },
        {
          layout: "two",
          heading: "Check your design statement",
          left: { label: "Before research", body: "“How might we help someone decide what to eat before they lose patience?”" },
          right: { label: "If your primary persona sharpens it", body: "“How might we help a student who works late pick a dinner they can afford in under a minute?”" },
        },

        /* ========== 10 THIS WEEK ========== */
        { layout: "section", text: "This week", num: "10" },
        { layout: "assignment" },
        {
          layout: "points",
          heading: "The research plan",
          points: [
            "Brainstorm: a few directions for your feature, not one answer.",
            "Your design statement, revised.",
            "Which methods you'll use, and why: interviews, a survey, competitive analysis.",
            "Who you'll talk to, and how you'll find them.",
            "Draft interview and survey questions, using the methods and tips from today.",
          ],
        },

        /* ========== 11 GROUP WORK ========== */
        { layout: "section", text: "Group work", num: "11" },
        {
          layout: "exercise",
          heading: "In your group",
          prompt: "The rest of class is yours. Plan your research, then start it.",
          time: "Rest of class",
        },
        {
          layout: "points",
          heading: "Before you leave",
          points: [
            "Who you will talk to, and how many.",
            "A first draft of your interview questions.",
            "Your 2 to 4 competitors.",
            "Who does what, by when.",
          ],
        },
      ],
    },

    {
      week: 5,
      date: "Oct 15",
      title: "From research to a prototype",
      status: "draft",
      summary: "",
      agenda: [
        "Critique of your research plans",
        "From findings to ideas",
        "Choosing one",
        "Flow and wireframe",
        "Start building",
        "Figma basics",
        "Make it clickable",
        "Prototype only what matters",
        "Build your first screen",
        "Explorations and first screens, due next week",
      ],
      readings: [
        {
          title: "Using “How Might We” Questions to Ideate on the Right Problems",
          author: "Maria Rosala, Nielsen Norman Group",
          kind: "Post",
          url: "https://www.nngroup.com/articles/how-might-we-questions/",
          note: "Read it before you write your HMW questions. The rule that matters: a good one does not have a solution hiding in it.",
        },
        {
          title: "Guide to auto layout",
          author: "Figma Help Center",
          kind: "Post",
          url: "https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout",
          note: "The one Figma feature worth learning properly this week. Everything you build next week sits on it.",
        },
        {
          title: "Wireflows: A UX Deliverable for Workflows and Apps",
          author: "Page Laubheimer, Nielsen Norman Group",
          kind: "Post",
          url: "https://www.nngroup.com/articles/wireflows/",
          note: "Wireframes and flows on one page. A good shape for the homework.",
        },
        {
          title: "7 Simple Rules of Brainstorming",
          author: "IDEO U",
          kind: "Post",
          optional: true,
          url: "https://www.ideou.com/blogs/inspiration/7-simple-rules-of-brainstorming",
          note: "Optional. Short. For when your group sits down to come up with ideas.",
        },
      ],
      /* `dueDate` stays empty until the week is published, because apps.js puts
         any week carrying a dueDate onto the Calendar whether or not the week
         is a draft. Set it to "2026-10-21" with the other publish switches. */
      assignment: {
        title: "Explorations and first screens",
        due: "Wed Oct 21, 11:59pm",
        dueDate: "",
        body: "As a group: at least three directions for your feature, sketched, and the one you picked and why. A user flow for it. Then the first screens of your prototype, built and linked together.",
        deliverable: "One doc per group, every name on it, with a link to your Figma file or code. Photos of paper sketches are fine.",
      },
      materials: [],
      /* ------------------------------------------------------------------
         Order: critique, then two halves. The first half takes Week 4's
         research to one chosen idea, kept short because synthesis was
         taught last week. The second half is making: start building the
         prototype. Matches the Project 1 checkpoints, Oct 15 explorations
         and Oct 22 prototype in progress.

         The worked example is still the delivery app and Late-shift Lena
         from Week 4. The example HMWs, ideas, flow and screens are made up
         for teaching.

         Sources, with wording kept where a slide quotes them:
         - Nielsen Norman Group: Rosala on How Might We questions;
           Laubheimer on wireflows.
         - IDEO U, 7 Simple Rules of Brainstorming.
         - Google Ventures design sprint: Crazy 8s, dot voting.
         - Bill Buxton, Sketching User Experiences: sketches ask questions,
           prototypes answer them. Paraphrased, not quoted.
         - Figma Help Center, Guide to auto layout.
         - Apple Design Resources: Apple's iOS UI kit for Figma.
         - The course's own Using AI policy, quoted from this file.
         Image credits in img/w5/_credits.json.
         ------------------------------------------------------------------ */
      slides: [
        { layout: "title" },

        /* ========== 01 CRITIQUE ========== */
        /* Add this week's research plans here as `columns` slides, word
           for word and unnamed, the same way Week 4 did the design
           statements. */
        { layout: "section", text: "Critique", num: "01" },
        {
          layout: "points",
          heading: "Ask about each one",
          points: [
            "Do the methods match what they need to know?",
            "Are they talking to people who have the problem?",
            "Would any question get a “yes” no matter what?",
            "What will they know after that they don't know now?",
          ],
        },

        /* ========== 02 FINDINGS TO IDEAS ========== */
        { layout: "section", text: "From findings to ideas", num: "02" },
        {
          layout: "figure",
          src: "img/w4/double-diamond.jpg",
          caption: "The double diamond, after the UK Design Council",
          tap: "\u{1F4CD} this week: Develop",
        },
        {
          layout: "two",
          heading: "Where you are",
          left: { label: "Last week", body: "Research and synthesis.\nAffinity map, persona, journey." },
          right: { label: "This week", body: "Turn it into one idea.\nThen start building it." },
        },
        {
          layout: "statement",
          text: "The low point is the opportunity.",
          sub: "From last week: Lena gives up at Browse.",
        },
        {
          layout: "statement",
          text: "How might we…?",
          sub: "A question that turns a finding into something you can have ideas about.",
        },
        {
          layout: "points",
          heading: "A good HMW",
          points: [
            "Starts from something you found in research.",
            "Does not have a solution hiding in it.",
            "Is broad enough for lots of ideas.",
            "Is narrow enough to stay on the problem.",
          ],
        },
        {
          layout: "two",
          heading: "Don't hide a solution in it",
          left: { label: "Bad", body: "“How might we tell users which form to complete?”" },
          right: { label: "Better", body: "“How might we make users feel confident they are filing their taxes correctly?”" },
        },
        {
          layout: "points",
          heading: "Example: one finding, several HMWs",
          points: [
            "How might we help Lena decide in under a minute?",
            "How might we show the real price before she starts choosing?",
            "How might we make ordering easier than pouring cereal?",
          ],
        },
        {
          layout: "two",
          heading: "Two kinds of thinking",
          left: { label: "Diverge", body: "Go wide.\nAs many ideas as you can.\nNo judging." },
          right: { label: "Converge", body: "Narrow down.\nPick one.\nSay why." },
        },
        {
          layout: "statement",
          text: "Your first idea is rarely your best one.",
          sub: "It is usually the one everybody has.",
        },
        {
          layout: "points",
          heading: "Crazy 8s",
          points: [
            "Fold a sheet of paper into eight boxes.",
            "Set a timer for eight minutes.",
            "One idea per box. One minute each.",
            "Alone first, then show your group.",
          ],
        },
        {
          layout: "columns",
          heading: "Example: Lena's eight",
          items: [
            { label: "Choose less", list: ["Three picks, not 400", "A surprise button with a budget", "“What my friends ordered”"] },
            { label: "Price first", list: ["Total shown on every card", "Set $15, see only what fits", "Fees split with a neighbour"] },
            { label: "Habit, but better", list: ["Reorder, with one new thing", "Tonight's dinner, planned at lunch"] },
          ],
        },
        {
          layout: "exercise",
          heading: "On your own",
          prompt: "Pick one HMW from your research. Crazy 8s.",
          time: "8 min",
        },

        /* ========== 03 CHOOSING ========== */
        { layout: "section", text: "Choosing one", num: "03" },
        {
          layout: "figure",
          src: "img/w5/dot-voting.jpg",
          caption: "Dot voting. Photo by Ben Chun, CC BY-SA 2.0, Wikimedia Commons",
        },
        {
          layout: "points",
          heading: "Dot voting",
          points: [
            "Put every sketch on the table.",
            "Everyone reads them in silence.",
            "Three dots each, on the ideas you'd build.",
            "Talk about the ideas, not who drew them.",
          ],
        },
        {
          layout: "points",
          heading: "Then check it against your research",
          points: [
            "Does it answer your design statement?",
            "Does it help your primary persona at their low point?",
            "Is it easier than what they do instead?",
            "Can you build it by Oct 29?",
          ],
        },
        {
          layout: "exercise",
          heading: "In your group",
          prompt: "Show your eights. Dot vote. Pick one direction, and say why in one sentence.",
          time: "12 min",
        },
        {
          layout: "statement",
          text: "Keep the ones you didn't pick.",
          sub: "They go in the Explorations section of your case study.",
        },

        /* ========== 04 FLOW AND WIREFRAME ========== */
        { layout: "section", text: "Flow and wireframe", num: "04" },
        {
          layout: "points",
          heading: "Draw the flow first",
          points: [
            "Start where they start, not on your feature.",
            "One box per screen.",
            "One arrow per action.",
            "Mark where they could leave.",
          ],
        },
        {
          layout: "statement",
          text: "Open app → Set budget → See three picks → Order",
          sub: "Example flow for Lena. Four screens.",
        },
        {
          layout: "statement",
          text: "Count the screens.",
          sub: "That's how many you need to build. Every extra one is a place someone can give up.",
        },
        {
          layout: "figure",
          src: "img/w5/paper-prototype.jpg",
          caption: "A paper wireframe. Photo by Sage Ross, CC BY-SA 4.0, Wikimedia Commons",
        },
        {
          layout: "two",
          heading: "A wireframe",
          left: { label: "Shows", body: "What is on the screen.\nWhere it goes.\nWhat matters most." },
          right: { label: "Leaves out", body: "Colour.\nFonts.\nPhotos.\nIcons." },
        },
        {
          layout: "statement",
          text: "Use real words, not lorem ipsum.",
          sub: "“Thai Basil, $13.80 total, 25 min” tells you if it fits. Squiggles don't.",
        },
        {
          layout: "two",
          heading: "Sketch or prototype",
          left: { label: "Sketch", body: "Quick and cheap.\nThrown away.\nAsks a question." },
          right: { label: "Prototype", body: "Slower, more detailed.\nKept and tested.\nAnswers a question." },
        },

        /* ========== 05 START BUILDING ========== */
        { layout: "section", text: "Start building", num: "05" },
        {
          layout: "statement",
          text: "You're adding to an app that already exists.",
          sub: "So you don't start from a blank canvas.",
        },
        {
          layout: "points",
          heading: "Start from the real app",
          points: [
            "Screenshot the screens around your feature.",
            "Drop them into Figma at actual size.",
            "Rebuild the one screen your feature changes.",
            "Design your feature inside it.",
          ],
        },
        {
          layout: "two",
          heading: "Match what's there",
          left: { label: "Copy from the app", body: "Its fonts.\nIts colours.\nIts buttons and spacing." },
          right: { label: "Why", body: "Your feature should look like it shipped.\nNot like a different app glued on." },
        },
        {
          layout: "statement",
          text: "Don't draw what you can borrow.",
          sub: "Apple and Google publish their UI kits for Figma: real buttons, bars, keyboards and lists.",
        },
        {
          layout: "columns",
          heading: "Three ways to build it",
          items: [
            { label: "Figma", body: "Draw the screens, link them together.", list: ["Fastest to start", "Most of you, this project"] },
            { label: "Code", body: "HTML, CSS, JS, or SwiftUI.", list: ["Real scrolling, real typing", "If someone in your group can"] },
            { label: "AI tools", body: "Describe it, get a working draft.", list: ["Fast first draft", "You still make every decision"] },
          ],
        },
        {
          layout: "statement",
          text: "Using AI: say where you used it.",
          sub: "“A prototype generated in one prompt with no account of the decisions inside it is not an assignment, it is a screenshot.” Course policy",
        },
        {
          layout: "columns",
          heading: "Fidelity, over the next two weeks",
          items: [
            { label: "Low", body: "Paper or grey boxes.", list: ["Minutes", "Today"] },
            { label: "Mid", body: "Real layout and words, greyscale.", list: ["Hours", "This week"] },
            { label: "High", body: "Looks real, clicks through.", list: ["Days", "By Oct 29"] },
          ],
        },

        /* ========== 06 FIGMA BASICS ========== */
        /* Auto layout wording from the Figma Help Center. */
        { layout: "section", text: "Figma basics", num: "06" },
        {
          layout: "points",
          heading: "Five things to learn first",
          points: [
            "Frames: one per screen, set to a phone size.",
            "Auto layout: things that stack and space themselves.",
            "Components: build a button once, use it everywhere.",
            "Styles: name your colours and text sizes.",
            "Prototype mode: link screens together.",
          ],
        },
        {
          layout: "statement",
          text: "One frame per screen.",
          sub: "Pick one phone size and use it for every screen.",
        },
        {
          layout: "quote",
          quote: "Elements in an auto layout frame are automatically arranged in a frame based on direction, spacing, padding, alignment, and other auto layout properties.",
          attribution: "Figma Help Center",
        },
        {
          layout: "two",
          heading: "Why auto layout",
          left: { label: "Without it", body: "Change a word.\nNudge everything below it by hand." },
          right: { label: "With it", body: "Change a word.\nEverything moves on its own." },
        },
        {
          layout: "two",
          heading: "Why components",
          left: { label: "Without them", body: "Twelve copies of a button.\nChange one, then eleven more." },
          right: { label: "With them", body: "One main button.\nChange it once, all twelve update." },
        },
        {
          layout: "points",
          heading: "Name things as you go",
          points: [
            "Screens: “01 Home”, “02 Set budget”, “03 Picks”.",
            "Layers you'll click on.",
            "One page for explorations, one for the prototype.",
          ],
        },

        /* ========== 07 MAKE IT CLICKABLE ========== */
        { layout: "section", text: "Make it clickable", num: "07" },
        {
          layout: "points",
          heading: "In prototype mode",
          points: [
            "Pick the starting screen.",
            "Drag from a button to the screen it opens.",
            "Choose what triggers it: on tap.",
            "Press play, and use it like a user would.",
          ],
        },
        {
          layout: "statement",
          text: "Wire your flow, screen by screen.",
          sub: "Each arrow in your flow becomes one link.",
        },
        {
          layout: "points",
          heading: "Test it on your phone",
          points: [
            "Open it in the Figma app.",
            "Hand it to someone in your group.",
            "Don't explain. Watch where they tap.",
          ],
        },
        {
          layout: "statement",
          text: "Record it running.",
          sub: "Your case study needs video of the prototype, not static screens. Start recording now.",
        },

        /* ========== 08 PROTOTYPE WHAT MATTERS ========== */
        { layout: "section", text: "Prototype only what matters", num: "08" },
        {
          layout: "statement",
          text: "Build the path, not the whole app.",
          sub: "Your feature only. Everything else can be a screenshot.",
        },
        {
          layout: "two",
          heading: "Happy path first",
          left: { label: "Build first", body: "The one path your persona takes.\nStart to finish." },
          right: { label: "Then add", body: "What happens when it goes wrong." },
        },
        {
          layout: "columns",
          heading: "Screens people forget",
          items: [
            { label: "Empty", body: "Nothing there yet.", list: ["“Nothing under $15 near you.”"] },
            { label: "Loading", body: "Waiting.", list: ["Finding your picks…"] },
            { label: "Error", body: "Something broke.", list: ["“Card declined.”"] },
            { label: "Done", body: "It worked.", list: ["“Order placed. 25 min.”"] },
          ],
        },
        {
          layout: "statement",
          text: "Real content, not perfect content.",
          sub: "Real restaurant names, real prices, a long name that wraps. That's what breaks a layout.",
        },
        {
          layout: "points",
          heading: "When you're stuck",
          points: [
            "Look at how the real app does something similar.",
            "Make it ugly and working first.",
            "Ask: what would Lena tap next?",
          ],
        },

        /* ========== 09 IN CLASS ========== */
        { layout: "section", text: "Build your first screen", num: "09" },
        {
          layout: "visual",
          side: "right",
          heading: "In your group",
          body: "Before you leave, you should have:",
          points: [
            "One Figma file, everyone in it.",
            "Screenshots of the real app dropped in.",
            "Your flow, drawn.",
            "The first screen of your feature, rebuilt.",
          ],
          src: "img/w5/sketching-wireframes.jpg",
          caption: "Photo: Green Chameleon, CC0. Wikimedia Commons",
        },
        {
          layout: "exercise",
          heading: "In your group",
          prompt: "Set up your Figma file. Wireframe your flow. Build the first screen.",
          time: "Rest of class",
        },

        /* ========== 10 THIS WEEK ========== */
        { layout: "section", text: "This week", num: "10" },
        { layout: "assignment" },
        {
          layout: "points",
          heading: "What to hand in",
          points: [
            "Your HMWs, from your research.",
            "At least three directions, sketched.",
            "The one you picked, and why.",
            "A user flow for it.",
            "The first screens of your prototype, linked together.",
          ],
        },
        {
          layout: "two",
          heading: "Where this is going",
          left: { label: "Oct 22", body: "Prototype in progress.\nBring it to class." },
          right: { label: "Oct 29", body: "Prototype running.\nPage live.\nEvery group presents." },
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
