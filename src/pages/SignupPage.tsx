import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

export function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signup, loginWithGoogle, loginWithApple } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await signup({ name, email, phone: phone || undefined, password });
      navigate('/account');
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/account');
    } finally {
      setLoading(false);
    }
  };

  const handleApple = async () => {
    setLoading(true);
    try {
      await loginWithApple();
      navigate('/account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-6 md:max-w-lg md:px-8 md:py-8">
      <h1 className="text-2xl font-semibold tracking-tight text-text">
        {t('auth.signup')}
      </h1>
      <p className="mt-1 text-sm text-text-muted">
        {t('auth.haveAccount')}{' '}
        <Link to="/login" className="font-medium text-accent hover:text-accent-soft">
          {t('auth.login')}
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error && (
          <p className="rounded-lg border border-status-warning/50 bg-status-warning/10 px-3 py-2 text-sm text-status-warning">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="signup-name" className="block text-sm font-medium text-text-muted">
            {t('auth.fullName')}
          </label>
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-text-muted">
            {t('auth.email')}
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="signup-phone" className="block text-sm font-medium text-text-muted">
            {t('auth.phone')} <span className="text-text-subtle">(optional)</span>
          </label>
          <input
            id="signup-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium text-text-muted">
            {t('auth.password')}
          </label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="signup-confirm" className="block text-sm font-medium text-text-muted">
            {t('auth.confirmPassword')}
          </label>
          <input
            id="signup-confirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-text placeholder:text-text-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-accent px-4 py-2.5 font-medium text-bg transition hover:bg-accent-soft disabled:opacity-50"
        >
          {t('auth.signup')}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-border-subtle" />
        <span className="text-xs text-text-muted">{t('auth.or')}</span>
        <span className="h-px flex-1 bg-border-subtle" />
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-border-subtle bg-surface px-4 py-2.5 font-medium text-text transition hover:border-border hover:bg-surface-subtle disabled:opacity-50"
        >
          <GoogleIcon className="h-5 w-5" />
          {t('auth.signUpWithGoogle')}
        </button>
        <button
          type="button"
          onClick={handleApple}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#000] px-4 py-2.5 font-medium text-[#fff] transition hover:opacity-90 disabled:opacity-50 dark:bg-[#fff] dark:text-[#000]"
        >
          <AppleIcon className="h-5 w-5" />
          {t('auth.signUpWithApple')}
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-text-muted">
        {t('auth.haveAccount')}{' '}
        <Link to="/login" className="font-medium text-accent hover:text-accent-soft">
          {t('auth.login')}
        </Link>
      </p>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
