export function getProductErrorMessageCoupon(errorMessage: string) {
  const productName = errorMessage.match(/\((...+)\)/gm)
  const formattedProductName = String(productName)?.replace(/[()]/g, '"')
  return formattedProductName
}
