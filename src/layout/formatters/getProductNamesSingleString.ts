import { IPartialProductResponse } from './../../interfaces/api-response/productsPartialResponse';
export function getProductNamesSingleString(product: IPartialProductResponse[]) {

    let names = ''
    product.forEach(prod => {
        if(prod.id === product[product.length-1].id){
            names += prod.name            
        }
        else{
            names += prod.name + ','
        }
        
    })

    return names;
   
  }
  