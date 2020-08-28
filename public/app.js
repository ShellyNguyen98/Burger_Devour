document.getElementById('addBurger').addEventListener('click', event => {
    event.preventDefault()
  
    axios.post('/api/burgers', {
      burger_name: document.getElementById('burger').value,
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
        devoured: true
      })
        .then(() => {
          let burgerElem = document.createElement('li')
          burgerElem.className = 'list-group-item'
          burgerElem.id = event.target.parentNode.parentNode.id
          burgerElem.innerHTML = `
         ${event.target.dataset.name}
        `
          document.getElementById('devoured').append(burgerElem)
          event.target.parentNode.parentNode.remove()
        })
        .catch(err => console.error(err))
    }
  })