import LoginForm from '@auth/components/LoginForm';

function LoginPage() {
  return (
    <section className="auth-card">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-text-secondary)]">
          Access Portal
        </p>
        <h2 className="auth-heading mt-3 font-semibold tracking-tight">Welcome back</h2>
        <p className="auth-body-copy mt-3 text-[var(--color-text-secondary)]">
          Sign in to your UniHub account
        </p>
      </div>

      <div className="mt-6 sm:mt-8">
        <LoginForm />
      </div>
    </section>
  );
}

export default LoginPage;
