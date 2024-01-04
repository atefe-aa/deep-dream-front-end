import { useLayout } from "../layout/core";
import { ThemeModeComponent } from "../assets/ts/layout";

// export const toAbsoluteUrl = (pathname: string) =>
//   import.meta.env.BASE_URL + pathname;

export const toAbsoluteUrl = (pathname: string) => {
  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + "/";

  const normalizedPathname = pathname.startsWith("/")
    ? pathname.substring(1)
    : pathname;

  return baseUrl + normalizedPathname;
};

export const useIllustrationsPath = (illustrationName: string): string => {
  const { config } = useLayout();

  const extension = illustrationName.substring(
    illustrationName.lastIndexOf("."),
    illustrationName.length
  );
  const illustration =
    ThemeModeComponent.getMode() === "dark"
      ? `${illustrationName.substring(
          0,
          illustrationName.lastIndexOf(".")
        )}-dark`
      : illustrationName.substring(0, illustrationName.lastIndexOf("."));
  return toAbsoluteUrl(
    `/media/illustrations/${config.illustrations?.set}/${illustration}${extension}`
  );
};
