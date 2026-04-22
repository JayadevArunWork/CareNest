import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import {
  Shield,
  CalendarCheck,
  Pill,
  ArrowRight,
  Heart,
  Activity,
  Users,
  Clock,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Authentication',
    desc: 'Role-based access with JWT — separate experiences for patients and doctors.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: CalendarCheck,
    title: 'Smart Scheduling',
    desc: 'Book, confirm, and manage appointments effortlessly in real time.',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    icon: Pill,
    title: 'Prescription Management',
    desc: 'Doctors create prescriptions instantly; patients view and track them.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Activity,
    title: 'Microservices Architecture',
    desc: 'Independently scalable services — built for reliability and performance.',
    color: 'from-rose-500 to-pink-500',
  },
];

const stats = [
  { value: '4', label: 'Microservices' },
  { value: '100%', label: 'Dockerized' },
  { value: 'RBAC', label: 'Security Model' },
  { value: 'REST', label: 'API Protocol' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />

      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-teal-500/20 blur-[128px] animate-pulse-slow" />
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-[128px] animate-pulse-slow delay-300" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-teal-400/10 blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-teal-300 backdrop-blur-sm">
            <Heart className="h-4 w-4" />
            Modern Healthcare Platform
          </div>

          <h1 className="animate-fade-in-up delay-100 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Healthcare, <br />
            <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Reimagined
            </span>
          </h1>

          <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
            CareNest connects patients and doctors through a seamless,
            microservices-powered platform — appointment scheduling,
            prescription management, and secure authentication, all in one place.
          </p>

          <div className="animate-fade-in-up delay-300 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-3.5 font-semibold text-white shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 transition-all hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────── */}
      <section className="relative z-10 -mt-20 mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`animate-fade-in-up delay-${(i + 1) * 100} rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-center`}
            >
              <p className="text-3xl font-bold text-teal-400">{s.value}</p>
              <p className="mt-1 text-sm text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-32">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Everything You Need
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            A full-featured healthcare ecosystem built with modern technologies
            and best practices.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`animate-fade-in-up delay-${(i + 1) * 100} group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 hover:border-teal-500/30 transition-all duration-300`}
            >
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg`}
              >
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pb-32">
        <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-emerald-600 p-12 text-center shadow-2xl shadow-teal-700/30">
          <Users className="mx-auto h-12 w-12 text-white/80 mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Healthcare?
          </h2>
          <p className="text-teal-100 max-w-lg mx-auto mb-8">
            Join CareNest today and experience a smarter way to manage
            appointments, prescriptions, and patient care.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-teal-700 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            Create Your Account
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="h-4 w-4 text-teal-500" />
          <span className="font-semibold text-slate-400">CareNest</span>
        </div>
        <p>© {new Date().getFullYear()} CareNest. Built with microservices architecture.</p>
      </footer>
    </div>
  );
}
