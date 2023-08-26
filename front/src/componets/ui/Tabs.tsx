import classNames from 'classnames';
import { FC, useState } from 'react';

interface ITab {
  bodyContent: React.ReactNode;
  headerContent: React.ReactNode;
}
interface ITabs {
  tabs: ITab[];
}
export const Tabs: FC<ITabs> = ({ tabs }) => {
  const [tabSelected, setTabSelected] = useState(0);

  return (
    <div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        {tabs.map(({ headerContent }, index) => (
          <li className="mr-2" key={index}>
            <a
              href="#"
              aria-current="page"
              className={classNames('inline-block p-4 rounded-t-lg', {
                'text-blue-600 bg-gray-100 active': tabSelected === index,
                'hover:text-gray-600 hover:bg-gray-50': tabSelected !== index,
              })}
              onClick={() => setTabSelected(index)}
            >
              {headerContent}
            </a>
          </li>
        ))}
      </ul>

      <ul className="p-4 font-light">
        {tabs.map(
          ({ bodyContent }, index) =>
            tabSelected === index && <li key={index}>{bodyContent}</li>
        )}
      </ul>
    </div>
  );
};
