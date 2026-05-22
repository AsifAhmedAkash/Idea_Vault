"use client";

import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="w-full bg-[#394e00] text-white dark:bg-tertiary">

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid grid-cols-1 md:grid-cols-4 gap-10">

                <div className="flex flex-col gap-5">
                    <h2 className="text-2xl font-bold text-secondary">
                        IdeaVault
                    </h2>

                    <p className="text-sm text-white/70 leading-relaxed">
                        Bridging the gap between startup ideas and structured venture capital through grounded innovation and trust.
                    </p>

                    <div className="flex gap-3 mt-2">
                        <a href="https://www.linkedin.com/in/asif-ahmed-akash/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
                            <FaLinkedin />
                        </a>
                        <a className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
                            <FaXTwitter />
                        </a>
                        <a href="https://www.instagram.com/asif_npc/" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
                            <FaInstagram />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm tracking-widest text-secondary mb-4">
                        PLATFORM
                    </h4>

                    <ul className="space-y-3 text-white/70">
                        <li className="hover:text-white cursor-pointer">Tags</li>
                        <li className="hover:text-white cursor-pointer">Categories</li>
                        <li className="hover:text-white cursor-pointer"><a href="https://www.linkedin.com/in/asif-ahmed-akash/">About Us</a></li>
                        <li className="hover:text-white cursor-pointer">Innovation Journal</li>
                        <li className="hover:text-white cursor-pointer">Startup FAQ</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm tracking-widest text-secondary mb-4">
                        LEGAL
                    </h4>

                    <ul className="space-y-3 text-white/70">
                        <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-white cursor-pointer">Terms of Service</li>
                        <li className="hover:text-white cursor-pointer">Contact Support</li>
                    </ul>
                </div>

                {/* NEWSLETTER */}
                <div>
                    <h4 className="text-sm tracking-widest text-secondary mb-4">
                        STAY CONNECTED
                    </h4>

                    <p className="text-white/70 text-sm mb-4">
                        Get updates on innovation and investor opportunities.
                    </p>

                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex flex-col gap-3"
                    >
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-secondary"
                        />

                        <button
                            type="submit"
                            className="bg-secondary text-black font-semibold py-3 rounded-lg hover:scale-105 transition"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-white/10 py-6 px-6 md:px-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">

                    <p>© 2026 IdeaVault. All rights reserved.</p>

                    <div className="flex gap-6">
                        <span className="flex items-center gap-2">🌐 English (US)</span>
                        <span className="flex items-center gap-2">🔒 SOC2 Certified</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}