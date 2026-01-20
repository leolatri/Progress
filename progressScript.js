const createUI = () => {
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

    [valueBlock, animateBlock, hideBlock].forEach((block) => menuBlock.appendChild(block));
    [labelProgress, progressBlock, menuBlock].forEach((block) => container.appendChild(block));

    document.body.appendChild(container);

    return {
        container,
        progressBar,
        valueInput,
        animateToggle,
        hideToggle
    };
}


const updateState = (uiElements, state) => {
    const { animateToggle, hideToggle, valueInput, progressBar } = uiElements;
    const { value, isAnimate, isHide } = state;

    let degrees = value > 0 ? (value / 100) * 360 : 0;

    if (isAnimate) {
        if (degrees === 0) degrees = 30;
        progressBar.style.animation = 'progress 2s linear infinite';
    } else progressBar.style.animation = 'none';

    progressBar.style.background = `conic-gradient(
            #005cff 0deg ${degrees}deg,
            #eaf0f6 ${degrees}deg 360deg
        )`;
    progressBar.style.display = isHide ? 'none' : 'flex';

    valueInput.value = value;
    animateToggle.checked = isAnimate;
    hideToggle.checked = isHide;

    if(isAnimate) animateToggle.className ='menuBlock__toggle menuBlock__toggle--check';
    else  animateToggle.classList.remove('menuBlock__toggle--check');

    if(isHide) hideToggle.className ='menuBlock__toggle menuBlock__toggle--check';
    else  hideToggle.classList.remove('menuBlock__toggle--check');
}

const initState = (uiElements) => {
    const { animateToggle, hideToggle, valueInput } = uiElements;

    let state = {
        value: parseInt(valueInput.value) || 0,
        isAnimate: animateToggle.checked,
        isHide: hideToggle.checked
    };

    valueInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value) || 0;
        val = val > 100 ? 100 : (val < 0 ? 0 : val);
        state.value = val;
        updateState(uiElements, state);
    });

    animateToggle.addEventListener('change', (e) => {
        state.isAnimate = e.target.checked;
        if (state.isAnimate) {
            state.isHide = false; 
        }
        updateState(uiElements, state);
    });

    hideToggle.addEventListener('change', (e) => {
        state.isHide = e.target.checked;
        if (state.isHide) {
            state.isAnimate = false; 
        }
        updateState(uiElements, state);
    });

    return state;
};

const createApp = () => {
    const uiElements = createUI();
    const state = initState(uiElements);
    updateState(uiElements, state);
    
    return {
        ui: uiElements,
        state,
        setValue: (newValue) => {
            state.value = Math.max(0, Math.min(100, newValue));
            updateState(uiElements, state);
        },
        toggleAnimate: () => {
            state.isAnimate = !state.isAnimate;
            if (state.isAnimate) state.isHide = false;
            updateState(uiElements, state);
        },
        toggleHide: () => {
            state.isHide = !state.isHide;
            if (state.isHide) state.isAnimate = false;
            updateState(uiElements, state);
        }
    };
};

createApp();
