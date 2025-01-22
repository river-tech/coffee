export  interface IDrinkCreate  {
    name: string;
    description: string;
    price: number;
}

export interface IDrinkShow {
    name: string;
    description: string;
    price: number;
}

export interface IDrinkEdit {
    name: string;
    description: string;
    price: number;
}

export interface IMenu {
    name: string;
    description: string;
    price: number;
    img: string;
}
