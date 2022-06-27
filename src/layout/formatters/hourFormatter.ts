export function HourMask(hour: string) {  
    if (!hour) {
      return '';
    }  

    
    const hourSplitted =  hour.split(":")    
    return hourSplitted[0] + 'h:' + hourSplitted[1]
  }
  