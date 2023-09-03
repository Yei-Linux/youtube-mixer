import { Fragment } from 'react';
import { Search } from '../Search/Search';
import { ManagerMultipleVideo } from '../Manager/ManagerMultipleVideo';
import { Placeholder } from '../Placeholder/Placeholder';

export const MultipleVideo = () => {
  return (
    <Fragment>
      <div className="flex flex-col justify-center min-h-[50%]">
        <Search isMultiple />
        <Placeholder>
          <Placeholder.MultipleVideo />
        </Placeholder>
      </div>
      <div className="flex flex-col justify-center min-h-[50%] bg-[#f8f8f8]">
        <ManagerMultipleVideo />
      </div>
    </Fragment>
  );
};
