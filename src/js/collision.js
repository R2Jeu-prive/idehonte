function collide(element1, element2) {
    rect1 = element1.getBoundingClientRect();
    rect2 = element2.getBoundingClientRect();

    return !(
        ((rect1.y + rect1.height) < (rect2.y)) ||
        (rect1.y > (rect2.y + rect2.height)) ||
        ((rect1.x + rect1.width) < rect2.x) ||
        (rect1.x > (rect2.x + rect2.width))
    );
}
