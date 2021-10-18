import { DriverLocation, Location } from './types';

export const origin: Location = {
    "location": {
        "lat": 16.7504698,
        "lng": 107.1892962
    },
    "description": "Trường THPT thị xã Quảng Trị"
}

export const destination: Location = {
    "location": {
        "lat": 16.81925,
        "lng": 107.1892962
    },
    "description": "Khách sạn Mường Thanh Đông Hà"
}

export const locationTracking1: Location = {
    "location": {
        "lat": 16.7879421,
        "lng": 107.1356953
    },
    "description": "Điện nước Nguyễn Sơn"
}

export const locationTracking2: Location = {
    "location": {
        "lat": 16.8069395,
        "lng": 107.1178581
    },
    "description": "Bến xe khách Đông Hà"
}
export const nearByDrivers: DriverLocation[] = [
    {
        "__typename": "UserLocation",
        "location": {
            "type": "Point",
            "coordinates": [
                107.1892962,
                16.7497301
            ]
        },
        "_id": "612daa48f887a2301c9fbfc2"
    },
    {
        "__typename": "UserLocation",
        "location": {
            "type": "Point",
            "coordinates": [
                107.1892962,
                16.7504698
            ]
        },
        "_id": "612daa48f887a2301c9fbfc3"
    },
    {
        "__typename": "UserLocation",
        "location": {
            "type": "Point",
            "coordinates": [
                107.1892962,
                16.7504698
            ]
        },
        "_id": "612daa48f887a2301c9fbfc4"
    },
]