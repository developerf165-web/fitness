/**
 * Calculates the total price for a single cart item including discounts.
 * @param {object} item - The cart item with price, qty, and discount.
 * @returns {number} The calculated subtotal for the item.
 */
export const calculateItemTotal = (item) => {
    const subtotal = item.price * item.qty;
    const discountAmount = item.discount ? (subtotal * item.discount) / 100 : 0;
    return subtotal - discountAmount;
};

/**
 * Calculates the total amount for the entire cart.
 * @param {Array} items - Array of cart items.
 * @returns {number} The total cart amount.
 */
export const calculateCartTotal = (items) => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
};

/**
 * Calculates the loyalty bonus based on the total amount and tier percentage.
 * @param {number} totalAmount - The total amount of the cart.
 * @param {number} percentage - The bonus percentage (default 5 for Bronze).
 * @returns {number} The calculated bonus amount.
 */
export const calculateBonus = (totalAmount, percentage = 5) => {
    return (totalAmount * percentage) / 100;
};
