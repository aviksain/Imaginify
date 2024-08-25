import React from "react";

type dataType = {
  children: React.ReactNode;
};

function HomeLayout({ children }: dataType) {
  return <div>{children}</div>;
}

export default HomeLayout;
