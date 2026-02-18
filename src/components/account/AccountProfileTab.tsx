import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

export function AccountProfileTab() {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [birthDate, setBirthDate] = useState(user?.birthDate ?? '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone: phone || null, birthDate: birthDate || null });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-text">{t('account.profile.title')}</h2>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="profile-name" className="block text-sm font-medium text-text-muted">
            {t('account.profile.fullName')}
          </label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="profile-email" className="block text-sm font-medium text-text-muted">
            {t('account.profile.email')}
          </label>
          <input
            id="profile-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="profile-phone" className="block text-sm font-medium text-text-muted">
            {t('account.profile.phone')}
          </label>
          <input
            id="profile-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="profile-birth" className="block text-sm font-medium text-text-muted">
            {t('account.profile.birthDate')}
          </label>
          <input
            id="profile-birth"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2.5 font-medium text-bg transition hover:bg-accent-soft"
        >
          {saved ? '✓ ' : ''}
          {t('account.profile.save')}
        </button>
      </form>
    </section>
  );
}
