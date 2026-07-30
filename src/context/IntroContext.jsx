import { createContext, useContext, useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";

const SESSION_KEY = "navkaar_intro_seen";
const IntroContext = createContext(true);

function shouldShowSplash() {
  if (typeof window === "undefined") return false;
  const alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  return !alreadySeen && !isAdminRoute && !reducedMotion;
}

/**
 * Gates the one-time opening splash. Consumers (currently just the Hero)
 * read `useIntroDone()` to know whether to start their entrance animation
 * immediately (repeat visits / admin / reduced-motion) or wait until the
 * splash has finished its reveal (first visit of the browser session).
 * The rest of the app mounts and fetches data immediately regardless —
 * this only gates a CSS animation class, never rendering itself.
 */
export function IntroProvider({ children }) {
  const [showSplash, setShowSplash] = useState(shouldShowSplash);
  const [introDone, setIntroDone] = useState(() => !shouldShowSplash());
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (!showSplash) return;
    const revealTimer = setTimeout(() => {
      setIntroDone(true);
      setFadingOut(true);
    }, 2000);
    const unmountTimer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setShowSplash(false);
    }, 2400);
    return () => {
      clearTimeout(revealTimer);
      clearTimeout(unmountTimer);
    };
  }, [showSplash]);

  return (
    <IntroContext.Provider value={introDone}>
      {showSplash && <SplashScreen fadingOut={fadingOut} />}
      {children}
    </IntroContext.Provider>
  );
}

export function useIntroDone() {
  return useContext(IntroContext);
}
