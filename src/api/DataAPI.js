export const getData = async () => {
    const response = await fetch('/data/data.json');
    const result = await response.json();
    return result.transactions;
}
