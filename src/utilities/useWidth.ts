import { useMediaQuery, useTheme } from "@material-ui/core";

export const useWidth = (): "xs" | "sm" | "md" | "lg" | "xl" => {
    const theme = useTheme();
    const keys = [...theme.breakpoints.keys].reverse();
    return (
        keys.reduce((output: any, key) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || 'xs'
    );
}