import { AlertMessages } from "./AlertMessages";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type PageChromeProps = {
  children: React.ReactNode;
  searchParams?: {
    success?: string | string[];
    error?: string | string[];
    warning?: string | string[];
  };
};

export async function PageChrome({ children, searchParams }: PageChromeProps) {
  return (
    <>
      <SiteHeader />
      <AlertMessages success={searchParams?.success} error={searchParams?.error} warning={searchParams?.warning} />
      <main className="w-full">{children}</main>
      <SiteFooter />
    </>
  );
}
