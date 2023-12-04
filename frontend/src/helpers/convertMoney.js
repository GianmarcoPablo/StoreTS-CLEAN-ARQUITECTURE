export const convertMoney = (money) => {
    const formatter = new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 2
    });
    return formatter.format(money);
}