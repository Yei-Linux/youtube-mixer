import { useSocket } from '@/hooks';
import { Tabs } from '../ui/Tabs';
import { SingleVideo } from './SingleVideo';
import { MultipleVideo } from './MultipleVideo';
import classNames from 'classnames';

import styles from './home.module.css';
import { ContentCreator } from './ContentCreator';

export const Home = () => {
  useSocket();

  return (
    <main className="w-full h-screen grid">
      <Tabs
        bodyClass={classNames(styles.manager_body_tabcontent)}
        tabs={[
          {
            headerContent: <h3 className="text-md">Create Shorts</h3>,
            bodyTabClass: classNames('h-full'),
            bodyContent: <ContentCreator />,
          },
          {
            headerContent: <h3 className="text-md">Single Video</h3>,
            bodyTabClass: classNames('h-full'),
            bodyContent: <SingleVideo />,
          },
          {
            headerContent: <h3 className="text-md">Multiple Videos</h3>,
            bodyTabClass: classNames('h-full'),
            bodyContent: <MultipleVideo />,
          },
        ]}
      />
    </main>
  );
};
