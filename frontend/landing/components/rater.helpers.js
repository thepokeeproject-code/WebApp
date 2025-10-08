import { Tween } from 'svelte/motion';
import { backOut, cubicOut, elasticOut } from 'svelte/easing';

const twValue = {
    duration: 1000,
    easing: elasticOut,
};

export const createTweens = function() {
    const twSelector = Tween.of(() => 0, {
        delay: 0,
        duration: 150,
        easing: cubicOut,
    });

    const twSelectorScale = Tween.of(() => 0, {
        delay: 0,
        duration: 300,
        easing: backOut,
    });

    const tw1 = Tween.of(() => 0, {
        ...twValue,
        delay: 30,
    });

    const tw2 = Tween.of(() => 0, {
        ...twValue,
        delay: 60,
    });

    const tw3 = Tween.of(() => 0, {
        ...twValue,
        delay: 90,
    });

    const tw4 = Tween.of(() => 0, {
        ...twValue,
        delay: 120,
    });

    const tw5 = Tween.of(() => 0, {
        ...twValue,
        delay: 150,
    });

    return {
        twSelector,
        twSelectorScale,
        tw1,
        tw2,
        tw3,
        tw4,
        tw5,
    };
};

export const updateTweens = function(values) {
    values.twSelector.set(180);
    values.twSelectorScale.set(1);
    values.tw1.set(1);
    values.tw2.set(1);
    values.tw3.set(1);
    values.tw4.set(1);
    values.tw5.set(1);
};

export const resetTweens = function(values) {
    values.twSelector.set(0);
    values.twSelectorScale.set(0);
    values.tw1.set(0);
    values.tw2.set(0);
    values.tw3.set(0);
    values.tw4.set(0);
    values.tw5.set(0);
};
