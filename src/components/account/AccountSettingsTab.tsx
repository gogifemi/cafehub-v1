import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { LanguageSwitcher } from '../layout/LanguageSwitcher';
import { ThemeToggle } from '../layout/ThemeToggle';

export function AccountSettingsTab() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [promotions, setPromotions] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return;
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordUpdated(true);
    setTimeout(() => setPasswordUpdated(false), 3000);
  };

  const handleDeleteAccount = () => {
    logout();
    setDeleteModalOpen(false);
    window.location.href = '/';
  };

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-text">{t('account.settings.title')}</h2>

      <div className="max-w-md space-y-8">
        <div>
          <h3 className="text-sm font-medium text-text-muted">
            {t('account.settings.changePassword')}
          </h3>
          <form onSubmit={handleUpdatePassword} className="mt-3 space-y-3">
            <input
              type="password"
              placeholder={t('account.settings.currentPassword')}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <input
              type="password"
              placeholder={t('account.settings.newPassword')}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <input
              type="password"
              placeholder={t('account.settings.confirmPassword')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="submit"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent-soft"
            >
              {passwordUpdated ? '✓ ' : ''}
              {t('account.settings.updatePassword')}
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text-muted">
            {t('account.settings.notifications')}
          </h3>
          <div className="mt-3 space-y-3">
            <label className="flex items-center justify-between gap-4">
              <span className="text-sm text-text">{t('account.settings.emailNotifications')}</span>
              <input
                type="checkbox"
                checked={emailNotif}
                onChange={(e) => setEmailNotif(e.target.checked)}
                className="h-4 w-4 rounded border-border-subtle text-accent focus:ring-accent"
              />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span className="text-sm text-text">{t('account.settings.smsNotifications')}</span>
              <input
                type="checkbox"
                checked={smsNotif}
                onChange={(e) => setSmsNotif(e.target.checked)}
                className="h-4 w-4 rounded border-border-subtle text-accent focus:ring-accent"
              />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span className="text-sm text-text">{t('account.settings.promotions')}</span>
              <input
                type="checkbox"
                checked={promotions}
                onChange={(e) => setPromotions(e.target.checked)}
                className="h-4 w-4 rounded border-border-subtle text-accent focus:ring-accent"
              />
            </label>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text-muted">{t('account.settings.language')}</h3>
          <div className="mt-2">
            <LanguageSwitcher />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-text-muted">{t('account.settings.theme')}</h3>
          <div className="mt-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="border-t border-border-subtle pt-6">
          <h3 className="text-sm font-medium text-status-warning">Danger Zone</h3>
          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="mt-3 rounded-lg border border-status-warning/50 bg-status-warning/10 px-4 py-2 text-sm font-medium text-status-warning transition hover:bg-status-warning/20"
          >
            {t('account.settings.deleteAccount')}
          </button>
        </div>
      </div>

      {deleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm"
          onClick={() => setDeleteModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border-subtle bg-surface p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-text">
              {t('account.settings.deleteAccount')}
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              {t('account.settings.deleteConfirm')}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium text-text transition hover:bg-surface-subtle"
              >
                {t('actions.cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="rounded-lg bg-status-warning/90 px-4 py-2 text-sm font-medium text-white transition hover:bg-status-warning"
              >
                {t('account.settings.deleteAccount')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
