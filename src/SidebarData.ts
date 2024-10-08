type Replace<
  TO_REPLACE extends string,
  OLD extends string,
  NEW extends string,
  ANSWER extends string = ""
> = TO_REPLACE extends `${infer LEFT}${OLD}${infer RIGHT}`
  ? Replace<RIGHT, OLD, NEW, `${ANSWER}${LEFT}${NEW}`>
  : `${ANSWER}${TO_REPLACE}`;

export const SIDEBAR_PAGES_TITLES = [
  "WEBION DOCS INTRO",
  "HOW TO USE",
  "FRONTEND",
  "BACKEND",
  "DESIGN",
] as const;

export type SidebarPageTitle = (typeof SIDEBAR_PAGES_TITLES)[number];
export type SidebarPageKey = Uppercase<Replace<SidebarPageTitle, " ", "_">>;
export type SidebarPageData = {
  title: SidebarPageTitle;
  position: number;
};

export const SIDEBAR: Record<SidebarPageKey, SidebarPageData> =
  SIDEBAR_PAGES_TITLES.reduce((acc, page, index) => {
    const pageKey = page.replace(/ /g, "_");

    acc[pageKey] = {
      title: page,
      position: (index + 1) * 100,
    };
    return acc;
  }, {} as Record<SidebarPageKey, SidebarPageData>);
