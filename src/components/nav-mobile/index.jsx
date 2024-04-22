import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

import { routes } from "../../routes";

export const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className="lg:hidden">
      <Hamburger toggled={isOpen} size={20} toggle={setOpen} color="#FFFFFF" />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 right-0 top-[3.5rem] p-5 pt-0 bg-black bg-opacity-40"
          >
            <ul className="grid gap-2 mt-5">
              {routes.map((route, idx) => {
                const { Icon } = route;

                return (
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + idx / 10,
                    }}
                    key={route.title}
                    className="w-full rounded-xl bg-gradient-to-tr from-blue-800 via-blue-950 to-blue-700"
                  >
                    <Link
                      onClick={() => setOpen((prev) => !prev)}
                      className="flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950"
                      to={route.path}
                    >
                      <span className="flex gap-1 text-lg text-white">{route.title}</span>
                      <Icon className="text-xl text-white" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
