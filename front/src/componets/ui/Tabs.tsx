import classNames from 'classnames';
import { FC, useState } from 'react';

interface ITab {
  bodyTabClass?: string;
  bodyContent: React.ReactNode;
  headerTabClass?: string;
  headerContent: React.ReactNode;
}
interface ITabs {
  className?: string;
  idTab?: string;
  tabs: ITab[];
  bodyClass?: string;
  headerClass?: string;
}
export const Tabs: FC<ITabs> = ({
  idTab,
  tabs,
  bodyClass,
  headerClass,
  className,
}) => {
  const [tabSelected, setTabSelected] = useState(0);

  return (
    <div id={idTab} className={classNames(className)}>
      <ul
        className={classNames(
          'flex flex-wrap text-sm font-medium text-center text-gray-500',
          headerClass
        )}
      >
        {tabs.map(({ headerContent, headerTabClass }, index) => (
          <li className={classNames('mr-2', headerTabClass)} key={index}>
            <span
              aria-current="page"
              className={classNames(
                'inline-block p-4 rounded-t-lg cursor-pointer',
                {
                  'text-primary bg-gray-100 active': tabSelected === index,
                  'hover:text-gray-600 hover:bg-gray-50': tabSelected !== index,
                }
              )}
              onClick={() => setTabSelected(index)}
            >
              {headerContent}
            </span>
          </li>
        ))}
      </ul>

      <ul className={classNames('p-4 font-light', bodyClass)}>
        {tabs.map(({ bodyContent, bodyTabClass }, index) => (
          <li
            key={index}
            className={classNames(bodyTabClass, {
              hidden: tabSelected !== index,
            })}
          >
            {bodyContent}
          </li>
        ))}
      </ul>
    </div>
  );
};
