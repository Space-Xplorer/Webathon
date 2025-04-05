// const express=require("express");
// const app=express();
// const path= require("path");
// const mongoose = require("mongoose");
// const port=8080;
// const methodOverride = require('method-override');
// app.use(methodOverride('_method'))

// async function main() {
//   const studentDB = mongoose.createConnection('mongodb://127.0.0.1:27017/User');
//   const eventDB = mongoose.createConnection('mongodb://127.0.0.1:27017/event');

//   // Use `.model(name, schema)` with `.schema`
//   const Event = eventDB.model('Event', require('./models/Event').schema);
//   const Student = studentDB.model('Student', require('./models/student').schema);

//   global.EventModel = Event; // Make accessible globally if needed
//   global.StudentModel = Student;

//   console.log("✅ All databases connected!");
// }

// main().catch(err => console.error(err));



// app.set("view engine", "ejs" );
// app.set("views",path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());


//   // const studentDashboardData = {
//   //   registeredEvents: [
//   //     { title: 'Hackathon 2025' },
//   //     { title: 'Design Thinking' }
//   //   ],
//   //   attendedEvents: [
//   //     { title: 'Webinar on AI' }
//   //   ],
//   //   certificates: [
//   //     { name: 'Intro to AI' }
//   //   ],
//   //   badges: [
//   //     { title: 'Tech Champ' }
//   //   ],

//   //   ongoingEvents: [
//   //     { title: 'Hackathon 2025', date: 'April 6', time: '9:00 AM', venue: 'Hall A' },
//   //     { title: 'ML Bootcamp', date: 'April 7', time: '1:00 PM', venue: 'Room 201' }
//   //   ],
//   //   upcomingEvents: [
//   //     { title: 'Cybersecurity 101', date: 'April 15', time: '11:00 AM', venue: 'Auditorium' },
//   //     { title: 'Design Thinking', date: 'April 18', time: '3:00 PM', venue: 'Lab 3' }
//   //   ]
//   // };
  

// app.listen(port, ()=>{
//   console.log(`listening to ${port}`);

// });

// app.get("/landing", (req,res)=>{
//     res.render("landing.ejs", eventsData)
// });

// app.get("/login", (req,res)=>{
//     res.render("login.ejs")
// })


// app.post("/login", (req, res) => {
//     const { email, password, dashboard } = req.body;
//     if (!dashboard) {
//         return res.status(400).send("Please select a dashboard.");
//     }
//     // Redirect based on dashboard selection
//     switch (dashboard) {
//         case "s_dashboard":
//             return res.redirect("/s_dashboard");
//         case "f_dashboard":
//             return res.redirect("/f_dashboard");
//         case "e_dashboard":
//             return res.redirect("/e_dashboard");
//         case "m_dashboard":
//             return res.redirect("/m_dashboard");
//         default:
//             return res.status(400).send("Unknown dashboard type!");
//     }
// });

// app.get("/e_dashboard", (req,res)=> res.render("e_dashboard.ejs", studentDashboardData))

// app.get("/m_dashboard", (req,res)=> res.render("m_dashboard.ejs",studentDashboardData));

// app.get('/s_dashboard', async (req, res) => {
//   try {
//     const allEvents = await global.EventModel.find();
//     const today = moment().startOf('day');

//     console.log("Today is:", today.format('YYYY-MM-DD'));
//     console.log("All events:", allEvents.map(e => ({ title: e.title, rawDate: e.date })));

//     const ongoingEvents = [];
//     const upcomingEvents = [];

//     allEvents.forEach(event => {
//       // Try parsing event.date using known formats
//       const parsedDate = moment(event.date, [
//         'YYYY-MM-DD',
//         'YYYY/MM/DD',
//         'DD-MM-YYYY',
//         'MM-DD-YYYY',
//         'MMMM D, YYYY',
//         'MMM D, YYYY',
//         'D MMMM YYYY'
//       ], true); // strict mode

//       if (!parsedDate.isValid()) {
//         console.warn(`⚠️ Invalid date for event: ${event.title} — raw value: "${event.date}"`);
//         return;
//       }

//       console.log(`📅 ${event.title} — parsed date: ${parsedDate.format('YYYY-MM-DD')}`);

