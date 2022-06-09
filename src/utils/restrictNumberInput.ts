export function restrictNumberInput(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === 'Backspace' || 'Delete' || 'ArrowLeft' || 'ArrowRight') return;
  return e.key.match(/[^0-9]/g) && e.preventDefault();
  // return ['e', 'E', '+', '-', ',', '.'].includes(e.key) && e.preventDefault()  
}
