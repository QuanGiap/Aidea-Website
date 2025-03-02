function convertDay(date) {
    const givenDate = new Date(date);
    const currentDate = new Date();
  
    const diffInMilliseconds = currentDate - givenDate;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);
  
    if (diffInYears > 0) return `${diffInYears}y`;
    if (diffInMonths > 0) return `${diffInMonths % 12}M`;
    if (diffInDays > 0) return `${diffInDays % 30}d`;
    if (diffInHours > 0) return `${diffInHours % 24}h`;
    if (diffInMinutes > 0) return `${diffInMinutes % 60}m`;
    return `${diffInSeconds}s`;
  }
  
  export default convertDay;