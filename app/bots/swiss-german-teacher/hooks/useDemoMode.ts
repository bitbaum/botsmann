import { useState, useCallback } from "react";
import { DemoState, DemoResponse } from "../types";

export const useDemoMode = () => {
  const [demoState, setDemoState] = useState<DemoState>({
    isActive: false,
    step: 0,
    prompt: "",
    response: null,
  });

  const startDemo = useCallback(() => {
    setDemoState((prev) => ({
      ...prev,
      isActive: true,
      step: 1,
      prompt: "",
      response: null,
    }));
  }, []);

  const stopDemo = useCallback(() => {
    setDemoState((prev) => ({
      ...prev,
      isActive: false,
      step: 0,
    }));
  }, []);

  const setPrompt = useCallback((prompt: string) => {
    setDemoState((prev) => ({
      ...prev,
      prompt,
    }));
  }, []);

  const submitPrompt = useCallback(() => {
    // Simulate API response with demo data
    const demoResponses: Record<string, DemoResponse> = {
      default: {
        word: "hoi",
        translation: "hi/hello",
        example: "Hoi, wie gaht's?",
        pronunciation: "hoy",
        notes: "Very common casual greeting in Zürich",
        difficulty: "easy",
      },
      grüezi: {
        word: "grüezi",
        translation: "hello (formal)",
        example: "Grüezi, wie gaht's Ihne?",
        pronunciation: "GROO-eh-tsee",
        notes: "Formal greeting used with strangers or in business settings",
        difficulty: "medium",
      },
      merci: {
        word: "merci vielmal",
        translation: "thank you very much",
        example: "Merci vielmal für d'Hilf!",
        pronunciation: "MER-see feel-mahl",
        notes:
          "Notice the French influence - 'merci' is used instead of 'danke'",
        difficulty: "easy",
      },
    };

    // Check if we have a specific response for this prompt
    const prompt = demoState.prompt.toLowerCase().trim();
    const response =
      prompt.includes("grüezi") || prompt.includes("gruezi")
        ? demoResponses.grüezi
        : prompt.includes("merci") || prompt.includes("thank")
          ? demoResponses.merci
          : demoResponses.default;

    setDemoState((prev) => ({
      ...prev,
      step: 2,
      response,
    }));
  }, [demoState.prompt]);

  const continueDemo = useCallback(() => {
    setDemoState((prev) => ({
      ...prev,
      step: 1,
      prompt: "",
      response: null,
    }));
  }, []);

  return {
    demoState,
    startDemo,
    stopDemo,
    setPrompt,
    submitPrompt,
    continueDemo,
  };
};

export default useDemoMode;
