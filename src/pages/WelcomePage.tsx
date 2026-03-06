import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWelcomeState } from '../hooks/useWelcomeState';

export const WelcomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { markWelcomeCompleted } = useWelcomeState();
  const [dontShowAgain, setDontShowAgain] = useState(true);
  const [step, setStep] = useState(0);

  const handleFinish = () => {
    if (dontShowAgain) {
      markWelcomeCompleted();
    }
    navigate('/', { replace: true });
  };

  const handleSkip = () => {
    if (dontShowAgain) {
      markWelcomeCompleted();
    }
    navigate('/', { replace: true });
  };

  const isLastStep = step === 4;

  const handlePrimary = () => {
    if (!isLastStep) {
      setStep((current) => (current < 4 ? current + 1 : current));
      return;
    }

    handleFinish();
  };

  const renderStepContent = () => {
    if (step === 0) return null;

    const titles = [
      t('welcome.step1Title', { defaultValue: 'Kafeni bul' }),
      t('welcome.step2Title', { defaultValue: 'Masandaki QR’ı tara' }),
      t('welcome.step3Title', { defaultValue: 'Siparişini takip et' }),
      t('welcome.step4Title', { defaultValue: 'Rezervasyon yap' })
    ];

    const bodies = [
      t('welcome.step1Body', {
        defaultValue:
          'Haritadan yakındaki kafeleri keşfet, konseptine ve puanına göre kendine en uygun olanı seç.'
      }),
      t('welcome.step2Body', {
        defaultValue:
          'Masandaki QR kodu okutarak menüye gir, kişisel hesabını aç ve siparişini oluştur.'
      }),
      t('welcome.step3Body', {
        defaultValue:
          'Hazırlanma sürecini canlı takip et, masadan kalkmadan ödeme yap ve hesabı kolayca bölüş.'
      }),
      t('welcome.step4Body', {
        defaultValue:
          'İstediğin kafede masanı önceden ayır; tarih, saat ve kişi sayısını seç, ödemeyi uygulama üzerinden tamamla.'
      })
    ];

    const index = Math.min(Math.max(step - 1, 0), 3);
    const stepNumber = String(step).padStart(2, '0');

    return (
      <div className="space-y-5">
        <div className="space-y-1 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
            {stepNumber}
          </p>
          <h2 className="text-base font-semibold text-text sm:text-lg">{titles[index]}</h2>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-surface-subtle to-surface-elevated" />
        </div>

        <p className="mx-auto max-w-xl text-sm text-text-muted sm:text-base">{bodies[index]}</p>
      </div>
    );
  };

  return (
    <section className="flex flex-1 items-center justify-center py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-2xl bg-surface px-6 py-8 shadow-sm shadow-black/10 sm:px-10 sm:py-10">
        <header className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t('welcome.badge', { defaultValue: 'Hoş geldin' })}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
            {t('welcome.title', { defaultValue: 'Kafede otur, siparişinle uğraşma.' })}
          </h1>
          <p className="mx-auto max-w-xl text-sm text-text-muted sm:text-base">
            {t('welcome.subtitle', {
              defaultValue:
                'CafeHub ile masandaki QR kodu okutarak menüyü keşfet, sipariş ver, takibini yap ve hesabını kapat.'
            })}
          </p>
        </header>

        {renderStepContent()}

        <footer className="flex flex-col gap-4 border-t border-border-subtle pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 text-xs text-text-muted">
            <input
              id="welcome-dont-show-again"
              type="checkbox"
              className="mt-0.5 h-4 w-4 cursor-pointer rounded border-border-subtle bg-bg-soft text-accent"
              checked={dontShowAgain}
              onChange={() => setDontShowAgain((value) => !value)}
            />
            <label
              htmlFor="welcome-dont-show-again"
              className="cursor-pointer select-none leading-snug"
            >
              {t('welcome.dontShowAgain', { defaultValue: 'Tekrar gösterme' })}
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex items-center justify-center rounded-full border border-border-subtle bg-surface px-4 py-2 text-sm font-medium text-text-muted transition hover:border-border hover:text-text"
            >
              {t('welcome.skipCta', { defaultValue: 'Şimdilik geç' })}
            </button>
            <button
              type="button"
              onClick={handlePrimary}
              className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black shadow-sm transition hover:bg-accent-soft"
            >
              {step < 4
                ? t('welcome.nextCta', { defaultValue: 'Sonraki' })
                : t('welcome.getStartedCta', { defaultValue: 'Hadi başlayalım' })}
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
};

