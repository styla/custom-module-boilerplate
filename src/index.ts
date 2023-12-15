window.styla.registerCustomModule('NAME', async (wrapper, _content) => {

    const cartContainer = wrapper.querySelector('.cartContainer');

    const onCartClick = () => {
        const cartOverlay = wrapper.querySelector<HTMLDivElement>('.cartOverlay');

        const currentOverlayState = cartOverlay.dataset.overlayVisible;

        if (currentOverlayState == 'yes') {
            cartOverlay.dataset.overlayVisible = 'no';
        } else {
            cartOverlay.dataset.overlayVisible = 'yes';
        }
    };

    cartContainer?.addEventListener( 'click', onCartClick );
});
