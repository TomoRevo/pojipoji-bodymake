import Link from "next/link";

const LINE_URL = process.env.NEXT_PUBLIC_LINE_ADD_URL || "#";

interface CtaButtonProps {
  label: string;
  href?: string;
  gradient?: string;
  className?: string;
}

export default function CtaButton({
  label,
  href = LINE_URL,
  gradient = "from-orange-500 to-amber-400",
  className = "",
}: CtaButtonProps) {
  const baseClass = `inline-block text-center text-white font-black text-base px-8 py-4 rounded-full bg-gradient-to-r ${gradient} shadow-lg active:scale-95 transition-all`;

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClass} ${className}`}>
      {label}
    </Link>
  );
}
