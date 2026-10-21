"use client";

import { createContext } from "react";

// Avoid competing hero and intro downloads on the first visit.
export const IntroPlaybackContext = createContext(false);
