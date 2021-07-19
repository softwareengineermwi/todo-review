let tasks = JSON.parse(localStorage.getItem('things'))
let draggedItem = null

export function dragstart(e) {
  draggedItem = tasks.splice(parseInt(e.target.id), 1)
}

export function dragover(e) {
  e.preventDefault()
  e.target.classList.add('drag-over')
}

export function dragleave(e) {
  e.preventDefault()
  e.target.classList.remove('drag-over')
}

export function drop(e) {
  e.preventDefault()
  tasks.splice(parseInt(e.target.getAttribute('data-id')), 0, draggedItem[0])
  localStorage.setItem('things', JSON.stringify(tasks))
  window.location.reload()
}