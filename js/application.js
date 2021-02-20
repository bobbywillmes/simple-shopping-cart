const calculatePrice = function() {
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

const enableAdd = function() {
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

const addItem = function() {
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
      <td><span class="fas fa-trash remove"></span></td>
    </tr>`
  $('table tbody').append(newRow)
  // clear input elements
  row.find('.item').val('')
  row.find('.price').val('')
  $('#add').prop('disabled', true)
}

const removeItem = function() {
  console.log(`removeItem`)
  let row = $(this).parent().parent()
  console.log(row)
  row.remove()
  totalPrice()
}

const totalPrice = function() {
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
  let totalPrice = subTotalVals.reduce((a, b) => a + b, 0)
  totalPrice = parseInt(totalPrice * 100)/100
  console.log(totalPrice)
  $('#total span').text(totalPrice)
}

console.log(`js loaded`)

$(document).ready(function() {
  console.log(`$(document).ready`)

  $('tbody').on('change', 'input', calculatePrice)

  $('tfoot').on('change', enableAdd)

  $('#add').on('click', addItem)

  $('tbody').on('click', '.remove', removeItem)

})
