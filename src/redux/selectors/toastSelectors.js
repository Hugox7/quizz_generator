export function lastToastSelector({ toasts }) {
  if (toasts.length === 0) {
    return null;
  }
  return toasts[toasts.length - 1];
};

export function toastsSelector({ toasts }) {
  if (toasts.length === 0) {
    return null;
  }
  return toasts;
};
