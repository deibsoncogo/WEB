let status = new Map<string, string>();
status.set('pending','Aguardando pagamento')
status.set('paid', 'Pago')
status.set('canceled', 'Cancelado')
status.set('processing', 'Em andamento')
status.set('failed', 'Negado')
status.set('chargedback', 'Reembolsado')

export const getSalesStatus = (statusPagarMe: string) => {

  if(!statusPagarMe)
      return ''
  
  return status.get(statusPagarMe) ?? ''

}