export function getSalesBySource (docs: any[], existingSources: string[], rollbacks: any[]): Array<any> {
  const totalSales = docs.length

  return existingSources.map((source: string) => {
    let sourceSales = 0
    let sourceMargin = 0

    const docsWithSource = docs.filter((doc) => {
      if (doc.data.vehicle.v_source !== source) return false
      if (doc.data.vehicle.v_acv === undefined || doc.data.vehicle.v_acv?.toString() === '0' || isNaN(parseInt(doc?.data?.vehicle?.v_acv))) return false
      if (doc.data.vehicle.v_final_acv === undefined || doc.data.vehicle.v_final_acv?.toString() === '0' || isNaN(parseInt(doc?.data?.vehicle?.v_final_acv))) return false
      return true
    })

    docs.forEach((doc) => {
      if (doc.data.vehicle.v_source === undefined) return false
      if (doc.data.vehicle.v_source === source && !doc.rollback) {
        sourceSales++
        sourceMargin += isNaN(parseInt(doc.data.vehicle.v_margin)) ? 0 : parseInt(doc.data.vehicle.v_margin)
      }
    })

    const totalAcvDiff = docsWithSource
      .reduce(
        (a, b) => {
          if (b?.data?.vehicle?.v_acv == undefined || b?.data?.vehicle?.v_acv?.toString() === '0' || isNaN(parseInt(b?.data?.vehicle?.v_acv))) return a
          if(b?.data?.vehicle?.v_final_acv == undefined || b?.data?.vehicle?.v_final_acv?.toString() === '0' || isNaN(parseInt(b?.data?.vehicle?.v_final_acv))) return a
          return a +
            (parseInt(b.data.vehicle.v_acv.toString()) -
              parseInt(b.data.vehicle.v_final_acv.toString()))
        }, 0)

    const countWithAcv = docsWithSource.length

    const averagePercent = docsWithSource.filter(e => {
      if(e.data.vehicle.v_market_percent === undefined) return false
      if(isNaN(parseInt(e.data.vehicle.v_market_percent.toString()))) return false
      if(e.data.vehicle.v_market_percent.toString() === '0') return false
      return true
    }).reduce((a, b) => {
      if(b.data.vehicle.v_market_percent === undefined) return a
      return a + parseInt(b.data.vehicle.v_market_percent.toString())
    }, 0) / docsWithSource.filter(e => {
      if(e.data.vehicle.v_market_percent === undefined) return false
      if(isNaN(parseInt(e.data.vehicle.v_market_percent.toString()))) return false
      if(e.data.vehicle.v_market_percent.toString() === '0') return false
      return true
    }).length

    let acvDiff = (totalAcvDiff / countWithAcv).toFixed(2)

    if (isNaN(parseInt(acvDiff))) acvDiff = '0'

    let rollbackCount = 0
    
    rollbacks.forEach((doc) => {
      if (doc.data.vehicle.v_source === undefined) return false
      if (doc.data.vehicle.v_source === source) {
        rollbackCount++
      }
    })

    return {
      name: source,
      countOfSales: parseInt(sourceSales?.toString()),
      totalMargin: parseInt(sourceMargin?.toString()),
      averageMargin: parseInt((sourceMargin / sourceSales).toFixed(2)),
      sourcePercentOfTotal: parseInt(((sourceSales / totalSales) * 100).toFixed(2)),
      acvChange: parseInt(acvDiff),
      averagePercentToMarket: isNaN(averagePercent) ? 0 : Math.floor(averagePercent),
      countOfRollbacks: rollbackCount
    }
  }).sort((a, b) => b.averageMargin - a.averageMargin)
}