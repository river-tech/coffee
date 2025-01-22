export interface IUserBookCreate {
    name: string;
    email: string;
    numberSitting : string;
    note : string;
}

export interface IUserBookShow{
    id :string;
    name: string;
    email: string;
    note : string;
    numberSitting : string;
    LocalDateTime : string
}