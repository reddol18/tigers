'use client';

import cn from "classnames";

type Props = {
  tags: string;
  category: string;
  on_mobile: boolean;
};

const Tags = ({ tags, category, on_mobile }: Props) => {
  return (
    <div className={cn('flex items-center mb-2 xl:mb-1', {
            'lg:hidden': on_mobile,
            'hidden xl:flex': !on_mobile,
        })}>
      {tags.length > 0 && <div className="text-sm mr-1 lg:text-md font-bold lg:mr-3">{tags}</div>}
      <div className="text-xs lg:text-sm">{category}</div>
    </div>
  );
};

export default Tags;
