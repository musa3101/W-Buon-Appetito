'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface FlowButtonProps {
  text?: string;
  dataI18n?: string;
  href?: string;
  target?: string;
  rel?: string;
  id?: string;
  title?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'default' | 'green' | 'terracotta' | 'mobile-dark';
  badge?: string;
  className?: string;
  fullWidth?: boolean;
}

export function FlowButton({
  text = "Modern Button",
  dataI18n,
  href,
  target,
  rel,
  id,
  title,
  onClick,
  variant = 'default',
  badge,
  className = "",
  fullWidth = false,
}: FlowButtonProps) {
  // Configuración de paleta por variante según el diseño gastronómico de Buon Appetito
  let borderClass = "border-[#333333]/40";
  let textClass = "text-[#111111] group-hover:text-white";
  let strokeClass = "stroke-[#111111]";
  let circleBg = "bg-[#111111]";
  let extraWrapper = "bg-transparent";

  if (variant === 'green') {
    // Para 'Carta de Comida' en fondo crema
    borderClass = "border-[#183321]/35 hover:border-transparent";
    textClass = "text-[#183321] group-hover:text-white";
    strokeClass = "stroke-[#183321]";
    circleBg = "bg-[#183321]";
    extraWrapper = "bg-white/40 shadow-xs";
  } else if (variant === 'terracotta') {
    // Para 'Vinos y Bodega' en fondo crema
    borderClass = "border-[#9E4221]/40 hover:border-transparent";
    textClass = "text-[#9E4221] group-hover:text-white";
    strokeClass = "stroke-[#9E4221]";
    circleBg = "bg-[#9E4221]";
    extraWrapper = "bg-white/40 shadow-xs";
  } else if (variant === 'mobile-dark') {
    // Para 'Reservar Mesa' en el Menú Móvil oscuro
    borderClass = "border-[#C45E3B]/70 hover:border-transparent";
    textClass = "text-white";
    strokeClass = "stroke-white";
    circleBg = "bg-gradient-to-r from-[#9E4221] to-[#C45E3B]";
    extraWrapper = "bg-[#9E4221]/20 shadow-md backdrop-blur-xs";
  }

  const baseClasses = `group relative inline-flex items-center justify-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] ${borderClass} ${extraWrapper} px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:rounded-[14px] hover:shadow-lg active:scale-[0.96] select-none ${fullWidth ? 'w-full max-w-[320px]' : 'w-full sm:w-auto'} ${className}`;

  const content = (
    <>
      {/* Circle expansivo de 21st (detrás de todo, z-0) */}
      <span 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${circleBg} rounded-full opacity-0 pointer-events-none group-hover:w-[380px] group-hover:h-[380px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] z-0`}
        aria-hidden="true"
      ></span>

      {/* Left arrow (arr-2): entra desde la izquierda al hover */}
      <ArrowRight 
        className={`absolute w-4 h-4 left-[-30%] ${strokeClass} fill-none z-10 group-hover:left-4.5 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`} 
        aria-hidden="true"
      />

      {/* Texto principal animado (z-10 sobre el círculo) */}
      <span data-i18n={dataI18n} className={`relative z-10 -translate-x-3 group-hover:translate-x-3 ${textClass} transition-all duration-[800ms] ease-out`}>
        {text}
      </span>

      {/* Badge opcional (ej: 'EN SALA') */}
      {badge && (
        <span className="relative z-10 -translate-x-3 group-hover:translate-x-3 text-[9px] uppercase tracking-wider bg-[#9E4221]/15 group-hover:bg-white/20 text-inherit px-2 py-0.5 rounded-full font-medium ml-1 transition-all duration-[800ms] ease-out">
          {badge}
        </span>
      )}

      {/* Right arrow (arr-1): sale disparada hacia la derecha */}
      <ArrowRight 
        className={`absolute w-4 h-4 right-4.5 ${strokeClass} fill-none z-10 group-hover:right-[-30%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]`} 
        aria-hidden="true"
      />
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target={target} 
        rel={rel} 
        id={id} 
        title={title} 
        onClick={onClick}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      type="button" 
      id={id} 
      title={title} 
      onClick={onClick} 
      className={baseClasses}
    >
      {content}
    </button>
  );
}
