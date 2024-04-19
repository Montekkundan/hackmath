'use client';

import React, { useState } from 'react';
import { useActions, useAIState, useUIState } from 'ai/rsc';
import { Button } from '@/components/ui/button';
import { AI } from '@/app/(main)/kc/action';

export function UserConfirmation({
  options,
}: {
  options: string[];
}) {
  const [, setHistory] = useAIState<typeof AI>();
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserConfirmation } = useActions<typeof AI>();
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);

  const handleAnswerSelection = async (option: string) => {

    const response = await submitUserConfirmation(option);
    // Update the UI based on the response
    setMessages((currentMessages: any) => [
      ...currentMessages,
      response.newMessage,
    ]);
  };

  return (
    <div className="p-4 border rounded-xl bg-zinc-950">
      {options.map((option, index) => (
        <Button
          key={index}
          className="mb-2 w-full"
          onClick={() => handleAnswerSelection(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
