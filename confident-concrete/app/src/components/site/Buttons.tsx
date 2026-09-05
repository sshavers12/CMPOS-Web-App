import { Link, type LinkProps } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Tone = "primary" | "dark" | "light" | "outline";

const toneClass: Record<Tone, string> = {
  primary: "btn btn--primary",
  dark: "btn btn--dark",
  light: "btn btn--light",
  outline: "btn btn--outline",
};

type LinkButtonProps = {
  to: LinkProps["to"];
  hash?: string;
  tone?: Tone;
  block?: boolean;
  children: ReactNode;
  className?: string;
};

export function LinkButton({ to, hash, tone = "primary", block, children, className = "" }: LinkButtonProps) {
  return (
    <Link
      to={to}
      hash={hash}
      className={[toneClass[tone], block ? "btn--block" : "", className].filter(Boolean).join(" ")}
    >
      {children}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone; block?: boolean };

export function Button({ tone = "primary", block, className = "", type = "button", ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={[toneClass[tone], block ? "btn--block" : "", className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}
