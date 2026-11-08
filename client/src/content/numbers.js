// numbers(3) -> [1, 2, 3]
// The dashboard saves repeated items with a number in the name (value1, value2, value3 ...),
// so the content files use this to build those names in a loop.
export const numbers = (count) => Array.from({ length: count }, (_, i) => i + 1);
