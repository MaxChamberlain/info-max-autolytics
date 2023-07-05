export const handleCarGurusChart = (e: any[]) => {
  let totalCarGurus = 0;
  let carg_options = {
  greatPrice: 0,
  goodPrice: 0,
  fairPrice: 0,
  highPrice: 0,
  overPrice: 0
  };
  let countWithCarGurusAndMargin = 0;

  for(let i = 0; i < e.length; i++) {
      let currCargOptions = e[i].data.vehicle.v_final_carg_h_options
      if(!e[i].data.vehicle.v_sell_price) continue
      if(isNaN(parseInt(e[i].data.vehicle.v_sell_price?.toString()))) continue
      if(parseInt(e[i].data.vehicle.v_sell_price) === 0) continue
      if(e[i].rollback) continue
      if(!e[i].data.vehicle.v_final_carg_h) continue
      if(isNaN(parseInt(e[i].data.vehicle.v_final_carg_h?.toString()))) continue
      if(parseInt(e[i].data.vehicle.v_final_carg_h) === 0) continue
      if(!currCargOptions) continue
      if(!currCargOptions.greatPrice) continue
      if(!currCargOptions.goodPrice) continue
      if(!currCargOptions.fairPrice) continue
      if(!currCargOptions.highPrice) continue
      if(!currCargOptions.overPrice) continue
      if(isNaN(parseInt(currCargOptions.greatPrice?.toString()))) continue
      if(isNaN(parseInt(currCargOptions.goodPrice?.toString()))) continue
      if(isNaN(parseInt(currCargOptions.fairPrice?.toString()))) continue
      if(isNaN(parseInt(currCargOptions.highPrice?.toString()))) continue
      if(isNaN(parseInt(currCargOptions.overPrice?.toString()))) continue
      if(parseInt(currCargOptions.greatPrice) === 0) continue
      if(parseInt(currCargOptions.goodPrice) === 0) continue
      if(parseInt(currCargOptions.fairPrice) === 0) continue
      if(parseInt(currCargOptions.highPrice) === 0) continue
      if(parseInt(currCargOptions.overPrice) === 0) continue

      carg_options.greatPrice += parseInt(currCargOptions.greatPrice.toString())
      carg_options.goodPrice += parseInt(currCargOptions.goodPrice.toString())
      carg_options.fairPrice += parseInt(currCargOptions.fairPrice.toString())
      carg_options.highPrice += parseInt(currCargOptions.highPrice.toString())
      carg_options.overPrice += parseInt(currCargOptions.overPrice.toString())
      totalCarGurus += parseInt(e[i].data.vehicle.v_final_carg_h.toString())
      countWithCarGurusAndMargin++
  }
  
  let closestCargOption = 0
  let closestCargOptionName = ""
  let nextHighestCargOption = 0
  let nextHighestCargOptionName = ""
  let spacingLeft={
      amount: 0,
      precisionModifier: 0
  }

  if(countWithCarGurusAndMargin > 0) {
      let tempCompareLow1 = totalCarGurus - carg_options.greatPrice
      let tempCompareLow2 = totalCarGurus - carg_options.goodPrice
      let tempCompareLow3 = totalCarGurus - carg_options.fairPrice
      let tempCompareLow4 = totalCarGurus - carg_options.highPrice
      let tempCompareLow5 = totalCarGurus - carg_options.overPrice

      if(tempCompareLow5 > 0){
          closestCargOption = carg_options.overPrice
          closestCargOptionName = "Over Price"
          nextHighestCargOption = 0
          spacingLeft.amount = 100
      } else if (tempCompareLow4 > 0) {
          closestCargOption = carg_options.highPrice
          closestCargOptionName = "High Price"
          nextHighestCargOption = carg_options.overPrice
          nextHighestCargOptionName = "Over Price"
          spacingLeft.amount = 75
      } else if (tempCompareLow3 > 0) {
          closestCargOption = carg_options.fairPrice
          closestCargOptionName = "Fair Price"
          nextHighestCargOption = carg_options.highPrice
          nextHighestCargOptionName = "High Price"
          spacingLeft.amount = 50
      } else if (tempCompareLow2 > 0) {
          closestCargOption = carg_options.goodPrice
          closestCargOptionName = "Good Price"
          nextHighestCargOption = carg_options.fairPrice
          nextHighestCargOptionName = "Fair Price"
          spacingLeft.amount = 25
      } else if (tempCompareLow1 > 0) {
          closestCargOption = carg_options.greatPrice
          closestCargOptionName = "Great Price"
          nextHighestCargOption = carg_options.goodPrice
          nextHighestCargOptionName = "Good Price"
          spacingLeft.amount = 0
      } else {
          closestCargOption = 0
          closestCargOptionName = ""
          nextHighestCargOption = carg_options.greatPrice
          nextHighestCargOptionName = "Great Price"
          spacingLeft.amount = 0
      } 
  }
  
  let averageSaleCarg = Math.floor((totalCarGurus - closestCargOption) / countWithCarGurusAndMargin)
  let averageSaleCargNext = Math.floor((totalCarGurus - nextHighestCargOption) / countWithCarGurusAndMargin)
  spacingLeft.precisionModifier = (100 - ((Math.abs(averageSaleCargNext) / (Math.abs(averageSaleCarg) + Math.abs(averageSaleCargNext)) * 100))) / 5

  return{
      averageSaleCarg,
      averageSaleCargNext,
      closestCargOption,
      closestCargOptionName,
      nextHighestCargOption,
      nextHighestCargOptionName,
      spacingLeft,
      countWithCarGurusAndMargin,
      totalCarGurus,
      carg_options
  }
}