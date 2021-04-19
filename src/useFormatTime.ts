import { useIntl } from 'react-intl';

const useFormatTime = () => {
  const { formatTime } = useIntl();

  return formatTime;
};

export default useFormatTime;
