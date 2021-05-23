import { useIntl } from 'react-intl';

const useFormatList = () => {
  const { formatList } = useIntl();

  return formatList;
};

export default useFormatList;
