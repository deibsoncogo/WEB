export function currenceMask (value: string) {
    if (!value) {
      return '';
    }        
    return parseFloat(value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }
  