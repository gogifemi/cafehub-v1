import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AvatarPicker } from './AvatarPicker';
import { getAnimalAvatarById } from '../../data/animalAvatars';

export function AccountProfileTab() {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [birthDate, setBirthDate] = useState(user?.birthDate ?? '');
  const [saved, setSaved] = useState(false);

  const getInitials = () => {
    if (!user?.name) return '?';
    return user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderAvatarPreview = () => {
    if (user?.avatar?.type === 'animal' && user.avatar.animalId) {
      const animal = getAnimalAvatarById(user.avatar.animalId);
      if (animal) {
        return (
          <div className="h-20 w-20 overflow-hidden rounded-2xl bg-surface-subtle">
            <img
              src={animal.imageUrl}
              alt={animal.name}
              className="h-full w-full object-cover"
            />
          </div>
        );
      }
    }

    if (user?.avatar?.type === 'upload' && user.avatar.url) {
      return (
        <img
          src={user.avatar.url}
          alt={user.name}
          className="h-20 w-20 rounded-2xl object-cover"
        />
      );
    }

    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-secondary">
        <span className="font-heading text-2xl font-bold text-core-white">{getInitials()}</span>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone: phone || null, birthDate: birthDate || null });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-start gap-6">
        {renderAvatarPreview()}

        <div className="flex-1">
          <button
            type="button"
            onClick={() => setShowAvatarPicker(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-secondary/30 px-4 py-2 font-heading text-sm font-medium text-text transition-all hover:border-secondary/60 hover:bg-white/5"
          >
            <Camera className="h-4 w-4" />
            {t('account.profile.changeAvatar')}
          </button>
          <p className="mt-1 text-xs text-text-muted">{t('account.profile.avatarHint')}</p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="profile-name" className="mb-1 block text-sm font-medium text-text">
            {t('account.profile.fullName')}
          </label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-surface px-4 py-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label htmlFor="profile-email" className="mb-1 block text-sm font-medium text-text">
            {t('account.profile.email')}
          </label>
          <input
            id="profile-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-surface px-4 py-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label htmlFor="profile-phone" className="mb-1 block text-sm font-medium text-text">
            {t('account.profile.phone')}
          </label>
          <input
            id="profile-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-surface px-4 py-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label htmlFor="profile-birth" className="mb-1 block text-sm font-medium text-text">
            {t('account.profile.birthDate')}
          </label>
          <input
            id="profile-birth"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded-lg border border-border-subtle bg-surface px-4 py-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded-lg bg-accent px-6 py-3 font-heading font-medium text-core-white transition-all hover:bg-accent-soft"
        >
          {saved ? '✓ ' : ''}
          {t('account.profile.save')}
        </button>
      </form>

      {/* Avatar Picker Modal */}
      {showAvatarPicker && <AvatarPicker onClose={() => setShowAvatarPicker(false)} />}
    </div>
  );
}
