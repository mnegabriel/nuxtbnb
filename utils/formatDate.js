export default dateStr => {
    let date = new Date(dateStr);
    return date.toLocaleString(undefined, {
        month: "long",
        year: "numeric"
    });
};
