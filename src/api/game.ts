import { ScoreData } from "@/interfaces/api";

export const getCurrentScore = async (userId: string): Promise<ScoreData> => {
  const response = await fetch(`/api/score/current/${userId}`, {
    headers: { "Content-Type": "application/json" },
  });

  // add fake delay
  await new Promise((r) => setTimeout(r, 500));

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

  // add fake delay
  await new Promise((r) => setTimeout(r, 500));

  if (!response.ok) {
    throw new Error("Failed to update score");
  }

  return response.json();
};
