export const getPace = (
  dateRange: { startDate: Date, endDate: Date },
  docs: any[],
  adjustments?: any[]
): { pace: number, avg: number, margin: number } => {
  // Count of documents excluding "rollback" duplicates
  const countOfDocs = docs.length - (docs.filter(e => e.rollback).length * 2)

  // Sum of the margins for all valid documents
  let sumOfMargins = docs.reduce((a, b) => {
    if (b?.data?.vehicle?.v_margin === undefined) return a
    return a + parseInt(b.data.vehicle.v_margin.toString())
  }, 0)

  // Array of working days in uppercase
  let workingDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  // Set of working days between start and end ranges to use for counting total work days
  const workingDaysByName = new Set()
  let countOfDays = 0
  for (let i = new Date(dateRange.startDate); i <= new Date(dateRange.endDate); i.setDate(i.getDate() + 1)) {
    workingDaysByName.add(i.toLocaleString('en-US', { weekday: 'long' }))
    if (workingDays.includes(i.toLocaleString('en-US', { weekday: 'long' }))) {
      countOfDays++
    }
  }

  // Get the first and last dates of the month of startDate and endDate respectively
  const beginDate = new Date(new Date(dateRange.startDate).getFullYear(), new Date(dateRange.startDate).getMonth(), 1)
  const lastDate = new Date(new Date(dateRange.endDate).getFullYear(), new Date(dateRange.endDate).getMonth() + 1, 0)

  // Calculate the total number of working days for the month
  let countOfDaysInMonth = 0

  // eslint-disable-next-line no-unmodified-loop-condition
  for (let i = beginDate; i <= lastDate; i.setDate(i.getDate() + 1)) {
    if (
      workingDays.includes(i.toLocaleString('en-US', { weekday: 'long' }))
    ) {
      countOfDaysInMonth++
    }
  }

  if(adjustments !== undefined){
    adjustments.forEach(adjustment => {
      sumOfMargins += parseInt(adjustment.adjustment_value.toString())
    })
  }

  // Calculate and return final values
  return {
    pace: (countOfDocs / countOfDays) * countOfDaysInMonth,
    avg: countOfDocs / countOfDays,
    margin: (sumOfMargins / countOfDays) * countOfDaysInMonth
  }
}

