// src/components/LedigForService.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Hjelper for ukenummer */
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

export default function LedigForService({ isOpen, onClose }) {
  const [days, setDays] = useState({
    Mandag: [],
    Tirsdag: [],
    Onsdag: [],
    Torsdag: [],
    Fredag: [],
  });

  const [availableNames, setAvailableNames] = useState([
    "Dawid", "Olav", "Said", "BjørnR",
    "Rob", "Martin", "Stian", "BjørnU", "Rahu",
  ]);

  const weekNumber = getWeekNumber(new Date());
  const dayNames = Object.keys(days);

  // Dersom du vil nullstille ved ny uke, kan du lytte på ukeendringer her.
  useEffect(() => {
    // Her gjøres ingenting, placeholder hvis du senere vil auto-reset.
  }, [weekNumber]);

  const handleDragStart = (e, name, from) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ name, from }));
  };

  const handleDrop = (e, to) => {
    e.preventDefault();
    try {
      const { name, from } = JSON.parse(e.dataTransfer.getData("text/plain"));

      // Fjern fra tidligere plass
      if (from === "available") {
        setAvailableNames((prev) => prev.filter((n) => n !== name));
      } else {
        setDays((prev) => ({
          ...prev,
          [from]: prev[from].filter((n) => n !== name),
        }));
      }

      // Legg til i ny dag (om ikke allerede der)
      setDays((prev) => ({
        ...prev,
        [to]: prev[to].includes(name) ? prev[to] : [...prev[to], name],
      }));
    } catch (err) {
      // ignore invalid drops
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleRemove = (day, name) => {
    setDays((prev) => ({
      ...prev,
      [day]: prev[day].filter((n) => n !== name),
    }));
    setAvailableNames((prev) => (prev.includes(name) ? prev : [...prev, name]));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        /* overlay som dekker hele skjermen og ligger øverst */
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* bakgrunnsdemping */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* modal-kortet */}
          <motion.div
            className="relative z-[10000] w-[95%] max-w-6xl max-h-[90vh] overflow-auto rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border-4 border-white/20"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {/* Lukkeknapp */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[10010] rounded-full w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20"
            >
              <span className="text-xl">✕</span>
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
                Ledig for service/overtid — Uke {weekNumber}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                Dra en ansatt fra toppen og slipp i ønsket ukedag. Trykk ✕ for å fjerne.
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Available names som små klosser øverst */}
              <div className="flex flex-wrap gap-3 justify-center">
                {availableNames.map((name) => (
                  <div
                    key={name}
                    draggable
                    onDragStart={(e) => handleDragStart(e, name, "available")}
                    className="px-4 py-2 bg-rose-500 text-white rounded-md shadow cursor-grab select-none"
                    style={{ minWidth: 96, textAlign: "center" }}
                  >
                    {name}
                  </div>
                ))}
              </div>

              {/* Ukedager i én rad: Mandag - Fredag */}
              <div className="grid grid-cols-5 gap-4">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    onDrop={(e) => handleDrop(e, day)}
                    onDragOver={handleDragOver}
                    className="min-h-[160px] p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="mb-2 text-center font-semibold text-gray-700 dark:text-gray-200">
                      {day}
                    </div>

                    <div className="flex flex-col gap-2">
                      {days[day].map((name) => (
                        <div
                          key={name}
                          draggable
                          onDragStart={(e) => handleDragStart(e, name, day)}
                          className="flex items-center justify-between px-3 py-2 bg-blue-600 text-white rounded-md shadow cursor-grab"
                        >
                          <span>{name}</span>
                          <button
                            onClick={() => handleRemove(day, name)}
                            className="ml-2 text-sm text-white/90 hover:text-red-200"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3">
              <button
                onClick={() => {
                  // reset (valgfritt)
                  setDays({ Mandag: [], Tirsdag: [], Onsdag: [], Torsdag: [], Fredag: [] });
                  setAvailableNames([
                    "Dawid","Olav","Said","BjørnR",
                    "Rob","Martin","Stian","BjørnU","Rahu"
                  ]);
                }}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Reset
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Lukk
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
