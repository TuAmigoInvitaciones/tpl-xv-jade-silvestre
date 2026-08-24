export interface Ticket {
    id: string,
    name: string,
    adultsQuantity: number,
    adultsCounter: number,
    kidsQuantity: number,
    kidsCounter: number,
    qrCode: string,
    phone: string,
    keyPass: string,
    isActive: boolean,
    event: string,
    user: string,
    table: string
}