import { Toaster, toast as sonnerToast } from 'sonner';

const TYPE_TITLES = {
  error: 'Action failed',
  info: 'Update',
  success: 'Success',
  warning: 'Notice',
};

function normalizeOptions(messageOrOptions, maybeOptions, fallbackTitle) {
  if (typeof messageOrOptions === 'object' && messageOrOptions !== null) {
    const { description = '', title = fallbackTitle, ...rest } = messageOrOptions;

    return {
      description,
      rest,
      title,
    };
  }

  const { title = fallbackTitle, ...rest } = maybeOptions ?? {};

  return {
    description: typeof messageOrOptions === 'string' ? messageOrOptions : '',
    rest,
    title,
  };
}

function createToastMethod(type) {
  return (message, options) => {
    const config = normalizeOptions(message, options, TYPE_TITLES[type]);
    return sonnerToast[type](config.title, {
      ...config.rest,
      description: config.description,
    });
  };
}

export const toast = {
  custom: sonnerToast.custom,
  dismiss: sonnerToast.dismiss,
  error: createToastMethod('error'),
  info: createToastMethod('info'),
  loading: sonnerToast.loading,
  message: sonnerToast.message,
  promise: sonnerToast.promise,
  success: createToastMethod('success'),
  warning: createToastMethod('warning'),
};

export { Toaster };


