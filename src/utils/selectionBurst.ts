/**
 * Triggers a burst of small emerald particles radiating outward
 * from a specific point — a quick "correct!" celebration.
 */
function burstAt(x: number, y: number) {
  const particleCount = 8;
  const colors = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const distance = 35 + Math.random() * 30;
    const size = 5 + Math.random() * 5;
    const color = colors[i % colors.length];

    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    `;

    document.body.appendChild(particle);

    if (!particle.animate) {
      particle.remove();
      continue;
    }

    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;

    const animation = particle.animate(
      [
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(0)`, opacity: 0 },
      ],
      {
        duration: 450 + Math.random() * 200,
        easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        fill: 'forwards',
      },
    );

    animation.onfinish = () => particle.remove();
  }
}

/**
 * Triggers sparkle star characters bursting outward from a specific point.
 */
function sparkleAt(x: number, y: number) {
  const stars = ['\u2728', '\u2734\uFE0F', '\u2726', '\u2727', '\u2728'];
  const count = 5;

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    const distance = 25 + Math.random() * 20;
    const size = 10 + Math.random() * 6;
    const delay = i * 40;

    star.textContent = stars[i % stars.length] ?? null;
    star.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: ${size}px;
      line-height: 1;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    `;

    document.body.appendChild(star);

    if (!star.animate) {
      star.remove();
      continue;
    }

    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;

    const animation = star.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.3) rotate(0deg)', opacity: 0 },
        { transform: `translate(calc(-50% + ${endX * 0.5}px), calc(-50% + ${endY * 0.5}px)) scale(1.1) rotate(90deg)`, opacity: 1, offset: 0.35 },
        { transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(0) rotate(180deg)`, opacity: 0 },
      ],
      {
        duration: 500 + Math.random() * 200,
        delay,
        easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        fill: 'forwards',
      },
    );

    animation.onfinish = () => star.remove();
  }
}

/**
 * Orchestrates a two-phase selection celebration:
 * 1. Particle burst at the click position (immediate)
 * 2. Sparkle stars at both left and right edges of the element (after burst finishes)
 */
export function triggerSelectionSequence(element: HTMLElement, clickX: number, clickY: number) {
  // Phase 1: burst at click position
  burstAt(clickX, clickY);

  // Phase 2: sparkle stars at left and right edges after burst finishes
  const rect = element.getBoundingClientRect();
  const margin = 10;
  const edgeY = rect.top + rect.height / 2;

  setTimeout(() => {
    sparkleAt(rect.left - margin, edgeY);
    sparkleAt(rect.right + margin, edgeY);
  }, 550);
}

/**
 * Triggers small heart characters floating upward from
 * the given element — used for heart-rating selections.
 */
export function triggerFloatingHearts(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const hearts = ['\u2764\uFE0F', '\uD83E\uDE77', '\uD83D\uDC95', '\u2665\uFE0F', '\uD83D\uDC96'];
  const count = 5;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    const driftX = (Math.random() - 0.5) * 50;
    const floatDistance = 40 + Math.random() * 35;
    const size = 12 + Math.random() * 8;
    const heartChar = hearts[i % hearts.length];
    const delay = i * 60;

    heart.textContent = heartChar ?? null;
    heart.style.cssText = `
      position: fixed;
      left: ${centerX + (Math.random() - 0.5) * 20}px;
      top: ${centerY}px;
      font-size: ${size}px;
      line-height: 1;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    `;

    document.body.appendChild(heart);

    if (!heart.animate) {
      heart.remove();
      continue;
    }

    const animation = heart.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0 },
        { transform: `translate(calc(-50% + ${driftX * 0.3}px), calc(-50% - ${floatDistance * 0.3}px)) scale(1.1)`, opacity: 1, offset: 0.25 },
        { transform: `translate(calc(-50% + ${driftX}px), calc(-50% - ${floatDistance}px)) scale(0.7)`, opacity: 0 },
      ],
      {
        duration: 700 + Math.random() * 200,
        delay,
        easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        fill: 'forwards',
      },
    );

    animation.onfinish = () => heart.remove();
  }
}
