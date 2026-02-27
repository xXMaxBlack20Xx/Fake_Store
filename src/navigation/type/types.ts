import type { NavigatorScreenParams } from "@react-navigation/native";

export type HomeTabsParamList = {
    HomeTabs: undefined;
    Cart: undefined;
    Profile: undefined
    Settings: undefined;
};

export type MainStackParamList = {
    HomeTabs: NavigatorScreenParams<HomeTabsParamList>;
    Search: undefined;
    Details: undefined;
    About: undefined;
    Checkout: undefined;
    // Para que pueda navegar a Profile desde el Drawer (si Profile no está dentro de HomeTabs):
    Profile: undefined;
};

export type RootDrawerParamList = {
    MainStack: NavigatorScreenParams<MainStackParamList>;
};