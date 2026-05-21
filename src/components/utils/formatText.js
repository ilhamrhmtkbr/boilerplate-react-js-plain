/**
 * formatText.js
 * Utilitas untuk merapikan teks dari format snake_case atau kebab-case
 * Contoh: "total_penjualan_harian" -> "Total Penjualan Harian"
 */

export const removeUnderscoreAndCapitalize = (str) => {
    if (!str || typeof str !== 'string') return ''

    return str
        .replace(/[_-]/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
}

export const capitalizeFirstOnly = (str) => {
    if (!str) return ''
    const cleanStr = str.replace(/[_-]/g, ' ')
    return cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1).toLowerCase()
}
