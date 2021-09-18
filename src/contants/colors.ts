import { string } from "prop-types";

export interface ColorMap {
    background: string;
    primary1 : string;
    primary2: string;
    neutral1 : string;
    neutral2 : string;
    neutral3 : string;
    neutral4 : string;
    sematic: string;
    white : string;
    black : string;
}
export const colors : ColorMap = {
    background : '#FFFFFF',
    primary1 : '#F3B823',
    primary2 : '#FFA000',
    neutral1: '#242A37',
    neutral2: '#959595',
    neutral3 : '#BDBDBD',
    neutral4 : '#F3F3F3',
    sematic: '#FF3838',
    black : '#000000',
    white : '#FFFFFF',
}