import { useState, type ReactNode, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { getAnimalAvatarById } from '../data/animalAvatars';
import { AccountProfileTab } from '../components/account/AccountProfileTab';
import { AccountFavoritesTab } from '../components/account/AccountFavoritesTab';
import { AccountOrdersTab } from '../components/account/AccountOrdersTab';
import { AccountSettingsTab } from '../components/account/AccountSettingsTab';
import { CalendarClock, Heart, ReceiptText, Settings, User } from 'lucide-react';
import { AccountReservationsTab } from '../components/account/AccountReservationsTab';

type AccountTab = 'profile' | 'favorites' | 'orders' | 'reservations' | 'settings';

const TABS: { id: AccountTab; labelKey: string; icon: ReactNode }[] = [
  {
    id: 'profile',
    labelKey: 'account.tabs.profile',
    icon: <User className="h-4 w-4" />
  },
  {
    id: 'favorites',
    labelKey: 'account.tabs.favorites',
    icon: <Heart className="h-4 w-4" />
  },
  {
    id: 'reservations',
    labelKey: 'account.tabs.reservations',
    icon: <CalendarClock className="h-4 w-4" />
  },
  {
    id: 'orders',
    labelKey: 'account.tabs.orders',
    icon: <ReceiptText className="h-4 w-4" />
  },
  {
    id: 'settings',
    labelKey: 'account.tabs.settings',
    icon: <Settings className="h-4 w-4" />
  }
];

export function AccountPage() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [tab, setTab] = useState<AccountTab>('profile');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Sync tab state from URL on first render and when query changes
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab') as AccountTab | null;
    if (tabFromUrl && TABS.some((tDef) => tDef.id === tabFromUrl) && tabFromUrl !== tab) {
      setTab(tabFromUrl);
    }
  }, [searchParams, tab]);

  // Keep URL in sync when tab changes (for deep-links like "Rezervasyonlarım")
  const handleTabChange = (nextTab: AccountTab) => {
    setTab(nextTab);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', nextTab);
    // Ensure we stay on /account while updating query params
    navigate({ pathname: '/account', search: newParams.toString() }, { replace: true });
  };

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const currentAnimal =
    user.avatar?.type === 'animal' && user.avatar.animalId
      ? getAnimalAvatarById(user.avatar.animalId)
      : null;

  const isRoundAvatar =
    (user.avatar?.type === 'animal' && currentAnimal?.style === 'yuvarlak') ||
    user.avatar?.type === 'upload';

  const avatarShapeClass = isRoundAvatar ? 'rounded-full' : 'rounded-2xl';
  const memberSinceFormatted = new Date(user.memberSince).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="py-6">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border-2 border-border-subtle bg-surface-subtle text-2xl font-semibold text-accent ${avatarShapeClass}`}
        >
          {user.avatar?.type === 'upload' && user.avatar.url ? (
            <img src={user.avatar.url} alt="" className="h-full w-full object-cover" />
          ) : user.avatar?.type === 'animal' && currentAnimal ? (
            <img
              src={currentAnimal.imageUrl}
              alt={currentAnimal.name}
              className="h-full w-full object-cover"
            />
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
            onClick={() => handleTabChange(id)}
            className={`shrink-0 rounded-t-lg px-4 py-2.5 text-sm font-medium transition ${
              tab === id
                ? 'border border-border-subtle border-b-surface bg-surface text-accent'
                : 'text-text-muted hover:text-text'
            }`}
          >
            <span className="inline-flex items-center gap-1">
              {icon}
              <span>
                {id === 'orders'
                  ? t(labelKey, 'Orders')
                  : t(labelKey)}
              </span>
            </span>
          </button>
        ))}
      </nav>

      <div role="tabpanel">
        {tab === 'profile' && <AccountProfileTab />}
        {tab === 'favorites' && <AccountFavoritesTab />}
        {tab === 'orders' && <AccountOrdersTab />}
        {tab === 'reservations' && <AccountReservationsTab />}
        {tab === 'settings' && <AccountSettingsTab />}
      </div>
    </div>
  );
}
