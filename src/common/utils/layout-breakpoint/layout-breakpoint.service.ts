class LayoutBreakPointService {
    getBreakpoints() {
        const breakpoints = {
            xsmall: 400,
            small: 480,
            mid: 768,
            large: 992,
            xlarge: 1200,
            xxlarge: 1600,
        };

        return breakpoints;
    }
}

export default new LayoutBreakPointService();
