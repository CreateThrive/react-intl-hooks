import { useIntl } from 'react-intl';

const useFormatMessage = () => {
  const { formatMessage } = useIntl();

  return formatMessage;
};

export default useFormatMessage;
