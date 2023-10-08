// ==UserScript==
// @name         FAjax
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.furaffinity.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=furaffinity.net
// @grant        none
// ==/UserScript==

console.log("fAJAX");

function ajaxify_fav_button() {
    let elements = document.getElementsByClassName("fav");

    for (let e of elements) {
        let link = e.children[0];
        let favURL = link.href;

        console.log(favURL);

        link.onclick = function () {
            let f = async function () {
                let result = await fetch(favURL);
                console.log(result);
                link.innerHTML = (link.innerHTML == "+ Fav") ? "✓ Faved" : "✓ Unfaved";
                link.onclick = function () {};
            }

            f();
        }

        link.style.cursor = "pointer";
        link.removeAttribute("href");
    }
}

ajaxify_fav_button();

function remove_redundant_elements() {
    let elements = document.getElementsByClassName("favorite-nav");
    for (let e of elements) {
        e.remove();
    }
}

//remove_redundant_elements();

var gFABasePageTitle = document.title;

function update_title_notifications() {
    let message_area = document.getElementsByClassName("message-bar-desktop")[0];
    let messages = message_area.children;
    let types_list = [];

    for (let e of messages) {
        types_list.push(e.innerHTML);
    }

    let message_string = types_list.join(" ");
    //console.log(message_string);

    document.title = (message_string != "") ? `(${message_string}) ${gFABasePageTitle}` : gFABasePageTitle;
}

// Even without ajax notifications we should still do it once
update_title_notifications();

function ajaxify_notifications() {
    setInterval(function() {
        let f = async function () {
            let otherDoc = document.implementation.createHTMLDocument('');
            let result = await (await fetch("/msg/others/")).text();
            otherDoc.open();
            otherDoc.write(result);
            otherDoc.close();
            document.getElementsByClassName("message-bar-desktop")[0].innerHTML = otherDoc.getElementsByClassName("message-bar-desktop")[0].innerHTML;
            update_title_notifications();
        }

        f();
    }, 5 * 60 * 1000)
}

ajaxify_notifications();
