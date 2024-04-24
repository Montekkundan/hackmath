"use client";

import { Button } from "@/components/ui/button";
import { UserRole } from "@/schemas";
import { User } from "next-auth";
import Link from "next/link";
import { Drawer } from "vaul";

type Props = {
    user: User & {
        id: number;
        role: UserRole;
        isTwoFactorEnabled: boolean;
        isOAuth: boolean;
      } | undefined
}

export function DrHam({
user,
}: Props) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <Button>Dr. Ham</Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-background rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="max-w-md mx-auto flex flex-row  justify-between">
                <div className="items-center">
                    <span className="text-xl font-bold">Hello {user?.name}</span>
                </div>
                <Drawer.NestedRoot>
                <Drawer.Trigger className="rounded-md mb-6  bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                  Upgrade
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                  <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[94%] fixed bottom-0 left-0 right-0">
                    <div className="p-4 bg-background rounded-t-[10px] flex-1">
                      <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
                      <div className="max-w-md mx-auto">
                        <Drawer.Title className="font-medium mb-4">
                          Upgrade page
                        </Drawer.Title>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
                      <div className="flex gap-6 justify-end max-w-md mx-auto">
                        <Link
                          className="text-xs text-gray-600 flex items-center gap-0.25"
                          href="/learn"
                          target="_blank"
                        >
                          Back to learn
                          <svg
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            width="16"
                            aria-hidden="true"
                            className="w-3 h-3 ml-1"
                          >
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                            <path d="M15 3h6v6"></path>
                            <path d="M10 14L21 3"></path>
                          </svg>
                        </Link>
                        <Link
                          className="text-xs text-gray-600 flex items-center gap-0.25"
                          href="/shop"
                          target="_blank"
                        >
                          Shop
                          <svg
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            width="16"
                            aria-hidden="true"
                            className="w-3 h-3 ml-1"
                          >
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                            <path d="M15 3h6v6"></path>
                            <path d="M10 14L21 3"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.NestedRoot>
            </div>
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4">
                Chat page
              </Drawer.Title>
            </div>
          </div>
          <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
            <div className="flex gap-6 justify-end max-w-md mx-auto">
              <a
                className="text-xs text-gray-600 flex items-center gap-0.25"
                href="/learn"
                target="_blank"
              >
                Back to learn
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
              <a
                className="text-xs text-gray-600 flex items-center gap-0.25"
                href="/shop"
                target="_blank"
              >
                Shop
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
