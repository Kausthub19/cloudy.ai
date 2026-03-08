import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) ?? "";
 
 type PlanId = "free" | "pro" | "student" | "enterprise";
 
 interface User {
   name: string;
   plan: PlanId;
   studentCredits: number;
   studentCreditsTotal: number;
   minutesUsed: number;
   minutesIncluded: number;
 }

interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  minutesIncluded: number;
  concurrentSessions?: number;
  studentCredits?: number;
}
 
 interface AppContextValue {
   user: User | null;
   setUser: (user: User | null) => void;
 }
 
 const AppContext = createContext<AppContextValue | undefined>(undefined);
 
 function useAppContext() {
   const ctx = useContext(AppContext);
   if (!ctx) {
     throw new Error("useAppContext must be used within AppProvider");
   }
   return ctx;
 }
 
 const navLinkBase =
   "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors";
 const navLinkInactive = "text-slate-300 hover:bg-slate-800 hover:text-white";
 const navLinkActive = "bg-slate-800 text-white";
 
 const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const { user } = useAppContext();
   const location = useLocation();
 
   return (
     <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
       <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
         <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
           <Link to="/" className="flex items-center gap-2">
             <div className="h-8 w-8 rounded-xl bg-indigo-500/80 shadow-lg shadow-indigo-500/50 flex items-center justify-center text-xs font-black tracking-tight">
               CC
             </div>
             <div className="flex flex-col leading-tight">
               <span className="text-sm font-semibold text-slate-100">Cloud Console</span>
               <span className="text-xs text-slate-400">Remote compute for everyone</span>
             </div>
           </Link>
           <div className="flex items-center gap-4">
             {user ? (
               <>
                 <div className="hidden sm:flex flex-col items-end mr-2">
                   <span className="text-xs text-slate-400 uppercase tracking-wide">
                     {user.plan === "free"
                       ? "Free"
                       : user.plan === "student"
                       ? "Student"
                       : user.plan === "pro"
                       ? "Pro"
                       : "Enterprise"}
                   </span>
                   <span className="text-xs text-slate-400">
                     {user.minutesUsed}/{user.minutesIncluded} min this month
                   </span>
                   {user.plan === "student" && (
                     <span className="text-xs text-emerald-300">
                       Student credits {user.studentCredits}/{user.studentCreditsTotal}
                     </span>
                   )}
                 </div>
                 <div className="h-9 rounded-full border border-slate-700/80 px-3 flex items-center gap-2 bg-slate-900/60">
                   <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-400 to-sky-300 text-slate-950 flex items-center justify-center text-xs font-semibold">
                     {user.name.charAt(0).toUpperCase()}
                   </div>
                   <span className="hidden sm:inline text-sm text-slate-100">{user.name}</span>
                 </div>
               </>
             ) : location.pathname !== "/auth" ? (
               <Link
                 to="/auth"
                 className="rounded-full border border-indigo-400/60 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-100 hover:bg-indigo-500/20"
               >
                 Sign in
               </Link>
             ) : null}
           </div>
         </div>
       </header>
 
       <main className="flex-1">{children}</main>
 
       <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
         Built as a prototype glimpse of a remote cloud compute platform.
       </footer>
     </div>
   );
 };
 
 const LandingPage: React.FC = () => {
   const navigate = useNavigate();
 
   return (
     <div className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-16 pb-20">
       <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-100 mb-6">
         <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
         Live preview · Heavy apps in your browser
       </div>
       <h1 className="text-center text-4xl sm:text-5xl font-semibold tracking-tight text-slate-50 mb-4">
         Edit big videos on tiny laptops.
       </h1>
       <p className="max-w-2xl text-center text-slate-300 mb-8">
         Cloud Console streams powerful desktops and creative tools from the cloud to any browser.
         Your device stays cool; our servers do the heavy lifting. Perfect for students, creators,
         and teams on the move.
       </p>
       <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
         <button
           onClick={() => navigate("/auth")}
           className="rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-400"
         >
           Get started – it{"'"}s free
         </button>
         <button
           onClick={() => navigate("/plans")}
           className="rounded-full border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-medium text-slate-100 hover:bg-slate-800"
         >
           View plans
         </button>
       </div>
 
       <div className="grid w-full gap-6 md:grid-cols-2">
         <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 shadow-lg shadow-slate-950/60">
           <div className="flex items-center justify-between mb-3">
             <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
               Student scenario
             </span>
             <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-300 border border-sky-500/30">
               Video editing
             </span>
           </div>
           <div className="aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
             <div className="w-5/6 rounded-xl border border-slate-700 bg-slate-900/80 p-4">
               <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                 <span>Adobe Express · Cloud session</span>
                 <span>GPU · 32GB RAM</span>
               </div>
               <div className="h-28 rounded-md bg-slate-800/80 flex items-center justify-center text-slate-500 text-xs">
                 Video timeline · heavy effects · 4K export
               </div>
               <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                 <span>Local laptop: low spec</span>
                 <span>Cloud time saved: 3 hours</span>
               </div>
             </div>
           </div>
         </div>
 
         <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 shadow-lg shadow-slate-950/60">
           <p className="text-sm text-slate-200 mb-2 font-medium">
             Why companies and students love this:
           </p>
           <ul className="space-y-2 text-sm text-slate-300">
             <li>– Run heavy apps on any device with a browser.</li>
             <li>– Time-box and rate limit free usage so it{"'"}s sustainable.</li>
             <li>– Students get extra credits with their college email.</li>
             <li>– One-click publish to YouTube and Instagram for creators.</li>
             <li>– Open marketplace for templates, powered by the community.</li>
           </ul>
         </div>
       </div>
     </div>
   );
 };
 
 const AuthPage: React.FC = () => {
   const { setUser } = useAppContext();
   const navigate = useNavigate();
 
  const completeMockLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/demo-user`);
      if (res.ok) {
        const demo = await res.json();
        setUser({
          name: demo.name ?? "Alex Student",
          plan: (demo.plan as PlanId) ?? "free",
          studentCredits: demo.studentCredits ?? 0,
          studentCreditsTotal: demo.studentCreditsTotal ?? 0,
          minutesUsed: demo.minutesUsed ?? 40,
          minutesIncluded: demo.minutesIncluded ?? 60
        });
      } else {
        setUser({
          name: "Alex Student",
          plan: "free",
          studentCredits: 0,
          studentCreditsTotal: 0,
          minutesUsed: 40,
          minutesIncluded: 60
        });
      }
    } catch {
      setUser({
        name: "Alex Student",
        plan: "free",
        studentCredits: 0,
        studentCreditsTotal: 0,
        minutesUsed: 40,
        minutesIncluded: 60
      });
    }
     navigate("/plans");
   };
 
   return (
     <div className="mx-auto flex max-w-md flex-col px-4 pt-16 pb-20">
       <h2 className="mb-2 text-2xl font-semibold text-slate-50">Welcome back</h2>
       <p className="mb-6 text-sm text-slate-400">
         Sign in to spin up cloud-powered creative and dev environments.
       </p>
       <div className="space-y-3">
         <button
           onClick={completeMockLogin}
           className="flex w-full items-center justify-center gap-2 rounded-md bg-white py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
         >
           <span>Continue with Google (mock)</span>
         </button>
         <button
           onClick={completeMockLogin}
           className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1877F2] py-2 text-sm font-medium text-white hover:bg-[#1664c4]"
         >
           <span>Continue with Facebook (mock)</span>
         </button>
         <button
           onClick={completeMockLogin}
           className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 py-2 text-sm font-medium text-slate-100 border border-slate-600 hover:bg-slate-800"
         >
           <span>Continue with GitHub (mock)</span>
         </button>
       </div>
       <div className="my-6 flex items-center gap-2 text-xs text-slate-500">
         <div className="h-px flex-1 bg-slate-700" />
         <span>or</span>
         <div className="h-px flex-1 bg-slate-700" />
       </div>
       <form
         className="space-y-3"
         onSubmit={(e) => {
           e.preventDefault();
           completeMockLogin();
         }}
       >
         <div>
           <label className="mb-1 block text-xs font-medium text-slate-300">Email</label>
           <input
             type="email"
             className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
           />
         </div>
         <div>
           <label className="mb-1 block text-xs font-medium text-slate-300">Password</label>
           <input
             type="password"
             className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-400"
           />
         </div>
         <button
           type="submit"
           className="mt-2 w-full rounded-md bg-indigo-500 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
         >
           Continue
         </button>
       </form>
       <p className="mt-4 text-xs text-slate-500">
         This is a prototype: all authentication is mocked locally just to illustrate the flow.
       </p>
     </div>
   );
 };
 
 const PlansPage: React.FC = () => {
   const { user, setUser } = useAppContext();
   const navigate = useNavigate();
 
  const [availablePlans, setAvailablePlans] = useState<Plan[] | null>(null);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/plans`);
        if (!res.ok) return;
        const data = await res.json();
        setAvailablePlans(data.plans as Plan[]);
      } catch {
        // Ignore errors in prototype and fall back to hardcoded values.
      }
    };
    loadPlans();
  }, []);

  const getPlan = (planId: PlanId) =>
    availablePlans?.find((p) => p.id === planId);

   const selectPlan = (plan: PlanId) => {
     if (!user) return;
    const planDef = getPlan(plan);
    const baseMinutes =
      planDef?.minutesIncluded ??
      (plan === "free" ? 60 : plan === "student" ? 240 : 600);
    const studentCreditsTotal =
      plan === "student"
        ? planDef?.studentCredits ?? 120
        : 0;
     setUser({
       ...user,
       plan,
       minutesIncluded: baseMinutes,
       studentCredits: studentCreditsTotal,
       studentCreditsTotal
     });
     navigate("/app");
   };
 
   return (
     <div className="mx-auto max-w-5xl px-4 pt-12 pb-20">
       <h2 className="text-3xl font-semibold text-slate-50 mb-2">Choose your plan</h2>
       <p className="text-sm text-slate-400 mb-8">
         Start free and upgrade only when you{"'"}re ready. Rate limits keep free usage sustainable
         for everyone.
       </p>
       <div className="grid gap-6 md:grid-cols-3">
         <div className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-5 flex flex-col">
           <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
             Free
           </p>
           <p className="text-2xl font-semibold text-slate-50 mb-1">$0</p>
           <p className="text-xs text-slate-400 mb-4">For quick tasks and trying things out.</p>
           <ul className="mb-4 space-y-1.5 text-xs text-slate-300">
             <li>– 60 minutes/month of cloud compute</li>
             <li>– 1 concurrent session</li>
             <li>– Limited storage & basic analytics</li>
           </ul>
           <button
             onClick={() => selectPlan("free")}
             className="mt-auto rounded-md border border-slate-700 bg-slate-900 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800"
           >
             Continue with Free
           </button>
         </div>
 
         <div className="relative rounded-2xl border border-indigo-500/70 bg-slate-950/80 p-5 shadow-lg shadow-indigo-500/30 flex flex-col">
           <div className="absolute -top-3 right-4 rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
             Most popular
           </div>
           <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200 mb-1">
             Pro
           </p>
           <p className="text-2xl font-semibold text-slate-50 mb-1">$29 / month</p>
           <p className="text-xs text-slate-400 mb-4">
             For creators and professionals who live in the cloud.
           </p>
           <ul className="mb-4 space-y-1.5 text-xs text-slate-200">
             <li>– 600 minutes/month of cloud compute</li>
             <li>– 3 concurrent sessions</li>
             <li>– Priority scheduling and faster GPUs</li>
             <li>– Advanced analytics and history</li>
           </ul>
           <button
             onClick={() => selectPlan("pro")}
             className="mt-auto rounded-md bg-indigo-500 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
           >
             Start Pro (mock billing)
           </button>
         </div>
 
         <div className="relative rounded-2xl border border-emerald-500/70 bg-slate-950/80 p-5 flex flex-col">
           <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200 mb-1">
             Student
           </p>
           <p className="text-2xl font-semibold text-slate-50 mb-1">$9 / month</p>
           <p className="text-xs text-slate-400 mb-4">
             Extra credits for verified students using a college email.
           </p>
           <ul className="mb-4 space-y-1.5 text-xs text-slate-200">
             <li>– 240 minutes/month of cloud compute</li>
             <li>– 120 bonus student credits</li>
             <li>– Ideal for video projects and hackathons</li>
           </ul>
           <button
             onClick={() => selectPlan("student")}
             className="mt-auto rounded-md border border-emerald-500/70 bg-emerald-500/10 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-500/20"
           >
             I{"'"}m a student (mock)
           </button>
         </div>
       </div>
       <p className="mt-6 text-xs text-slate-500">
         Billing and student verification are mocked for this prototype. In production, this would
         integrate with Stripe and a student verification service.
       </p>
     </div>
   );
 };
 
 const DashboardShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
     <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
       <aside className="hidden w-52 flex-shrink-0 md:block">
         <nav className="space-y-1">
           <NavLink
             to="/app"
             end
             className={({ isActive }) =>
               `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
             }
           >
             <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
             Apps
           </NavLink>
           <NavLink
             to="/app/history"
             className={({ isActive }) =>
               `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
             }
           >
             <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
             History
           </NavLink>
           <NavLink
             to="/app/integrations"
             className={({ isActive }) =>
               `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
             }
           >
             <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
             Integrations
           </NavLink>
           <NavLink
             to="/app/marketplace"
             className={({ isActive }) =>
               `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
             }
           >
             <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
             Marketplace
           </NavLink>
           <NavLink
             to="/app/settings"
             className={({ isActive }) =>
               `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`
             }
           >
             <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
             Settings
           </NavLink>
         </nav>
       </aside>
       <section className="flex-1">{children}</section>
     </div>
   );
 };
 
 const AppsView: React.FC = () => {
   const { user, setUser } = useAppContext();
   const [isRunning, setIsRunning] = useState(false);
 
   if (!user) {
     return (
       <div className="text-sm text-slate-400">
         Please sign in first to view your apps.
       </div>
     );
   }
 
   const canStartSession = user.minutesUsed < user.minutesIncluded;
 
   const startSession = () => {
     if (!canStartSession) return;
     setIsRunning(true);
     setUser({
       ...user,
       minutesUsed: Math.min(user.minutesIncluded, user.minutesUsed + 15)
     });
   };
 
   const stopSession = () => {
     setIsRunning(false);
   };
 
   return (
     <div className="space-y-6">
       <div>
         <h2 className="text-2xl font-semibold text-slate-50 mb-1">Apps</h2>
         <p className="text-sm text-slate-400">
           Launch heavy apps in the cloud. This prototype shows a mock Adobe Express-style editor
           session.
         </p>
       </div>
 
       <div className="grid gap-5 md:grid-cols-2">
         <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col">
           <div className="flex items-center justify-between mb-3">
             <div>
               <p className="text-sm font-semibold text-slate-50">Cloud Video Studio</p>
               <p className="text-xs text-slate-400">Adobe Express–like editing from the browser</p>
             </div>
             <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[11px] text-slate-300 border border-slate-700">
               GPU · 32GB
             </span>
           </div>
           <div className="mb-4 h-40 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-xs text-slate-400">
             {isRunning ? "Live cloud session streaming here…" : "Preview of remote editor UI"}
           </div>
           <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
             <span>
               Usage this month: {user.minutesUsed}/{user.minutesIncluded} minutes
             </span>
             {!canStartSession && (
               <span className="text-amber-300">
                 Free limit reached – upgrade to continue
               </span>
             )}
           </div>
           <div className="flex gap-3">
             <button
               onClick={startSession}
               disabled={!canStartSession || isRunning}
               className="flex-1 rounded-md bg-emerald-500 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-700"
             >
               {isRunning ? "Session running" : canStartSession ? "Start cloud session" : "Upgrade to run"}
             </button>
             {isRunning && (
               <button
                 onClick={stopSession}
                 className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-200"
               >
                 Stop
               </button>
             )}
           </div>
         </div>
 
         <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col">
           <p className="mb-2 text-sm font-semibold text-slate-50">
             Teaser: Cloud IDE & agents (coming soon)
           </p>
           <p className="mb-4 text-xs text-slate-400">
             Imagine a VS Code–style IDE, connected to GitHub and AI agents, running fully in the
             cloud. This card is a placeholder for future integrations.
           </p>
           <div className="flex-1 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-center text-xs text-slate-500">
             Cloud IDE preview
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 const HistoryView: React.FC = () => {
   const mockHistory = [
     {
       id: 1,
       app: "Cloud Video Studio",
       duration: "42 min",
       date: "Today · 3:15 PM",
       status: "Completed",
       cost: "14 credits"
     },
     {
       id: 2,
       app: "Cloud Video Studio",
       duration: "27 min",
       date: "Yesterday · 9:02 PM",
       status: "Completed",
       cost: "9 credits"
     },
     {
       id: 3,
       app: "Cloud IDE",
       duration: "18 min",
       date: "Last week",
       status: "Completed",
       cost: "6 credits"
     }
   ];
 
   return (
     <div>
       <h2 className="text-2xl font-semibold text-slate-50 mb-1">History</h2>
       <p className="text-sm text-slate-400 mb-4">
         A simple snapshot of past sessions and their usage. In production this would be backed by
         detailed telemetry.
       </p>
       <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/80">
         <table className="min-w-full text-sm">
           <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
             <tr>
               <th className="px-4 py-2 text-left">App</th>
               <th className="px-4 py-2 text-left">When</th>
               <th className="px-4 py-2 text-left">Duration</th>
               <th className="px-4 py-2 text-left">Cost</th>
               <th className="px-4 py-2 text-left">Status</th>
             </tr>
           </thead>
           <tbody>
             {mockHistory.map((item, idx) => (
               <tr key={item.id} className={idx % 2 === 0 ? "bg-slate-950" : "bg-slate-950/70"}>
                 <td className="px-4 py-2 text-slate-100">{item.app}</td>
                 <td className="px-4 py-2 text-slate-300">{item.date}</td>
                 <td className="px-4 py-2 text-slate-300">{item.duration}</td>
                 <td className="px-4 py-2 text-slate-300">{item.cost}</td>
                 <td className="px-4 py-2 text-emerald-300 text-xs">{item.status}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   );
 };
 
 const IntegrationsView: React.FC = () => {
   const integrations = [
     {
       name: "YouTube",
       category: "Social / Video",
       description: "Export edited videos directly to your channel.",
       status: "Planned"
     },
     {
       name: "Instagram",
       category: "Social / Short-form",
       description: "Prepare reels and feed posts from your cloud exports.",
       status: "Planned"
     },
     {
       name: "GitHub",
       category: "Developer",
       description: "Clone, edit, and push code from a cloud IDE.",
       status: "Planned"
     }
   ];
 
   return (
     <div className="space-y-4">
       <div>
         <h2 className="text-2xl font-semibold text-slate-50 mb-1">Integrations</h2>
         <p className="text-sm text-slate-400">
           Future one-click connections to the tools you already use.
         </p>
       </div>
       <div className="grid gap-4 md:grid-cols-3">
         {integrations.map((i) => (
           <div
             key={i.name}
             className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col"
           >
             <p className="text-sm font-semibold text-slate-50 mb-1">{i.name}</p>
             <p className="text-[11px] text-slate-400 mb-2">{i.category}</p>
             <p className="text-xs text-slate-300 mb-3 flex-1">{i.description}</p>
             <span className="inline-flex items-center self-start rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-400">
               {i.status}
             </span>
           </div>
         ))}
       </div>
     </div>
   );
 };
 
 const MarketplaceView: React.FC = () => {
   const templates = [
     {
       title: "YouTube Edit · 4K workflow",
       author: "Alex",
       likes: "128",
       tag: "Video",
       description: "Preset GPU profile, autosave, and export targets tuned for YouTube."
     },
     {
       title: "Student Portfolio Builder",
       author: "Priya",
       likes: "76",
       tag: "Design",
       description: "Template for building a visual portfolio on a low-spec laptop."
     },
     {
       title: "Data Science Starter Lab",
       author: "Jordan",
       likes: "93",
       tag: "Coding",
       description: "Python, Jupyter, and a cloud IDE wired to GitHub."
     },
     {
       title: "Reels Factory",
       author: "Chris",
       likes: "54",
       tag: "Social",
       description: "Short-form video pipeline for Instagram and TikTok."
     }
   ];
 
   return (
     <div>
       <h2 className="text-2xl font-semibold text-slate-50 mb-1">Creator marketplace</h2>
       <p className="text-sm text-slate-400 mb-5">
         Pinterest-inspired grid of templates and cloud environments shared by the community.
       </p>
       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
         {templates.map((t) => (
           <div
             key={t.title}
             className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden flex flex-col"
           >
             <div className="h-32 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex items-end p-3">
               <span className="rounded-full bg-slate-950/80 px-2 py-0.5 text-[10px] text-slate-200 border border-slate-700">
                 {t.tag}
               </span>
             </div>
             <div className="flex-1 p-3 flex flex-col">
               <p className="text-sm font-semibold text-slate-50 mb-1">{t.title}</p>
               <p className="text-[11px] text-slate-400 mb-2">By {t.author}</p>
               <p className="text-xs text-slate-300 flex-1">{t.description}</p>
               <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                 <span>❤ {t.likes}</span>
                 <span className="rounded-full border border-slate-700 px-2 py-0.5">
                   Preview
                 </span>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   );
 };
 
 const SettingsView: React.FC = () => {
   const { user } = useAppContext();
   return (
     <div className="space-y-4">
       <div>
         <h2 className="text-2xl font-semibold text-slate-50 mb-1">Settings</h2>
         <p className="text-sm text-slate-400">
           For this prototype, settings are read-only and illustrate what a real account page might
           show.
         </p>
       </div>
       {user && (
         <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-200">
           <p className="mb-1">
             <span className="text-slate-400">Name:</span> {user.name}
           </p>
           <p className="mb-1">
             <span className="text-slate-400">Plan:</span> {user.plan}
           </p>
           <p className="mb-1">
             <span className="text-slate-400">Usage:</span> {user.minutesUsed}/
             {user.minutesIncluded} minutes
           </p>
           {user.plan === "student" && (
             <p>
               <span className="text-slate-400">Student credits:</span> {user.studentCredits}/
               {user.studentCreditsTotal}
             </p>
           )}
         </div>
       )}
     </div>
   );
 };
 
 const App: React.FC = () => {
   const [user, setUser] = useState<User | null>(null);
 
   const contextValue: AppContextValue = { user, setUser };
 
   return (
     <AppContext.Provider value={contextValue}>
       <AppLayout>
         <Routes>
           <Route path="/" element={<LandingPage />} />
           <Route path="/auth" element={<AuthPage />} />
           <Route path="/plans" element={<PlansPage />} />
           <Route
             path="/app/*"
             element={
               <DashboardShell>
                 <Routes>
                   <Route index element={<AppsView />} />
                   <Route path="history" element={<HistoryView />} />
                   <Route path="integrations" element={<IntegrationsView />} />
                   <Route path="marketplace" element={<MarketplaceView />} />
                   <Route path="settings" element={<SettingsView />} />
                 </Routes>
               </DashboardShell>
             }
           />
         </Routes>
       </AppLayout>
     </AppContext.Provider>
   );
 };
 
 export default App;
 
