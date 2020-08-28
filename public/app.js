document.getElementById('addBurger').addEventListener('click', event => {
    event.preventDefault()
  
    axios.post('/api/burgers', {
      burger_name: document.getElementById('enter').value,
      devoured: false
    })
      .then(({ data }) => {
        let burgerElem = document.createElement('li')
        burgerElem.className = 'list-group-item'
        burgerElem.id = data.id
        burgerElem.dataset.name = document.getElementById('burger').value
        burgerElem.innerHTML = `
          ${document.getElementById('burger').value}
           <button>
            data-burger_name="${document.getElementById('burger').value}"
            class="devoured btn">Devoured</button>
         </div>
        `
        document.getElementById('notdevoured').append(burgerElem)
  
        document.getElementById('burger').value = ''
      })
      .catch(err => console.error(err))
  })
  
  document.addEventListener('click', event => {
    if (event.target.classList.contains('devoured')) {
      axios.put(`/api/burgers/${event.target.parentNode.parentNode.id}`, {
        purchased: true
      })
        .then(() => {
          let burgerElem = document.createElement('li')
          burgerElem.className = 'list-group-item'
          burgerElem.id = event.target.parentNode.parentNode.id
          burgerElem.innerHTML = `
         <div class="d-flex w-100 justify-content-between">
           <h5 class="mb-1">${event.target.dataset.name}</h5>
           <button class="btn btn-danger remove">X</button>
         </div>
        `
          document.getElementById('devoured').append(groceryElem)
          event.target.parentNode.parentNode.remove()
        })
        .catch(err => console.error(err))
    }
  })