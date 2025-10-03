import type { EColorMode, TColor } from "./color";
import type { EFontWeight } from "./settings/values";

type TLimitedColor = Extract<TColor, { mode: EColorMode.AUTO } | { mode: EColorMode.BASE }>;

export type TTabsHorizontalAlignment = "left" | "center" | "right";

export enum EHeightMode {
  FIXED = "FIXED",
  PERCENT = "PERCENT",
}

export interface IGradient {
  startColor: string;
  endColor: string;
}

export type TPaletteColor =
  | Extract<TColor, { mode: EColorMode.AUTO }>
  | { mode: EColorMode.BASE; values: string[] };

export type TGradientColor =
  | Extract<TColor, { mode: EColorMode.AUTO }>
  | { mode: EColorMode.BASE; values: IGradient[] };

// TODO: сделать все поля необязательными на основе исследования BI-15223 [BI-15065]
export interface ITheme {
  apiVersion: string;
  maxWidth?: number;
  dividersHeight: {
    mode: EHeightMode;
    value?: number;
  };
  backgroundColor: string;
  backgroundInEdit: boolean;
  spacing: boolean;
  widgets: {
    color: string;
    paddings: number | string;
    cornerRadius: number | undefined;
    titleColor: TLimitedColor;
    titleSize: number;
    titleWeight: EFontWeight;
    textColor: TLimitedColor;
    textSize: number;
    axesColor: TLimitedColor;
    guideLinesColor: TLimitedColor;
    chartsPalette: TPaletteColor;
    gradientsSet: TGradientColor;
    buttons: {
      primary: {
        color: TLimitedColor;
        textColor: TLimitedColor;
      };
      primaryOutlined: {
        borderColor: TLimitedColor;
        textColor: TLimitedColor;
      };
      link: {
        textColor: TLimitedColor;
      };
    };
    tables: {
      header: {
        color: TLimitedColor;
        textWeight: EFontWeight;
        textColor: TLimitedColor;
      };
      total: {
        color: TLimitedColor;
        textWeight: EFontWeight;
        textColor: TLimitedColor;
      };
    };
  };
  tabs: {
    textSize: number;
    activeTabColor: TLimitedColor;
    alignment: TTabsHorizontalAlignment;
    likeViewBackground: boolean;
  };
  hoverColor: TLimitedColor;
}
