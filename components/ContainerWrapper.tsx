"use client";

import {
  AnimatePresence,
  AnimatePresenceProps,
  MotionProps,
  motion,
} from "framer-motion";

interface ContainerWrapperProps {
  children: React.ReactNode;
  keyValue: string;
  initial?: Object;
  animate?: Object;
  transition?: Object;
  className?: string;
}

const ContainerWrapper = ({
  children,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  className,
}: ContainerWrapperProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default ContainerWrapper;
