class Task {
  #taskCount;
  #taskName;
  #taskId;
  constructor(taskName, taskCount = 0) {
    this.#taskId = Math.floor(Math.random() * 1000000000);
    this.#taskName = taskName;
    this.#taskCount = taskCount;
  }

  changeUpCount() {
    this.#taskCount++;
  }

  set changeName(name) {
    this.#taskName = name;
  }
}
