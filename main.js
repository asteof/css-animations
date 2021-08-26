const topBtn = document.querySelector(".button-top");
const root = document.documentElement;

window.addEventListener('scroll', () => {
    if (root.scrollTop > 400) {
        topBtn.style.visibility = 'visible';
        topBtn.style.opacity = '0.4';
    } else {
        topBtn.style.visibility = 'hidden';
        topBtn.style.opacity = '0';
    }
});

topBtn.addEventListener('mouseenter', () => {
    topBtn.style.opacity = '0.8';
})

topBtn.addEventListener('mouseleave', () => {
    topBtn.style.opacity = '0.4';
})

topBtn.addEventListener('click', () => {
    root.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ASSIGNING CLASS
const heart = document.querySelector('img.js');

heart.addEventListener('click', () => {
    heart.classList.add('heart-flip');
    setTimeout(() => heart.classList.remove('heart-flip'), 500)
})

// --ASSIGNING CLASS
// MOVING BOX
/**/
const box3Container = document.querySelector('.animation-board.js');
const box = document.querySelector('.box3.js');
const stopMoving = document.querySelector('#stopMoving');

let moveBox = null;
let maxLeft = 0;
let maxBottom = 0;
let isRunning = false;

const calculateMaxPoints = () => {
    box.style.top = '0';
    box.style.left = '0';
    const boxDimension = box.clientWidth;
    maxLeft = box3Container.clientWidth - boxDimension;
    maxBottom = box3Container.clientHeight - boxDimension;
}
const moveBoxAnimFrame = () => {
    const positionX = parseInt(box.style.left);
    const positionY = parseInt(box.style.top);
    // console.log('frame',positionX, positionY, maxBottom, maxLeft)
    if (positionX !== maxLeft && positionY === 0) {

        box.style.left = `${ (positionX + 1).toString() }px`;
    } else if (positionX === maxLeft && positionY < maxBottom) {
        box.style.top = `${ (positionY + 1).toString() }px`;
    } else if (positionX > 0 && positionY === maxBottom) {
        box.style.left = `${ (positionX - 1).toString() }px`;
    } else if (positionX === 0 && positionY > 0) {
        box.style.top = `${ (positionY - 1).toString() }px`;
    }
}

window.addEventListener('resize', () => {
    if (isRunning) {
        clearInterval(moveBox);
        calculateMaxPoints();
        moveBox = setInterval(moveBoxAnimFrame, 20);
    }
})

calculateMaxPoints();

stopMoving.addEventListener('click', (e) => {
    if (moveBox !== null) {
        clearInterval(moveBox);
        moveBox = null;
        isRunning = false;
        e.target.textContent = 'Start';
    } else {
        moveBox = setInterval(moveBoxAnimFrame, 20);
        e.target.textContent = 'Stop';
        isRunning = true;
    }
})
/**/
// --MOVING BOX
// SPINNING BORDER

const borderCircle1 = document.querySelector('.border-anim3.js');
const borderCircle2 = document.querySelector('.border-anim4.js');

const controls = {
    duration: document.getElementById('duration'),
    iterationCount: document.getElementById('iteration'),
    p0: document.getElementById('p0'),
    p1: document.getElementById('p1'),
    p2: document.getElementById('p2'),
    p3: document.getElementById('p3'),
};

const keyInput = document.querySelectorAll('.controls label input');
const controlsDomElements = Object.values(controls);
const controlsKeys = Object.keys(controls);

const animationProperties = {
    duration: '2',
    iterationCount: 'infinite',
    p0: '0',
    p1: '0',
    p2: '1',
    p3: '1',
};

const spinBorder = () => {
    const {duration, iterationCount, p0, p1, p2, p3} = animationProperties;
    const animation = `rotate ${ duration }s ${ iterationCount } cubic-bezier(${ p0 }, ${ p1 },${ p2 }, ${ p3 })`
    borderCircle1.style.animation = animation;
    borderCircle2.style.animation = animation;
}

const changeAnimationProps = (el, i) => {
    const value = parseFloat(el.value);
    let CSS_Value = Number.isInteger(value) ? value.toString() : value.toFixed(2);

    if (i === 1 && CSS_Value === '100') {
        CSS_Value = 'infinite';
    }
    const key = controlsKeys[i];
    animationProperties[key] = CSS_Value;

    return CSS_Value;
}

controlsDomElements.forEach((el, i) => {
    el.addEventListener('change', () => {
        const CSS_Value = changeAnimationProps(el, i);
        keyInput[i].value = CSS_Value;
        spinBorder();
    })
});

keyInput.forEach((el, i) => {
    el.addEventListener('change', () => {
        const CSS_Value = changeAnimationProps(el, i);
        controlsDomElements[i].value = CSS_Value;
        spinBorder();
    })
});

spinBorder();
