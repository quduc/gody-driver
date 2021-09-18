import { DriverLocation, Location } from './types';

export const origin: Location = {
    "location": {
        "lat": 20.9808164,
        "lng": 105.7940398
    },
    "description": "Học viện Kỹ thuật mật mã"
}

export const destination: Location = {
    "location": {
        "lat": 21.0291669,
        "lng": 105.7762636
    },
    "description": "Bến xe Mỹ Đình"
}
export const nearByDrivers: DriverLocation[] = [
    {
        "__typename": "UserLocation",
        "location": {
            "type": "Point",
            "coordinates": [
                105.7958238,
                20.9793397
            ]
        },
        "_id": "612daa48f887a2301c9fbfc2"
    },
]