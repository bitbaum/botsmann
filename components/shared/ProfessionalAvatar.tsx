import { type FC } from 'react';
import { type Professional, getAccentColorClasses } from '@/data/professionals';

interface ProfessionalAvatarProps {
  professional: Professional;
  /** Tailwind size classes for the badge box (e.g. 'w-14 h-14'). */
  className?: string;
  /** Tailwind text-size class for the monogram. */
  textClassName?: string;
}

/**
 * Monogram badge for an AI Professional.
 *
 * Replaces the emoji avatars (⚖️🩺🔬…) — a single, consistent identity system
 * built on the existing accentColor SSOT. Reads as a serious credential mark
 * (initials on a tinted disc), not a toy. Used wherever a professional avatar
 * appears so the look stays uniform.
 */
export const ProfessionalAvatar: FC<ProfessionalAvatarProps> = ({
  professional,
  className = 'w-14 h-14',
  textClassName = 'text-xl',
}) => {
  const colors = getAccentColorClasses(professional.accentColor);
  const monogram = professional.name.charAt(0).toUpperCase();

  return (
    <div
      className={`${colors.bgLight} ${className} flex items-center justify-center rounded-card font-serif font-semibold ${colors.text} ${textClassName}`}
      aria-hidden="true"
    >
      {monogram}
    </div>
  );
};
