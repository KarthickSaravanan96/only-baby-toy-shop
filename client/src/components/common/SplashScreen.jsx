import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onDone }) => {
    const [phase, setPhase] = useState('idle'); // idle → boom → compress → settle → exit

    useEffect(() => {
        // Sequence:
        // 0ms   — show (idle)
        // 120ms — boom  (scale to 1.55)
        // 480ms — compress (scale to 0.88)
        // 700ms — settle (scale to 1)
        // 1500ms — start fade-out
        // 1900ms — unmount

        const t1 = setTimeout(() => setPhase('boom'), 120);
        const t2 = setTimeout(() => setPhase('compress'), 480);
        const t3 = setTimeout(() => setPhase('settle'), 700);
        const t4 = setTimeout(() => setPhase('exit'), 1500);
        const t5 = setTimeout(() => onDone && onDone(), 1950);

        return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
    }, [onDone]);

    /* ── Scale values per phase ── */
    const scaleMap = {
        idle: 'scale(0.4)',
        boom: 'scale(1.55)',
        compress: 'scale(0.88)',
        settle: 'scale(1)',
        exit: 'scale(1)',
    };

    const opacityMap = {
        idle: 1, boom: 1, compress: 1, settle: 1, exit: 0,
    };

    const durationMap = {
        idle: '0ms',
        boom: '340ms',
        compress: '200ms',
        settle: '220ms',
        exit: '400ms',
    };

    const easingMap = {
        idle: 'linear',
        boom: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        compress: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        settle: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        exit: 'cubic-bezier(0.4, 0, 0.2, 1)',
    };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, #FF6B8A 0%, #C94070 40%, #8B2E5A 100%)',
                opacity: opacityMap[phase],
                transition: `opacity ${phase === 'exit' ? '420ms' : '0ms'} ease`,
                pointerEvents: phase === 'exit' ? 'none' : 'all',
            }}
        >
            {/* Background floating emojis */}
            {['🧸', '🚗', '🍼', '🎨', '🦁', '⭐', '🌈', '🎮'].map((e, i) => (
                <span
                    key={i}
                    style={{
                        position: 'absolute',
                        fontSize: `${1.5 + (i % 3) * 0.8}rem`,
                        opacity: 0.12,
                        top: `${10 + i * 11}%`,
                        left: i % 2 === 0 ? `${5 + i * 4}%` : undefined,
                        right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined,
                        animation: `splashFloat ${4 + i * 0.6}s ease-in-out infinite`,
                        animationDelay: `${i * 0.4}s`,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                >{e}</span>
            ))}

            {/* ── Main Logo Block ── */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                    transform: scaleMap[phase],
                    transition: `transform ${durationMap[phase]} ${easingMap[phase]}`,
                    willChange: 'transform',
                }}
            >
                {/* Bottle emoji in circle */}
                <img
                    src="/assets/logo/logo.png"
                    alt="Only Baby"
                    className="h-40 w-auto mb-4"
                />

                {/* Loading dots */}
                {(phase === 'settle' || phase === 'exit') && (
                    <div style={{ display: 'flex', gap: '7px', marginTop: '8px' }}>
                        {[0, 1, 2].map(i => (
                            <div
                                key={i}
                                style={{
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.7)',
                                    animation: 'splashDot 0.8s ease-in-out infinite',
                                    animationDelay: `${i * 0.15}s`,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Ripple ring effect on boom */}
            {(phase === 'boom' || phase === 'compress') && (
                <div
                    style={{
                        position: 'absolute',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        border: '3px solid rgba(255,255,255,0.35)',
                        animation: 'splashRipple 0.6s ease-out forwards',
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* Keyframe styles */}
            <style>{`
        @keyframes splashFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-16px) rotate(8deg); }
        }
        @keyframes splashDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1.1); opacity: 1; }
        }
        @keyframes splashRipple {
          0%   { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(4);   opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default SplashScreen;
