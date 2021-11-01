const PATHS: Array<string> = [
  '/login', '/register', '/forgot-password'
]

export const availablePathWithoutLogin = (path: string): Boolean => {
  return PATHS.includes(path)
}