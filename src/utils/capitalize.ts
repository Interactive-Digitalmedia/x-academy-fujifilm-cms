export default function capitalizeAllFirstLetters(input: string): string {
  if (!input) return '' // Handle empty input

  // Split the input string into words
  const words = input.split(' ')

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    if (!word) return '' // Handle empty word
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  // Join the capitalized words back into a single string
  return capitalizedWords.join(' ')
}
