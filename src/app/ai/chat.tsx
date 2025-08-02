"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { PatientCard } from "./patient-card";
import { Send, Bot, Users, MapPin, Heart, FileText, Dot, Info } from "lucide-react";
import { MemoizedMarkdown } from "./memoized-markdown";
import { Patient } from "@/types";

export function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const commonQuestions = [
    {
      icon: <Users className="h-5 w-5" />,
      question: "All patients in NY under under age 45",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      question: "Who are all my diabetic patients?",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      question: "Where does Steven Williams live?",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      question: "What are Mark Perez's allergies?",
    },
  ];

  const handleQuestionClick = (question: string) => {
    sendMessage({ text: question });
  };

  return (
    <div className="w-full relative min-h-screen">
      <div className="border-b sticky top-0 bg-background/50 backdrop-blur-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="font-medium tracking-tighter flex items-center gap-2">
          <Bot className="size-5" /> Finni AI
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-2">
          <Info className="size-3" />
          <span className="hidden sm:inline">Search results are limited to 10 items to prevent context overload.</span>
          <span className="sm:hidden">Limited to 10 results</span>
        </p>
      </div>
      <div className="overflow-y-auto pb-32 sm:pb-40">
        {messages.length === 0 ? (
          <div className="flex mt-20 sm:mt-40 flex-col items-center justify-center h-full space-y-6 sm:space-y-8 px-4">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl tracking-tighter font-medium mb-2">
                Hey I&apos;m Finni, how can I help you?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-2xl w-full">
              {commonQuestions.map((item, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleQuestionClick(item.question)}
                >
                  <CardContent className="p-3 sm:p-4 flex items-center space-x-3">
                    <div className="text-primary flex-shrink-0">{item.icon}</div>
                    <span className="text-sm leading-relaxed">{item.question}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 mt-4 max-w-3xl mx-auto px-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                {message.role === "assistant" && (
                  <div className="flex items-center font-medium gap-2 text-sm">
                    <div
                      className={`w-2 h-2 bg-primary rounded-full ${status === "streaming" || status === "submitted" ? "animate-pulse" : ""}`}
                    />
                    Finni AI
                  </div>
                )}
                <div
                  className={`flex items-start space-x-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-center space-x-2 max-w-[85vw] sm:max-w-xl px-3 sm:px-4 py-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary/80 text-white ml-auto"
                        : " border shadow-sm"
                    }`}
                  >
                    <div className="space-y-1 w-full">
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case "text":
                            return (
                              <div
                                key={`${message.id}-${i}`}
                                className={`text-sm prose prose-sm prose-orange max-w-none ${message.role === "user" ? "text-white" : "text-black dark:text-white"}`}
                              >
                                <MemoizedMarkdown
                                  content={part.text}
                                  id={message.id}
                                />
                              </div>
                            );
                          case "tool-searchPatients":
                            const toolResult =
                              "output" in part
                                ? (part.output as {
                                    count: number;
                                    patients: Patient[];
                                  })
                                : null;
                            return (
                              <div key={`${message.id}-${i}`} className="w-full">
                                {toolResult && (
                                  <div className="text-xs max-w-max bg-secondary/50 p-2 rounded-md mb-3">
                                    <div className="font-medium">
                                      {status === "streaming" ||
                                      status === "submitted"
                                        ? "Searching..."
                                        : `Found ${toolResult?.count || 0} patients`}
                                    </div>
                                  </div>
                                )}
                                {toolResult?.patients &&
                                  toolResult.patients.length > 0 && (
                                    <div className="space-y-2">
                                      {toolResult.patients.map(
                                        (patient: Patient) => (
                                          <PatientCard
                                            key={patient.id}
                                            patient={patient}
                                          />
                                        )
                                      )}
                                    </div>
                                  )}
                              </div>
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full px-4 sm:ml-[8rem] sm:left-0 sm:translate-x-0">
        <div className="bg-card/60 mx-auto max-w-3xl rounded-xl border p-2 shadow-lg backdrop-blur-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                sendMessage({ text: input });
                setInput("");
              }
            }}
            className="grid gap-2"
          >
            <Input
              value={input}
              placeholder="Ask about your patients..."
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border-0 bg-transparent shadow-none outline-none focus-visible:ring-0 dark:bg-transparent text-sm sm:text-base"
            />
            <div className="flex items-center justify-end">
              <Button type="submit" disabled={!input.trim()} size="sm" className="sm:size-10">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
