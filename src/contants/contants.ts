import { Dimensions } from 'react-native';
import { CarService } from '../types';
const constants: any = {
    widthDevice: Dimensions.get('window').width,
    heightDevice: Dimensions.get('window').height,
    distanceMatrixKeyAPI: 'AIzaSyC0lBsitLYwj0O_m7jcg_JYPEEQkrzD9_k',
    googlePlacesAutoCompleteKeyAPI: '',
    directionKeyAPI: 'AIzaSyDcGCyzR6Q5Ae6AL4udqQqqU7UAzOhIezQ',


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