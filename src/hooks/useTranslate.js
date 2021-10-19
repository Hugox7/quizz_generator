import { useCallback } from 'react';
import { useIntl } from 'react-intl';

function useTranslate() {
  const { formatMessage } = useIntl();

  const t = useCallback((id, params) => formatMessage({ id }, params), [formatMessage]);

  return { t }
}

export default useTranslate;
