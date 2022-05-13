import { IAddressResponse } from "../../interfaces/api-response/addressResponse";

export function addressMask (value: IAddressResponse) {
    let address:string = ''
    if (!value) {
      return '';
    }
    if (value.street){
        address += value.street
    }
    if (value.number){
        address += ', '+value.number
    }
    if (value.neighborhood){
        address += ', '+value.neighborhood
    }
    if (value.city){
        address += ', '+value.city
    }

    return address;
    
    
  }
  