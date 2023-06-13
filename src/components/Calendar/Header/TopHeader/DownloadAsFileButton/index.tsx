import { FC } from 'react';
//types
import { BUTTON_TYPE } from 'core/types';
//constants
import { calendar } from 'core/constants';
//components
import Button from 'shared/components/Button';

const DownloadAsFileButton: FC = () => {
  const downloadFileClickHandler = () => {
    try {
      const calendarData = localStorage.getItem(calendar);

      if (calendarData) {
        const fileName = 'calendarData';

        const formattedJson = JSON.stringify(JSON.parse(calendarData), null, 6);
        const blob = new Blob([formattedJson], { type: 'application/json' });
        const href = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + '.json';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      }
    } catch (error) {
      console.log('file: index.tsx:34  error:', error);
    }
  };

  return <Button title='Download calendar as JSON' type={BUTTON_TYPE.DEFAULT} clickHandler={downloadFileClickHandler} />;
};

export default DownloadAsFileButton;
