export interface CatType {
    id: string;
    name: string;
    origin: string;
    description: string;
    temperament: string;
    life_span: string;
    adaptability: number;
}

export interface PaginationType {
    page: number;
    limit: number;
    totalItems: number;
}