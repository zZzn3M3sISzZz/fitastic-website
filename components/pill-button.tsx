import { cn } from "@/lib/cn";

type PillButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  showDot?: boolean;
  tone?: "lime" | "bright";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

export function PillButton({
  children,
  href,
  type = "button",
  className,
  showDot = false,
  tone = "lime",
  disabled = false,
  onClick,
}: PillButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2.5 rounded-full px-4 py-4 text-center text-base font-medium leading-[18px] transition-colors duration-tap",
    tone === "lime"
      ? "bg-lime text-navy hover:bg-lime-bright"
      : "bg-lime-bright text-canvas hover:bg-lime",
    disabled && "pointer-events-none opacity-70",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {showDot ? (
        <span aria-hidden="true" className="size-5 shrink-0 rounded-full bg-dot" />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
