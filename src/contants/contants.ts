import { Dimensions } from 'react-native';
import { CarService } from '../types';
const constants: any = {
    widthDevice: Dimensions.get('window').width,
    heightDevice: Dimensions.get('window').height,
    distanceMatrixKeyAPI: 'AIzaSyDt_cKzyrJNtTcTmUdoOQ98vLjKwWYdyDc',
    googlePlacesAutoCompleteKeyAPI: '',
    directionKeyAPI: 'AIzaSyDt_cKzyrJNtTcTmUdoOQ98vLjKwWYdyDc',


}
export const carServices: CarService[] = [
    {
        "id": 1,
        "type": 1,
        "name": "GodyX",
        "description": "Affordable rides, all to yourself",
        "image": require('../resources/images/godyX.png'),
        "price": 25,
        "seats": 4,
        "time": "1-4 min"
    },
    {
        "id": 2,
        "type": 2,
        "name": "GodyPremium",
        "description": "Affordable rides, all to yourself",
        "image": require('../resources/images/godyPremium.png'),
        "price": 35,
        "seats": 4,
        "time": "1-4 min"
    },
    {
        "id": 3,
        "type": 3,
        "name": "GodyLuxury",
        "description": "Affordable rides, all to yourself",
        "image": require('../resources/images/godyLuxury.png'),
        "price": 25,
        "seats": 4,
        "time": "1-4 min"
    }
]
export default constants;