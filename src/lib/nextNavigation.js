import { useLocation, useNavigate } from "react-router-dom";
export function usePathname() { return useLocation().pathname; }
export function useRouter() {
  const navigate = useNavigate();
  return {
    push: (href) => navigate(href),
    replace: (href) => navigate(href, { replace: true }),
    back: () => navigate(-1),
    prefetch: () => {},
    refresh: () => {},
  };
}
