"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

function PageWrapper({ children }) {
  return <div className="flex-1 mx-5 md:mx-20 lg:mx-28">{children}</div>;
}

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideHeader =
    pathname?.includes("/dashboard/interview/") &&
    pathname?.includes("/start");

  return (
    <>
      {!hideHeader && <Header />}
      <PageWrapper>{children}</PageWrapper>
    </>
  );
}
