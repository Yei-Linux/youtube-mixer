import Image from 'next/image';
import EmptyImg from '@/assets/empty.webp';

export const Empty = () => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-md text-gray-500">
        You need to insert the youtube url to start playing with our manager! 😀
      </h3>
      <div>
        <Image alt="empty asset" src={EmptyImg} width={280} height={280} />
      </div>
    </div>
  );
};
