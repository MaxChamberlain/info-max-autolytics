export const properText = (text: string) => {
  if(text == null) return '';
  text = text.split(/(?=[A-Z])/).join(' ')
  text = text?.toLowerCase()?.split(' ')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ')
  return text;
}

export const properNumber = (number: number) => {
  if(number == null) return 0;
  return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}