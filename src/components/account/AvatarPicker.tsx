import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronLeft, ChevronRight, X, Upload } from 'lucide-react';
import { animalAvatars, type AnimalAvatarId } from '../../data/animalAvatars';
import { useAuth } from '../../context/AuthContext';

interface AvatarPickerProps {
  onClose: () => void;
}

export function AvatarPicker({ onClose }: AvatarPickerProps) {
  const { t, i18n } = useTranslation();
  const { user, updateAvatar } = useAuth();
  const [selectedId, setSelectedId] = useState<AnimalAvatarId | null>(
    user?.avatar?.type === 'animal' ? (user.avatar.animalId ?? null) : null
  );
  const [page, setPage] = useState(0);
  const itemsPerPage = 8;

  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const currentAvatars = animalAvatars.slice(start, end);
  const totalPages = Math.ceil(animalAvatars.length / itemsPerPage);

  const handleSelect = (id: AnimalAvatarId) => {
    setSelectedId(id);
  };

  const handleSave = () => {
    if (selectedId) {
      updateAvatar({
        type: 'animal',
        animalId: selectedId
      });
    }
    onClose();
  };

  const handleUpload = () => {
    // Mock upload - in real app would open file picker
    alert(t('account.profile.uploadSimulated') || 'Fotoğraf yükleme simüle edildi');
    updateAvatar({
      type: 'upload',
      url: 'https://via.placeholder.com/150/ff6b35/ffffff?text=User'
    });
    onClose();
  };

  const isTurkish = i18n.language === 'tr';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-secondary/20 bg-bg p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-text-heading">
            {t('account.profile.chooseAnimal') || 'Avatar Seç'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-white/10"
            aria-label={t('common.close') || 'Kapat'}
          >
            <X className="h-5 w-5 text-text" />
          </button>
        </div>

        {/* Upload Option */}
        <button
          type="button"
          onClick={handleUpload}
          className="mb-6 flex w-full items-center gap-3 rounded-lg border border-secondary/30 p-4 transition-all hover:border-secondary/60 hover:bg-white/5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
            <Upload className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-heading text-sm font-medium text-text">
              {t('account.profile.uploadPhoto') || 'Fotoğraf Yükle'}
            </p>
            <p className="text-xs text-text-muted">
              {t('account.profile.uploadHint') || 'Kendi fotoğrafını kullan'}
            </p>
          </div>
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-secondary/20" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-bg px-3 text-xs text-text-subtle">
              {t('common.or') || 'veya'}
            </span>
          </div>
        </div>

        {/* Animal Grid */}
        <div className="grid grid-cols-4 gap-4">
          {currentAvatars.map((animal) => {
            const Icon = animal.icon;
            const isSelected = selectedId === animal.id;

            return (
              <button
                key={animal.id}
                type="button"
                onClick={() => handleSelect(animal.id as AnimalAvatarId)}
                className={`group relative flex flex-col items-center rounded-xl p-3 transition-all ${
                  isSelected
                    ? 'ring-2 ring-accent ring-offset-2 ring-offset-bg'
                    : 'hover:scale-105 hover:bg-white/5'
                }`}
              >
                <div
                  className="mb-2 flex h-16 w-16 items-center justify-center rounded-xl"
                  style={{ backgroundColor: animal.bgColor }}
                >
                  <Icon style={{ color: animal.color }} className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-medium text-text">{isTurkish ? animal.name : animal.nameEn}</span>
                <span className="text-[10px] text-text-muted">
                  {isTurkish ? animal.description : animal.descriptionEn}
                </span>

                {/* Selected checkmark */}
                {isSelected && (
                  <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-core-white">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-full p-2 text-text hover:bg-white/10 disabled:opacity-30"
              aria-label={t('common.previous') || 'Önceki'}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-text-muted">
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="rounded-full p-2 text-text hover:bg-white/10 disabled:opacity-30"
              aria-label={t('common.next') || 'Sonraki'}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-secondary/30 px-6 py-3 font-heading text-sm font-medium text-text transition-all hover:border-secondary/60 hover:bg-white/5"
          >
            {t('common.cancel') || 'İptal'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!selectedId}
            className="flex-1 rounded-lg bg-accent px-6 py-3 font-heading text-sm font-medium text-core-white transition-all hover:bg-accent-soft disabled:opacity-50"
          >
            {t('common.save') || 'Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}
