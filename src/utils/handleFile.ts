import { ChangeEvent } from 'react';

interface handleChangeReturn {
  name: string;
  file: File;
}

const handleChangeFile = ({
  target: { files },
}: ChangeEvent<HTMLInputElement>): handleChangeReturn | null => {
  if (files && files.length > 0) {
    const file = files[0];
    return { name: URL.createObjectURL(file), file };
  }

  return null;
};

export type handleTypeFile = 'image' | 'video';

export default handleChangeFile;
