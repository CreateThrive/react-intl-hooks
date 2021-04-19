import { useIntl } from 'react-intl';

const useFormatRelativeTime = () => {
  const { formatRelativeTime } = useIntl();

  return formatRelativeTime;
};

export default useFormatRelativeTime;
