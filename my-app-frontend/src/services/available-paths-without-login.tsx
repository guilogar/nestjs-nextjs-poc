const PATHS: Array<string> = [
  '/login',
  '/register',
  '/forgot-password',
  '/about',
  '/services',
];

export const availablePathWithoutLogin = (path: string): Boolean => {
  return PATHS.includes(path);
};
