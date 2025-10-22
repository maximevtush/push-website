import { useQuery } from '@tanstack/react-query';

async function fetchTweetMetrics(tweetId: string) {
  const url = `https://us-east1-push-prod-apps.cloudfunctions.net/pushpointsrewardsystem/api/twitter/tweetMetrics?id=${tweetId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

export function useTweetMetrics(tweetId: string) {
  return useQuery({
    queryKey: ['tweetMetrics', tweetId],
    queryFn: () => fetchTweetMetrics(tweetId),
    enabled: !!tweetId, // only run if tweetId is provided
    staleTime: 1000 * 60, // cache for 1 min
  });
}
