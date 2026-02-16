
export const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isPalindrome = (str) => {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, ""); 
    const reversed = cleaned.split("").reverse().join("");
    return cleaned === reversed;
};

export const findLongestWord = (sentence) => {
    const words = sentence.split(" ");
    return words.reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
    }, "");
};