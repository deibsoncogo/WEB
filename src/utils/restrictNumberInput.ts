export function restrictNumberInput(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === 'Backspace' || e.key === 'Delete' || e.key ==='ArrowLeft' || e.key ==='ArrowRight') return;
  return e.key.match(/[^0-9]/g) && e.preventDefault();
}
