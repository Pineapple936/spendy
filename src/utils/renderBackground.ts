export function renderBackgroud(path: string): string {
    switch(path) {
        case "/income":
            return "background-color-income";
        case "/expense":
            return "background-color-expense";
        default:
            return "background-color-default";
    }
}
