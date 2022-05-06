import './../scss/index.scss';
import {Init} from './init';
import {CreateTask} from './tasks';

let count = 0;
const imp = ['default', 'important', 'so-so'];
// eslint-disable-next-line max-len
document.querySelector('.button-importance').addEventListener('click', ({target}) => {
  count += 1;
  if (count >= imp.length) {
    count = 0;
  }

  for (let i = 0; i < imp.length; i++) {
    if (count === i) {
      target.classList.add(imp[i]);
    } else {
      target.classList.remove(imp[i]);
    }
  }
});

const newTask = new CreateTask('Слетать на луну');
console.log(newTask.taskName);

const tasksArray = [{taskId: 1232132132, taskName: 'Навернуть гречки'},
  {taskId: 654654654, taskName: 'Пожамкать кота'}];

/* show default task array */
const test = new Init({tasksArray});
console.log(test);

/* add new task */
test.addTask(newTask.taskId, newTask.taskName);
console.log(test);

/* add task in activate private variable */
test.activateTask(newTask.taskId);
console.log(test.test);


/* View the running task in the console */
test.runTask(newTask.taskId); // ! uncomment the line

