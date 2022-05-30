export class Address{
    zipCode: string
    street: string
    neighborhood: string
    city: string
    state: string
    number: string
    complement: string
    
    constructor(zipCode: string, street: string,
                neighborhood: string, city: string, 
                state: string, number: string, complement: string){

        this.zipCode = zipCode
        this.street = street
        this.neighborhood = neighborhood
        this.city = city
        this.state = city
        this.number = number
        this.complement = complement
    }
    
}