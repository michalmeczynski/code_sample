import useLayoutBreakpoint from "./use-layout-breakpoint";

const useIsMobile = () => {
    const isMobile = useLayoutBreakpoint<boolean>({
        default: true,
        mid: false,
    });

    return isMobile;
};

export default useIsMobile;
