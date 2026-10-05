export const ATELIER_PHONE = "33142680000"

export function getWhatsAppInquiryUrl(
  productName?: string,
  size?: string,
  price?: number | string,
) {
  let message = "Hello NOIRÉ Atelier, I would like personal consultation regarding your Autumn/Winter collection."
  if (productName) {
    const formattedPrice =
      typeof price === "number" ? `$${price.toLocaleString()}` : price
    const sizePart = size ? ` in size ${size}` : ""
    const pricePart = formattedPrice ? ` (${formattedPrice})` : ""
    message = `Hello NOIRÉ Atelier, I would like to inquire about ordering the ${productName}${sizePart}${pricePart}. Could you please confirm availability and fitting?`
  }
  return `https://wa.me/${ATELIER_PHONE}?text=${encodeURIComponent(message)}`
}

export function getGeneralWhatsAppUrl() {
  return `https://wa.me/${ATELIER_PHONE}?text=${encodeURIComponent(
    "Hello NOIRÉ Atelier, I would like to connect with a personal stylist and concierge."
  )}`
}
