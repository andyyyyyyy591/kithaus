export function whatsappUrl(productName?: string, size?: string): string {
  const base = 'https://wa.me/13053705703'
  let text = 'Hola, quería consultar por una camiseta de KITHAUS'
  if (productName && size)
    text = `Hola, me interesa la ${productName} en talla ${size}`
  else if (productName)
    text = `Hola, me interesa la ${productName}`
  return `${base}?text=${encodeURIComponent(text)}`
}
