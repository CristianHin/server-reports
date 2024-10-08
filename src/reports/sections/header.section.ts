import { join } from 'path';
import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}
const pathLogo = join(__dirname, '../../assets', `tucan-code-logo.png`);

const logo: Content = {
  image: pathLogo,
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const headerSection = (options: HeaderOptions): Content => {
  const { showDate = true, showLogo = true } = options;
  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate
    ? {
        text: `${DateFormatter.getDateFormat(new Date())}`,
        alignment: 'right',
        margin: [20, 20],
      }
    : null;
  return {
    columns: [headerLogo, headerDate],
  };
};
