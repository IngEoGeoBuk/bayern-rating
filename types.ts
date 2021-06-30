export interface emailTypes {
    email: string | string[],
}

export interface playerTypes {
    _id: string,
    no: number,
    name: string,
    img: string
}

export interface modelPlayerTypes {
    no: number,
    name: string,
    img: string
}

export interface ratingTypes {
    _id: string,
    poId: string,
    email: string,
    contents: string,
    rating: number,
    __v?: number,
}

export interface modelRatingTypes {
    poId: string,
    email: string,
    contents: string,
    rating: number,
    __v?: number,
}

export interface gradeTypes {
    _id: string,
    total: number,
    count: number,
}

export interface boardTypes {
    players: playerTypes[],
    grades: gradeTypes[]
}

export interface idBoardTypes {
    players: playerTypes,
    ratings: ratingTypes
}

export interface OptionType {
    label: string,
    value: number,
}