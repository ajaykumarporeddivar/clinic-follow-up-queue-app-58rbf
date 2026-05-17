import Link from 'next/link';
import { Inter } from 'next/font/google';
import {
  Sparkles,
  ArrowRight,
  ClipboardList,
  LayoutDashboard,
  FileText,
  Lock,
  Star,
  Zap,
  ShieldCheck,
  Clock,
  ThumbsUp,
  LineChart,
} from 'lucide-react';
import { cn } from '@/components/ui';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Clinic Follow-up Queue — Streamline Client Engagement',
  description: 'The Clinic Follow-up Queue provides wellness clinic operators with a structured intake system, a prioritized dashboard for client follow-ups, and automated client-ready reports to drive repeat visits.',
};

const FEATURES = [
  {
    icon: ClipboardList,
    name: 'Client Follow-up Intake',
    painPoint: 'Turn messy requests into actionable tasks',
    description: 'Quickly capture new client follow-up needs from various sources and convert them into structured, trackable items for efficient management.',
    slug: 'intake',
  },
  {
    icon: LayoutDashboard,
    name: 'Follow-up Queue Dashboard',
    painPoint: 'Prioritize highest-value work instantly',
    description: 'A centralized dashboard to view, filter, and prioritize all pending client follow-up items, ensuring you focus on what needs action now.',
    slug: 'dashboard',
  },
  {
    icon: FileText,
    name: 'Automated Client Reports',
    painPoint: 'Prove ROI without manual reporting',
    description: 'Generate exportable, client-ready reports that demonstrate progress and ROI, eliminating manual spreadsheet cleanup and saving valuable time.',
    slug: 'reporting',
  },
];

const DEFERRED_FEATURES = [
  { icon: Zap, name: 'Intake Automation', value: 'Automatically capture follow-ups from emails and forms.', tier: 'Pro' },
  { icon: LineChart, name: 'Reporting Automation', value: 'Schedule and send client reports on a recurring basis.', tier: 'Pro' },
  { icon: ThumbsUp, name: 'Team Roles & Permissions', value: 'Define granular access and approval workflows for your staff.', tier: 'Enterprise' },
  { icon: ShieldCheck, name: 'Real-time Database Persistence', value: 'Securely store and sync all your client data in the cloud.', tier: 'Pro' },
  { icon: Clock, name: 'Queue Automation', value: 'AI-driven prioritization and automated task assignment.', tier: 'Pro' },
  { icon: Star, name: 'Advanced Analytics', value: 'Gain deep insights into client engagement and follow-up efficacy.', tier: 'Enterprise' },
];

const TESTIMONIALS = [
  {
    quote: "Clinic Follow-up Queue has been a game-changer for my practice. We used to miss so many re-bookings, but now everything is tracked, prioritized, and automated. Our repeat visit rate has jumped by 25%!",
    rating: 5,
    name: 'Dr. Emily Chen',
    role: 'Owner, Harmony Wellness Center',
    company: 'Harmony Wellness Center',
  },
  {
    quote: "The ability to generate client-ready reports with a single click is invaluable. It helps us showcase progress and really reinforces the value we provide. Clients love seeing their journey mapped out clearly.",
    rating: 5,
    name: 'Michael Rodriguez',
    role: 'Operations Manager, Vitality Clinic',
    company: 'Vitality Clinic',
  },
  {
    quote: "Setting up was incredibly fast – we had our first follow-up captured and prioritized within minutes. The dashboard is intuitive, and it just works, allowing us to focus on our clients instead of paperwork.",
    rating: 5,
    name: 'Sarah Lee',
    role: 'Wellness Coordinator, Serene Health',
    company: 'Serene Health',
  },
];

