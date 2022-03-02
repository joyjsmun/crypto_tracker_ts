import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme{
        textColor:string;
        bgColor:string;
        accentColor:string;

        lightBgColor:string;
        lightTextColor: string;
        lightAccentColor: string;
    }
}