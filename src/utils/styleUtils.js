export const getAvatarColor = (type) => {
  return type && type.includes('Кардио') ? 'bg-lime-500' : 'bg-fuchsia-500';
};