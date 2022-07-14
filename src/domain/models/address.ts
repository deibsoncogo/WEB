export class Address{
    zipCode?: string
    street?: string
    neighborhood?: string
    city?: string
    state?: string
    number?: string
    complement?: string
    
    constructor(zipCode: string, street: string,
                neighborhood: string, city: string, 
                state: string, number: string, complement: string){

        this.zipCode = zipCode? zipCode: undefined
        this.street = street? street: undefined
        this.neighborhood = neighborhood? neighborhood: undefined
        this.city = city? city: undefined
        this.state = state? state: undefined
        this.number = number? number: undefined
        this.complement = complement? complement: undefined
    }

    hasUndefinedProperty(){
        return  typeof this.zipCode === 'undefined' ||
                typeof this.street === 'undefined' ||
                typeof this.neighborhood === 'undefined' ||
                typeof this.city === 'undefined' ||
                typeof this.state === 'undefined' ||
                typeof this.number === 'undefined' ||
                typeof this.complement === 'undefined'                       
    }

    
    
}