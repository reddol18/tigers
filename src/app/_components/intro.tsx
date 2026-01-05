'use client';

import Link from "next/link";
import Image from "next/image";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-4 md:mb-4">
      <h1
        className="font-bold tracking-tighter leading-tight md:pr-8"
        style={{ fontSize: '1.8rem' }}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/favicon.ico"
            alt="먼데이 타이거즈 로고"
            width={48}
            height={48}
            className="h-12 w-12"
            priority
          />
          <span className="text-red-600">MONDAY TIGERS</span>
        </Link>
      </h1>
      <h4 className="text-sm md:text-1xl text-center md:text-left mt-5 md:pl-8 text-gray-500 tracking-[-0.05em]">
        월요일에 찾아오는 기아 타이거즈 기록 이야기
      </h4>
    </section>
  );
}
