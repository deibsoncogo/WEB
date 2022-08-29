let statusTransaction = new Map<string, string>([
  ['pending', 'Aguardando pagamento'],
  ['paid', 'Pago'],
  ['canceled', 'Cancelado'],
  ['processing', 'Em andamento'],
  ['failed', 'Negado'],
  ['chargedback', 'Reembolsado'],
])

export const getSalesStatus = (statusPagarMe: string) => {
  if (!statusPagarMe) return ''

  return statusTransaction .get(statusPagarMe) ?? ''
}
