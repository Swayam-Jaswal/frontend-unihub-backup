import SignupForm from '@auth/components/SignupForm';

function SignupPage() {
  return (
    <section className="auth-card">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-text-secondary)]">
          Join UniHub
        </p>
        <h2 className="auth-heading mt-3 font-semibold tracking-tight">Create an account</h2>
        <p className="auth-body-copy mt-3 text-[var(--color-text-secondary)]">
          Join UniHub to get started
        </p>
      </div>

      <div className="mt-6 sm:mt-8">
        <SignupForm />
      </div>
    </section>
  );
}

export default SignupPage;
