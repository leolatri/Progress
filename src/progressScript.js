const createElement = (tag, className, child = null, text = '', type) => {
    const el = document.createElement(tag);
    if(type) el.type = type;
    if (className) el.className = className;
    if (child) el.appendChild(child);
    if (text) el.appendChild(document.createTextNode(' ' + text));
    return el;
};

const container = createElement('div', 'container');
const progressBlock = createElement('div', 'container__progressBlock');
const menuBlock = createElement('div', 'container__menuBlock');

const valueInput = createElement('input', 'menuBlock__valueInput', null, '', 'number');
const animateToggle = createElement('input', 'menuBlock__toggle', null, '', 'checkbox');
const hideToggle = createElement('input', 'menuBlock__toggle', null, '', 'checkbox');

const valueBlock = createElement('div', 'menuBlock__block', valueInput, 'Value');
const animateBlock = createElement('div', 'menuBlock__block', animateToggle, 'Animate');
const hideBlock = createElement('div', 'menuBlock__block', hideToggle, 'Hide');

[valueBlock, animateBlock, hideBlock].forEach((block) => menuBlock.appendChild(block));

container.appendChild(progressBlock);
container.appendChild(menuBlock);
document.body.appendChild(container);


valueInput.addEventListener('change', (e) => {
    let val = parseInt(e.target.value);

    val = val > 100 ? 100 : (val < 0 ? 0 : val);
    valueInput.value = val;
})

animateToggle.addEventListener('change', (e) => {
    let state = e.target.checked;
    // console.log('ani ', state);
    if(state) {
        animateToggle.className = 'menuBlock__toggle menuBlock__toggle--check';

        hideBlock.checked = false;
        hideToggle.classList.remove('menuBlock__toggle--check');
    } else {
        animateToggle.classList.remove('menuBlock__toggle--check');
    }
});

hideToggle.addEventListener('change', (e) => {
    let state = e.target.checked;
    // console.log('hide ',state);
    if(state) {
        hideToggle.className = 'menuBlock__toggle menuBlock__toggle--check';

        animateToggle.checked = false;
        animateToggle.classList.remove('menuBlock__toggle--check');
    } else {
        hideToggle.classList.remove('menuBlock__toggle--check');
    }
})
