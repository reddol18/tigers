'use client';

import { CMS_NAME } from "@/lib/constants";
import Link from "next/link";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-4 md:mb-12">
      <h1 className="text-2xl md:text-1xl font-bold tracking-tighter leading-tight md:pr-8">
        <Link href="/">먼데이 타이거즈</Link>
      </h1>
      <h4 className="text-sm md:text-1xl text-center md:text-left mt-5 md:pl-8">
        월요일에 찾아오는 기아 타이거즈 기록 이야기
      </h4>
    </section>
  );
}
