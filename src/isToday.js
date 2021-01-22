const isTodayFn = (someDateString) => {
    const someDate = new Date(Date.parse(someDateString));
    const today = new Date()
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }
  
export default isTodayFn;