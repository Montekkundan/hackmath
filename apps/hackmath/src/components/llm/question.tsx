'use client';

import React, { useState } from 'react';
import { useActions, useAIState, useUIState } from 'ai/rsc';
import { Button } from '@/components/ui/button';
import { AI } from '@/app/(main)/kc/action';

export function QuestionResponse({
  question,
  options,
  correctAnswer,
}: {
  question: string;
  options: string[];
  correctAnswer: string;
}) {
  const [, setHistory] = useAIState<typeof AI>();
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserResponse } = useActions<typeof AI>();
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);

  const handleAnswerSelection = async (option: string) => {
    const isCorrect = correctAnswer === option;
    if (isCorrect) {
      setIsAnsweredCorrectly(true); // Disable all buttons if the correct answer is selected
    }
    const response = await submitUserResponse(option, isCorrect);
    // Update the UI based on the response
    setMessages((currentMessages: any) => [
      ...currentMessages,
      response.newMessage,
    ]);
  };

  return (
    <div className="p-4 border rounded-xl bg-zinc-950">
      <div className="mb-4 text-lg text-zinc-300">{question}</div>
      {options.map((option, index) => (
        <Button
          key={index}
          className="mb-2 w-full"
          onClick={() => handleAnswerSelection(option)}
          disabled={isAnsweredCorrectly} // Disable button if the question has been answered correctly
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
