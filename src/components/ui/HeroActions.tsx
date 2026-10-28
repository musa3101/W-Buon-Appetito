"use client";

import React, { useState, useEffect } from "react";
import { LiquidButton } from "./liquid-glass-button";

export function HeroActions() {
  const [lang, setLang] = useState("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("buon_appetito_lang") || "es";
      setLang(saved);
    } catch (e) { }

    const handler = (e: any) => {
      if (e.detail?.lang) setLang(e.detail.lang);
    };
    window.addEventListener("buon:languageChange", handler);
    return () => window.removeEventListener("buon:languageChange", handler);
  }, []);

  const labels: Record<string, { book: string; menu: string }> = {
    es: { book: "RESERVAR MESA", menu: "VER MENÚ" },
    en: { book: "BOOK A TABLE", menu: "VIEW MENU" },
    de: { book: "TISCH RESERVIEREN", menu: "SPEISEKARTE" },
  };

  const current = labels[lang] || labels.es;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[280px] sm:max-w-md mx-auto pt-2 sm:pt-3">
      {/* Botón 1: Reservar Mesa (100% Cristal Transparente Líquido sin velos) */}
      <LiquidButton
        href="/reservar"
        variant="default"
        size="default"
        className="w-full sm:w-auto h-11 px-7 rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-white bg-transparent hover:bg-white/10 border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1.5px_1.5px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(255,255,255,0.35)] hover:border-white/80 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          {current.book}
        </span>
      </LiquidButton>

      {/* Botón 2: Ver Carta (100% Cristal Transparente Líquido sin velos) */}
      <LiquidButton
        href="/carta"
        variant="default"
        size="default"
        className="w-full sm:w-auto h-11 px-7 rounded-full text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-white/95 hover:text-white bg-transparent hover:bg-white/10 border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1.5px_1.5px_rgba(255,255,255,0.7),inset_0_-1px_1px_rgba(255,255,255,0.25)] hover:border-white/70 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          {current.menu}
        </span>
      </LiquidButton>
    </div>
  );
}

export default HeroActions;
