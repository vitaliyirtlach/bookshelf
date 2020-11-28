import { Buffer } from "buffer"

export const fromBufferToImage = (data: Buffer, contentType: string) => {
    const buffer: any = Buffer.from(data).toString("base64")    
    return `data:${contentType};base64,${buffer}` 
}