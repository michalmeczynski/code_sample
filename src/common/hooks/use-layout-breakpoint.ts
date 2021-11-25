import layoutBreakpointService from "../utils/layout-breakpoint/layout-breakpoint.service";
import useWindowSize from "./use-window-size";

type LayoutBreakpointOutput<T> = T;

type LayoutBreakpointParams<T> = {
    default: T;
    xsmall?: T;
    small?: T;
    mid?: T;
    large?: T;
    xlarge?: T;
    xxlarge?: T;
};
const useLayoutBreakpoint = <T>(
    params: LayoutBreakpointParams<T>
): LayoutBreakpointOutput<T> => {
    const { width } = useWindowSize();

    const breakpoints = layoutBreakpointService.getBreakpoints();

    switch (true) {
        case width > breakpoints.xxlarge: {
            return (
                params.xxlarge ??
                params.xlarge ??
                params.large ??
                params.mid ??
                params.small ??
                params.xsmall ??
                params.default
            );
        }
        case width > breakpoints.xlarge: {
            return (
                params.xlarge ??
                params.large ??
                params.mid ??
                params.small ??
                params.xsmall ??
                params.default
            );
        }
        case width > breakpoints.large: {
            return (
                params.large ??
                params.mid ??
                params.small ??
                params.xsmall ??
                params.default
            );
        }
        case width > breakpoints.mid: {
            return (
                params.mid ?? params.small ?? params.xsmall ?? params.default
            );
        }
        case width > breakpoints.small: {
            return params.small ?? params.xsmall ?? params.default;
        }
        case width > breakpoints.xsmall: {
            return params.xsmall ?? params.default;
        }
        default:
            return params.default;
    }
};

export default useLayoutBreakpoint;
