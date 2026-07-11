import { useEffect, useRef, useState } from 'react';
import VennIcon from './VennIcon';

const CORAL = '#FF6B5B';
const PLUM = '#6B3FA0';
const BUTTER = '#FFD23F';
const INK = '#0F1020';
const CREAM = '#FAF8F5';

// App sign-in / sign-up entry point (the Base44 app lives on this subdomain).
const APP_URL = 'https://app.bookdt.app/login';
// Standalone public privacy policy (GitHub Pages) — must match the OAuth consent screen.
const PRIVACY_URL = 'https://privacy.bookdt.app';

// ── Timezone clock card ──────────────────────────────────────────────────────
function TZCard({ city, emoji, offsetHours }) {
    const [time, setTime] = useState('');
    const [hour, setHour] = useState(12);
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const local = new Date(utc + offsetHours * 3600000);
            setTime(local.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
            setHour(local.getHours());
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [offsetHours]);

    const isDay = hour >= 7 && hour < 19;

    return (
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 14, padding: '16px 20px', textAlign: 'center', minWidth: 110 }}>
            <div style={{ fontSize: 24 }}>{emoji}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginTop: 6 }}>{city}</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 700, color: PLUM, marginTop: 4, lineHeight: 1.1 }}>{time}</div>
            <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 6 }}>{isDay ? '☀️ Daytime' : '🌙 Night'}</div>
        </div>
    );
}

// ── Chat demo ────────────────────────────────────────────────────────────────
const CHAT_MSGS = [
    { user: 'Maya', time: '2:14PM', text: "wait when r we doing dinner??" },
    { user: 'Jay',  time: '2:16PM', text: "i'm free friday or saturday" },
    { user: 'Lina', time: '2:18PM', text: "friday works! wait no actually i have a thing" },
    { user: 'Maya', time: '2:19PM', text: "what about next week?" },
    { user: 'Kai',  time: '2:23PM', text: "i can do tues or wed after 6" },
    { user: 'Jay',  time: '2:25PM', text: "wait what timezone are you in again" },
    { user: 'Lina', time: '2:31PM', text: "can someone just pick a day lol" },
];
const NAME_COLORS = { Maya: '#FF6B5B', Jay: '#8B65C0', Lina: '#4A9EE5', Kai: '#34B87A' };

function ChatDemo() {
    const [visible, setVisible] = useState(0);
    useEffect(() => {
        if (visible >= CHAT_MSGS.length) return;
        const id = setTimeout(() => setVisible(v => v + 1), 650);
        return () => clearTimeout(id);
    }, [visible]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CHAT_MSGS.slice(0, visible).map((m, i) => (
                <div key={i} style={{ animation: 'fadeUp 0.3s ease' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: NAME_COLORS[m.user] }}>{m.user}</span>
                        <span style={{ fontSize: 10, color: '#6b7280' }}>{m.time}</span>
                    </div>
                    <div style={{ fontSize: 13, color: '#e5e7eb', lineHeight: 1.4 }}>{m.text}</div>
                </div>
            ))}
            {visible >= CHAT_MSGS.length && (
                <div style={{ textAlign: 'center', marginTop: 12, fontFamily: 'Fraunces, serif', fontStyle: 'italic', color: BUTTER, fontSize: 15, animation: 'fadeUp 0.4s ease' }}>
                    sound familiar?
                </div>
            )}
        </div>
    );
}

// ── Booking demo ─────────────────────────────────────────────────────────────
const LABEL_STYLE = { fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 };

