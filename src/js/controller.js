import { app } from './main';

class ControllerTomato {
  renderElem;

  addMainListeners(renderElem) {
    this.renderElem = renderElem;

    /* add task button listener */
    this.renderElem.addTaskButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (renderElem.input.value === '') return; // check empty input
      /* add task in list */
      const taskName = this.renderElem.input.value;
      /* choice importance task */
      this.renderElem.importanceButton.classList.contains('so-so') ?
        app.addTask(taskName, 'so-so') :
        this.renderElem.importanceButton.classList.contains('default') ?
          app.addTask(taskName, 'default') : app.addTask(taskName, 'important');

      renderElem.input.value = ''; // clear input after submit
    });

    /* run active task */
    this.renderElem.buttonStart.addEventListener('click', (e) => {
      app.runTask();
      this.renderElem.buttonStart.disabled = true;
      console.dir(document.querySelectorAll('.pomodoro-tasks__task-text'));
      document.querySelectorAll('.pomodoro-tasks__task-text')
        .forEach((elem) => elem.disabled = true);
      document.querySelectorAll('.pomodoro-tasks__task-button')
        .forEach((elem) => elem.disabled = true);
    });

    /* stop active task */
    this.renderElem.buttonStop.addEventListener('click', (e) => {
      const res = app.stopTask();
      if (res === true) { // if "res" returned current task is ok
        this.renderElem.buttonStart.disabled = false;
        this.renderElem.buttonStop.textContent = 'Стоп';
        document.querySelectorAll('.pomodoro-tasks__task-text')
          .forEach((elem) => elem.disabled = false);
        document.querySelectorAll('.pomodoro-tasks__task-button')
          .forEach((elem) => elem.disabled = false);
      }
    });

    /* close modal window icon*/
    this.renderElem.modalOverlayCloseIcon.addEventListener('click', () => {
      this.renderElem.modalOverlay.style.display = 'none';
      this.renderElem.modalOverlayDeleteTask.dataset.id = '';
    });

    /* close modal window button*/
    this.renderElem.modalOverlayCloseButton.addEventListener('click', () => {
      this.renderElem.modalOverlay.style.display = 'none';
      this.renderElem.modalOverlayDeleteTask.dataset.id = '';
    });

    /* delete task in modal window */
    this.renderElem.modalOverlayDeleteTask.addEventListener('click', (e) => {
      const item = app.tasksArray.
        find(item => item.importanceObject.taskId === +e.target.dataset.id);
      item.importanceObject.buttons.taskElements.taskLi.remove();

      app.deleteTaskInArray(+e.target.dataset.id); // run delete func

      this.renderElem.modalOverlay.style.display = 'none';
      this.renderElem.modalOverlayDeleteTask.dataset.id = '';
    });
  }

  addTaskListeners(task) { // add listeneners every tasks (after adding task)
    const taskButtons = task.buttons.taskElements; // path to the button

    taskButtons.taskNameBlock.addEventListener('click', (e) => {
      this.renderElem.windowPanelTitle.textContent = task.taskName;
      this.renderElem.tomatoNumber.textContent = `Tomato ${task.taskCount}`;
      this.renderElem.buttonStart.disabled = false;

      app.tasksArray.map(item => { // reset active view
        item.importanceObject.buttons.taskElements.taskNameBlock.
          classList.remove('pomodoro-tasks__task-text_active');
      });

      taskButtons.taskNameBlock. // set active view on one element
        classList.add('pomodoro-tasks__task-text_active');
      app.activateTask(task.taskId);
    });

    /* show popup (delete button) */
    taskButtons.menuTaskButton.addEventListener('click', (e) => {
      taskButtons.deleteTaskButton.
        closest('.burger-popup').classList.toggle('popup-show');
    });

    /* close popup when click outside */
    document.body.addEventListener('click', (e) => {
      // hide edit and delete task popup
      if (!e.target.classList.contains('pomodoro-tasks__task-button')) {
        taskButtons.deleteTaskButton.
          closest('.burger-popup').classList.remove('popup-show');
      }
    });

    /* delete task button and show modal */
    taskButtons.deleteTaskButton.addEventListener('click', () => {
      this.renderElem.modalOverlay.style.display = 'block';
      /* pass id to modal */
      this.renderElem.modalOverlayDeleteTask.dataset.id = task.taskId;
    });
  }
}


export const controllerTomato = new ControllerTomato();