//       if (parsedDate.isSame(today, 'day')) {
//         ongoingEvents.push(event); // full object
//       } else if (parsedDate.isAfter(today, 'day')) {
//         upcomingEvents.push(event); // full object
//       }
//     });

//     console.log("✅ Ongoing Events:", ongoingEvents.map(e => e.title));
//     console.log("✅ Upcoming Events:", upcomingEvents.map(e => e.title));

//     // Pass full event objects to EJS
//     res.render('s_dashboard.ejs', { ongoingEvents, upcomingEvents });

//   } catch (err) {
//     console.error("🚨 Error in /events route:", err);
//     res.status(500).send("Error loading events");
//   }});
// app.get('/f_dashboard', async (req, res) => {
//   try {
//     const allEvents = await global.EventModel.find();
//     const today = moment().startOf('day');

//     console.log("Today is:", today.format('YYYY-MM-DD'));
//     console.log("All events:", allEvents.map(e => ({ title: e.title, rawDate: e.date })));

//     const ongoingEvents = [];
//     const upcomingEvents = [];

//     allEvents.forEach(event => {
//       // Try parsing event.date using known formats
//       const parsedDate = moment(event.date, [
//         'YYYY-MM-DD',
//         'YYYY/MM/DD',
//         'DD-MM-YYYY',
//         'MM-DD-YYYY',
//         'MMMM D, YYYY',
//         'MMM D, YYYY',
//         'D MMMM YYYY'
//       ], true); // strict mode

//       if (!parsedDate.isValid()) {
//         console.warn(`⚠️ Invalid date for event: ${event.title} — raw value: "${event.date}"`);
//         return;
//       }

//       console.log(`📅 ${event.title} — parsed date: ${parsedDate.format('YYYY-MM-DD')}`);

//       if (parsedDate.isSame(today, 'day')) {
//         ongoingEvents.push(event); // full object
//       } else if (parsedDate.isAfter(today, 'day')) {
//         upcomingEvents.push(event); // full object
//       }
//     });

//     console.log("✅ Ongoing Events:", ongoingEvents.map(e => e.title));
//     console.log("✅ Upcoming Events:", upcomingEvents.map(e => e.title));

//     // Pass full event objects to EJS
//     res.render('f_dashboard.ejs', { ongoingEvents, upcomingEvents });

//   } catch (err) {
//     console.error("🚨 Error in /events route:", err);
//     res.status(500).send("Error loading events");
//   }});

// // app.get('/events',async (req, res) =>  {
// //   let events= await event.find()
// //   res.render('events.ejs', {events})})

// const Event = require('./models/Event'); // Make sure this path is correct
// const moment = require('moment'); // Install moment for date comparison if not already

// app.get('/events', async (req, res) => {
//   try {
//     const allEvents = await global.EventModel.find();
//     const today = moment().startOf('day');

//     console.log("Today is:", today.format('YYYY-MM-DD'));
//     console.log("All events:", allEvents.map(e => ({ title: e.title, rawDate: e.date })));

//     const ongoingEvents = [];
//     const upcomingEvents = [];

//     allEvents.forEach(event => {
//       // Try parsing event.date using known formats
//       const parsedDate = moment(event.date, [
//         'YYYY-MM-DD',
//         'YYYY/MM/DD',
//         'DD-MM-YYYY',
//         'MM-DD-YYYY',
//         'MMMM D, YYYY',
//         'MMM D, YYYY',
//         'D MMMM YYYY'
//       ], true); // strict mode

//       if (!parsedDate.isValid()) {
//         console.warn(`⚠️ Invalid date for event: ${event.title} — raw value: "${event.date}"`);
//         return;
//       }

//       console.log(`📅 ${event.title} — parsed date: ${parsedDate.format('YYYY-MM-DD')}`);

//       if (parsedDate.isSame(today, 'day')) {
//         ongoingEvents.push(event); // full object
//       } else if (parsedDate.isAfter(today, 'day')) {
//         upcomingEvents.push(event); // full object
//       }
//     });

//     console.log("✅ Ongoing Events:", ongoingEvents.map(e => e.title));
//     console.log("✅ Upcoming Events:", upcomingEvents.map(e => e.title));

//     // Pass full event objects to EJS
//     res.render('events.ejs', { ongoingEvents, upcomingEvents });

