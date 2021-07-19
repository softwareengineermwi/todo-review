export function onchange(e) {
  let tasks = JSON.parse(localStorage.getItem('things'))
  let task = tasks[parseInt(e.target.getAttribute('data-id'))]
  task.completed = !task.completed
  localStorage.setItem('things', JSON.stringify(tasks))
  location.reload()
}