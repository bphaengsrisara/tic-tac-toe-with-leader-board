import { ScoreData } from "@/interfaces/api";
import { fakeDelay } from "@/lib/utils";

export const getCurrentScore = async (userId: string): Promise<ScoreData> => {
  const response = await fetch(`/api/score/current/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });

  fakeDelay();

  if (!response.ok) {
    throw new Error("Failed to fetch score data");
  }

  return response.json();
};

export const updateGameScore = async ({
  userId,
  result,
}: {
  userId: string;
  result: "win" | "loss";
}) => {
  const response = await fetch("/api/score/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      result,
    }), // Pass the new score data
  });

  fakeDelay();

  if (!response.ok) {
    throw new Error("Failed to update score");
  }

  return response.json();
};
