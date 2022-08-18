import { IPartialProductResponse } from './../../interfaces/api-response/productsPartialResponse';
export function getProductNamesSingleString(product: IPartialProductResponse[]) {

    let names = ''
    product.forEach(prod => {
        if(prod === product[product.length-1]) {
            names += prod.name
        }
        else{
            names += prod.name + ', ' 
        }               
    })
    return names
   
  }
  