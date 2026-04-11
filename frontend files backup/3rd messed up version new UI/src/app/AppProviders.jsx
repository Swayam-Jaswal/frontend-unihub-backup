import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@services/toast';
import { store } from '@store/store';

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

function AppProviders({ children }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
        <Toaster
          closeButton
          duration={3600}
          position="bottom-right"
          theme="dark"
          icons={{
            error: null,
            info: null,
            loading: null,
            success: null,
            warning: null,
          }}
          toastOptions={{
            classNames: {
              actionButton: '!bg-[var(--color-brand)] !text-[var(--color-text-inverse)]',
              cancelButton: '!bg-[var(--color-surface-soft)] !text-[var(--color-text-primary)]',
              closeButton:
                '!left-auto !right-4 !top-4 !h-6 !w-6 !border-0 !bg-transparent !text-[var(--color-text-secondary)] !shadow-none hover:!bg-transparent hover:!text-[var(--color-text-primary)]',
              content: '!gap-0 !pr-8',
              description:
                '!mt-2 !text-[0.98rem] !leading-7 !text-[var(--color-text-primary)]/85',
              error: '!border-[hsl(var(--border)/0.72)]',
              info: '!border-[hsl(var(--border)/0.72)]',
              success: '!border-[hsl(var(--border)/0.72)]',
              toast:
                '!w-[min(30rem,calc(100vw-2rem))] !rounded-[18px] !border !border-[hsl(var(--border)/0.72)] !bg-[linear-gradient(180deg,hsl(230_24%_7%/0.98),hsl(228_25%_6%/0.98))] !px-7 !py-6 !text-[var(--color-text-primary)] !shadow-[0_28px_60px_-34px_rgba(0,0,0,0.85)]',
              title: '!text-[1rem] !font-semibold !tracking-[-0.01em] !text-[var(--color-text-primary)]',
              warning: '!border-[hsl(var(--border)/0.72)]',
            },
          }}
        />
      </QueryClientProvider>
    </Provider>
  );
}

export default AppProviders;

