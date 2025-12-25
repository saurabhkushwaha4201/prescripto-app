import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Globe,
  CheckCircle,
} from "lucide-react";
import { assets } from "../assets/assets";

/* ---------------- DATA ---------------- */

const TRUST_STATS = [
  { label: "Clinics onboarded", value: "120+" },
  { label: "Appointments booked", value: "15K+" },
  { label: "Avg booking time", value: "2 min" },
];

const TESTIMONIALS = [
  {
    quote:
      "Prescripto made booking my family's appointments effortless — simple and reliable.",
    who: "Anita K., Patient",
  },
  {
    quote:
      "We cut no-shows by 35% after adding Prescripto’s reminder workflows.",
    who: "Dr. Rohit P., Clinic Owner",
  },
];

const TEAM = [
  {
    name: "Saurabh Kumar",
    role: "Founder & CTO",
    img: assets.team_saurabh,
  },
  {
    name: "Priya Sharma",
    role: "Product",
    img: assets.team_priya,
  },
];

/* ---------------- ANIMATIONS ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const lift = {
  whileHover: { y: -6, scale: 1.03 },
  whileTap: { scale: 0.96 },
};

/* ---------------- PAGE ---------------- */

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-14 space-y-20">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden rounded-3xl
        bg-linear-to-br from-indigo-600 via-violet-800 to-purple-60
        text-white px-8 py-20 shadow-xl ">

        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl" />
        <div className="absolute top-20 -right-24 w-80 h-80 bg-yellow-400/30 rounded-full blur-3xl" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="relative text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Healthcare scheduling that actually works.
          </h1>

          <p className="mt-4 text-lg text-white/90">
            Book appointments, track visit history, and get reminders —
            all in one fast, private place.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.a
              {...lift}
              href="/doctors"
              className="px-7 py-3 rounded-xl font-semibold text-white
              bg-linear-to-r from-amber-400 to-orange-500
              shadow-lg hover:shadow-2xl transition"
            >
              Book an appointment
            </motion.a>

            <motion.a
              {...lift}
              href="/Login"
              className="px-7 py-3 rounded-xl font-semibold
              bg-white/20 backdrop-blur-md border border-white/30
              hover:bg-white hover:text-indigo-600 transition"
            >
              Create free account
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ================= PROBLEM → SOLUTION ================= */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          src={assets.about_image}
          alt="Patient booking appointment"
          className="rounded-2xl shadow-lg object-cover"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Appointments are fragmented and slow.
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Many patients juggle phone calls, missed messages,
            and confusing clinic systems. That leads to
            missed care and wasted time.
          </p>

          <h3 className="mt-6 font-semibold text-gray-900">
            How Prescripto helps
          </h3>

          <ul className="mt-3 space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-indigo-500" />
              Centralized scheduling
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-indigo-500" />
              Automated reminders & visit history
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-indigo-500" />
              Simple booking on web & mobile
            </li>
          </ul>

          <div className="mt-6 flex gap-4">
            <motion.a
              {...lift}
              href="/doctors"
              className="px-5 py-3 rounded-xl text-white font-semibold
              bg-linear-to-r from-indigo-600 to-purple-600 shadow-md"
            >
              Explore doctors
            </motion.a>

            <motion.a
              {...lift}
              href="/how-it-works"
              className="px-5 py-3 rounded-xl font-semibold
              border border-gray-300 text-gray-700
              hover:bg-gray-100 transition"
            >
              How it works
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="rounded-3xl bg-gray-50 p-10">
        {/* items-stretch ensures all 3 main columns share the same height */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">

          {/* Column 1: Intro & Stats */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                Trusted by clinics — built for people
              </h3>

              <p className="mt-4 text-gray-600">
                We help clinics reduce no-shows and patients save time.
                Small teams to larger clinics — Prescripto scales
                with your needs.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {TRUST_STATS.map((s, i) => (
                  <div key={i} className="text-left">
                    <div className="text-2xl font-bold text-indigo-600">
                      {s.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider font-medium text-gray-500">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges with improved color note */}
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full text-sm font-medium text-indigo-700 shadow-sm">
                <Globe size={14} className="text-indigo-500" />
                Global-ready
              </span>
              <span className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full text-sm font-medium text-blue-700 shadow-sm">
                <Users size={14} className="text-blue-500" />
                Clinics & patients
              </span>
            </div>
          </div>

          {/* Column 2: Testimonials */}
          <div className="flex flex-col gap-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote
                key={i}
                whileHover={{ scale: 1.02 }}
                className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center relative"
              >
                {/* Accent line moved to a subtle left border or top bar */}
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-indigo-500 rounded-r-lg" />
                <p className="italic text-gray-700 text-md leading-relaxed">“{t.quote}”</p>
                <footer className="mt-4 text-sm font-semibold text-gray-500">
                  — {t.who}
                </footer>
              </motion.blockquote>
            ))}
          </div>

          {/* Column 3: CTA card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col justify-center text-center lg:text-left"
          >
            <h4 className="text-2xl font-bold text-gray-900">
              Ready to simplify care?
            </h4>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Start free — no credit card required.
              Book your first appointment in under two minutes.
            </p>

            <div className="mt-8">
              <motion.a
                {...lift}
                href="/doctors"
                className="inline-block w-full text-center px-8 py-4 rounded-xl text-white font-bold
          bg-linear-to-r from-orange-400 to-orange-600 shadow-lg hover:shadow-orange-200 transition-shadow"
              >
                Book appointment
              </motion.a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-5 space-y-7">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-gray-900">
            Built by a small team who care
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Real people building tools to make healthcare more accessible for everyone.
          </p>
        </div>

        <div className="flex justify-center gap-6 flex-wrap">
          {TEAM.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              className="group bg-white border border-gray-100 p-6 rounded-2xl w-48 shadow-sm flex flex-col items-center transition-all"
            >
              <div className="relative">
                {/* Decorative ring around image */}
                <div className="absolute -inset-1 bg-linear-to-tr from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                <img
                  src={m.img}
                  alt={m.name}
                  className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
                />
              </div>

              <div className="mt-4 text-center">
                <div className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {m.name}
                </div>
                <div className="text-xs font-medium uppercase tracking-widest text-indigo-500 mt-1">
                  {m.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative overflow-hidden rounded-3xl bg-indigo-600 text-white py-12 px-6 lg:py-16 text-center shadow-xl max-w-5xl mx-auto">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl" />

        <div className="relative z-10">
          <h3 className="text-3xl font-bold tracking-tight">
            Ready to make scheduling painless?
          </h3>

          <p className="mt-3 text-indigo-100 max-w-xl mx-auto text-lg">
            Join 120+ clinics already using Prescripto to automate their
            workflows and delight their patients.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Button */}
            <motion.a
              {...lift}
              href="/Login"
              className="px-8 py-3.5 rounded-xl bg-white text-indigo-600 font-bold shadow-md hover:bg-indigo-50 transition-colors"
            >
              Create free account
            </motion.a>

            {/* Fixed Talk to Sales Button */}
            <motion.a
              whileHover={{
                backgroundColor: "rgba(255, 255, 255, 0.15)", // Brighter tint for better visibility
                scale: 1.03, // Slight "pop" effect
                borderColor: "rgba(255, 255, 255, 0.8)" // Brightens the border on hover
              }}
              whileTap={{ scale: 0.97 }} // Feels like a physical button press
              href="/contact"
              className="px-8 py-3.5 rounded-xl border-2 border-white/30 text-white font-bold transition-all duration-200 shadow-sm"
            >
              Talk to sales
            </motion.a>
          </div>

          {/* Improved Disclaimer Text */}
          <p className="mt-8 text-[11px] font-bold tracking-[0.2em] uppercase text-indigo-200/80 font-mono">
            No credit card required <span className="mx-2 text-white/40">•</span> 14-day free trial
          </p>
        </div>
      </section>

    </main>
  );
}
