const KEY = 'products'
export function getCart(){
  try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] }
}
export function addToCart(item){
  const products = getCart()
  products.push(item)
  localStorage.setItem(KEY, JSON.stringify(products))
  // notify other tabs/components
  window.dispatchEvent(new StorageEvent('storage', { key: KEY }))
}
export function removeFromCart(code){
  const products = getCart().filter(p => String(p.code) !== String(code))
  localStorage.setItem(KEY, JSON.stringify(products))
  window.dispatchEvent(new StorageEvent('storage', { key: KEY }))
}
export function clearCart(){
  localStorage.removeItem(KEY)
  window.dispatchEvent(new StorageEvent('storage', { key: KEY }))
}
