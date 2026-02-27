import * as ExpoLinking from "expo-linking";
import type { LinkingOptions } from "@react-navigation/native";
import type { RootDrawerParamList } from "../type/types";

export const linking: LinkingOptions<RootDrawerParamList> = {
    prefixes: [ExpoLinking.createURL("/"), "myapp://", "https://myapp.com"],
    config: {
        screens: {
            MainStack: {
                screens: {
                    Home: {
                        screens: {
                            Home: "home",
                            Cart: "cart",
                            Profile: "profile",
                            Settings: "settings",
                        },
                    },
                    Details: "details/:from?",
                    About: "about",
                },
            },
        },
    },
};