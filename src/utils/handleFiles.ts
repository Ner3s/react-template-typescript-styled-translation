import { ChangeEvent } from 'react';

interface handleChangeReturn {
  name: string;
  file: File;
}

const handleChangeFile = ({
  target: { files },
}: ChangeEvent<HTMLInputElement>): handleChangeReturn[] | null => {
  if (files && files.length > 0) {
    const filesSend: handleChangeReturn[] = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      filesSend.push({ name: URL.createObjectURL(file), file });
    }

    return filesSend;
  }

  return null;
};

export type handleTypeFile = 'image' | 'video';

export default handleChangeFile;
