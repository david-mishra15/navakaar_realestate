import logo from "../assets/logoReal.jpeg";

/**
 * One-time opening splash. Purely decorative — fixed-position overlay on
 * top of the app, which mounts and fetches its own data normally underneath
 * regardless of this being on screen. `fadingOut` is flipped by
 * IntroProvider once the hold period ends.
 */
export default function SplashScreen({ fadingOut }) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-night ${
        fadingOut ? "animate-splash-fadeout" : ""
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center">
        {/* Logo + gold sweep */}
        <div className="relative overflow-hidden rounded-sm animate-splash-logo">
          <img
            src={logo}
            alt=""
            className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-sm"
          />
          <div
            className="absolute inset-0 opacity-0 animate-splash-sweep"
            style={{
              animationDelay: "0.5s",
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)",
            }}
          />
        </div>

        {/* Tagline */}
        <p
          className="mt-5 font-sans text-[11px] sm:text-xs font-medium tracking-[0.32em] uppercase text-mist opacity-0 animate-splash-text"
          style={{ animationDelay: "1s" }}
        >
          A Real Estate Co.
        </p>
      </div>
    </div>
  );
}
