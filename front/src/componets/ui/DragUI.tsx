import { ChangeEvent, useRef, DragEvent, useState } from 'react';
import Image from 'next/image';
import { Button } from './Button';
import classNames from 'classnames';

import VideoFileImg from '@/assets/video-file.png';

export interface IFilesDroped {
  file: File;
  name: string;
  type: string;
}

export interface IDragUI {
  files: IFilesDroped[];
  onChange: (files: IFilesDroped[]) => void;
}
export const DragUI = ({ onChange, files }: IDragUI) => {
  const [isDragged, setIsDragged] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBrowseFiles = () => {
    inputRef.current?.click();
  };

  const getFile = (file?: File) => {
    if (!file) return;

    const name = file?.name;
    const type = file?.type;
    return { file, name, type };
  };

  const handleSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const res = getFile(e.target.files?.[0]);
    if (!res) return;

    onChange([res]);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragged(true);
    }
    if (e.type === 'dragleave') {
      setIsDragged(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const res = getFile(e.dataTransfer.files?.[0]);
    if (!res) return;

    onChange([res]);
    setIsDragged(false);
  };

  const handleCloseFiles = () => {
    onChange([]);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className="w-full min-h-[300px] p-4 rounded-xl border-dashed border-4 border-[#f7f7f7]-500"
    >
      <input
        className="hidden"
        type="file"
        ref={inputRef}
        onChange={handleSelectFiles}
      />

      {!!files.length && (
        <div className="flex flex-col justify-center items-center gap-3 h-full">
          <p className="font-medium text-lg">Your video selected 😵</p>
          <div>
            <Image
              alt="video file asset"
              src={VideoFileImg}
              width={75}
              height={75}
            />
          </div>
          <p>
            {files?.[0].name}{' '}
            <strong className="ml-1 cursor-pointer" onClick={handleCloseFiles}>
              ❎
            </strong>
          </p>
        </div>
      )}

      {!files.length && (
        <div
          className={classNames(
            'flex flex-col justify-center items-center gap-2 h-full',
            {
              'bg-[#f7f7f7]': isDragged,
            }
          )}
        >
          <p className="text-xl font-medium">Wanna create your shorts? 😎</p>
          <p className="text-md font-medium">Drag your video to upload</p>
          <p className="font-medium">or</p>
          <Button onClick={handleBrowseFiles}>Browse Files</Button>

          <div className="flex flex-col justify-center items-center">
            <p>
              Max file size: <strong>50MB</strong>
            </p>
            <p>
              Supported file types: <strong>MP4,MOV,AVI</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
