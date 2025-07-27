import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <div className="py-1 pb-2 my-2 mb-4 flex flex-col lg:flex-row items-center">
        <h3 className="px-2 text-xs lg:text-[1.0rem] lg:font-bold tracking-tighter leading-tight text-center lg:text-left mb-2 lg:mb-0 lg:pr-4 lg:w-1/2">
          문의사항 및 기능요청은 GitHub 게시판에 남겨주세요
        </h3>
        <div className="flex flex-col text-right lg:pl-4 lg:w-1/2 text-sm">
          <a
              href={`https://github.com/reddol18/tigers`}
              className="mx-3 font-bold hover:underline"
          >
            GitHub 방문하기
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
