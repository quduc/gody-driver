export interface GoogleDistanceResponse {
    __typename: 'GoogleDistanceResponse';
    status: string;
    error_message: string;
    rows: [
        {
            elements: [
                {
                    distance: {
                        text: string;
                        value: number;
                    },
                    duration: {
                        text: string;
                        value: number;
                    },
                    status: string;
                }
            ]
        }
    ]
}

export interface Auth {
    __typename: "Auth";
    token: string;
    expires_in: number;
}
export interface DrawerItemProps {
    id: number;
    icon: any;
    name: string;
    screen: string
}

export interface CarService {
    id: number;
    image: any;
    name: string;
    type: number;  //1 : economy *** 2: primium *** 3: Luxury
    description: string;
    price: number;
    seats: number;
    time?: string;
}
export interface LocationGeometry {
    lat: number; //latitude
    lng: number; //longitude
}
export interface Location {
    location: LocationGeometry;
    description: string;
}


export interface ObjectResponse<T> {
    __typename: 'ObjectResponse';
    result: T
}
export interface BaseResponse {
    __typename: "BaseResponse";
}

export interface ErrorResponse {
    __typename: "ErrorResponse";
    error: string;
};

//user default payment
export interface PaymentMethod {
    id?: number;
    type?: number; // 1: gody cash, 2: card
    name?: string;
    balance?: number
}

export interface Transport {
    __typename: 'Transport';
    profile: string;
    images: string;
    isVerified: boolean;
    isActive: boolean;
    _id: string;
    brand: string;
    vehicle: string;
    registrationPlate: string;
    color: string;
    numberOfSeats: number;
    type: string;
}
export interface User {
    __typename: 'User';
    _id: string;
    phone: string;
    name: string;
    isActive: boolean;
    role: {
        name: string;
        code: string;
    };
    transport?: Transport;
    email: string;
    profileImage: string;
    isVerified: boolean;
}

export interface DriverLocation {
    __typename: 'UserLocation';
    driver?: User;
    location: {
        coordinates: any,
        type: string;
    }
    _id: string;

}

export interface IPromotionCodeItem {
    id: number;
    promoteCode: string;
    fee: number
}

export interface PaymentOption {
    paymentType?: string;
    paymentAmount?: number;
    cardId?: string;
    cardInfo?: string;
}
export interface Booking {
    origin: Location;
    destination: Location;
    fare?: number;
    distance: any;
    duration: any;
    car_service: CarService;
    nearByDrivers?: DriverLocation[];
    defaultFare: number;
    promotionCode?: IPromotionCodeItem;
    paymentOption?: PaymentOption
}