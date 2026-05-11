document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('input')
  const autocompleteList = document.querySelector('.autocompleteList')
  const savedRepositoriesList = document.querySelector('.savedRepositoriesList')
  const idContainer = new Set()
  console.log(`it works! ${autocompleteList}`)
  if (input)
    ('input',
      () => {
        if (input.value.length > 0) {
          autocompleteList.style.display = 'flex'
        } else {
          autocompleteList.style.display = 'none'
        }
      })

  const debounce = (fn, debounceTime = 0) => {
    // your code goes here
    let timerId
    return function (...args) {
      const context = this
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        fn.apply(context, args)
      }, debounceTime)
    }
  }

  async function fetchFunction() {
    console.log('works! fetchFunction', input)
    const query = input.value.trim()
    if (!query) {
      autocompleteList.innerHTML = ''
      autocompleteList.style.display = 'none'
      return
    }
    fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=5`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('works! data', data)
        autocompleteList.innerHTML = ''
        const items = data.items
        items.forEach((element) => {
          const li = document.createElement('li')
          li.textContent = element.name
          autocompleteList.appendChild(li)
          li.addEventListener('click', () => {
            if (idContainer.has(element.id)) {
              alert('you have already added this repository')
              return
            }
            idContainer.add(element.id)
            console.log('added!')
            const newLi = document.createElement('li')
            newLi.textContent = `Name: ${element.name} Owner: ${element.owner.login} Stars: ${element.stargazers_count}`
            savedRepositoriesList.appendChild(newLi)

            const removeBtn = document.createElement('button')
            removeBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#e0e0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
            <path d="M14 12V17" stroke="#e0e0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
            <path d="M4 7H20" stroke="#e0e0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
            <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#e0e0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#e0e0e0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
            newLi.appendChild(removeBtn)
            console.log('button added!')
            removeBtn.addEventListener('click', () => {
              savedRepositoriesList.removeChild(newLi)
              idContainer.delete(element.id)
            })
          })
        })
      })
  }

  const debouncedFetch = debounce(fetchFunction, 500)
  input.addEventListener('input', debouncedFetch)
})
