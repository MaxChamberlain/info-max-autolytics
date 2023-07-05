export function getPriceDropByDays (e: any[]): any {
  const priceDropByDays = []
  for (let i = 0; i <= 55; i += 5) {
    const filteredCars = e.filter((x) => {
      if (x.data.vehicle.v_days === undefined || x.data.vehicle.v_start_price === undefined || x.data.vehicle.v_sell_price === undefined) return false
      if (String(x.data.vehicle.v_days) == '0' || String(x.data.vehicle.v_start_price) == '0' || String(x.data.vehicle.v_sell_price) == '0') return false
      if (parseInt(String(x.data.vehicle.v_start_price)) === parseInt(String(x.data.vehicle.v_sell_price))) return false
      else if (parseInt(x.data.vehicle.v_days) >= i + 1 && parseInt(x.data.vehicle.v_days) <= i + 5) return true
      return false
    })
    const vehicles =
      filteredCars.length > 0
        ? filteredCars.reduce(
          (a, b) =>
            a +
            (parseInt(b.data.vehicle.v_start_price) -
              parseInt(b.data.vehicle.v_sell_price)),
          0
        ) / filteredCars.length
        : 0
    priceDropByDays.push({
      ageRange: (i + 1).toString() + '-' + (i + 5).toString(),
      priceDropForAge: parseInt(vehicles?.toString()),
      countOfDroppedVehicles: parseInt(filteredCars.length.toFixed(0)),
      cumulativePriceDropToAge: parseInt(
        filteredCars.reduce((a, b) => a + parseInt(b.data.vehicle.v_start_price) - parseInt(b.data.vehicle.v_sell_price), 0).toString()
      )
    })
  }
  const overSixtyDays = e.filter((x) => {
    if (x.data.vehicle.v_days === undefined || x.data.vehicle.v_start_price === undefined || x.data.vehicle.v_sell_price === undefined) return false
      if(x.data.vehicle.v_days == '0' || x.data.vehicle.v_start_price == '0' || x.data.vehicle.v_sell_price == '0') return false
      if (x.data.vehicle.v_start_price === x.data.vehicle.v_sell_price) return false
      else if (parseInt(x.data.vehicle.v_days) > 60) return true
    return false
  })
  priceDropByDays.push({
    ageRange: '61+',
    priceDropForAge: overSixtyDays.length > 0
        ? overSixtyDays
          .reduce(
            (a, b) =>
              a +
              (parseInt(b.data.vehicle.v_start_price) -
                parseInt(b.data.vehicle.v_sell_price)),
            0
          ) /
        overSixtyDays.length
        : 0,
        countOfDroppedVehicles: parseInt(overSixtyDays.length.toFixed(0)),
        cumulativePriceDropToAge: overSixtyDays.reduce((a, b) => a + parseInt(b.data.vehicle.v_start_price) - parseInt(b.data.vehicle.v_sell_price), 0)
  })
  return priceDropByDays
}