function SlotTimes() {
    return (
        <div style={{ fontSize: 10, lineHeight: 1.6 }}>
            <span style={{ color: '#9ca3af' }}>8:00–9:00 PM </span><span style={{ color: '#8B65C0', fontWeight: 600 }}>EDT</span><span style={{ color: '#6b7280' }}> (you)</span>
            <span style={{ color: '#4a5568' }}> · </span>
            <span style={{ color: '#9ca3af' }}>7:00–8:00 PM </span><span style={{ color: '#4A9EE5', fontWeight: 600 }}>CDT</span><span style={{ color: '#6b7280' }}> Ariyor</span>
            <span style={{ color: '#4a5568' }}> · </span>
            <span style={{ color: '#9ca3af' }}>9:00–10:00 AM </span><span style={{ color: '#34B87A', fontWeight: 600 }}>GMT+9</span><span style={{ color: '#6b7280' }}> mocheese</span>
        </div>
    );
}

function BookingDemo() {
    const slots = [
        { day: 'Thu, May 28', selected: false },
        { day: 'Fri, May 29', selected: true },
        { day: 'Sat, May 30', selected: false },
    ];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Meeting subject */}
            <div>
                <div style={{ ...LABEL_STYLE, color: '#6b7280' }}>Meeting Subject</div>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${PLUM}55`, borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#e5e7eb' }}>
                    Friday Dinner 🍽️🍕
                </div>
            </div>

            {/* Duration chips */}
            <div>
                <div style={{ ...LABEL_STYLE, color: '#6b7280' }}>Duration</div>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['30 min', '1 hr', '1.5 hr', '2 hr'].map(d => (
                        <div key={d} style={{
                            padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                            background: d === '1 hr' ? PLUM : 'rgba(255,255,255,0.05)',
                            color: d === '1 hr' ? 'white' : '#6b7280',
                            border: `1px solid ${d === '1 hr' ? PLUM : '#2a2b40'}`,
                        }}>{d}</div>
                    ))}
                </div>
            </div>

            {/* Member timezones */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${PLUM}33`, borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ ...LABEL_STYLE, color: PLUM, padding: '10px 12px 6px' }}>Member Timezones</div>
                {[
                    { name: 'Mohammed (you)', tz: 'EDT', tzColor: '#8B65C0' },
                    { name: 'Ariyor', tz: 'CDT', tzColor: '#4A9EE5' },
                    { name: 'mocheese', tz: 'GMT+9', tzColor: '#34B87A' },
                ].map((m, i) => (
                    <div key={m.name} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '7px 12px',
                        borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}>
                        <span style={{ fontSize: 12, color: '#d1d5db' }}>{m.name}</span>
                        <span style={{ fontSize: 11, color: m.tzColor, fontWeight: 700 }}>{m.tz}</span>
                    </div>
                ))}
            </div>

            {/* Heading */}
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginTop: 2 }}>
                🕐 Times that work for everyone
            </div>

            {/* Time slots */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {slots.map(s => (
                    <div key={s.day} style={{
                        background: s.selected ? `${PLUM}18` : 'rgba(255,255,255,0.03)',
                        border: `1.5px solid ${s.selected ? PLUM : '#2a2b40'}`,
                        borderRadius: 10,
                        padding: '10px 12px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                            {s.selected ? (
                                <div style={{ width: 18, height: 18, borderRadius: '50%', background: PLUM, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span style={{ fontSize: 10, color: 'white', fontWeight: 700 }}>✓</span>
                                </div>
                            ) : (
                                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span style={{ fontSize: 10 }}>📅</span>
                                </div>
                            )}
                            <span style={{ fontSize: 12, fontWeight: 700, color: s.selected ? PLUM : '#e5e7eb' }}>{s.day}</span>
                        </div>
                        <SlotTimes />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Feature card SVG icons ────────────────────────────────────────────────────
const IconShield = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 3L6 9v10c0 8.5 5.9 16.4 14 18.8C28.1 35.4 34 27.5 34 19V9L20 3z" fill={PLUM} />
        <path d="M15 20l3.5 3.5L26 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const IconCalendarSync = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="26" height="24" rx="3" fill={CORAL} />
        <rect x="4" y="8" width="26" height="8" rx="3" fill="#d94f3e" />
        <rect x="11" y="4" width="3" height="7" rx="1.5" fill="white" />
        <rect x="20" y="4" width="3" height="7" rx="1.5" fill="white" />
        <rect x="8" y="20" width="5" height="4" rx="1" fill="white" opacity="0.7" />
        <rect x="15" y="20" width="5" height="4" rx="1" fill="white" opacity="0.7" />
        {/* Refresh arrow */}
        <circle cx="32" cy="28" r="7" fill="white" />
        <path d="M28.5 28a3.5 3.5 0 0 1 6.3-2.1" stroke={CORAL} strokeWidth="2" strokeLinecap="round" fill="none"/>
        <polygon points="35.5,24.5 37,27.5 33.5,27" fill={CORAL} />
    </svg>
);

const IconClockCheck = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="16" fill={PLUM} />
        <circle cx="20" cy="20" r="1.5" fill="white" />
        <line x1="20" y1="20" x2="20" y2="10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="20" x2="27" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="30" cy="10" r="7" fill="#FFD23F" />
        <path d="M27 10l2 2.5 4-4" stroke={PLUM} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
);

const IconGlobe = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="16" fill={CORAL} />
        <ellipse cx="20" cy="20" rx="7" ry="16" stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" />
        <line x1="4" y1="20" x2="36" y2="20" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <line x1="6" y1="13" x2="34" y2="13" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <line x1="6" y1="27" x2="34" y2="27" stroke="white" strokeWidth="1.5" opacity="0.6" />
        <circle cx="20" cy="4" r="2" fill="white" opacity="0.8" />
        <circle cx="20" cy="36" r="2" fill="white" opacity="0.8" />
    </svg>
);

const IconBolt = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="22,4 10,22 20,22 18,36 30,18 20,18" fill={BUTTER} />
    </svg>
);

const IconChatSparkle = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 8h24a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H14l-6 5V11a3 3 0 0 1 3-3z" fill={PLUM} />
        <circle cx="31" cy="9" r="2" fill={BUTTER} />
        <circle cx="36" cy="5" r="1.5" fill={BUTTER} />
        <circle cx="34" cy="14" r="1" fill={BUTTER} />
        <rect x="11" y="16" width="14" height="2" rx="1" fill="white" opacity="0.7" />
        <rect x="11" y="20" width="9" height="2" rx="1" fill="white" opacity="0.5" />
    </svg>
);

const FEATURE_CARDS = [
    { icon: <IconShield />, title: 'Private by default', desc: "Friends see when you're free, never your event details. Your calendar stays yours." },
    { icon: <IconCalendarSync />, title: 'Calendar sync', desc: "Connect Google Calendar and Bookdt knows when you're free. Always current, zero manual work." },
    { icon: <IconClockCheck />, title: 'Find time', desc: "Bookdt layers your calendars and shows the times that work for everyone. No back-and-forth." },
    { icon: <IconGlobe />, title: 'Timezone-aware', desc: "Friends in different cities? Everyone sees availability in their own local time. No mental math." },
    { icon: <IconBolt />, title: 'One-tap booking', desc: "Pick a time. Name the plan. It's on everyone's calendar. That's the whole process." },
    { icon: <IconChatSparkle />, title: 'AI scheduling', desc: 'Say "coffee with Sarah this week" and Bookdt finds the best time and books it.' },
];

// ── Fade-in hook ─────────────────────────────────────────────────────────────
function useFadeIn() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                obs.disconnect();
            }
        }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return ref;
}

