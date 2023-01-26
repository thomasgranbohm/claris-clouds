import variables from "styles/exports.module.scss";

const getGutter = (m: number = 1) => m * parseInt(variables.gutter);

export default getGutter;
