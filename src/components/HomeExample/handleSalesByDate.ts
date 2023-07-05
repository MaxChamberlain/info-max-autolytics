export default function handleSalesByDate(document: any, dateSalesArray: any){
  let dateOfSale = new Date(document.metadata.created_at).toLocaleDateString('en-US')
  let dateArrayIndex = dateSalesArray.find((date: any) => date.date === dateOfSale)
  if(dateArrayIndex){
      if (document.rollback) {
          dateArrayIndex.countOfSales--
      } else {
          dateArrayIndex.countOfSales++
      }
      dateArrayIndex.totalMargin += isNaN(parseInt(document.data.vehicle.v_margin)) ? 0 : parseInt(document.data.vehicle.v_margin)
      if(!isNaN(parseInt(document.data.vehicle.v_final_acv)) && !isNaN(parseInt(document.data.vehicle.v_acv)))
          dateArrayIndex.acvChange += (parseInt(document.data.vehicle.v_final_acv) - parseInt(document.data.vehicle.v_acv))
  }
}