export const getDate = (date) => {
    const d = new Date(date);
    // const day = d.getDay()
    // const month = d.getMonth()
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = weekday[d.getDay()]

    return `${day} ${hours}:${minutes} ${ampm}`;
}