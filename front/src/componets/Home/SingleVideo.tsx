import { Fragment } from 'react';
import { Search } from '../Search/Search';
import { ManagerSingleVideo } from '../Manager/ManagerSingleVideo';
import { Placeholder } from '../Placeholder/Placeholder';

export const SingleVideo = () => {
  return (
    <Fragment>
      <div className="flex flex-col justify-center min-h-[50%] mb-5">
        <Search isMultiple={false} />
        <Placeholder>
          <Placeholder.SingleVideo />
        </Placeholder>
      </div>
      <div className="flex flex-col justify-center min-h-[50%] bg-[#f8f8f8]">
        <ManagerSingleVideo />
      </div>
    </Fragment>
  );
};
