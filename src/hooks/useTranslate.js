import { useCallback } from 'react';
import { useIntl } from 'react-intl';

function useTranslate() {
  const { formatMessage, formatDate } = useIntl();

  const t = useCallback((id, params) => formatMessage({ id }, params), [formatMessage]);
  const date = useCallback((value) => formatDate(value, {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
  }), [formatDate]);

  return { t, date }
}

export default useTranslate;
