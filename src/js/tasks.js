export class Task {
  #taskCount;
  #taskName;
  #taskId;
  buttons;
  /* isActive = false; */
  constructor(taskName, taskCount = 1) {
    this.#taskId = Math.floor(Math.random() * 1e9);
    this.#taskName = taskName;
    this.#taskCount = taskCount;
  }

  changeUpCount() {
    this.#taskCount++;
  }

  set changeName(name) {
    this.#taskName = name;
  }

  get taskId() {
    return this.#taskId;
  }

  get taskName() {
    return this.#taskName;
  }

  get taskCount() {
    return this.#taskCount;
  }

  set taskCount(param) {
    this.#taskCount++;
  }
}

export class HighTask extends Task {
  #importance = 'important';
  isActive = false;

  get taskImportance() {
    return this.#importance;
  }
}

export class NormalTask extends Task {
  #importance = 'default';
  isActive = false;

  get taskImportance() {
    return this.#importance;
  }
}

export class LowTask extends Task {
  #importance = 'so-so';
  isActive = false;

  get taskImportance() {
    return this.#importance;
  }
}
