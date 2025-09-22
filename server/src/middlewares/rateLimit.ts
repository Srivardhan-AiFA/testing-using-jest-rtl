import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 15 minutes
  max: 20, // 10 attempts
  message: { message: "Too many login attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

export const notesLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, //15 minutes
  max: 100, // 100 attemps
  message: { message: "Too many requests, slow down!" },
  standardHeaders: true,
  legacyHeaders: false,
});

export const globalLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 10 minute
  max: 200,
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
