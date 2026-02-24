import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { getAnimalAvatarById } from '../data/animalAvatars';
import { AccountProfileTab } from '../components/account/AccountProfileTab';
import { AccountFavoritesTab } from '../components/account/AccountFavoritesTab';
import { AccountOrdersTab } from '../components/account/AccountOrdersTab';
import { AccountSettingsTab } from '../components/account/AccountSettingsTab';

type AccountTab = 'profile' | 'favorites' | 'orders' | 'settings';

const TABS: { id: AccountTab; labelKey: string; icon: string }[] = [
  { id: 'profile', labelKey: 'account.tabs.profile', icon: '👤' },
  { id: 'favorites', labelKey: 'account.tabs.favorites', icon: '❤️' },
  { id: 'orders', labelKey: 'account.tabs.orders', icon: '🧾' },
  { id: 'settings', labelKey: 'account.tabs.settings', icon: '⚙️' }
];

export function AccountPage() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [tab, setTab] = useState<AccountTab>('profile');

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const memberSinceFormatted = new Date(user.memberSince).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="py-6">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-border-subtle bg-surface-subtle text-2xl font-semibold text-accent">
          {user.avatar?.type === 'upload' && user.avatar.url ? (
            <img src={user.avatar.url} alt="" className="h-full w-full object-cover" />
          ) : user.avatar?.type === 'animal' && user.avatar.animalId ? (
            (() => {
              const animal = getAnimalAvatarById(user.avatar.animalId!);
              const Icon = animal?.icon;
              return Icon ? (
                <span
                  className="flex h-full w-full items-center justify-center"
                  style={{ color: animal.color, backgroundColor: animal.bgColor }}
                >
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </span>
              ) : (
                initials
              );
            })()
          ) : (
            initials
          )}
        </div>
        <div>
          <h1 className="text-xl font-semibold text-text">
            {t('account.welcome', { name: user.name.split(' ')[0] })}
          </h1>
          <p className="text-sm text-text-muted">{user.email}</p>
          <p className="mt-0.5 text-xs text-text-subtle">
            {t('account.memberSince')}: {memberSinceFormatted}
          </p>
        </div>
      </header>

      <nav
        className="mb-6 flex gap-1 overflow-x-auto border-b border-border-subtle pb-px"
        role="tablist"
      >
        {TABS.map(({ id, labelKey, icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`shrink-0 rounded-t-lg px-4 py-2.5 text-sm font-medium transition ${
              tab === id
                ? 'border border-border-subtle border-b-surface bg-surface text-accent'
                : 'text-text-muted hover:text-text'
            }`}
          >
            {icon} {t(labelKey)}
          </button>
        ))}
      </nav>

      <div role="tabpanel">
        {tab === 'profile' && <AccountProfileTab />}
        {tab === 'favorites' && <AccountFavoritesTab />}
        {tab === 'orders' && <AccountOrdersTab />}
        {tab === 'settings' && <AccountSettingsTab />}
      </div>
    </div>
  );
}
