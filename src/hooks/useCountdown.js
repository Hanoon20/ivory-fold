import { useEffect, useState } from 'react';

function parts(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  };
}

export default function useCountdown(dateISO) {
  const target = new Date(dateISO).getTime();
  const [time, setTime] = useState(() => parts(target));

  useEffect(() => {
    const id = setInterval(() => setTime(parts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return time;
}
