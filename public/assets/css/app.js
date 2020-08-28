document.getElementById('addBurgers').addEventListener('click', event => {
    event.preventDefault()
  
    axios.post('/api/burgers', {
      burger_name: document.getElementById('burger').value,
      purchased: false
    })
      .then(({ data }) => {
        let groceryElem = document.createElement('li')
        groceryElem.className = 'list-group-item'
        groceryElem.id = data.id
        groceryElem.innerHTML = `
         <div class="d-flex w-100 justify-content-between">
           <h5 class="mb-1">${document.getElementById('product').value}</h5>
           <button 
            data-name="${document.getElementById('product').value}"
            data-quantity="${document.getElementById('quantity').value}"
            data-cost="${document.getElementById('cost').value}"
            class="purchase btn btn-success">✓</button>
         </div>
         <p class="mb-1">Quantity: ${document.getElementById('quantity').value}</p>
         <small>Price: $${document.getElementById('cost').value}</small>
        `
        document.getElementById('notPurchased').append(groceryElem)
  
        document.getElementById('product').value = ''
        document.getElementById('quantity').value = ''
        document.getElementById('cost').value = ''
      })
      .catch(err => console.error(err))
  })
  
  document.addEventListener('click', event => {
    if (event.target.classList.contains('purchase')) {
      axios.put(`/api/groceries/${event.target.parentNode.parentNode.id}`, {
        purchased: true
      })
        .then(() => {
          let groceryElem = document.createElement('li')
          groceryElem.className = 'list-group-item'
          groceryElem.id = event.target.parentNode.parentNode.id
          groceryElem.innerHTML = `
         <div class="d-flex w-100 justify-content-between">
           <h5 class="mb-1">${event.target.dataset.name}</h5>
           <button class="btn btn-danger remove">X</button>
         </div>
         <p class="mb-1">Quantity: ${event.target.dataset.quantity}</p>
         <small>Price: $${event.target.dataset.cost}</small>
        `
          document.getElementById('purchased').append(groceryElem)
          event.target.parentNode.parentNode.remove()
        })
        .catch(err => console.error(err))
    } else if (event.target.classList.contains('remove')) {
      axios.delete(`/api/groceries/${event.target.parentNode.parentNode.id}`)
        .then(() => {
          event.target.parentNode.parentNode.remove()
        })
        .catch(err => console.error(err))
    }
  })