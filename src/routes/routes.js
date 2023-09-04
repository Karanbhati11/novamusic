import React from "react";

const SearchComponent = React.lazy(() =>
  import("../components/SearchComponent")
);

const PlaylistComponent = React.lazy(() =>
  import("../components/PlaylistComponent")
);

const Export = React.lazy(() => import("../components/Export"));
const PlaylistDetails = React.lazy(() =>
  import("../components/PlaylistDetails")
);
const Download = React.lazy(() => import("../components/Download"));


export const RoutesJson = [
  {
    path: "/",
    element: <SearchComponent />,
  },
  {
    path: `/playlist/:playlist`,
    element: <PlaylistDetails />,
  },
  {
    path: "/playlist",
    element: <PlaylistComponent />,
  },
  {
    path: "/Export",
    element: <Export />,
  },
  {
    path: "/test",
    element: <Download />,
  },
];
