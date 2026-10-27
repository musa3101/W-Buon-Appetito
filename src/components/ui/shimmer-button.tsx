import React, { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.06em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      href,
      target,
      rel,
      ...props
    },
    ref,
  ) => {
    const styleObj = {
      "--spread": "90deg",
      "--shimmer-color": shimmerColor,
      "--radius": borderRadius,
      "--speed": shimmerDuration,
      "--cut": shimmerSize,
      "--bg": background,
    } as CSSProperties;

    const commonClasses = cn(
      "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-8 py-3.5 text-white [background:var(--bg)] [border-radius:var(--radius)]",
      "transform-gpu transition-all duration-300 ease-in-out active:translate-y-px hover:shadow-xl hover:scale-[1.02]",
      className,
    );

    const innerContent = (
      <>
        {/* spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]",
          )}
        >
          {/* spark */}
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            {/* spark before */}
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        {/* Content slot */}
        <div className="relative z-10 flex items-center justify-center gap-2.5 font-semibold text-xs sm:text-sm tracking-wider uppercase font-satoshi">
          {children}
        </div>

        {/* Highlight inner glow */}
        <div
          className={cn(
            "inset-0 absolute size-full",
            "rounded-[100px] px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
            "transform-gpu transition-all duration-300 ease-in-out",
            "group-hover:shadow-[inset_0_-6px_14px_#ffffff4f]",
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]",
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]",
          )}
        />
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          style={styleObj}
          className={commonClasses}
          title={props.title}
          id={props.id}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <button
        style={styleObj}
        className={commonClasses}
        ref={ref}
        {...props}
      >
        {innerContent}
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
