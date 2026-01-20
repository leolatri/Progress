const createElement = (tag, className, child = null, text = '', type) => {
    const el = document.createElement(tag);
    if (type) el.type = type;
    if (className) el.className = className;
    if (child) el.appendChild(child);
    if (text) el.appendChild(document.createTextNode(' ' + text));
    return el;
};

const container = createElement('div', 'container');
const progressBar = createElement('div', 'progressBlock__circle');
const progressBlock = createElement('div', 'container__progressBlock', progressBar);
const menuBlock = createElement('div', 'container__menuBlock');

const valueInput = createElement('input', 'menuBlock__valueInput', null, '', 'number');
const animateToggle = createElement('input', 'menuBlock__toggle', null, '', 'checkbox');
const hideToggle = createElement('input', 'menuBlock__toggle', null, '', 'checkbox');

const valueBlock = createElement('div', 'menuBlock__block', valueInput, 'Value');
const animateBlock = createElement('div', 'menuBlock__block', animateToggle, 'Animate');
const hideBlock = createElement('div', 'menuBlock__block', hideToggle, 'Hide');

const labelProgress = createElement('label', '', null, 'Progress');
container.appendChild(labelProgress);

[valueBlock, animateBlock, hideBlock].forEach((block) => menuBlock.appendChild(block));

container.appendChild(progressBlock);
container.appendChild(menuBlock);
document.body.appendChild(container);

valueInput.value = 0;

const handleProgress = (percent, animate = false) => {
    let degrees = percent > 0  ? (percent / 100) * 360 : 0;
    
    progressBar.style.animation = 'none';
    
    if (animate) {
        if(degrees == 0) {
            degrees = 30;
        };
        
        progressBar.style.background = `conic-gradient(
            #005cff 0deg ${degrees}deg,
            #eaf0f6 ${degrees}deg 360deg
        )`;
        
        progressBar.style.animation = 'progress 2s linear infinite';
        
    } else {        
        progressBar.style.background = `conic-gradient(
            #005cff 0deg ${degrees}deg,
            #eaf0f6 ${degrees}deg 360deg
        )`;
        
        progressBar.style.animation = 'none';
    }
}

valueInput.addEventListener('change', (e) => {
    let val = parseInt(e.target.value) || 0;
    
    val = val > 100 ? 100 : (val < 0 ? 0 : val);
    valueInput.value = val;

    handleProgress(val, animateToggle.checked);
})

animateToggle.addEventListener('change', (e) => {
    let state = e.target.checked;
    
    if (state) {
        animateToggle.className = 'menuBlock__toggle menuBlock__toggle--check';

        hideBlock.checked = false;
        hideToggle.classList.remove('menuBlock__toggle--check');
        progressBar.style.display = 'flex';

        handleProgress(parseInt(valueInput.value), state);
    } else {
        animateToggle.classList.remove('menuBlock__toggle--check');
        handleProgress(parseInt(valueInput.value), state);
    }
});

hideToggle.addEventListener('change', (e) => {
    let state = e.target.checked;
    if (state) {
        hideToggle.className = 'menuBlock__toggle menuBlock__toggle--check';

        animateToggle.checked = false;
        progressBar.style.animation = 'none';
        animateToggle.classList.remove('menuBlock__toggle--check');
        progressBar.style.display = 'none';
    } else {
        hideToggle.classList.remove('menuBlock__toggle--check');
        progressBar.style.display = 'flex';
    }
})
