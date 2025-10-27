import { Variants } from 'framer-motion'

// Global motion variants for consistent animations
export const cardV: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 220, 
      damping: 24 
    } 
  },
  hover: { 
    y: -2,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 17 
    }
  }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    } 
  }
}

export const slideIn: Variants = {
  hidden: { x: 24, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 260, 
      damping: 26 
    } 
  }
}

export const slideInRight: Variants = {
  hidden: { x: 24, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    } 
  }
}

export const slideInLeft: Variants = {
  hidden: { x: -24, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    } 
  }
}

export const scaleIn: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 20 
    } 
  }
}

export const pulse: Variants = {
  hidden: { scale: 0.98, opacity: 0.7 },
  show: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      repeat: Infinity, 
      repeatType: 'reverse', 
      duration: 1.6,
      ease: "easeInOut"
    } 
  }
}

export const drawerSlide: Variants = {
  hidden: { x: "100%" },
  show: { 
    x: 0, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    } 
  },
  exit: { 
    x: "100%",
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    }
  }
}

export const modalSlide: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 20 
    } 
  },
  exit: { 
    scale: 0.9, 
    opacity: 0,
    transition: { 
      duration: 0.2
    }
  }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

export const counterAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 200, damping: 15 }
}

export const badgePulse: Variants = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.1, 1],
    transition: { 
      duration: 0.3,
      times: [0, 0.5, 1]
    }
  }
}

export const progressGrow: Variants = {
  hidden: { width: 0 },
  show: { 
    width: "var(--progress-width)",
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15,
      delay: 0.2
    } 
  }
}

export const chartAppear: Variants = {
  hidden: { opacity: 0, pathLength: 0 },
  show: { 
    opacity: 1, 
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut"
    }
  }
}

// Hover presets
export const hoverLift = {
  whileHover: { 
    y: -4, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  whileTap: { scale: 0.98 }
}

export const hoverScale = {
  whileHover: { 
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  whileTap: { scale: 0.95 }
}

// Page transitions
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.61, 1, 0.88, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
}

// List item animations
export const listItemSlide: Variants = {
  hidden: { x: -20, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
}

// Tab content animations
export const tabContent: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.2 }
  }
}

// Loading skeleton animation
export const skeletonLoading: Variants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { repeat: Infinity, repeatType: 'reverse', duration: 1.2 }
  }
}

// Status indicator animations
export const statusPulse = (status: 'success' | 'warning' | 'error') => {
  const colors = {
    success: 'oklch(0.55 0.15 150)',
    warning: 'oklch(0.65 0.18 30)',
    error: 'oklch(0.55 0.22 15)'
  }
  
  return {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.7, 1],
      backgroundColor: [colors[status], colors[status], colors[status]],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  }
}

// Easing functions
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  bouncy: [0.68, -0.55, 0.265, 1.55]
}