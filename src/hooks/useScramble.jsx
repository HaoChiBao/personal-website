import { useEffect, useRef, useState } from 'react';

const scrambleChars = "@#!$%^&*?<>~:;[]{}|+=-_`";

export function scrambleText(text, revealCount = 0) {
    const rainbowColors = [
        "#FF0000", "#FF7F00", "#FFFF00",
        "#00FF00", "#0000FF", "#4B0082", "#8B00FF"
    ];

    let colorIndex = 0;

    return text.split("").map((char, i) => {
        if (char === " " || i < revealCount) return char;

        const scrambledChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];

        if (i % 2 === 0) {
            const color = rainbowColors[colorIndex % rainbowColors.length];
            colorIndex++;
            return <span key={i} style={{ color }}>{scrambledChar}</span>;
        }

        return scrambledChar;
    });
}

export default function useScramble(originalText, delay = 700, padding = 20) {
    const [scrambled, setScrambled] = useState(originalText);
    const containerRef = useRef(null);
    const triggeredRef = useRef(false);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggeredRef.current) {
                    triggeredRef.current = true;

                    let scrambleInterval = null;
                    let revealInterval = null;
                    let revealCount = 0;

                    scrambleInterval = setInterval(() => {
                        setScrambled(scrambleText(originalText));
                    }, 110);

                    setTimeout(() => {
                        clearInterval(scrambleInterval);
                        const revealStep = 2;

                        revealInterval = setInterval(() => {
                            revealCount += revealStep;
                            setScrambled(scrambleText(originalText, revealCount));
                            if (revealCount >= originalText.length) {
                                clearInterval(revealInterval);
                                setScrambled(originalText);
                            }
                        }, 80);
                    }, delay);
                }
            },
            {
                rootMargin: `0px 0px -${padding}px 0px`,
                threshold: 0.1
            }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [originalText, delay, padding]);

    return [scrambled, containerRef];
}
