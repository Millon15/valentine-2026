import type { Question } from '../src/types/Question';

export const questions: Question[] = [
  {
    id: 'q1',
    type: 'multipleChoice',
    question: 'What caught your attention about us so far?',
    designVariant: 'gradient-rose',
    videoSrc: 'videos/1-a-ha-take-on-me.mp4',
    options: [
      {
        text: 'The way our conversations just flow',
        letterSegment: 'Talking with you feels so natural \u2014 like we\'ve known each other forever.',
      },
      {
        text: 'Your smile when you laugh',
        letterSegment: 'Your smile is honestly the highlight of my day.',
      },
      {
        text: 'How comfortable it feels already',
        letterSegment: 'Being around you already feels so easy and right.',
      },
      {
        text: 'The little surprises along the way',
        letterSegment: 'Every time we hang out, you surprise me in the best way.',
      },
    ],
  },
  {
    id: 'q2',
    type: 'heartRating',
    question: 'How much do you enjoy our time together?',
    designVariant: 'hearts-pattern',
    maxHearts: 5,
    options: [
      { hearts: 1, letterSegment: 'You\'re pretty good company, I\'ll admit.' },
      { hearts: 2, letterSegment: 'I genuinely look forward to seeing you.' },
      { hearts: 3, letterSegment: 'You\'ve quickly become my favorite person to spend time with.' },
      { hearts: 4, letterSegment: 'I catch myself smiling just thinking about our plans.' },
      { hearts: 5, letterSegment: 'Honestly? I can\'t stop thinking about when we\'ll hang out next.' },
    ],
  },
  {
    id: 'q3',
    type: 'yesNo',
    question: 'Do you think we\'ve got something special starting here?',
    designVariant: 'romantic-purple',
    videoSrc: 'videos/2-George-Michael-Careless-Whisper.mp4',
    options: [
      {
        value: 'yes',
        text: 'Definitely, I like where this is going',
        letterSegment: 'I feel like we\'ve got something really good starting, and I can\'t wait to see where it goes.',
      },
      {
        value: 'no',
        text: 'It\'s even better than I expected',
        letterSegment: 'What\'s happening between us is already better than anything I could have imagined.',
      },
    ],
  },
  {
    id: 'q4',
    type: 'emojiReaction',
    question: 'How do you feel about getting to know me more?',
    designVariant: 'pastel-dream',
    options: [
      {
        emoji: '\uD83E\uDD70',
        label: 'Excited and curious',
        letterSegment: 'Getting to know you has been the best part of my week.',
      },
      {
        emoji: '\u2728',
        label: 'Can\'t wait for more',
        letterSegment: 'Every conversation leaves me wanting to know more about you.',
      },
      {
        emoji: '\uD83C\uDF08',
        label: 'It\'s been really fun',
        letterSegment: 'You make everything more fun \u2014 I didn\'t think that was possible.',
      },
      {
        emoji: '\uD83D\uDCAB',
        label: 'Pleasantly surprised',
        letterSegment: 'You\'ve surprised me in the best way, and I\'m here for it.',
      },
    ],
  },
  {
    id: 'q5',
    type: 'multipleChoice',
    question: 'What do you like most about how we vibe?',
    designVariant: 'love-bubbles',
    videoSrc: 'videos/3-Earth-Wind-Fire-September.mp4',
    options: [
      {
        text: 'We never run out of things to talk about',
        letterSegment: 'Our conversations could go on forever, and I\'d never get bored.',
      },
      {
        text: 'We have the same sense of humor',
        letterSegment: 'The fact that we crack each other up is honestly the best.',
      },
      {
        text: 'We\'re both genuinely curious about each other',
        letterSegment: 'I love how we\'re both actually interested in each other\'s worlds.',
      },
      {
        text: 'It just feels easy and natural',
        letterSegment: 'Everything with you feels effortless, and that\'s pretty rare.',
      },
    ],
  },
  {
    id: 'q6',
    type: 'heartRating',
    question: 'How excited are you for our next date?',
    designVariant: 'soft-crimson',
    maxHearts: 5,
    options: [
      { hearts: 1, letterSegment: 'I\'m looking forward to it, for sure.' },
      { hearts: 2, letterSegment: 'Already thinking about what we could do.' },
      { hearts: 3, letterSegment: 'Counting down the days, not gonna lie.' },
      { hearts: 4, letterSegment: 'I may have already started planning outfit options.' },
      { hearts: 5, letterSegment: 'Let\'s just say my calendar is cleared and ready.' },
    ],
  },
  {
    id: 'q7',
    type: 'yesNo',
    question: 'Would you say meeting me was a happy accident?',
    designVariant: 'golden-glow',
    videoSrc: 'videos/4-tyn-tyn.mp4',
    options: [
      {
        value: 'yes',
        text: 'Best accident ever',
        letterSegment: 'Meeting you was the kind of happy accident that makes everything feel like it\'s falling into place.',
      },
      {
        value: 'no',
        text: 'I think it was meant to be',
        letterSegment: 'I don\'t believe in accidents \u2014 I think we were supposed to meet.',
      },
    ],
  },
];
