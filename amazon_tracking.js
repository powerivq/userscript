// ==UserScript==
// @name         Amazon tracking form
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Paste Amazon tracking!
// @author       You
// @match        https://www.amazon.com/progress-tracker/package/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const shippingContainer = document.querySelector('#carrierRelatedInfo-container');
    if (!shippingContainer) return;

    const trackingCt = document.querySelector('.carrierRelatedInfo-trackingId-text')?.textContent;
    const parsedTracking = /^Tracking ID: ([0-9A-Z]+)$/.exec(trackingCt);
    if (!parsedTracking) return;
    const tracking = parsedTracking[1];

    const addressee = document.querySelector('.shippingAddress p')?.textContent;
    if (!addressee) return;

    const itemList = document.querySelectorAll('#itemImagesCarousel-container .a-link-normal');
    const quantity = itemList.length > 1 ? '' : (itemList[0].querySelector('.itemImages-quantityLabel')?.textContent ?? '1');

    const btn = document.createElement('button');
    btn.innerText = 'Copy Shipping';
    shippingContainer.appendChild(btn);
    btn.onclick = () => {
        navigator.clipboard.writeText(`${addressee},${tracking},${quantity}`)
            .then(() => {btn.innerText = 'Copied';}, () => {btn.innerText = 'Copy Failed';});
    };
})();

