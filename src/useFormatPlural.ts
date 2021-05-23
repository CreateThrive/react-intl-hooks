import { useIntl } from 'react-intl';

const useFormatPlural = () => {
  const { formatPlural } = useIntl();

  return formatPlural;
};

export default useFormatPlural;
