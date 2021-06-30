export interface EmailType {
    email: string | string[],
}

export interface PlayerType {
    _id: string,
    no: number,
    name: string,
    img: string
}

export interface ModelPlayerType {
    no: number,
    name: string,
    img: string
}

export interface RatingType {
    _id: string,
    poId: string,
    email: string,
    contents: string,
    rating: number,
    __v?: number,
}

export interface ModelRatingType {
    poId: string,
    email: string,
    contents: string,
    rating: number,
    __v?: number,
}

export interface GradeType {
    _id: string,
    total: number,
    count: number,
}

export interface BoardType {
    players: PlayerType[],
    grades: GradeType[]
}

export interface IdBoardType {
    players: PlayerType,
    ratings: RatingType[]
}

export interface OptionType {
    label: string,
    value: number,
}