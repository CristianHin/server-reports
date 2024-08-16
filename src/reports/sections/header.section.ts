import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';
const isProduction = process.env.NODE_ENV === 'production';

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: isProduction ? 'assets/tucan-code-logo.png' : 'src/assets/tucan-code-logo.png',
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
