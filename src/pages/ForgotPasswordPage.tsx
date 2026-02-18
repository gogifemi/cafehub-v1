import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="mx-auto w-full max-w-md px-4 py-6 md:max-w-lg md:px-8 md:py-8">
        <h1 className="text-2xl font-semibold tracking-tight text-text">
          {t('auth.forgotPassword')}
        </h1>
        <p className="mt-4 rounded-lg border border-status-success/50 bg-status-success/10 px-4 py-3 text-sm text-status-success">
          {t('auth.resetSent')}
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block text-sm font-medium text-accent hover:text-accent-soft"
        >
          ← {t('auth.login')}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-6 md:max-w-lg md:px-8 md:py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-text">
        {t('auth.forgotPassword')}
      </h1>
      <p className="mt-1 text-sm text-text-muted">
        Enter your email and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="forgot-email" className="block text-sm font-medium text-text-muted">
            {t('auth.email')}
          </label>
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent px-4 py-2.5 font-medium text-bg transition hover:bg-accent-soft disabled:opacity-50"
        >
          {t('auth.resetLink')}
        </button>
      </form>

      <Link
        to="/login"
        className="mt-6 inline-block text-sm font-medium text-accent hover:text-accent-soft"
      >
        ← {t('auth.login')}
      </Link>
    </div>
  );
}
