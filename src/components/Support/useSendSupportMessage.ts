import { useState } from 'react';
import axios from 'axios';

interface SupportMessagePayload {
  from: string;
  name: string;
  topic: string;
  sub: string;
  msg: string;
}

interface MutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const pushsupportBaseURL = 'https://tooling.push.org/apis';

const sendSupportMessage = async (payload: SupportMessagePayload) => {
  const response = await axios({
    method: 'POST',
    url: `${pushsupportBaseURL}/mailing/send_mail`,
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const useSendSupportMessage = () => {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (
    payload: SupportMessagePayload,
    options?: MutationOptions
  ) => {
    setIsPending(true);

    try {
      await sendSupportMessage(payload);
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error as Error);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
};
