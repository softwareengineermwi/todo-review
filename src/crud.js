export function updateIndices(callback) {
  let tasks = JSON.parse(localStorage.getItem('things'))

  let updatedTasks = []

  if (tasks !== null && tasks.length > 0) {
    for (let k = 0; k < tasks.length; k++) {
      let item = tasks[k];
      item.index = k + 1
      updatedTasks.push(item)

      if (k == tasks.length - 1) {
        localStorage.setItem('things', JSON.stringify(updatedTasks))
        callback()
      }
    }
  }
}

export function add(description) {
  let tasks = JSON.parse(localStorage.getItem('things'))
  if (tasks !== null && tasks.length > 0) {
    let length = tasks.length
    tasks.push({
      index: length,
      completed: false,
      description: description
    })
    localStorage.setItem('things', JSON.stringify(tasks))
    location.reload()
  } else {
    let tasks = []
    tasks.push({
      index: length,
      completed: false,
      description: description
    })
    localStorage.setItem('things', JSON.stringify(tasks))
    location.reload()
  }
}

export function apply(change, position) {
  let tasks = JSON.parse(localStorage.getItem('things'))
  tasks[parseInt(position)].description = change
  localStorage.setItem('things', JSON.stringify(tasks))
}

export function del(btn, foo) {
  let tasks = JSON.parse(localStorage.getItem('things'))
  
  if (foo) {
    btn.innerText = 'delete'
    btn.addEventListener('click', () => {
      tasks.splice(parseInt(btn.value), 1)
      localStorage.setItem('things', JSON.stringify(tasks))
      location.reload()
    })
  } else {
    btn.innerText = 'more_vert'
    setTimeout(() => {
      btn.removeEventListener('click', () => { })
    }, 2000)
  }
}

export function clear() {
  let tasks = JSON.parse(localStorage.getItem('things'))
  if (tasks !== null && tasks.length > 0) {
    tasks = tasks.filter(check)
    function check(item) {
      return item.completed == false;
    }
    localStorage.setItem('things', JSON.stringify(tasks))
    location.reload()
  }
}