export const protectedRoutes = ['/dashboard']; // Can add more protected route here

export const isProtectedRoute = (pathname: string): boolean => {
  return protectedRoutes.includes(pathname);
};
