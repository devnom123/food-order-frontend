export type User = {
    _id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    auth0Id: string;
    email: string;
}

export type Restaurant = {
    _id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    deliveryFee: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    image: string;
    lastUpdated: string;
}

export type MenuItem = {
    _id: string;
    name: string;
    price: number;
}