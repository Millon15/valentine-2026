/**
 * Valentine Quiz -- White-Label Configuration
 * =============================================
 *
 * Edit this file to customise every piece of user-facing text in the quiz.
 * No other source files need to be changed.
 *
 * Sections:
 *   names        - Recipient and sender names used across all screens
 *   pageTitle    - The browser tab / window title
 *   intro        - Welcome screen text and button labels
 *   scoreReveal  - The "100 % match" results screen
 *   loveLetter   - The personalised love letter screen
 *   valentine    - The "Will you be my Valentine?" prompt screen
 *   footer       - Small text at the bottom of every page
 *
 * Theme colours are controlled by Tailwind classes in the components and
 * by src/styles/questionVariants.ts -- edit those if you want different
 * colour palettes.
 */
export const config = {
  // ─── Names ──────────────────────────────────────────────────────────
  /** The recipient's name (the person taking the quiz) */
  recipientName: 'My Sandakaariii',

  /** The sender's name (the person who created the quiz) */
  senderName: 'Vethesh',

  // ─── Page title ─────────────────────────────────────────────────────
  /** Shown in the browser tab */
  pageTitle: "Valentine's Day Quiz",

  // ─── Intro screen ──────────────────────────────────────────────────
  intro: {
    /** Greeting line above the recipient's name */
    greeting: "Happy Valentine's Day",
    /** Main message paragraph */
    message: "I created this little moment for us. A small quiz to celebrate our story.",
    /** Instruction text below the message */
    instruction: "Answer these 7 questions for me :3",
    /** Text on the start button (emoji is appended automatically) */
    startButton: "Let's Begin",
    /** Small note below the button */
    timeEstimate: "Takes about 2 minutes",
  },

  // ─── Score reveal screen ───────────────────────────────────────────
  scoreReveal: {
    /** Heading after the animated percentage */
    title: "Perfect Match!",
    /** Body text explaining the score */
    message: "A Perfect Match. My heart knew it all along, but seeing your answers makes it sing.",
    /** Label on the continue button (emoji appended automatically) */
    continueButton: "See Your Letter",
  },

  // ─── Love letter screen ────────────────────────────────────────────
  loveLetter: {
    /** Section heading */
    heading: 'A Letter For You',
    /** Closing line before signature */
    closing: 'With a smile,',
    /** Signature prefix -- the senderName is appended automatically */
    signaturePrefix: 'Yours,',
    /** Label on the continue button (emoji appended automatically) */
    continueButton: 'One More Thing...',
  },

  // ─── Valentine prompt screen ───────────────────────────────────────
  valentine: {
    /** The big question */
    question: 'Will you be my Valentine?',
    /** Subtitle under the question */
    subtitle: "You know there's only one right answer...",
    /** Label on the Yes button (emoji appended automatically) */
    yesButton: 'Yes!',
    /** Label on the No button */
    noButton: 'No',
    /** Hint text at the bottom */
    hintText: '(Try clicking "No" if you dare...)',
    /** Witty messages shown when the No button is clicked */
    noClickMessages: [
      'Nice try! But the answer is Yes!',
      'Oops! Wrong button!',
      'Are you sure? Think again!',
      "That button doesn't work here!",
      'The only answer is Yes!',
    ],
  },

  // ─── Emoji reaction feedback ───────────────────────────────────────
  /** Positive feedback messages shown after selecting an emoji reaction (shuffled per mount) */
  emojiReactionFeedback: [
    'Perfect choice — your emotions shine through',
    'Love that energy — it says a lot about you',
    'Great pick — I can feel the warmth from here',
    'Beautiful answer — that one made me smile',
  ],

  // ─── Footer ────────────────────────────────────────────────────────
  footer: {
    /** Footer text template. {sender} and {recipient} are replaced automatically. */
    text: 'Made with love by {sender} for {recipient}',
  },

  // ─── Cupid's Arrow Runner game ────────────────────────────────────
  game: {
    /** Label on the play button shown after Yes is clicked */
    playButton: 'Play a Game',
    /** Names for each level */
    levelNames: ['Garden of Love', 'Sky of Hearts', "Cupid's Castle", "Cupid's Gauntlet"],
    /** Shown when the player loses */
    gameOver: 'Game Over!',
    /** Label on retry button */
    tryAgain: 'Try Again',
    /** Label on back button */
    backToQuiz: 'Back to Valentine',
    /** Heading after defeating the boss */
    victory: 'You Won!',
    /** Sub-message after defeating the regular boss */
    victoryMessage: 'Cupid conquers all!',
    /** Sub-message after defeating the mega boss */
    megaVictoryMessage: 'Cupid is invincible! 💘🚀',
    /** Boss name displayed during level 3 */
    bossName: 'Anti-Cupid',
    /** Mega Boss name displayed during bonus level */
    megaBossName: 'Mega Anti-Cupid',
    /** Label for score display */
    scoreLabel: 'Score',
    /** Label for level display */
    levelLabel: 'Level',
    /** Shown when the player sets a new best score */
    newHighScore: 'NEW HIGH SCORE!',
    /** Retro announcement before boss fights */
    finalBoss: 'FINAL BOSS',
    /** Retro announcement before mega boss */
    megaBoss: 'MEGA BOSS',
    /** CTA label to start bonus level from victory screen */
    bonusLevel: 'Bonus Level',
  },
};
