import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobeAfrica, FaPause } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { GiRooster } from "react-icons/gi";
import LedigForService from "./LedigForService";

const BackgroundVideo = ({ videoUrl, active }) => {
  if (!active) return null;
  const embedUrl = `${videoUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playlist=${videoUrl.split('v=')[1]}`;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      <iframe
        src={embedUrl}
        title="Background Video"
        allow="autoplay"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100vw",
          height: "56.25vw", // 16:9 format
          minHeight: "100vh",
          minWidth: "177.78vh", // 16:9 format
          transform: "translate(-50%, -50%)",
          objectFit: "cover",
          border: "none",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
};

export const DashboardControls = ({ isDashboardMode }) => {
  const [oceanActive, setOceanActive] = useState(false);
  const [namibiaActive, setNamibiaActive] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  const toggleOcean = () => {
    setOceanActive((prev) => !prev);
    setNamibiaActive(false);
  };

  const toggleNamibia = () => {
    setNamibiaActive((prev) => !prev);
    setOceanActive(false);
  };
  const toggleServiceModal = () => {
    setIsServiceOpen((prev) => !prev);
  };

  return (
    <>
      <AnimatePresence>
        {oceanActive && (
          <BackgroundVideo
            key="ocean"
            videoUrl="https://www.youtube.com/embed/ka04MQWMlI8?autoplay=1&mute=1&controls=0&loop=1&playlist=ka04MQWMlI8&modestbranding=1&showinfo=0"
            active={oceanActive}
          />
        )}
        {namibiaActive && (
          <BackgroundVideo
            key="namibia"
            videoUrl="https://www.youtube.com/embed/ydYDqZQpim8?autoplay=1&mute=1&controls=0&loop=1&playlist=ydYDqZQpim8&modestbranding=1&showinfo=0"
            active={namibiaActive}
          />
        )}
      </AnimatePresence>

      {/* Knappene oppe til høyre */}
      {isDashboardMode && (
        <div className="absolute top-4 right-4 flex gap-3 z-50">
          {/* Ocean */}
          <motion.button
            onClick={toggleOcean}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full shadow-lg ${
              oceanActive
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-blue-300"
            }`}
          >
            <motion.div
              animate={{ rotate: oceanActive ? 360 : 0 }}
              transition={{ duration: 0.8 }}
            >
              {oceanActive ? <FaPause size={20} /> : <GiRooster size={20} />}
            </motion.div>
          </motion.button>

          {/* Namibia */}
          <motion.button
            onClick={toggleNamibia}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-full shadow-lg ${
              namibiaActive
                ? "bg-yellow-500 text-white"
                : "bg-gray-800 text-yellow-300"
            }`}
          >
            <motion.div
              animate={{ rotate: namibiaActive ? 360 : 0 }}
              transition={{ duration: 0.8 }}
            >
              {namibiaActive ? <FaPause size={20} /> : <FaGlobeAfrica size={20} />}
            </motion.div>
          </motion.button>

          {/* Ledig for service */}
          <motion.button
            onClick={toggleServiceModal}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full shadow-lg bg-gray-800 text-green-300 hover:text-green-100"
          >
            <motion.div
              animate={{ rotate: isServiceOpen ? 360 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <FaCalendarAlt size={20} />
            </motion.div>
          </motion.button>
        </div>
      )}

      {/* Modal for "Ledig for service" */}
      <LedigForService
        isOpen={isServiceOpen}
        onClose={() => setIsServiceOpen(false)}
      />
    </>
  );
};
