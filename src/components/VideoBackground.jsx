import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import vif1 from "../assets/videos/vif1.mp4";
import vif2 from "../assets/videos/vif2.mp4";
import vif3 from "../assets/videos/vif3.mp4";

const BACKGROUNDS = {
  home: {
    src: vif1,
    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.16),transparent_22%),linear-gradient(180deg,rgba(3,6,15,0.82),rgba(3,6,15,0.96))]",
  },
  explore: {
    src: vif2,
    overlay:
      "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_16%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_18%),linear-gradient(180deg,rgba(7,12,28,0.72),rgba(7,12,28,0.92))]",
  },
  dashboard: {
    src: vif3,
    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_18%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.1),transparent_22%),linear-gradient(180deg,rgba(2,4,10,0.86),rgba(2,4,10,0.98))]",
  },
};

function getScene(pathname) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/explore")) return "explore";
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/ai-journey") || pathname.startsWith("/journey")) return "dashboard";
  return "home";
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export default function VideoBackground() {
  const location = useLocation();
  const scene = useMemo(() => getScene(location.pathname), [location.pathname]);
  const [activeScene, setActiveScene] = useState(scene);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (scene !== activeScene) {
      const timeout = setTimeout(() => setActiveScene(scene), 280);
      return () => clearTimeout(timeout);
    }
  }, [scene, activeScene]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {!isMobile &&
        Object.entries(BACKGROUNDS).map(([key, background]) => (
          <video
            key={key}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${activeScene === key ? "opacity-100" : "opacity-0"}`}
            src={background.src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ))}

      {isMobile && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_22%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.1),transparent_26%),linear-gradient(180deg,rgba(5,8,20,0.96),rgba(5,8,20,0.98))]" />
      )}

      <div className="absolute inset-0 bg-black/40" />
      <div className={`absolute inset-0 ${BACKGROUNDS[activeScene].overlay}`} />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#060b18] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#02040d] to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_16%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.08),transparent_18%)]" />
    </div>
  );
}
