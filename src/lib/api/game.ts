export const getCurrentScore = async (userId: string) => {
  const response = await fetch("/api/score/current", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data; // This will return { points: number, rank: string }
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
