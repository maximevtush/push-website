import { useState } from 'react';
import axios from 'axios';

interface ContactMessagePayload {
  from: string;
  name: string;
  company?: string;
  topic: string;
  sub: string;
  msg: string;
}

interface MutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const pushsupportBaseURL = 'https://tooling.push.org/apis';

const sendContactMessage = async (payload: ContactMessagePayload) => {
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

export const useSendContactMessage = () => {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (
    payload: ContactMessagePayload,
    options?: MutationOptions
  ) => {
    setIsPending(true);

    try {
      await sendContactMessage(payload);
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error as Error);
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
};