function FadeSection({ children, style = {} }) {
    const ref = useFadeIn();
    return (
        <div ref={ref} style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.6s ease, transform 0.6s ease', ...style }}>
            {children}
        </div>
    );
}

// VennIcon is imported from ./VennIcon

function NavLogo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <VennIcon size={34} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 22, color: '#F5F0E8', letterSpacing: '-0.5px' }}>bookdt</span>
        </div>
    );
}

function FooterLogo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
            <VennIcon size={32} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 18, color: INK }}>bookdt</span>
        </div>
    );
}

// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            background: scrolled ? 'rgba(15,16,32,0.9)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            transition: 'background 0.3s, backdrop-filter 0.3s',
            padding: '0 24px',
            height: 60,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
            <NavLogo />
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <a href="#features" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>Features</a>
                <a href={PRIVACY_URL} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>Privacy</a>
                <a href={APP_URL} style={{
                    background: CORAL, color: 'white', fontFamily: 'DM Sans, sans-serif',
                    fontSize: 14, fontWeight: 600, padding: '8px 18px', borderRadius: 100,
                    textDecoration: 'none', transition: 'opacity 0.2s',
                }}>Get started</a>
            </div>
        </nav>
    );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
    return (
        <div style={{ fontFamily: 'DM Sans, sans-serif', color: INK, overflowX: 'hidden' }}>
            <style>{`
                @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
                * { box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                a:hover { opacity: 0.85; }
            `}</style>

            <Nav />

            {/* ── HERO ──────────────────────────────────────────────────── */}
            <section style={{ background: INK, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 60px', textAlign: 'center' }}>
                <div style={{ background: `${BUTTER}22`, border: `1px solid ${BUTTER}55`, borderRadius: 100, padding: '6px 16px', display: 'inline-block', marginBottom: 24 }}>
                    <span style={{ fontFamily: 'Fraunces, serif', color: BUTTER, fontSize: 13, fontWeight: 600 }}>The group chat can't do this</span>
                </div>
                <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 900, fontSize: 'clamp(36px, 6vw, 72px)', color: 'white', maxWidth: 760, lineHeight: 1.1, margin: '0 auto 24px' }}>
                    Stop asking{' '}
                    <em style={{ color: CORAL, fontStyle: 'italic' }}>"when're we hanging out?"</em>
                </h1>
                <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#9ca3af', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.6 }}>
                    Bookdt is a calendar for your groupchat. Easily find time and make plans in a few taps.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
                    <a href={APP_URL} style={{ background: CORAL, color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 100, textDecoration: 'none' }}>
                        Start for free
                    </a>
                    <a href="#how-it-works" style={{ background: 'transparent', color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 16, padding: '14px 32px', borderRadius: 100, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.25)' }}>
                        How it works
                    </a>
                </div>

                {/* Comparison cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 860, width: '100%', textAlign: 'left', alignItems: 'start' }}>
                    <div style={{ background: '#1C1E38', borderRadius: 20, padding: 24, border: '1px solid #2a2b40' }}>
                        <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, color: '#6b7280', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>The old way</div>
                        <ChatDemo />
                    </div>
                    <div style={{ background: '#1C1E38', borderRadius: 20, padding: 24, border: '1px solid #2a2b40' }}>
                        <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, color: '#6b7280', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>The bookdt way</div>
                        <BookingDemo />
                    </div>
                </div>
            </section>

            {/* ── SOCIAL PROOF ─────────────────────────────────────────── */}
            <section style={{ background: CREAM, padding: '60px 24px', textAlign: 'center' }}>
                <FadeSection>
                    <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 30px)', color: INK, maxWidth: 680, margin: '0 auto', lineHeight: 1.5 }}>
                        For the friends who keep saying <span style={{ color: CORAL }}>"we should hang out more"</span> and actually mean it.
                    </p>
                </FadeSection>
            </section>

            {/* ── FEATURES ─────────────────────────────────────────────── */}
            <section id="features" style={{ background: CREAM, padding: '80px 24px' }}>
                <FadeSection style={{ textAlign: 'center', marginBottom: 56 }}>
                    <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 48px)', color: INK, marginBottom: 12 }}>
                        From <em style={{ color: CORAL, fontStyle: 'italic' }}>"we should"</em> to <em style={{ color: CORAL, fontStyle: 'italic' }}>"we did"</em>
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: 18, maxWidth: 480, margin: '0 auto' }}>Bookdt handles the coordination so your group chat ideas actually happen.</p>
                </FadeSection>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
                    {FEATURE_CARDS.map((f, i) => (
                        <FadeSection key={i}>
                            <div style={{
                                background: 'white', borderRadius: 16, padding: 28,
                                border: '1px solid #e5e7eb', height: '100%',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                cursor: 'default',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <div style={{ marginBottom: 16 }}>{f.icon}</div>
                                <h3 style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 20, color: INK, marginBottom: 8 }}>{f.title}</h3>
                                <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.6 }}>{f.desc}</p>
                            </div>
                        </FadeSection>
                    ))}
                </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
            <section id="how-it-works" style={{ background: '#F2EFEA', padding: '80px 24px' }}>
                <FadeSection style={{ textAlign: 'center', marginBottom: 56 }}>
                    <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 48px)', color: INK, marginBottom: 12 }}>Three steps. That's it.</h2>
                </FadeSection>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32, maxWidth: 800, margin: '0 auto' }}>
                    {[
                        { n: 1, title: 'Connect your calendar', desc: "Link Google Calendar so Bookdt always knows when you're free." },
                        { n: 2, title: 'Add your people', desc: "Find friends by username. They control what you see — just free or busy." },
                        { n: 3, title: 'Book something', desc: "Pick a time that works for everyone or let the AI pick for you." },
                    ].map((s) => (
                        <FadeSection key={s.n} style={{ textAlign: 'center' }}>
                            <div style={{ width: 52, height: 52, borderRadius: '50%', background: PLUM, color: 'white', fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>{s.n}</div>
                            <h3 style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: 22, color: INK, marginBottom: 10 }}>{s.title}</h3>
                            <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.6 }}>{s.desc}</p>
                        </FadeSection>
                    ))}
                </div>
            </section>

            {/* ── TIMEZONE ─────────────────────────────────────────────── */}
            <section style={{ background: CREAM, padding: '80px 24px' }}>
                <FadeSection style={{ textAlign: 'center', marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 48px)', color: INK, marginBottom: 16, maxWidth: 600, margin: '0 auto 16px' }}>Your friends aren't all in one timezone</h2>
                    <p style={{ color: '#6b7280', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>Bookdt shows every time in your friend's local context so 3 PM here isn't an accidental midnight there.</p>
                </FadeSection>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
                    <TZCard city="Honolulu" emoji="🌺" offsetHours={-10} />
                    <TZCard city="Boston" emoji="🇺🇸" offsetHours={-4} />
                    <TZCard city="Lagos" emoji="🇳🇬" offsetHours={1} />
                    <TZCard city="Sydney" emoji="🇦🇺" offsetHours={10} />
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────────── */}
            <section style={{ background: INK, padding: '80px 24px', textAlign: 'center' }}>
                <FadeSection>
                    <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 48px)', color: 'white', marginBottom: 16 }}>Stop planning. Start doing.</h2>
                    <p style={{ color: '#9ca3af', fontSize: 18, maxWidth: 460, margin: '0 auto 36px', lineHeight: 1.6 }}>The next hangout is one tap away. Your friends are waiting.</p>
                    <a href={APP_URL} style={{ background: CORAL, color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 17, padding: '16px 40px', borderRadius: 100, textDecoration: 'none', display: 'inline-block' }}>
                        Get started — it's free
                    </a>
                </FadeSection>
            </section>

            {/* ── FOOTER ───────────────────────────────────────────────── */}
            <footer style={{ background: CREAM, padding: '32px 24px', textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
                <div style={{ marginBottom: 12 }}>
                    <FooterLogo />
                </div>
                <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 16 }}>
                    <a href={PRIVACY_URL} style={{ color: '#6b7280', fontSize: 14, textDecoration: 'none' }}>Privacy</a>
                    <a href="mailto:hello@bookdt.app" style={{ color: '#6b7280', fontSize: 14, textDecoration: 'none' }}>Contact</a>
                </div>
                <p style={{ color: '#9ca3af', fontSize: 13 }}>© 2026 Bookdt. All rights reserved.</p>
            </footer>
        </div>
    );
}
