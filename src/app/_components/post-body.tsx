'use client';

import cn from "classnames";
import {truncateText} from "@/app/utils/truncate-text";

type Props = {
  content: string;
  maxLength?: number;
  on_mobile: boolean;
};

export function PostBody({ content, maxLength = 200, on_mobile }: Props) {
    const truncated = truncateText(content, on_mobile == true ? 110 : maxLength);

    return (
        <p className={cn("leading-relaxed mb-2 justify-end", {
                "text-xs xl:hidden": on_mobile,
                "text-sm hidden xl:flex": !on_mobile,
            })}>{truncated}</p>
  );
}