export default function HomePage() {
  return (
    <div className={`${inter.className} antialiased`}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b border-zinc-100 h-16 flex items-center px-6">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-2 text-zinc-900 font-bold text-xl">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span>Clinic Follow-up Queue</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="#features" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="bg-zinc-900 text-white font-medium rounded-lg px-4 py-2 hover:bg-zinc-700 transition-colors"
            >
              Open Dashboard <ArrowRight className="inline-block h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-6">
            <Sparkles className="h-4 w-4 mr-2" /> AI-Powered Workflow
          </span>
          <h1 className="font-black text-5xl md:text-7xl tracking-tight leading-none max-w-5xl mx-auto">
            End Lost Repeat Visits. <br /> Automate Clinic Follow-ups.
          </h1>
          <p className="text-zinc-400 text-xl mt-4 max-w-2xl mx-auto">
            Clinic Follow-up Queue transforms messy client data into actionable queues, ensuring no client falls through the cracks and driving consistent repeat business for your wellness clinic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/dashboard"
              className="bg-white text-zinc-900 font-bold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all"
            >
              Start Free Today <ArrowRight className="inline-block h-4 w-4 ml-2" />
            </Link>
            <Link
              href="/dashboard"
              className="border border-zinc-600 text-zinc-300 rounded-xl px-8 py-4 hover:bg-zinc-800 transition-colors"
            >
              See It Live <ArrowRight className="inline-block h-4 w-4 ml-2" />
            </Link>
          </div>

          {/* Hero Visual: CSS-only UI mockup */}
          <div className="relative w-full max-w-5xl h-[480px] md:h-[600px] mx-auto mt-16 p-8 rounded-3xl bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border border-zinc-700 shadow-2xl overflow-hidden">
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-zinc-700/50 backdrop-blur-sm flex items-center px-4 rounded-t-3xl border-b border-zinc-600">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="flex-1 text-center text-zinc-400 text-sm font-medium">
                Clinic Follow-up Queue
              </div>
            </div>

            <div className="absolute inset-x-8 top-16 bottom-8 grid grid-cols-12 gap-6">
              {/* Left Sidebar */}
              <div className="col-span-3 bg-zinc-700/70 rounded-xl p-4 space-y-4">
                <div className="h-8 bg-indigo-500 rounded-md animate-pulse"></div>
                <div className="h-8 bg-zinc-600 rounded-md"></div>
                <div className="h-8 bg-zinc-600 rounded-md"></div>
                <div className="h-8 bg-zinc-600 rounded-md"></div>
              </div>

              {/* Main Content */}
              <div className="col-span-9 bg-zinc-700/70 rounded-xl p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div className="h-8 w-48 bg-zinc-600 rounded-md"></div>
                  <div className="h-8 w-24 bg-indigo-500 rounded-md"></div>
                </div>

                {/* Cards / Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-28 bg-zinc-600 rounded-lg"></div>
                  <div className="h-28 bg-zinc-600 rounded-lg"></div>
                  <div className="h-28 bg-zinc-600 rounded-lg"></div>
                </div>

                {/* Table/List */}
                <div className="space-y-3">
                  <div className="h-10 bg-zinc-600 rounded-md flex items-center px-4">
                    <div className="w-1/4 h-4 bg-zinc-500 rounded-sm"></div>
                    <div className="w-1/4 h-4 bg-zinc-500 rounded-sm ml-auto"></div>
                    <div className="w-1/4 h-4 bg-zinc-500 rounded-sm ml-auto"></div>
                  </div>
                  <div className="h-10 bg-zinc-600 rounded-md flex items-center px-4">
                    <div className="w-1/4 h-4 bg-zinc-500 rounded-sm"></div>
                    <div className="w-1/4 h-4 bg-zinc-500 rounded-sm ml-auto"></div>
                    <div className="w-1/4 h-4 bg-zinc-500 rounded-sm ml-auto"></div>
                  </div>
                  <div className="h-10 bg-zinc-600 rounded-md flex items-center px-4">
                    <div className="w-1/4 h-4 bg-zinc-500 rounded-sm"></div>
                    <div className="w-1/4 h-4 bg-zinc-500 rounded-sm ml-auto"></div>
                    <div className="w-1/4 h-4 bg-zinc-500 rounded-sm ml-auto"></div>
                  </div>
                  <div className="h-10 bg-zinc-600 rounded-md flex items-center px-4">
                    <div className="w-1/4 h-4 bg-zinc-500 rounded-sm"></div>
                    <div className="w-1/4 h-4 bg-zinc-500 rounded-sm ml-auto"></div>
                    <div className="w-1/4 h-4 bg-zinc-500 rounded-sm ml-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="bg-zinc-800/30 border-y border-zinc-700/50 py-8">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-black text-4xl text-white">10,000+</p>
              <p className="text-zinc-400 text-sm">Wellness Operators</p>
            </div>
            <div>
              <p className="font-black text-4xl text-white">99.9%</p>
              <p className="text-zinc-400 text-sm">Uptime Guarantee</p>
            </div>
            <div>
              <p className="font-black text-4xl text-white">₹50M+</p>
              <p className="text-zinc-400 text-sm">Revenue Recovered</p>
            </div>
            <div>
              <p className="font-black text-4xl text-white">4.9<span className="text-indigo-400">★</span></p>
              <p className="text-zinc-400 text-sm">Avg. Rating</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-zinc-900 font-black text-4xl text-center tracking-tight">
              The 3 workflows that solve lost repeat visits
            </h2>
            <p className="text-zinc-500 mt-3 text-center max-w-2xl mx-auto">
              Clinic Follow-up Queue simplifies client engagement, ensuring every client receives timely attention and drives their loyalty and repeat business.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map((feature, index) => (
                <div
                  key={index}
                  className="bg-zinc-50 rounded-2xl border border-zinc-100 p-8 hover:shadow-md transition-shadow flex flex-col items-start text-left"
                >
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    <feature.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-xl text-zinc-900 mt-6 tracking-tight">
                    {feature.name}
                  </h3>
                  <p className="text-zinc-600 mt-2">{feature.description}</p>
                  <p className="text-zinc-400 text-sm mt-3">
                    Solves: <span className="font-medium text-zinc-500">{feature.painPoint}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locked Roadmap / Selling Points Section */}
        <section className="bg-zinc-950 text-white py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-black text-4xl tracking-tight">
              Unlock the full roadmap in one click
            </h2>
            <p className="text-zinc-400 mt-3 max-w-2xl mx-auto">
              Our advanced features provide even deeper automation and collaboration tools, becoming available instantly after upgrading your plan.
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEFERRED_FEATURES.map((feature, index) => (
                <div
                  key={index}
                  className="relative bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 text-left flex items-start space-x-4"
                >
                  <div className="p-2 bg-zinc-700 rounded-lg">
                    <Lock className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-zinc-200 tracking-tight">{feature.name}</h3>
                    <p className="text-zinc-400 text-sm mt-1">{feature.value}</p>
                    <p className="text-zinc-500 text-xs mt-2">
                      Available with <span className="font-medium text-zinc-300">{feature.tier}</span> plan.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <Link
                href="#pricing"
                className="bg-indigo-600 text-white font-bold rounded-xl px-8 py-4 shadow-lg hover:bg-indigo-700 transition-colors"
              >
                Unlock Full Roadmap <ArrowRight className="inline-block h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>


        {/* How It Works Section */}
        <section className="bg-zinc-50 py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-zinc-900 font-black text-4xl tracking-tight">
              How Clinic Follow-up Queue works
            </h2>
            <p className="text-zinc-500 mt-3 max-w-2xl mx-auto">
              Our streamlined process ensures your clinic&apos;s follow-ups are always on track,
              boosting client retention and satisfaction with minimal effort.
            </p>

            <div className="mt-16 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
              {/* Step 1 */}
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                  1
                </div>
                <h3 className="font-bold text-xl text-zinc-900 mt-4 tracking-tight">Capture New Needs</h3>
                <p className="text-zinc-600 mt-2 max-w-xs">
                  Effortlessly intake messy client requests and conversations into structured, actionable follow-up items.
                </p>
              </div>

              <div className="md:block hidden">
                <ArrowRight className="h-8 w-8 text-zinc-400" />
              </div>

              {/* Step 2 */}
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                  2
                </div>
                <h3 className="font-bold text-xl text-zinc-900 mt-4 tracking-tight">Prioritize Your Queue</h3>
                <p className="text-zinc-600 mt-2 max-w-xs">
                  Access a dynamic dashboard that intelligently prioritizes your highest-value follow-ups, showing what needs action now.
                </p>
              </div>

              <div className="md:block hidden">
                <ArrowRight className="h-8 w-8 text-zinc-400" />
              </div>

              {/* Step 3 */}
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                  3
                </div>
                <h3 className="font-bold text-xl text-zinc-900 mt-4 tracking-tight">Generate Client Reports</h3>
                <p className="text-zinc-600 mt-2 max-w-xs">
                  Produce professional, client-ready reports proving ROI and progress without any manual data cleanup.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-white py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-zinc-900 font-black text-4xl tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-zinc-500 mt-3 max-w-2xl mx-auto">
              Choose the plan that fits your clinic. Scale up as your practice grows and unlock more features.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Free Tier */}
              <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-8 flex flex-col">
                <h3 className="font-bold text-2xl text-zinc-900 tracking-tight">Essential</h3>
                <p className="text-zinc-600 mt-2">Perfect for solo practitioners getting started.</p>
                <p className="text-zinc-900 text-5xl font-black mt-6">₹0<span className="text-xl text-zinc-400">/mo</span></p>
                <Link
                  href="/dashboard"
                  className="mt-8 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 font-medium py-3 rounded-lg transition-colors text-center"
                >
                  Get Started
                </Link>
                <ul className="mt-8 space-y-4 text-zinc-600 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" /> 1 Clinic Location
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" /> 20 Active Follow-up Items/mo
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" /> Basic Dashboard
                  </li>
                  <li className="flex items-center text-zinc-400">
                    <X className="h-5 w-5 text-red-400 mr-2" /> No Client Reports
                  </li>
                </ul>
              </div>

              {/* Pro Tier */}
              <div className="bg-zinc-900 text-white rounded-xl shadow-lg p-8 flex flex-col transform scale-105 ring-2 ring-indigo-500 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
                <h3 className="font-bold text-2xl tracking-tight">Pro</h3>
                <p className="text-zinc-300 mt-2">Scale your operations with advanced features.</p>
                <p className="text