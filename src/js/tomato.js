import {LowTask, NormalTask, HighTask} from './tasks';
import {render} from './render';
import {controllerTomato} from './controller';

export class Tomato {
  #activeTask = null;
  renderElem = null;
  runMainTime = null;
  runSmallPauseTime = null;
  runBigPauseTime = null;
  constructor({
    taskTime = 0.3, // ! Таймеры уменьшены для теста
    pauseTime = 0.1,
    pauseBigTime = 0.3,
    tasksArray = [],
  }) {
    if (Tomato.instance) {
      return Tomato.instance;
    }
    this.taskTime = taskTime * 60; // seconds
    this.pauseTime = pauseTime * 60; // seconds
    this.pauseBigTime = pauseBigTime * 60; // seconds
    this.tasksArray = tasksArray;
    Tomato.instance = this;
  }

  normalizeTimer(seconds) { // for display zeros. Example 01:08
    return `${(seconds / 60 < 10) ? '0' : ''}${Math.floor(seconds / 60)}:${
    ((seconds % 60) < 10) ? 0 : ''}${Math.floor(seconds % 60)}`;
  }

  addTask(taskName, importance = 'default') {
    const ImportanceObject = importance === 'so-so' ? LowTask :
    importance === 'default' ? NormalTask : HighTask;
    const importanceObject = new ImportanceObject(taskName);
    /* render task in layout */
    const taskElements = render.renderTask(importanceObject);
    // writing buttons to the task object
    importanceObject.buttons = {taskElements};
    // push task in tasks array
    this.tasksArray.push({importanceObject});
    /* for task listeners */
    controllerTomato.addTaskListeners(importanceObject);
    return importanceObject;
  }

  activateTask(taskId) {
    for (const item of this.tasksArray) {
      item.importanceObject.isActive = false; // false all tasks
    }
    const item = this.tasksArray.find(
      (item) => taskId === item.importanceObject.taskId);
    item.importanceObject.isActive = true; // active current task
    this.#activeTask = item; // push current item in tomato activeTask
    if (item.importanceObject.taskTime) { // show task time in main window
      this.renderElem.buttonTime.textContent =
        this.normalizeTimer(item.importanceObject.taskTime);
    } else {
      this.renderElem.buttonTime.textContent =
        this.normalizeTimer(this.taskTime); // default task time
    }
  }

  runTask() {
    if (this.#activeTask) { // first initialization check
      const activeTask = this.#activeTask; // get task from tomato varialbe
      const item = this.tasksArray.find((item) =>
        activeTask.importanceObject.taskId === item.importanceObject.taskId);
      try {
        this.runTaskTime(item.importanceObject); // run counter for current task
      } catch (err) {
        console.error('Такой задачи не существует.');
      }
    }
  }

  stopTask() {
    if (this.getActiveTask()) { // first initialization check
      const activeTask = this.getActiveTask();
      const item = this.tasksArray.find((item) =>
        activeTask.importanceObject.taskId === item.importanceObject.taskId);
      item.importanceObject.taskSmallPause = null; // clear small pause
      item.importanceObject.taskBigPause = null; // clear big pause
      /* item.importanceObject.taskTime = null; */ // clear taskTime
      clearInterval(this.runMainTime);
      clearInterval(this.runSmallPauseTime);
      clearInterval(this.runBigPauseTime);
      this.renderElem.buttonTime.textContent =
        this.normalizeTimer(item.importanceObject.taskTime);
      /* when active pause time - change color to black */
      document.querySelector('.window__timer-text').style.color = '#333333';
      return true;
    }
  }

  increaseTaskCount(taskId) {
    const item = this.tasksArray.find((item) => taskId === item.taskId);
    item.taskCount(1); // in CreateTask class (current task count ++)
  }

  // change tomato count for main window
  changeTomatoCountCurrentTask(tomatoCounter) {
    if (this.#activeTask === null) {
      return false;
    }
    const activeTask = this.#activeTask;
    if (activeTask.importanceObject.taskCount % 4 === 0) {
      tomatoCounter.textContent =
      `Tomato 4`; // change in main window
      activeTask.importanceObject.buttons.taskElements.taskLi.
        querySelector('span').textContent = '4'; // change in tasks list
    } else {
      tomatoCounter.textContent =
      `Tomato ${activeTask.importanceObject.taskCount % 4}`;
      activeTask.importanceObject.buttons.taskElements.taskLi.
        querySelector('span').textContent =
          activeTask.importanceObject.taskCount % 4; // change in tasks list
    }
  }

  runTaskTime(item) {
    // create timer in runned task
    !item.taskTime ? item.taskTime =
      this.taskTime : false;
    //  render tomato task count in main window
    this.changeTomatoCountCurrentTask(this.renderElem.tomatoNumber);
    document.querySelector('.window__timer-text').style.color = '#333333';
    this.renderElem.buttonStop.textContent = 'Пауза'; // change text after start

    this.runMainTime = setInterval(() => {
      item.taskTime -= 1; // change timer in runned task
      /* task timer visual work */
      this.renderElem.buttonTime.textContent =
        this.normalizeTimer(item.taskTime);

      if (item.taskTime <= 0) {
        item.taskTime = this.taskTime; // save task time in current task
        item.taskCount = 1;
        if ((item.taskCount % 4 - 1) === 0) { // only 4 small pauses
          this.runBigPause(item);
        } else {
          this.runSmallPause(item);
        }
        clearInterval(this.runMainTime);
      }
    }, 1000);
  }

  runSmallPause(item) {
    // create small pause timer in runned task
    !item.taskSmallPause ? item.taskSmallPause =
      this.pauseTime : false;
    // change color timer when start timebreak
    document.querySelector('.window__timer-text').style.color = '#00a13d';
    this.renderElem.buttonStop.textContent = 'Закончить отдых';
    this.runSmallPauseTime = setInterval(() => {
      item.taskSmallPause -= 1; // change pause timer in runned task

      /* task timer visual work */
      this.renderElem.buttonTime.textContent =
        this.normalizeTimer(item.taskSmallPause);

      if (item.taskSmallPause <= 0) {
        item.taskSmallPause = this.pauseTime; // update default pause timer
        this.runTaskTime(item);
        clearInterval(this.runSmallPauseTime);
      }
    }, 1000);
  }

  runBigPause(item) {
    // create big pause timer in runned task
    !item.taskBigPause ? item.taskBigPause =
      this.pauseBigTime : false;
    // change color timer when start timebreak
    document.querySelector('.window__timer-text').style.color = '#00a13d';
    this.renderElem.buttonStop.textContent = 'Закончить отдых';
    this.runBigPauseTime = setInterval(() => {
      item.taskBigPause -= 1; // change pause timer in runned task

      /* task timer visual work */
      this.renderElem.buttonTime.textContent =
        this.normalizeTimer(item.taskBigPause);

      if (item.taskBigPause <= 0) {
        item.taskBigPause = this.pauseBigTime; // update default pause timer
        this.runTaskTime(item);
        clearInterval(this.runBigPauseTime);
      }
    }, 1000);
  }

  renderPage() { // render page first init
    this.renderElem = render.initRender();
    controllerTomato.addMainListeners(this.renderElem);
  }

  deleteTaskInArray(taskId) {
    console.log(taskId);
    for (let i = 0; i < this.tasksArray.length; i++) {
      if (this.tasksArray[i].importanceObject.taskId === taskId) {
        this.tasksArray.splice(i, 1);
        return;
      }
    }
  }

  getActiveTask() {
    return this.#activeTask;
  }
}

