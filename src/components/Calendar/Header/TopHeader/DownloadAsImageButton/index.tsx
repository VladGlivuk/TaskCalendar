import { FC, useContext } from 'react';
//context
import { WrapperContext } from 'components/Calendar/WrapperContext';
//types
import { BUTTON_TYPE } from 'core/types';
//components
import Button from 'shared/components/Button';

const DownloadAsImageButton: FC = () => {
  const { downloadElementAsImage } = useContext(WrapperContext);

  const downloadAsImageClickHandler = () => downloadElementAsImage('calendar', 'image.png');
  return <Button clickHandler={downloadAsImageClickHandler} title={'Download as Image'} type={BUTTON_TYPE.DEFAULT} />;
};

export default DownloadAsImageButton;
