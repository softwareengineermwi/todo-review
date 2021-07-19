import './style.css';
import { dragstart } from './draggability';
import { dragover } from './draggability';
import { drop } from './draggability';
import { dragleave } from './draggability';
import { onchange } from './status';
import { add, del } from './crud'
import { apply, clear, updateIndices } from './crud'

function g(e) {
  return document.getElementById(e);
}

g('form').addEventListener('submit', (e) => {
  e.preventDefault()
  add(g('input-description').value)
})

function loadTodo() {
  if (localStorage.getItem('things') !== null) {
    const tasks = JSON.parse(localStorage.getItem('things'));

    console.log(tasks)

    for (let x = 0; x < tasks.length; x++) {
      const task = tasks[x];

      const tasktemplate = document.createElement('li');
      tasktemplate.id = x;
      tasktemplate.className = 'position-relative flex items-center';

      tasktemplate.draggable = true;
      tasktemplate.addEventListener('dragstart', dragstart);

      let dropArea = document.createElement('div')

      let container1 = document.createElement('div')
      let container2 = document.createElement('div')
      let container3 = document.createElement('div')

      let btn = document.createElement('button')
      let input = document.createElement('input')

      let h4 = document.createElement('h4')
      h4.innerText = task.description
      h4.contentEditable = true

      h4.setAttribute('data-id', x)
      h4.className = "x width-100%"

      if (task.completed) {
        h4.classList.add('strike')
      }

      container1.className = "flex items-center width-100%"
      container2.className = "flex items-center space-between"
      container3.className = "flex grow justify-end"

      input.className = "x clearance-right"

      dropArea.className = "drop-area"
      btn.value = x
      btn.className = "x bg-none material-icons border-none"
      btn.innerText = 'more_vert'

      h4.addEventListener('input', e => {
        apply(e.target.textContent, e.target.getAttribute('data-id'))
      })

      h4.addEventListener('click', () => {
        del(btn, true)
      })

      h4.addEventListener('focusout', () => {
        del(btn, false)
      })

      container2.append(input, h4)
      container3.appendChild(btn)

      container1.append(container2, container3)
      tasktemplate.append(dropArea, container1)

      dropArea.setAttribute('data-id', x)
      input.type = 'checkbox'
      input.setAttribute('data-id', x)
      input.checked = task.completed
      input.addEventListener('change', onchange)

      dropArea.addEventListener('dragover', dragover)
      dropArea.addEventListener('dragleave', dragleave)
      dropArea.addEventListener('dragover', dragover)
      dropArea.addEventListener('drop', drop);

      g('todo_list').appendChild(tasktemplate);
    }

    g('clear').addEventListener('click', clear)
  }
}

window.onload = updateIndices(() => { loadTodo() });