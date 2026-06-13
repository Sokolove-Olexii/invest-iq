export const formatMoney = (amount: number | string) => {
  const num = Number(amount) || 0;
  return num
    .toLocaleString("uk-UA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(",", ".");
};
