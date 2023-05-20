import {el, mount, list, setChildren} from 'redom';

class LiPomodoroTask { /* for redom pomodoro instruction */
  constructor() {
    this.el = el('li');
  }
  update(data) {
    this.el.textContent = data;
    this.el.classList = 'pomodoro-tasks__list-item';
  }
}

export class RenderTomato {
  initRender() {
    const header = el('header',
      el('section.header',
        el('.container.header__container',
          /* el('img.header__logo', {src: '', alt: 'Tomato image'}), */
          el('h1.header__title', 'Tomato Timer'))));
    mount(document.body, header);
    const main = el('main');
    const mainSection = el('section.main');
    mount(main, mainSection);

    const mainContainer = el('.container.main__container');

    /* Pomodoro window */
    const windowPanelTitle = el('p.window__panel-title', '-');
    const tomatoNumber = el('p.window__panel-task-text', '-');

    const windowPanel = el('.window__panel',
      windowPanelTitle,
      tomatoNumber);

    const buttonTime = el('p.window__timer-text', '25:00');
    const buttonStart =
      el('button.button.button-primary', {disabled: true}, 'Старт');
    const buttonStop = el('button.button.button-secondary', 'Стоп');
    const windowBody = el('.window__body',
      buttonTime, el('.window__buttons', buttonStart, buttonStop));

    /* form */
    const input = el('input.input.task-name.input-primary',
      {type: 'text', name: 'task-name',
        id: 'task-name', placeholder: 'название задачи'});
    const importanceButton =
      el('button.button.button-importance.default',
        {'type': 'button', 'aria-label': 'Указать важность'});
    const addTaskButton =
      el('button.button.button-primary.task-form__add-button',
        {'type': 'submit'}, 'Добавить');
    const form = el('form.task-form', {action: 'submit'},
      input,
      importanceButton,
      addTaskButton);
    const pomodoroFormWrapper =
      el('.pomodoro-form.window', windowPanel, windowBody, form);

    /* instruction block */
    const ul = list('ul.pomodoro-tasks__quest-list', LiPomodoroTask);
    ul.update(['Напишите название задачи чтобы её добавить',
      'Чтобы задачу активировать, выберите её из списка',
      'Запустите таймер',
      'Работайте пока таймер не прозвонит',
      'Сделайте короткий перерыв (5 минут)',
      'Продолжайте работать, пока задача не будет выполнена.',
      'Каждые 4 периода таймера делайте длинный перерыв (15-20 минут).']);

    const pomodoroTasks = el('.pomodoro-tasks',
      el('p.pomodoro-tasks__header-title', 'Инструкция:'),
      ul,
      el('ul.pomodoro-tasks__quest-tasks'),
      el('p.pomodoro-tasks__deadline-timer', '1 час 30 мин'),
    );

    setChildren(mainContainer, [pomodoroFormWrapper, pomodoroTasks]);
    mount(mainSection, mainContainer);
    mount(document.body, main);

    const modalOverlayCloseIcon = el('button.modal-delete__close-button');
    const modalOverlayDeleteTask =
      el('button.modal-delete__delete-button', 'Удалить');
    const modalOverlayCloseButton =
      el('button.modal-delete__cancel-button', 'Отмена');
    const modalOverlay = el('.modal-overlay',
      el('.modal-delete',
        el('p.modal-delete__title', 'Удалить задачу?'),
        modalOverlayCloseIcon,
        modalOverlayDeleteTask,
        modalOverlayCloseButton),
    );
    mount(document.body, modalOverlay);
    return {windowPanelTitle, tomatoNumber, input,
      buttonTime, buttonStart, buttonStop, importanceButton,
      addTaskButton, modalOverlayCloseIcon, modalOverlayDeleteTask,
      modalOverlayCloseButton, modalOverlay};
  }

  renderTask(importanceObject) {
    const tasksWrapper = document.querySelector('.pomodoro-tasks__quest-tasks');
    const countNumberBlock =
      el('span.count-number', `${importanceObject.taskCount}`);
    const taskNameBlock =
      el('button.pomodoro-tasks__task-text.', `${importanceObject.taskName}`);
    const menuTaskButton = el('button.pomodoro-tasks__task-button');
    /* const editTaskButton =
      el('button.popup-button.burger-popup__edit-button', 'Редактировать'); */
    const deleteTaskButton =
      el('button.popup-button.burger-popup__delete-button', 'Удалить');
    const taskLi =
      el(`li.pomodoro-tasks__list-task.${importanceObject.taskImportance}`,
        countNumberBlock,
        taskNameBlock,
        menuTaskButton,
        el('.burger-popup',
          /* editTaskButton, */
          deleteTaskButton));
    mount(tasksWrapper, taskLi);
    return {countNumberBlock, taskNameBlock, menuTaskButton,
      deleteTaskButton, taskLi};
  }
}

export const render = new RenderTomato();
