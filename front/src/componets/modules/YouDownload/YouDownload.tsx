import { Fragment } from 'react';
import { Search } from '../shared/Search/Search';
import { YouManager } from './YouManager';
import { Placeholder } from './Placeholder';

export const YouDownload = () => {
  return (
    <Fragment>
      <div className="flex flex-col justify-center min-h-[50%] mb-5">
        <Search isMultiple={false} />
        <Placeholder />
      </div>
      <div className="flex flex-col justify-center min-h-[50%] bg-[#f8f8f8]">
        <YouManager />
      </div>
    </Fragment>
  );
};
