
//distance and duration get from API Google Distance
//its include text and value

export const calculateFare = (distance: any, duration: any) => {
    const distanceInKm = distance.value * 0.001;
    const durationInMinutes = duration.value / 60;
    let totalFare = 0;
    if (distanceInKm <= 2) {
        totalFare = 1.5 + durationInMinutes * (1 / 23);
    }
    if (distanceInKm > 2) {
        totalFare = 1.5 + durationInMinutes * (1 / 23) + 0.75 * (distanceInKm - 2);
    }
    return Math.round(totalFare);
}


export const rewriteVisa = (input: string) => {
    const x = 'xxxx';
    input = input.replace(' ', '');
    const inputLength = input.length;
    // if(inputLength < 4) {
    //     return input + x.substring(inputLength, 4) + ' xxxx xxxx xxxx';
    // } else if(inputLength < 8) {
    //     return input.substring(0,4) + ' ' + input.substring(3, inputLength) + x.substring(inputLength - 3, 4) + ' xxxx xxxx';
    // } else if(inputLength < 12) {
    //     return input.substring(0,4) + ' ' + input.substring(3, 7) + ' ' + input.substring(7, inputLength) + x.substring(inputLength - 7, 4) + ' xxxx';
    // } else if (inputLength < 16) {
    //     return  input.substring(0,4) + ' ' +  input.substring(3, 7) + ' ' +  input.substring(7, 11) + ' ' +  input.substring(11, inputLength) + x.substring(inputLength - 11, 4);
    // } else {
    //     return null;
    // }
    if (inputLength === 16) {
        return  input.substring(0,4) + ' ' +  input.substring(3, 7) + ' ' +  input.substring(7, 11) + ' ' +  input.substring(11, 15);
    }
}
export const rewriteDate = (input:string) => {
    input = input.replace('/', '');
    const inputLength = input.length;
    // if(inputLength == 2) {
    //     return input + '/' + 'YY';
    // }else 
    if (inputLength == 4) {
        return input.substring(0, 2) + '/' + input.substring(2);
    }
}