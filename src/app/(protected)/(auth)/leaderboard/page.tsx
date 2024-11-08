import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getLeaderboard } from "@/api";
import Leaderboard from "@/components/LeaderBoard";

export default async function LeaderboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["leaderboard"],
    queryFn: getLeaderboard,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Leaderboard />
    </HydrationBoundary>
  );
}
