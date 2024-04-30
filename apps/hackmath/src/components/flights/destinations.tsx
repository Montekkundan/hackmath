'use client'

import { useActions, useUIState } from 'ai/rsc'

export const Destinations = ({ destinations }: { destinations: string[] }) => {
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState()

  return (
    <div className="grid gap-4">
      <p>
        Here is a list of math topics
        Choose one to proceed with.
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-2">
        {destinations.map(destination => (
          <button
            className="flex items-center gap-2 px-3 py-2 text-sm transition-colors bg-zinc-50 hover:bg-zinc-100 rounded-xl cursor-pointer"
            key={destination}
            onClick={async () => {
              const response = await submitUserMessage(
                `I would like a quesiton on ${destination}, ask me a question about this.`
              )
              setMessages((currentMessages: any[]) => [
                ...currentMessages,
                response
              ])
            }}
          >
            {destination}
          </button>
        ))}
      </div>
    </div>
  )
}