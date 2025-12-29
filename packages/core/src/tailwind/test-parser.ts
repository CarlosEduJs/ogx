import { parseTailwind } from "./index";

const tw = "mt-10 gap-6 justify-center items-center flex-row flex-wrap";
const theme = {};
const styles = parseTailwind(tw, theme);

console.log("Input TW:", tw);
console.log("Resulting Styles:", JSON.stringify(styles, null, 2));

const gapX = parseTailwind("gap-x-4", theme);
console.log("gap-x-4:", JSON.stringify(gapX, null, 2));

const gapY = parseTailwind("gap-y-4", theme);
console.log("gap-y-4:", JSON.stringify(gapY, null, 2));
