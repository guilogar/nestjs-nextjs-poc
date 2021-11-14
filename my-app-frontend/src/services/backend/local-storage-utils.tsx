export const setSessionId = (sessionId: string): void => {
  localStorage.setItem('sessionId', sessionId);
};

export const removeSessionId = (): void => {
  localStorage.removeItem('sessionId');
};

export const isSessionId = (): boolean => {
  return (
    localStorage.getItem('sessionId') !== null &&
    localStorage.getItem('sessionId') !== undefined
  );
};

export const getSessionId = (): string | null => {
  return localStorage.getItem('sessionId');
};
