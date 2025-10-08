import { Tween } from 'svelte/motion';
import { cubicIn, cubicOut } from 'svelte/easing';

const animateOut = (tween, element, nodeContent) => {
    tween.set(0);

    if (element) {
        element.innerHTML = nodeContent;
        element.classList.remove('bounce');
    }

    return tween;
};

const animateCombine = (tween, element, data) => {
    element.classList.add('bounce');

    const avg = data.avg * 100 / 4;

    const opt = {
        delay: 100,
        duration: 200,
        easing: cubicIn,
    };

    tween.set(avg, opt).then(() => {
        element.innerHTML = '<span>💑</span>';
        element.classList.remove('bounce');
    });

    return tween;
};

const animateIn = (tween, element, data, key, nodeContent) => {
    const base = data[key];
    const value = (base * 100) / 4;

    if (isNaN(value)) return tween;

    tween.set(value).then(() => {
        if (data.isCombined && !isNaN(data.avg) && key !== 's') {
            animateCombine(tween, element, data);
        } else if (element) {
            element.innerHTML = nodeContent;
            element.classList.remove('bounce');
        }
    });

    return tween;
};

export const animateM = (tween, element, data) => {
    const nodeContent = '<span>👨</span>';

    return data.isVisible
        ? animateIn(tween, element, data, 'm', nodeContent)
        : animateOut(tween, element, nodeContent);
};

export const animateF = (tween, element, data) => {
    const nodeContent = '<span>👩</span>';

    return data.isVisible
        ? animateIn(tween, element, data, 'f', nodeContent)
        : animateOut(tween, element, nodeContent);
};

export const animateS = (tween, data) => {
    return data.isVisible
        ? animateIn(tween, null, data, 's')
        : animateOut(tween, null);
};


export const emptyTween = function() {
    return Tween.of(() => 0, {
        delay: 50,
        duration: 400,
        easing: cubicOut,
    });
};

export const round = function(num) {
    return Math.round(num * 100) / 100;
};
