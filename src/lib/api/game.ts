import { ErrorResponse, ScoreData } from "@/interfaces/api";

export const getCurrentScore = async (
  userId: string,
): Promise<ScoreData | ErrorResponse> => {
  try {
    const response = await fetch(`/api/score/current/${userId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: ScoreData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current score:", error);
    // Return an ErrorResponse in case of failure
    return { error: "Failed to fetch score data" };
  }
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

  if (!response.ok) {
    throw new Error("Failed to update score");
  }

  return response.json();
};
