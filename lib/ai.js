// lib/ai.ts or lib/ai.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
