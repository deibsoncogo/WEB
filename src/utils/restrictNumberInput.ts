enum allowedKeys {
  Backspace = 'Backspace',
  Delete = 'Delete',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp'
}

export function restrictNumberInput(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key in allowedKeys) return;
  return e.key.match(/[^0-9]/g) && e.preventDefault();
}
