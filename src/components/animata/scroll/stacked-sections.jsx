/**
 * StackedSections — Scroll-driven stacked card effect
 * Inspired by animata.design/docs/scroll/stacked-sections
 * 
 * Each child becomes a sticky card. As you scroll, the next card
 * rises and stacks on top while the previous card scales down.
 */

import React, { useRef, useEffect, useCallback, Children } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function StackedSections({
  children,
  withDramaEffect = true,
  stackOffset = 100, // px offset for each stacked card from the top
  scrollRunway = "50vh",
}) {
  const deckRef = useRef(null);
  const cardRefs = useRef([]);
  const contentRefs = useRef([]);
  const rafRef = useRef(null);

  const items = Children.toArray(children);
  const total = items.length;
  cardRefs.current.length = total;
  contentRefs.current.length = total;

  // Calculate the scale for a card at a given depth
  const scaleAtDepth = useCallback(
    (depth) => {
      // Cards deeper in the stack get smaller
      return clamp(1 - depth * 0.04, 0.85, 1);
    },
    []
  );

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const deckRect = deck.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        for (let i = 0; i < total; i++) {
          const card = cardRefs.current[i];
          const content = contentRefs.current[i];
          if (!card || !content) continue;

          const cardRect = card.getBoundingClientRect();
          // How far this card's top has scrolled past the sticky position
          const stickyTop = stackOffset;
          
          // Check if the card is currently stuck (sticky)
          const isStuck = cardRect.top <= stickyTop + 5;
          
          // Calculate how much of the next card has covered this one
          let coverProgress = 0;
          if (i < total - 1) {
            const nextCard = cardRefs.current[i + 1];
            if (nextCard) {
              const nextRect = nextCard.getBoundingClientRect();
              // When the next card reaches sticky position, this card is fully covered
              const coverStart = stickyTop + 200; // start scaling when next card is this far
              const coverEnd = stickyTop + 20; // fully covered
              if (nextRect.top < coverStart) {
                coverProgress = clamp(
                  (coverStart - nextRect.top) / (coverStart - coverEnd),
                  0,
                  1
                );
              }
            }
          }

          if (withDramaEffect && isStuck) {
            const scale = 1 - coverProgress * 0.06;
            const opacity = 1 - coverProgress * 0.3;
            const translateY = coverProgress * -15;
            content.style.transform = `scale(${clamp(scale, 0.9, 1)}) translateY(${translateY}px)`;
            content.style.opacity = clamp(opacity, 0.5, 1);
            
            // Add covered state for extra styling
            if (coverProgress > 0.1) {
              content.setAttribute("data-stacked-covered", "");
            } else {
              content.removeAttribute("data-stacked-covered");
            }
          } else {
            content.style.transform = "";
            content.style.opacity = "";
            content.removeAttribute("data-stacked-covered");
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll(); // initial calculation

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [total, stackOffset, withDramaEffect, scaleAtDepth]);

  return (
    <div ref={deckRef} className="stacked-deck">
      {items.map((child, i) => (
        <div
          key={i}
          ref={(el) => (cardRefs.current[i] = el)}
          className="stacked-card"
          style={{
            position: "sticky",
            top: `${stackOffset + i * 40}px`,
            zIndex: i + 1,
          }}
        >
          <div
            ref={(el) => (contentRefs.current[i] = el)}
            className="stacked-card__content"
            data-stacked-content=""
            style={{
              transformOrigin: "50% 0%",
              transition: "transform 0.1s linear, opacity 0.1s linear",
              willChange: "transform, opacity",
            }}
          >
            {child}
          </div>
        </div>
      ))}
      {/* Scroll runway — extra space so last card stays pinned */}
      <div style={{ height: scrollRunway }} aria-hidden="true" />
    </div>
  );
}
