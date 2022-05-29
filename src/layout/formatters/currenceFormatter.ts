export function currenceMask (value: string) {
    if (!value) {
      return '';
    }        
    return parseFloat(value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }


  export function currenceMaskOnlyValue (value?: string) {
    if (!value) {
      return '';
    }        
    return parseFloat(value).toLocaleString('pt-br', {minimumFractionDigits: 2});
  }
  