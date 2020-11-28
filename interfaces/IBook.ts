export interface IBook {
    author: string
    name: string
    id: string
    cover: {
        data: Buffer
        contentType: string
    }
    plot: string
}