interface RatingProps {
  value: number;
}

export const Rating = ({ value }: RatingProps) => {
  const fullStars = Math.floor(value);
  const hasHalf = value - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-xs">
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, idx) => (
          <span key={`full-${idx}`} className="text-amber-400">
            ★
          </span>
        ))}
        {hasHalf && <span className="text-amber-400/70">☆</span>}
        {Array.from({ length: emptyStars }).map((_, idx) => (
          <span key={`empty-${idx}`} className="text-slate-600">
            ☆
          </span>
        ))}
      </div>
      <span className="font-medium text-amber-300">{value.toFixed(1)}</span>
    </div>
  );
};

