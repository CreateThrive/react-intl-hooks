import { useIntl } from 'react-intl';

type ListFormatOptions = {
  type?: 'disjunction' | 'conjunction' | 'unit';
  style?: 'long' | 'short' | 'narrow';
};

const useFormatList = () => {
  const intl = useIntl();

  return (value: string[], options?: ListFormatOptions) =>
    intl.formatList(value, options);
};

export default useFormatList;
