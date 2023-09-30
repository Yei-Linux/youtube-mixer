import { useSocket } from '@/hooks';
import { Tabs } from '@/componets/ui/Tabs';
import {
  ContentCreator,
  YouDownload,
  YouMixDownload,
} from '@/componets/modules';
import classNames from 'classnames';

import styles from './home.module.css';
import Image from 'next/image';

import Shorts from '@/assets/shorts.png';
import Youtube from '@/assets/youtube.png';
import YoutubeBlack from '@/assets/youtube-black.jpeg';

export const Home = () => {
  useSocket();

  return (
    <main className="w-full h-screen grid">
      <Tabs
        className="overflow-auto"
        idTab="home_tabs_container"
        bodyClass={classNames(styles.manager_body_tabcontent)}
        tabs={[
          {
            headerContent: (
              <h3 className="text-md flex items-center gap-3">
                Content Creator
                <span>
                  <Image
                    alt="shorts creation"
                    src={Shorts}
                    width={18}
                    height={18}
                  />
                </span>
              </h3>
            ),
            bodyTabClass: classNames('h-full'),
            bodyContent: <ContentCreator />,
          },
          {
            headerContent: (
              <h3 className="text-md items-center flex gap-3">
                Youtube Donwload
                <span>
                  <Image
                    alt="single youtube videos"
                    src={Youtube}
                    width={20}
                    height={20}
                  />
                </span>
              </h3>
            ),
            bodyTabClass: classNames('h-full'),
            bodyContent: <YouDownload />,
          },
          {
            headerContent: (
              <h3 className="text-md items-center flex gap-3">
                Youtube Mix Download
                <span>
                  <Image
                    alt="multiple youtube videos"
                    src={YoutubeBlack}
                    width={30}
                    height={30}
                  />
                </span>
              </h3>
            ),
            bodyTabClass: classNames('h-full'),
            bodyContent: <YouMixDownload />,
          },
        ]}
      />
    </main>
  );
};
