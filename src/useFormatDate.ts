import { useIntl } from 'react-intl';

const useFormatDate = () => {
  const { formatDate } = useIntl();

  return formatDate;
};

export default useFormatDate;