//   } catch (err) {
//     console.error("🚨 Error in /events route:", err);
//     res.status(500).send("Error loading events");
//   }
// });


// app.get('/register', (req,res)=> res.render("registration.ejs"));
// app.get('/pendingapprovals', (req,res)=> res.render("pendingapproval.ejs"));
// app.get('/description/:id', async (req, res) => {
//   try {
//     const event = await global.EventModel.findById(req.params.id);// ✅ Correct model
//     if (!event) {
//       return res.status(404).send("Event not found");
//     }
//     res.render("description.ejs", { event });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });


// app.get('/approvalstatus', (req,res)=> res.render("approvalstatus.ejs"));
// app.get('/new_event', (req,res)=> res.render("new_event.ejs"));

// server.js (or index.js)
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const moment = require("moment");

const app = express();
const port = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connect to MongoDB
async function main() {
  const studentDB = mongoose.createConnection("mongodb://127.0.0.1:27017/User");
  const eventDB = mongoose.createConnection("mongodb://127.0.0.1:27017/event");

  const Event = eventDB.model("Event", require("./models/Event").schema);
  const Student = studentDB.model("Student", require("./models/student").schema);

  global.EventModel = Event;
  global.StudentModel = Student;

  console.log("✅ All databases connected!");
}
main().catch((err) => console.error(err));

// Routes
app.get("/landing", (req, res) => res.render("landing.ejs"));

app.get("/login", (req, res) => res.render("login.ejs"));

app.post("/login", (req, res) => {
  const { email, password, dashboard } = req.body;
  if (!dashboard) return res.status(400).send("Please select a dashboard.");

  const redirectMap = {
    s_dashboard: "/s_dashboard",
    f_dashboard: "/f_dashboard",
    e_dashboard: "/e_dashboard",
    m_dashboard: "/m_dashboard",
  };
  return res.redirect(redirectMap[dashboard] || "/login");
});

// app.get("/e_dashboard", (req, res) => res.render("e_dashboard.ejs"));
// app.get("/m_dashboard", (req, res) => res.render("m_dashboard.ejs"));

// Reusable event dashboard logic
async function renderEventDashboard(req, res, viewName) {
  try {
    const allEvents = await global.EventModel.find();
    const today = moment().startOf("day");

    const ongoingEvents = [];
    const upcomingEvents = [];

    allEvents.forEach((event) => {
      const parsedDate = moment(event.date, [
        "YYYY-MM-DD",
        "YYYY/MM/DD",
        "DD-MM-YYYY",
        "MM-DD-YYYY",
        "MMMM D, YYYY",
        "MMM D, YYYY",
        "D MMMM YYYY",
      ], true);

      if (!parsedDate.isValid()) return;

      if (parsedDate.isSame(today, "day")) ongoingEvents.push(event);
      else if (parsedDate.isAfter(today, "day")) upcomingEvents.push(event);
    });

    res.render(viewName, { ongoingEvents, upcomingEvents });
  } catch (err) {
    console.error(`🚨 Error rendering ${viewName}:`, err);
    res.status(500).send("Error loading events");
  }
}

app.get("/s_dashboard", (req, res) => renderEventDashboard(req, res, "s_dashboard.ejs"));
app.get("/f_dashboard", (req, res) => renderEventDashboard(req, res, "f_dashboard.ejs"));
app.get("/e_dashboard", (req, res) => renderEventDashboard(req, res, "e_dashboard.ejs"));
app.get("/m_dashboard", (req, res) => renderEventDashboard( req, res,"m_dashboard.ejs"));
app.get("/events", (req, res) => renderEventDashboard(req, res, "events.ejs"));

// Event description
app.get("/description/:id", async (req, res) => {
  try {
    const event = await global.EventModel.findById(req.params.id);
    if (!event) return res.status(404).send("Event not found");
    res.render("description.ejs", { event });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Static render routes
app.get("/register", (req, res) => res.render("registration.ejs"));
app.get("/pendingapprovals", (req, res) => res.render("pendingapproval.ejs"));
app.get("/approvalstatus", (req, res) => res.render("approvalstatus.ejs"));
app.get("/new_event", (req, res) => res.render("new_event.ejs"));

// Start server
app.listen(port, () => console.log(`✅ Server listening on port ${port}`));
