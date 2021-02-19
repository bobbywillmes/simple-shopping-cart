$(document).ready(function() {
  console.log(`$(document).ready`)

  $('tbody').on('change', 'input', calculatePrice)

  $('tfoot').on('change', enableAdd)

  $('#add').on('click', addItem)

})

function calculatePrice() {
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
}

function enableAdd() {
  console.log(`enableAdd()`)
  let tfoot = $(this)
  let item = tfoot.find('.item').val()
  let price = tfoot.find('.price').val()
  console.log(`${item}  ${price}`)
  // enable Add button once item & price are filled out
  if(item !== '' && price !== '') {
    console.log(`item can be added`)
    tfoot.find('#add').prop('disabled', false)
  } else {
    console.log(`cant add item yet`)
    tfoot.find('#add').prop('disabled', true)
  }
}

function addItem() {
  console.log(`add clicked`)
  let row = $(this).parent().parent()
  let item = row.find('.item').val()
  let price = row.find('.price').val()
  console.log(`${item}  ${price}`)
  // create new row, then add to table
  let newRow = `
    <tr>
      <td>${item}</td>
      <td>${price}</td>
      <td><input type="number" min="0"/></td>
      <td class="subtotal">-</td>
    </tr>`
  $('table tbody').append(newRow)
  // clear input elements
  row.find('.item').val('')
  row.find('.price').val('')
  $('#add').prop('disabled', true)
}

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
