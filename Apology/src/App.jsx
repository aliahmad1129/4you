import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import Dinosaur from './components/Dinosaur';
import { Star, CartoonAlarmClock, CuteHeart } from './components/Decorations';
import { playSound } from './utils/sound';
import { ArrowDown, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

export default function App() {
  // Forgiveness state
  const [forgiven, setForgiven] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Runaway "No" button interactive states
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noDodgeAttempts, setNoDodgeAttempts] = useState(0);
  const [noDodgeMessage, setNoDodgeMessage] = useState('');
  const noContainerRef = useRef(null);

  // Mouse interaction for subtle hero dinosaur tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Only tilt on desktop pointer
      if (window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Playful dodging algorithm for the NO button with mobile bounds awareness
  const dodgeMessages = [
    "Wait, are you sure? 🥺",
    "Please Ma'am! Look at his tiny arms!",
    "Our GPA is shivering in fear!",
    "Oops, your finger slipped!",
    "Button error: Forgiveness required!",
    "He's promise-bound to be on time!",
    "Give the little saury another chance!"
  ];

  const handleNoDodge = () => {
    playSound('dodge', soundEnabled);
    setNoDodgeAttempts((prev) => prev + 1);
    const msg = dodgeMessages[Math.floor(Math.random() * dodgeMessages.length)];
    setNoDodgeMessage(msg);

    // Responsive dodge offset: smaller on mobile screens so it never escapes card boundary
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const baseDist = isMobile ? 55 : 85;
    const spread = isMobile ? 45 : 75;
    const randomAngle = Math.random() * Math.PI * 2;
    const distance = baseDist + Math.random() * spread;
    const newX = Math.round(Math.cos(randomAngle) * distance);
    const newY = Math.round(Math.sin(randomAngle) * (distance * 0.5));

    setNoPos({ x: newX, y: newY });
  };

  // YES celebration button handler
  const handleYesClick = () => {
    playSound('celebrate', soundEnabled);
    setForgiven(true);

    // 🚀 Send email notification via Vercel serverless function (non-blocking)
    fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp: new Date().toISOString() })
    }).catch((err) => {
      console.warn('Email trigger notification skipped/failed:', err);
    });

    // Confetti burst with soft palette matching the illustration
    const count = 120;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#FFD95A', '#FF8A3D', '#F1E3D9', '#FFE59A', '#FF8A8A']
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 45 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const scrollToSection = (id) => {
    playSound('click', soundEnabled);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#9B8275] text-[#29211F] flex flex-col font-body selection:bg-[#FFD95A] selection:text-[#29211F] relative overflow-x-hidden">
      
      {/* Top Floating Sound Control (Responsive sleek placement on mobile) */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50">
        <button
          onClick={() => {
            const nextState = !soundEnabled;
            setSoundEnabled(nextState);
            if (nextState) playSound('click', true);
          }}
          onMouseEnter={() => playSound('hover', soundEnabled)}
          className="p-2 sm:p-2.5 rounded-full bg-[#F1E3D9] border-[2.5px] sm:border-[3.5px] border-[#29211F] text-[#29211F] shadow-cartoon-sm hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5 sm:gap-2 text-xs font-display font-semibold cursor-pointer select-none"
          title={soundEnabled ? "Mute interactive sounds" : "Enable interactive sounds"}
          aria-label={soundEnabled ? "Mute interactive sounds" : "Enable interactive sounds"}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FF8A3D]" /> : <VolumeX className="w-4 h-4 text-[#80685D]" />}
          <span className="hidden sm:inline">{soundEnabled ? "Sound: On" : "Sound: Off"}</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: THE OPENING APOLOGY (HERO) */}
      {/* ========================================================= */}
      <section className="min-h-[100dvh] sm:min-h-screen flex flex-col items-center justify-between px-3 sm:px-6 py-6 sm:py-12 relative max-w-4xl mx-auto text-center">
        
        {/* Floating Interactive Decorative Stars */}
        <div 
          className="absolute top-8 left-3 sm:top-12 sm:left-12 animate-star-twinkle cursor-pointer hover:scale-125 transition-transform"
          onMouseEnter={() => playSound('twinkle', soundEnabled)}
          onClick={() => playSound('twinkle', soundEnabled)}
          title="Twinkle!"
        >
          <Star className="w-6 h-6 sm:w-10 sm:h-10" rotate={12} />
        </div>
        <div 
          className="absolute top-16 right-4 sm:top-24 sm:right-16 animate-star-twinkle cursor-pointer hover:scale-125 transition-transform" 
          style={{ animationDelay: '1.2s' }}
          onMouseEnter={() => playSound('twinkle', soundEnabled)}
          onClick={() => playSound('twinkle', soundEnabled)}
          title="Twinkle!"
        >
          <Star className="w-7 h-7 sm:w-12 sm:h-12" rotate={-15} />
        </div>
        <div 
          className="absolute bottom-28 left-6 hidden md:block animate-star-twinkle cursor-pointer hover:scale-125 transition-transform" 
          style={{ animationDelay: '2s' }}
          onMouseEnter={() => playSound('twinkle', soundEnabled)}
        >
          <Star className="w-7 h-7" rotate={20} />
        </div>
        <div 
          className="absolute bottom-24 right-8 hidden md:block animate-star-twinkle cursor-pointer hover:scale-125 transition-transform" 
          style={{ animationDelay: '0.6s' }}
          onMouseEnter={() => playSound('twinkle', soundEnabled)}
        >
          <Star className="w-8 h-8" rotate={-8} />
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-2 sm:space-y-3 z-10 pt-2 sm:pt-6 max-w-2xl px-2">
          <div 
            className="inline-block px-3.5 py-1 rounded-full bg-[#80685D]/60 border-2 border-[#29211F] text-[#F1E3D9] font-hand text-base sm:text-lg tracking-wider transform -rotate-2 select-none hover:rotate-0 transition-transform cursor-default"
            onMouseEnter={() => playSound('hover', soundEnabled)}
          >
            Friday's little disaster...
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-[#F1E3D9] tracking-normal drop-shadow-sm leading-tight">
            WE'RE SORRY, MA'AM!
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl text-[#FFE59A] font-display font-medium">
            We have a tiny confession to make...
          </p>
        </div>

        {/* Dinosaur Illustration in Hero (centered with 'I am so saury...' badge) */}
        <div 
          className="my-auto py-3 sm:py-4 relative z-10 animate-bob cursor-pointer flex flex-col items-center justify-center text-center"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: 'transform 0.15s ease-out'
          }}
          onMouseEnter={() => playSound('hover', soundEnabled)}
          onClick={() => playSound('hover', soundEnabled)}
        >
          {/* Subtle curved background mound centered */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 sm:w-80 md:w-96 h-22 sm:h-28 bg-[#80685D] rounded-t-full -z-10 border-t-[3px] sm:border-t-[3.5px] border-[#29211F] opacity-70"></div>
          
          <Dinosaur 
            pose="guilty" 
            className="w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto drop-shadow-md hover:scale-105 transition-transform" 
          />

          {/* Little handwritten badge centered directly under the dino */}
          <div className="mt-2.5 sm:mt-3 px-4 py-1.5 sm:px-5 sm:py-1.5 bg-[#F1E3D9] rounded-2xl border-[2.5px] sm:border-[3px] border-[#29211F] shadow-cartoon-sm font-hand text-base sm:text-lg text-[#29211F] select-none inline-flex items-center gap-1.5 z-10">
            <span>"I am so saury..."</span>
            <span className="text-sm">🥺</span>
          </div>
        </div>

        {/* Scroll cue at the bottom */}
        <div className="z-10 pb-2 sm:pb-4">
          <button
            onClick={() => scrollToSection('section-confession')}
            onMouseEnter={() => playSound('hover', soundEnabled)}
            className="group flex flex-col items-center gap-1.5 text-[#F1E3D9] hover:text-[#FFD95A] transition-colors cursor-pointer"
            aria-label="Scroll to confession section"
          >
            <span className="font-display font-semibold text-xs sm:text-base tracking-wide group-hover:underline">
              Okay, here's what happened
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F1E3D9] border-2 border-[#29211F] text-[#29211F] flex items-center justify-center animate-bounce-soft shadow-cartoon-sm">
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
            </div>
          </button>
        </div>

      </section>

      {/* ========================================================= */}
      {/* SECTION 2: THE CONFESSION (15 MIN VS 40 MIN) */}
      {/* ========================================================= */}
      <section id="section-confession" className="py-12 sm:py-20 px-3 sm:px-6 relative">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 text-center">
          
          {/* Section Header */}
          <div className="space-y-2 sm:space-y-3">
            <div 
              onMouseEnter={() => playSound('hover', soundEnabled)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#FFE59A] border-2 border-[#29211F] font-hand text-sm sm:text-base text-[#29211F] font-bold select-none"
            >
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              The Math Disaster
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#F1E3D9] tracking-tight">
              OUR BRAINS DID A LITTLE MATH ERROR.
            </h2>
            <p className="text-sm sm:text-lg md:text-xl text-[#F1E3D9]/90 max-w-xl mx-auto font-body">
              On Friday, our break was supposed to be just <strong className="text-[#FFD95A] font-bold underline decoration-wavy">15 minutes</strong>...
            </p>
          </div>

          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center max-w-3xl mx-auto relative pt-2">
            
            {/* CARD A: The Actual Break (15 Mins) */}
            <div 
              onMouseEnter={() => playSound('hover', soundEnabled)}
              onClick={() => playSound('twinkle', soundEnabled)}
              className="paper-card p-5 sm:p-8 flex flex-col items-center space-y-3 sm:space-y-4 transform md:-rotate-1 hover:rotate-0 transition-transform cursor-pointer"
            >
              <span className="px-3 py-0.5 sm:py-1 rounded-full bg-[#FF8A3D] border-2 border-[#29211F] text-[#F1E3D9] font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider">
                THE ACTUAL BREAK
              </span>
              
              <div className="text-2xl sm:text-4xl font-display font-extrabold text-[#29211F]">
                15 MINUTES
              </div>

              <CartoonAlarmClock className="w-24 h-24 sm:w-32 sm:h-32" ringing={true} />

              <p className="text-xs sm:text-sm text-[#80685D] font-body font-semibold">
                Short, crisp, and plenty of time to stretch.
              </p>
            </div>

            {/* CARD B: What We Thought (40 Mins) */}
            <div 
              onMouseEnter={() => playSound('hover', soundEnabled)}
              onClick={() => playSound('hover', soundEnabled)}
              className="paper-card-beige p-5 sm:p-8 flex flex-col items-center space-y-3 sm:space-y-4 transform md:rotate-1 hover:rotate-0 transition-transform cursor-pointer"
            >
              <span className="px-3 py-0.5 sm:py-1 rounded-full bg-[#FFD95A] border-2 border-[#29211F] text-[#29211F] font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider">
                WHAT WE THOUGHT
              </span>
              
              <div className="text-2xl sm:text-4xl font-display font-extrabold text-[#FF8A3D]">
                40 MINUTES?!
              </div>

              <Dinosaur pose="sleepy" className="w-28 h-28 sm:w-36 sm:h-36" />

              <p className="text-xs sm:text-sm text-[#80685D] font-body font-semibold">
                Our brains went full vacation mode.
              </p>
            </div>

          </div>

          {/* The Playful Equation Banner */}
          <div 
            onMouseEnter={() => playSound('hover', soundEnabled)}
            className="inline-flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 px-4 py-3 sm:px-6 sm:py-3.5 bg-[#F1E3D9] border-[2.5px] sm:border-[3.5px] border-[#29211F] rounded-2xl shadow-cartoon max-w-2xl mx-auto select-none"
          >
            <span className="font-display font-bold text-sm sm:text-lg text-[#29211F]">15 MINUTES</span>
            <span className="font-display font-extrabold text-[#FF8A3D] text-lg sm:text-xl">+</span>
            <span className="font-display font-bold text-sm sm:text-lg text-[#29211F]">OUR CONFUSION</span>
            <span className="font-display font-extrabold text-[#FF8A3D] text-lg sm:text-xl">=</span>
            <span className="font-display font-extrabold text-sm sm:text-lg text-[#FF8A3D] underline">ARRIVING LATE 😭</span>
          </div>

          {/* Sincere Explanation & Humorous Note */}
          <div className="max-w-2xl mx-auto space-y-2.5 pt-2 text-[#F1E3D9] px-2">
            <p className="text-sm sm:text-lg leading-relaxed font-body">
              Somehow, our sense of time decided to take a holiday. We genuinely thought the break was much longer than it actually was.
            </p>
            <div 
              onMouseEnter={() => playSound('hover', soundEnabled)}
              className="inline-block px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-xl bg-[#80685D] border-2 border-[#29211F] text-[#FFE59A] font-hand text-sm sm:text-lg select-none"
            >
              "Turns out, our internal clocks desperately need a firmware update."
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: THE HEARTFELT APOLOGY */}
      {/* ========================================================= */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 relative bg-[#80685D]/40 border-y-[3px] sm:border-y-[3.5px] border-[#29211F]">
        
        {/* Subtle decorative hearts */}
        <div 
          className="absolute top-6 left-4 hidden sm:block animate-float-slow cursor-pointer hover:scale-125 transition-transform"
          onMouseEnter={() => playSound('twinkle', soundEnabled)}
        >
          <CuteHeart className="w-8 h-8" color="#FF8A8A" />
        </div>
        <div 
          className="absolute bottom-6 right-4 hidden sm:block animate-float-gentle cursor-pointer hover:scale-125 transition-transform"
          onMouseEnter={() => playSound('twinkle', soundEnabled)}
        >
          <CuteHeart className="w-8 h-8" color="#FFD95A" />
        </div>

        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          
          <div className="text-center space-y-1.5">
            <div className="inline-block px-3 py-0.5 rounded-full bg-[#F1E3D9] border-2 border-[#29211F] font-hand text-xs sm:text-sm text-[#29211F] select-none">
              From the bottom of our hearts
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#F1E3D9] tracking-tight">
              JOKES ASIDE, WE'RE REALLY SORRY.
            </h2>
          </div>

          {/* Sincere Paper Card (mobile responsive padding) */}
          <div className="paper-card p-5 sm:p-8 md:p-12 relative shadow-cartoon-lg">
            
            {/* Apologetic Dinosaur Illustration with Flower */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 pb-5 sm:pb-6 border-b-2 border-[#DCC9BD]">
              <div 
                className="shrink-0 bg-[#FFE59A] p-2 rounded-2xl border-2 border-[#29211F] shadow-cartoon-sm hover:scale-105 transition-transform cursor-pointer"
                onMouseEnter={() => playSound('hover', soundEnabled)}
                onClick={() => playSound('twinkle', soundEnabled)}
                title="A flower for Ma'am!"
              >
                <Dinosaur pose="apologetic" className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44" />
              </div>
              <div className="text-center sm:text-left space-y-0.5 sm:space-y-1">
                <div className="font-display font-bold text-lg sm:text-2xl text-[#29211F]">
                  Dear Ma'am,
                </div>
                <p className="text-xs sm:text-sm text-[#80685D] font-body">
                  A sincere, unvarnished letter from every student in the room.
                </p>
              </div>
            </div>

            {/* Exact Apology Copy */}
            <div className="pt-5 sm:pt-6 space-y-3.5 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-[#29211F]/90 font-body">
              <p>
                Ma'am, we're genuinely sorry for coming late to your class.
              </p>
              <p>
                We know your time is valuable, and arriving late was disrespectful to the effort you put into teaching us.
              </p>
              <p>
                You make your classes welcoming and enjoyable for us, and the last thing we want is to make you feel that we take your time or your efforts for granted.
              </p>
              <p>
                We can't undo what happened on Friday, but we can learn from it and do better.
              </p>
              <p className="font-display font-bold text-base sm:text-xl text-[#29211F] pt-1">
                We're sorry, Ma'am. We really mean it.
              </p>
            </div>

            {/* Handwritten Annotation */}
            <div className="mt-6 sm:mt-8 pt-4 border-t-2 border-[#DCC9BD] flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-center sm:text-left">
              <span 
                onMouseEnter={() => playSound('twinkle', soundEnabled)}
                className="font-hand text-lg sm:text-xl text-[#FF8A3D] font-bold select-none cursor-pointer"
              >
                "We mean it. Pinky promise?" 🤙💛
              </span>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#80685D] font-display font-semibold select-none">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF8A3D]" />
                100% Genuine Remorse Verified
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: THE FORGIVENESS INTERACTION */}
      {/* ========================================================= */}
      <section id="section-forgiveness" className="py-12 sm:py-20 px-3 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          
          {/* Header */}
          <div className="space-y-1.5 sm:space-y-2">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#F1E3D9] tracking-tight">
              SOOO... CAN YOU FORGIVE US?
            </h2>
            <p className="text-sm sm:text-lg md:text-xl text-[#FFE59A] font-body">
              We promise our brains have learned their lesson.
            </p>
          </div>

          {/* Interactive Playground Card (Responsive padding & safe touch boundaries) */}
          <div 
            ref={noContainerRef}
            className="paper-card p-5 sm:p-8 md:p-12 relative min-h-[380px] sm:min-h-[420px] flex flex-col items-center justify-center space-y-6 overflow-hidden"
          >
            
            {/* Dinosaur character reacts to forgiveness or dodging */}
            <div className="relative pt-12 sm:pt-14">
              {forgiven ? (
                <div 
                  className="animate-bounce-soft cursor-pointer"
                  onMouseEnter={() => playSound('twinkle', soundEnabled)}
                  onClick={() => playSound('celebrate', soundEnabled)}
                >
                  <Dinosaur pose="happy" className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto" />
                </div>
              ) : (
                <div 
                  className="animate-bob cursor-pointer"
                  onMouseEnter={() => playSound('hover', soundEnabled)}
                >
                  <Dinosaur 
                    pose={noDodgeAttempts > 0 ? "pleading" : "guilty"} 
                    eyeReaction={noDodgeAttempts > 2 ? "extra-worried" : null}
                    className="w-36 h-36 sm:w-48 sm:h-48 md:w-52 md:h-52 mx-auto" 
                  />
                </div>
              )}

              {/* Speech bubble when "No" is dodged with generous gap above dino */}
              {!forgiven && noDodgeMessage && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-4 py-1.5 sm:px-5 sm:py-2 bg-[#FF8A3D] text-white font-hand text-sm sm:text-base md:text-lg rounded-2xl border-[2.5px] sm:border-[3px] border-[#29211F] shadow-cartoon-sm whitespace-nowrap animate-bounce-soft z-20 select-none">
                  {noDodgeMessage}
                  {/* Cute speech bubble tail pointing down */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[7px] sm:border-x-[8px] border-x-transparent border-t-[7px] sm:border-t-[8px] border-t-[#29211F]"></div>
                  <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] sm:border-x-[6px] border-x-transparent border-t-[5px] sm:border-t-[6px] border-t-[#FF8A3D]"></div>
                </div>
              )}
            </div>

            {/* State A: Decision Buttons */}
            {!forgiven ? (
              <div className="space-y-4 sm:space-y-6 w-full max-w-md">
                
                <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 min-h-[90px]">
                  
                  {/* PRIMARY YES BUTTON */}
                  <button
                    onClick={handleYesClick}
                    onMouseEnter={() => playSound('hover', soundEnabled)}
                    className="btn-cartoon-yellow px-6 sm:px-8 py-3.5 sm:py-4 text-lg sm:text-2xl font-display font-extrabold tracking-wide flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer w-full sm:w-auto"
                    aria-label="Accept apology and forgive us"
                  >
                    <span>YES! OF COURSE 💛</span>
                  </button>

                  {/* RUNAWAY NO BUTTON: Smoothly dodges away upon hover or touch */}
                  <div className="relative inline-block">
                    <button
                      onMouseEnter={handleNoDodge}
                      onTouchStart={handleNoDodge}
                      onClick={handleNoDodge}
                      style={{
                        transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                        transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                      className="btn-cartoon-white px-5 sm:px-6 py-2.5 sm:py-3.5 text-sm sm:text-lg font-display font-bold text-[#80685D] cursor-not-allowed select-none"
                      aria-label="No button (playfully moves away)"
                    >
                      <span>NO 😤</span>
                    </button>
                  </div>

                </div>

                {noDodgeAttempts > 0 && (
                  <p className="text-[11px] sm:text-xs font-hand text-[#80685D] text-center pt-1 select-none">
                    (Attempted to say no {noDodgeAttempts} {noDodgeAttempts === 1 ? 'time' : 'times'}... the dinosaur refuses to give up!)
                  </p>
                )}

              </div>
            ) : (
              /* State B: Success Celebration State */
              <div className="space-y-3 sm:space-y-4 animate-fade-in text-center max-w-lg px-2">
                <div className="inline-block px-3.5 py-1 bg-[#FFD95A] border-2 border-[#29211F] rounded-full font-display font-bold text-xs sm:text-sm text-[#29211F] select-none">
                  🎉 OFFICIAL FORGIVENESS ACHIEVED!
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-[#29211F]">
                  YAYYYYY! WE'RE FORGIVEN! 💛
                </h3>

                <p className="text-sm sm:text-lg text-[#80685D] font-body leading-relaxed">
                  Thank you, Ma'am. We promise we'll do better! You just made our entire week so much brighter.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => scrollToSection('section-promise')}
                    onMouseEnter={() => playSound('hover', soundEnabled)}
                    className="btn-cartoon-yellow px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-lg font-display font-bold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Our Official Promise 📜</span>
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: THE PROMISE */}
      {/* ========================================================= */}
      <section id="section-promise" className="py-12 sm:py-20 px-3 sm:px-6 relative bg-[#80685D]/30 border-t-[3px] sm:border-t-[3.5px] border-[#29211F]">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-1.5 sm:space-y-2">
            <div className="inline-block px-3 py-0.5 rounded-full bg-[#FFE59A] border-2 border-[#29211F] font-hand text-sm sm:text-base text-[#29211F] font-bold select-none">
              Looking Forward
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#F1E3D9] tracking-tight">
              OUR OFFICIAL PROMISE.
            </h2>
            <p className="text-sm sm:text-lg md:text-xl text-[#F1E3D9]/90 max-w-xl mx-auto font-body">
              From now on, we'll be in class on time. No more confusing 15 minutes with 40 minutes!
            </p>
          </div>

          {/* Promise Card with Determined Dino */}
          <div className="paper-card p-5 sm:p-8 md:p-12 shadow-cartoon-lg">
            
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              
              {/* Determined Dino Illustration */}
              <div 
                className="shrink-0 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                onMouseEnter={() => playSound('hover', soundEnabled)}
                onClick={() => playSound('twinkle', soundEnabled)}
              >
                <Dinosaur pose="determined" className="w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56" />
                <span className="font-hand text-sm sm:text-base text-[#FF8A3D] font-bold mt-1 select-none">
                  Ready & determined!
                </span>
              </div>

              {/* Three Specific Commitments */}
              <div className="space-y-3 sm:space-y-4 flex-1 w-full">
                
                <div 
                  onMouseEnter={() => playSound('hover', soundEnabled)}
                  className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFE59A] border-2 border-[#29211F] shadow-cartoon-sm flex items-start gap-3 sm:gap-4 hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FF8A3D] text-[#F1E3D9] border-2 border-[#29211F] flex items-center justify-center font-display font-extrabold text-sm sm:text-base shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-lg text-[#29211F]">
                      We'll keep track of time.
                    </h3>
                    <p className="text-xs sm:text-sm text-[#80685D] font-body mt-0.5">
                      Phone alarms set, wrist watches synchronized, and zero reliance on wishful thinking.
                    </p>
                  </div>
                </div>

                <div 
                  onMouseEnter={() => playSound('hover', soundEnabled)}
                  className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFE59A] border-2 border-[#29211F] shadow-cartoon-sm flex items-start gap-3 sm:gap-4 hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FF8A3D] text-[#F1E3D9] border-2 border-[#29211F] flex items-center justify-center font-display font-extrabold text-sm sm:text-base shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-lg text-[#29211F]">
                      We'll return before the break ends.
                    </h3>
                    <p className="text-xs sm:text-sm text-[#80685D] font-body mt-0.5">
                      Arriving 3 to 5 minutes early so everyone is seated when lecture resumes.
                    </p>
                  </div>
                </div>

                <div 
                  onMouseEnter={() => playSound('hover', soundEnabled)}
                  className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFE59A] border-2 border-[#29211F] shadow-cartoon-sm flex items-start gap-3 sm:gap-4 hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FF8A3D] text-[#F1E3D9] border-2 border-[#29211F] flex items-center justify-center font-display font-extrabold text-sm sm:text-base shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-lg text-[#29211F]">
                      We'll respect your time and effort.
                    </h3>
                    <p className="text-xs sm:text-sm text-[#80685D] font-body mt-0.5">
                      You pour immense energy into teaching us, and we promise to honor every minute.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Prominent Final Statement */}
            <div 
              onMouseEnter={() => playSound('hover', soundEnabled)}
              className="mt-6 sm:mt-10 p-4 sm:p-6 rounded-2xl bg-[#80685D] border-[2.5px] sm:border-[3px] border-[#29211F] text-center space-y-1.5 sm:space-y-2 select-none"
            >
              <div className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#FFE59A] tracking-wider uppercase">
                LESS CONFUSION. MORE PUNCTUALITY.
              </div>
              <p className="text-xs sm:text-base text-[#F1E3D9] font-body">
                Thank you for being such a wonderful teacher, Ma'am. We're lucky to learn from you.
              </p>
            </div>

            {/* Sincere Sign-off */}
            <div className="mt-6 sm:mt-8 text-right font-hand text-lg sm:text-2xl text-[#29211F]">
              <p>With apologies and lots of respect,</p>
              <p className="font-bold text-[#FF8A3D]">Your very apologetic class 💛</p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}
      <footer className="py-6 sm:py-8 px-4 text-center text-xs sm:text-sm text-[#F1E3D9]/80 font-display">
        <p>Made with apologies, good intentions, and questionable time management.</p>
        <p className="text-[10px] sm:text-[11px] text-[#FFE59A]/60 font-body mt-1">
          HCI & Design Principles Class • Friday Break Incident Remediation
        </p>
      </footer>

    </div>
  );
}
