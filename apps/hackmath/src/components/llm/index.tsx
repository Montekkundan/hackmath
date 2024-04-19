'use client';

import dynamic from 'next/dynamic';
import { StocksSkeleton } from './stocks-skeleton';
import { EventsSkeleton } from './events-skeleton';

export { spinner } from './spinner';
export { BotCard, BotMessage, SystemMessage } from './message';

const QuestionResponse = dynamic(() => import('./question').then(mod => mod.QuestionResponse), {
  ssr: false,
  loading: () => <StocksSkeleton />,
});

const UserConfirmation = dynamic(() => import('./confirmation').then(mod => mod.UserConfirmation), {
  ssr: false,
  loading: () => <StocksSkeleton />,
});


const Events = dynamic(() => import('./event').then(mod => mod.Events), {
  ssr: false,
  loading: () => <EventsSkeleton />,
});

export { Events, QuestionResponse };
