$(document).ready(function() {
  console.log(`$(document).ready`)

  $('table input').on('change', function() {
    let qty = $(this).val()
    console.log(qty)
    let price = $(this).parent().prev().text()
    price = parseFloat(price)
    console.log(price)
    let itemTotal = qty * price
    itemTotal = itemTotal * 100
    itemTotal = parseInt(itemTotal)
    itemTotal = itemTotal / 100
    console.log(itemTotal)
    let last = $(this).closest('tr').children('.subtotal').text(itemTotal)
    console.log(last)
    totalPrice()
  })

})

function totalPrice() {
  console.log(`totalPrice`)
  let subtotals = $('table').find('.subtotal')
  console.log(subtotals)
  let subTotalVals = []
  subtotals.each((index, element) => {
    // console.log(index)
    // console.log($(element))
    let price = $(element).text()
    if(price == '-') {
      return
    }
    price = parseFloat(price)
    price = price * 100
    price = parseInt(price)
    price = price / 100
    subTotalVals.push(price)
    console.log(price)
  })
  console.log(subTotalVals)
  let totalPrice = subTotalVals.reduce((a, b) => a + b)
  totalPrice = parseInt(totalPrice * 100)/100
  console.log(totalPrice)
  $('#total span').text(totalPrice)
}

console.log(`js loaded`)
