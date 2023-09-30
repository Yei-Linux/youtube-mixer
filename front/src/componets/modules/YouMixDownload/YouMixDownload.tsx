import { Fragment } from 'react';
import { Search } from '../shared/Search/Search';
import { YouMixManager } from './YouMixManager';
import { Placeholder } from './Placeholder';

export const YouMixDownload = () => {
  return (
    <Fragment>
      <div className="flex flex-col justify-center min-h-[50%] mb-5">
        <Search isMultiple />
        <Placeholder />
      </div>
      <div className="flex flex-col justify-center min-h-[50%] bg-[#f8f8f8]">
        <YouMixManager />
      </div>
    </Fragment>
  );
};
