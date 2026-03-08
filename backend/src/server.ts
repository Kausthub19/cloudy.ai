 import express from "express";
 import cors from "cors";
 import helmet from "helmet";
 import dotenv from "dotenv";
 
 dotenv.config();
 
 const app = express();
 const port = process.env.PORT || 4000;
 
 app.use(helmet());
 app.use(
   cors({
     origin: "*"
   })
 );
 app.use(express.json());
 
 // Simple in-memory data to illustrate the shape of the backend.
 const plans = [
   {
     id: "free",
     name: "Free",
     priceMonthly: 0,
     minutesIncluded: 60,
     concurrentSessions: 1
   },
   {
     id: "pro",
     name: "Pro",
     priceMonthly: 29,
     minutesIncluded: 600,
     concurrentSessions: 3
   },
   {
     id: "student",
     name: "Student",
     priceMonthly: 9,
     minutesIncluded: 240,
     studentCredits: 120
   }
 ];
 
 app.get("/health", (_req, res) => {
   res.json({ status: "ok" });
 });
 
 app.get("/api/plans", (_req, res) => {
   res.json({ plans });
 });
 
 app.get("/api/demo-user", (_req, res) => {
   res.json({
     id: "demo-student",
     name: "Alex Student",
     plan: "free",
     minutesUsed: 40,
     minutesIncluded: 60,
     studentCredits: 0,
     studentCreditsTotal: 0
   });
 });
 
 app.listen(port, () => {
   // eslint-disable-next-line no-console
   console.log(`Backend prototype listening on http://localhost:${port}`);
 });
 
