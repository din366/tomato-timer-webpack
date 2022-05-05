export class Init {
  #activeTask = null;
  constructor({
    taskTime = 0.2, // ! Таймеры уменьшены для теста
    pauseTime = 0.1,
    pauseBigTime = 0.3,
    tasksArray = [],
  }) {
    this.taskTime = taskTime * 60; // seconds
    this.pauseTime = pauseTime * 60; // seconds
    this.pauseBigTime = pauseBigTime * 60; // seconds
    this.tasksArray = tasksArray;
  }

  addTask(taskId, taskName) {
    this.tasksArray.push({taskId, taskName});
  }

  activateTask(taskId) {
    const item = this.tasksArray.find((item) => taskId === item.taskId);
    this.#activeTask = item;
  }

  runTask(taskId) {
    const item = this.tasksArray.find((item) => taskId === item.taskId);
    try { // 
      this.runTaskTime(item);
    } catch (err) {
      console.error('Такой задачи не существует.');
    }
  }

  increaseTaskCount(taskId) {
    const item = this.tasksArray.find((item) => taskId === item.taskId);
    item.taskCount(1); // in CreateTask class (current task count ++)
  }

  runTaskTime(item) {
    // create timer in runned task
    !item.taskTime ? item.taskTime = this.taskTime : false;

    const run = setInterval(() => {
      item.taskTime -= 1; // change timer in runned task
      console.log(`Task time: ${item.taskTime}`);
      if (item.taskTime <= 0) {
        item.taskTime = this.taskTime;
        item.taskCount = 1;
        if (item.taskCount % 3 === 0) { // only 3 small pauses
          this.runBigPause(item);
        } else {
          this.runSmallPause(item);
        }
        console.warn(`TaskCount: ${item.taskCount}`);
        clearInterval(run);
      }
    }, 1000);
  }

  runSmallPause(item) {
    // create small pause timer in runned task
    !item.taskSmallPause ? item.taskSmallPause = this.pauseTime : false;

    const run = setInterval(() => {
      item.taskSmallPause -= 1; // change pause timer in runned task
      console.log(`Task small Pause: ${item.taskSmallPause}`);
      if (item.taskSmallPause <= 0) {
        item.taskSmallPause = this.pauseTime; // update default pause timer
        this.runTaskTime(item);
        console.log('--------------------');
        clearInterval(run);
      }
    }, 1000);
  }

  runBigPause(item) {
    // create big pause timer in runned task
    !item.taskBigPause ? item.taskBigPause = this.pauseBigTime : false;

    const run = setInterval(() => {
      item.taskBigPause -= 1; // change pause timer in runned task
      console.info(`Task BIG Pause: ${item.taskBigPause}`);
      if (item.taskBigPause <= 0) {
        item.taskBigPause = this.pauseBigTime; // update default pause timer
        this.runTaskTime(item);
        console.log('--------------------');
        clearInterval(run);
      }
    }, 1000);
  }

  get test() { // ! temporality
    return this.#activeTask;
  }
}
