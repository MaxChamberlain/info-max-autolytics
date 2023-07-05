import handleSalesByDate from "./handleSalesByDate"
import { handleCarGurusChart } from "./handleCarGurusChart"
import { getPace } from "./getPace"
import { getSalesBySource } from "./getSalesBySource"
import { getPriceDropByDays } from "./getPriceDropByDays"

export const prepData = (documents: any, startDate: string, endDate: string, adjustments: any) => {
    /*********************  Sales by date *******************/
    let salesByDate = []

    for(let i = new Date(startDate); i <= new Date(endDate); i.setDate(i.getDate() + 1)){
        salesByDate.push({
            date: new Date(i).toLocaleDateString('en-US'),
            countOfSales: 0,
            averageSalesToDate: 0,
            totalMargin: 0,
            averageMargin: 0,
            acvChange: 0,
            adjustmentsTotal: 0,
        })
    }
    /** ************************************ **/
    
    /*********************  Single Variables *******************/
    let averagePercentToMarket = {
        count: 0,
        sum: 0
    }
    let totalMargin = {
        count: 0,
        sum: 0,
    }
    
    let rollbackMetrics = {
        countOfRollbacks: 0,
        marginFromRollbacks: 0
    }

    let certifiedVehicleCount = {
        certified: 0,
        uncertified: 0,
        certifiedMargin: 0,
        uncertifiedMargin: 0
    }
    
    let averageDaysToSell = 0

    const existingSources: string[] = []
    documents.forEach((e: any) => {
      if(!existingSources.includes(e.data.vehicle.v_source) && e.data.vehicle.v_source != undefined) existingSources.push(e.data.vehicle.v_source)
    })


      const salesBySource = getSalesBySource(documents, existingSources, documents.filter((e: any) => e.rollback))
      let totalSales = 0

    /** ************************************ **/

    /** ***************** Main ***************** **/
    for(let i = 0; i < documents.length; i++){
        let currentDocument = documents[i]
        handleSalesByDate(currentDocument, salesByDate)

        if(
            currentDocument.data.vehicle?.v_market_percent
                && !isNaN(parseInt(currentDocument.data.vehicle.v_market_percent?.toString()))
                && parseInt(currentDocument.data.vehicle.v_market_percent) !== 0
                && !currentDocument.rollback
        ) {
            averagePercentToMarket.sum += parseInt(documents[i].data.vehicle.v_market_percent)
            averagePercentToMarket.count++
        }

        if (!(currentDocument?.data?.vehicle?.v_margin === null) || currentDocument?.rollback) {
            totalMargin.sum += parseInt(
                currentDocument.data.vehicle.v_margin?.toString() ?? '0'
            )
            totalMargin.count++
          }

        if(currentDocument.rollback){
            totalSales--
            rollbackMetrics.countOfRollbacks++
            rollbackMetrics.marginFromRollbacks += parseInt(currentDocument.data.vehicle.v_margin?.toString() ?? 0)
        } else {
            totalSales++
        }

        if(currentDocument.data.vehicle.v_days && !isNaN(parseInt(currentDocument.data.vehicle.v_days.toString())) && parseInt(currentDocument.data.vehicle.v_days.toString()) !== 0){
            averageDaysToSell += parseInt(currentDocument.data.vehicle.v_days.toString())
        }

        if(currentDocument.data.vehicle.v_is_certified){
            if(currentDocument.rollback){
                certifiedVehicleCount.certified--
            } else {
                certifiedVehicleCount.certified++
            }
            certifiedVehicleCount.certifiedMargin += parseInt(currentDocument.data.vehicle.v_margin?.toString())
        } else {
            if(currentDocument.rollback){
                certifiedVehicleCount.uncertified--
            } else {
                certifiedVehicleCount.uncertified++
            }
            certifiedVehicleCount.uncertifiedMargin += parseInt(currentDocument.data.vehicle.v_margin?.toString() ?? '0')
        }
    }
    for(let i = 0; i < adjustments.length; i++){
        let date = new Date(adjustments[i].adjustment_date).toLocaleDateString('en-US')
        let dateArrayIndex = salesByDate.find(arrDate => arrDate.date === date)
        if(dateArrayIndex){
            dateArrayIndex.adjustmentsTotal += parseInt(adjustments[i].adjustment_value.toString())
        }
    }
     const {
        averageSaleCarg,
        averageSaleCargNext,
        closestCargOption,
        closestCargOptionName,
        nextHighestCargOption,
        nextHighestCargOptionName,
        spacingLeft,
        countWithCarGurusAndMargin,
        carg_options
    } = handleCarGurusChart(documents)

    /** ************************************ **/

    /*********************  Sales by date *******************/
    let totalSalesToDate = 0

    for(let i = 0; i < salesByDate.length; i++){
        totalSalesToDate += salesByDate[i].countOfSales
        salesByDate[i].averageSalesToDate = Math.round(totalSalesToDate / ((i + 1)))
        salesByDate[i].averageMargin = Math.round(salesByDate[i].totalMargin / salesByDate[i].countOfSales)
        salesByDate[i].acvChange = Math.round(salesByDate[i].acvChange / salesByDate[i].countOfSales)
    }
    /** ************************************ **/

    /*********************  Single Variable (averages) *******************/
    let finalAveragePercentToMarket = Math.floor(averagePercentToMarket.sum / averagePercentToMarket.count)
    let averageMargin = totalMargin.sum / totalSales
    const totalMarginAdjustedForAdjustments = totalMargin.sum + adjustments.reduce((a: any, b: any) => a + parseInt(b.adjustment_value.toString()), 0)
    const averageMarginAdjustedForAdjustments = totalMarginAdjustedForAdjustments / totalSales
    const marginPaceAdjustedForAdjustments = getPace({ startDate: new Date(startDate), endDate: new Date(endDate) }, documents, adjustments).margin
    const { pace, margin } = getPace({ startDate: new Date(startDate), endDate: new Date(endDate) }, documents)
    const priceDropByAge = getPriceDropByDays(documents)
    /** ************************************ **/
    return {
        documents,
        totalSales,
        charts: {
            salesByDate,
            salesBySource,
            priceDropByAge,
            certifiedVehicleCount,
        },
        averagePercentToMarket: finalAveragePercentToMarket,
        averageMargin,
        totalMargin: totalMargin.sum,
        rollbackMetrics,
        averageDaysToSell: Math.round(averageDaysToSell / documents.length),
        cargurusComparison: {
            totalCountWithCarGurus: countWithCarGurusAndMargin,
            cargurusOptionsCumulative: carg_options,
            closestCarGurusOption: closestCargOption,
            closestCarGurusOptionName: closestCargOptionName,
            averageChosenCargurusPrice: averageSaleCarg,
            averageChosenCargurusNextHighest: averageSaleCargNext,
            closestCarGurusOptionNextHighest: nextHighestCargOption,
            closestCarGurusOptionNameNextHighest: nextHighestCargOptionName,
            amountToMoveFromLeft: spacingLeft,
        },
        paceForMonth: pace,
        marginPace: margin,
        totalMarginAdjustedForAdjustments,
        averageMarginAdjustedForAdjustments,
        marginPaceAdjustedForAdjustments,
    }
}