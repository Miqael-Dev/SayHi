import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex w-full h-dvh ">
        <div className="w-1/2"></div>
        <div>{children}</div>
      </div>
    </>
  );
}
