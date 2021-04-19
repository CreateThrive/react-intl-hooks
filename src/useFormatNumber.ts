import { useIntl } from 'react-intl';

const useFormatNumber = () => {
  const { formatNumber } = useIntl();

  return formatNumber;
};

export default useFormatNumber;
