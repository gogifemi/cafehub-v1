import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReservation } from '../context/ReservationContext';
import { getMockCafesForLanguage } from '../data/mockCafes';

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const DURATION_OPTIONS: { value: number; price: number }[] = [
  { value: 20, price: 15 },
  { value: 35, price: 20 },
  { value: 55, price: 40 }
];

export const ReservationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { state, setDetails, reset } = useReservation();

  // Ensure cafeId is set for this flow
  useEffect(() => {
    if (!id) return;
    if (state.cafeId !== id) {
      reset(id);
    }
  }, [id, reset, state.cafeId]);

  const cafes = useMemo(() => getMockCafesForLanguage(i18n.language), [i18n.language]);
  const cafe = id ? cafes.find((c) => c.id === id) : undefined;

  if (!id || !cafe) {
    return null;
  }

  const floorPlan = cafe.processedFloorPlan;

  const handlePartySizeSelect = (size: number) => {
    setDetails({
      partySize: size,
      // Reset table selection when party size changes
      tableId: null,
      tableLabel: null,
      tableArea: null
    });
  };

  const handleDurationSelect = (value: number, price: number) => {
    setDetails({
      durationMinutes: value,
      totalPrice: price
    });
  };

  const handleTableSelect = (tableId: string, label: string, area: string, capacity: number) => {
    if (!state.partySize || capacity < state.partySize) return;
    setDetails({
      tableId,
      tableLabel: label,
      tableArea: area as any
    });
  };

  const handleNotesChange = (value: string) => {
    setDetails({ notes: value });
  };

  const canProceed =
    !!state.partySize && !!state.durationMinutes && !!state.tableId && !!state.totalPrice;

  const onNext = () => {
    if (!canProceed) return;
    navigate(`/cafe/${id}/reserve/summary`);
  };

  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
      >
        {t('reservation.backToHome')}
      </button>

      <header className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-text-subtle">
          {t('reservation.step1')}
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          {t('reservation.step1')}
        </h1>
      </header>

      {/* Step 1A & 1B - Party size and duration side by side */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Party Size column */}
        <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <label className="block text-xs font-medium text-text-muted">
              {t('reservation.partySize')}
            </label>
            <span
              className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border-subtle text-[10px] text-text-subtle"
              title={t('reservation.partySizeInfo')}
              aria-label={t('reservation.partySizeInfo')}
            >
              ?
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {PARTY_SIZES.map((size) => {
              const selected = state.partySize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handlePartySizeSelect(size)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition ${
                    selected
                      ? 'border-coffee-500 bg-coffee-500 text-core-white'
                      : 'border-border-subtle bg-surface text-text-muted hover:border-coffee-300'
                  }`}
                  aria-pressed={selected}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration column */}
        <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <label className="block text-xs font-medium text-text-muted">
              {t('reservation.duration')}
            </label>
            <span
              className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border-subtle text-[10px] text-text-subtle"
              title={t('reservation.durationInfo')}
              aria-label={t('reservation.durationInfo')}
            >
              ?
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {DURATION_OPTIONS.map((opt) => {
              const selected = state.durationMinutes === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleDurationSelect(opt.value, opt.price)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    selected
                      ? 'border border-coffee-500 bg-coffee-500/10 text-coffee-500'
                      : 'border border-border-subtle bg-surface text-text-muted hover:border-coffee-300'
                  }`}
                  aria-pressed={selected}
                >
                  {t(`reservation.durationOptions.${opt.value}`)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step 1C - Table selection (interactive floor plan + list) */}
      <div className="space-y-3 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <label className="block text-xs font-medium text-text-muted">
            {t('reservation.tableSelection')}
          </label>
          <span
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border-subtle text-[10px] text-text-subtle"
            title={t('reservation.tableInfo')}
          >
            ?
          </span>
        </div>
        {/* Simple interactive map based on processed floor plan */}
        <div
          className="mt-2 w-full overflow-hidden rounded-xl border border-border-subtle bg-bg-soft"
          style={{ aspectRatio: `${floorPlan.gridSize.cols}/${floorPlan.gridSize.rows}` }}
        >
          <div className="relative h-full w-full">
            {floorPlan.tables.map((table) => {
              const isSelected = state.tableId === table.id;
              const isOccupied = table.status === 'occupied';
              const partySize = state.partySize ?? 1;
              const sizeTooSmall = table.capacity < partySize;

              const left = (table.position.x / floorPlan.gridSize.cols) * 100;
              const top = (table.position.y / floorPlan.gridSize.rows) * 100;

              const disabled = isOccupied || sizeTooSmall;

              return (
                <button
                  key={table.id}
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    handleTableSelect(
                      table.id,
                      String(table.tableNumber),
                      table.area,
                      table.capacity
                    )
                  }
                  className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border px-2 py-1 text-[10px] font-medium shadow-sm ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500 text-core-white'
                      : isOccupied
                      ? 'border-red-500 bg-red-500 text-core-white'
                      : sizeTooSmall
                      ? 'border-core-black bg-core-black text-core-white'
                      : 'border-border-subtle bg-surface text-text'
                  } disabled:opacity-60`}
                  style={{
                    left: `${left}%`,
                    top: `${top}%`
                  }}
                >
                  <span>No: {table.tableNumber}</span>
                  <span className="text-[9px] text-core-white/80">
                    {t('reservation.capacityPeople', { count: table.capacity })}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Backup list view of tables */}
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {floorPlan.tables.map((table) => {
            const isSelected = state.tableId === table.id;
            const isOccupied = table.status === 'occupied';
            const partySize = state.partySize ?? 1;
            const sizeTooSmall = table.capacity < partySize;

            let bg = 'bg-surface';
            let border = 'border-border-subtle';
            let text = 'text-text-muted';
            let cursor = 'cursor-pointer';

            if (isSelected) {
              bg = 'bg-emerald-500';
              border = 'border-emerald-500';
              text = 'text-core-white';
            } else if (isOccupied) {
              bg = 'bg-red-500';
              border = 'border-red-500';
              text = 'text-core-white';
              cursor = 'cursor-not-allowed';
            } else if (sizeTooSmall) {
              bg = 'bg-core-black';
              border = 'border-core-black';
              text = 'text-core-white';
              cursor = 'cursor-not-allowed';
            }

            const disabled = isOccupied || sizeTooSmall;

            return (
              <button
                key={table.id}
                type="button"
                disabled={disabled}
                onClick={() =>
                  handleTableSelect(
                    table.id,
                    String(table.tableNumber),
                    table.area,
                    table.capacity
                  )
                }
                className={`flex h-10 flex-col items-center justify-center rounded-lg border text-[11px] font-medium ${bg} ${border} ${text} ${cursor} disabled:opacity-60`}
              >
                <span>No: {table.tableNumber}</span>
                <span className="text-[10px] text-core-white/80">
                  {t('reservation.capacityPeople', { count: table.capacity })}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 1D - Notes */}
      <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <label className="block text-xs font-medium text-text-muted">
          {t('reservation.notes')}
        </label>
        <textarea
          className="mt-1 h-24 w-full resize-none rounded-xl border border-border-subtle bg-bg-soft px-3 py-2 text-sm text-text placeholder:text-text-subtle focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder={t('reservation.notesPlaceholder')}
          value={state.notes}
          onChange={(e) => handleNotesChange(e.target.value)}
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition ${
            canProceed
              ? 'bg-accent text-core-black hover:bg-accent-soft'
              : 'bg-surface-subtle text-text-subtle'
          }`}
        >
          {t('reservation.next')}
        </button>
      </div>
    </section>
  );
};

