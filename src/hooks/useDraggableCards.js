import { useState, useCallback } from 'react';

export const useDraggableCards = (initialPositions = []) => {
    const [cardPositions, setCardPositions] = useState(initialPositions);
    const [draggingCard, setDraggingCard] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = useCallback((e, index, isDraggable = true) => {
        if (!isDraggable) return;
        e.preventDefault();
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        setDraggingCard(index);
        setDragOffset({ x: e.clientX - centerX, y: e.clientY - centerY });
    }, []);

    const handleMouseMove = useCallback((e, isDraggable = true) => {
        if (draggingCard === null || !isDraggable) return;
        const container = e.currentTarget;
        const containerRect = container.getBoundingClientRect();

        const newCenterX = e.clientX - dragOffset.x;
        const newCenterY = e.clientY - dragOffset.y;

        const xPct = ((newCenterX - containerRect.left) / containerRect.width) * 100;
        const yPct = ((newCenterY - containerRect.top) / containerRect.height) * 100;

        const newLeft = Math.max(0, Math.min(100, xPct));
        const newTop = Math.max(0, Math.min(100, yPct));

        setCardPositions(prev => prev.map((pos, i) => i === draggingCard ? { ...pos, top: newTop, left: newLeft } : pos));
    }, [draggingCard, dragOffset]);

    const handleMouseUp = useCallback(() => {
        setDraggingCard(null);
    }, []);

    return {
        cardPositions,
        setCardPositions,
        draggingCard,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        setDraggingCard
    };
};
