// fetch the bathroom status
function getBathroomStatus() {
    return new Promise((resolve, reject) => {
        fetch('./status.php?of=toilet')
        .then(response => response.json())
        .then(data => {
            console.log('Bathroom status:', data)
            resolve(data);
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error);
        });
    });
}

// call the bathroom status function
function fetchReservations() {
    try {
        fetch('./reservations.php?')
        .then(response => response.json())
        .then(data => {
            console.log('Reservation status:', data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// set copyright year
var date = new Date();
var year = date.getFullYear();
document.getElementById('copyright-year').innerText = year;

// 言語設定
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var title_strings = {
    'en': {
        'site-title': 'THE COCOON TOWER',
        'h1': {
            'title': 'THE COCOON TOWER',
            'subtitle': 'A modern marvel in the heart of Tokyo'
        },
        'h2': {
            'title': 'AN ICONIC LANDMARK',
            'subtitle': 'with an unprecedented view of the nightlife'
        },
        'h3': {
            'title': 'A CLASSY INTERIOR',
            'subtitle': 'for all of your relaxation needs'
        },
    },
}

if (urlParams.has('lang') || navigator.language || navigator.userLanguage) {
    var lang = urlParams.get('lang') || navigator.language || navigator.userLanguage;
    switch(true) {
        case lang === 'ja' || lang === 'ja-JP':
            console.log('Language:', lang);
            document.title = 'コクーンタワー';
            // document.getElementById('site-title').innerText = 'コクーンタワー';
            break;
        case lang === 'en' || lang === 'en-US':
            console.log('Language:', lang);
            document.title = 'THE COCOON TOWER';
            // document.getElementById('site-title').innerText = 'THE COCOON TOWER';
            break;
        default:
            console.log('Language:', lang);
            document.title = 'The Cocoon Tower';
            // document.getElementById('site-title').innerText = 'THE COCOON TOWER';
            break;
    }
}

// SLIDER AND OFFNAV CONTROL


// OFFNAV (nav-overlay)
// 使い方：toggleNavOverlay() で nav-overlay を開閉
function toggleNavOverlay() {
    var navOverlay = document.getElementById('nav-overlay');
    var navOverlayButton = document.getElementById('nav-overlay-button');
    if (navOverlay.style.display === 'none' || navOverlay.style.display === '') {
        navOverlay.style.display = 'block';
        navOverlay.style.animation = 'slideLeft 0.5s ease-in-out forwards';
    } else {
        navOverlay.style.animation = 'slideRight 0.5s ease-in-out forwards';
        navOverlay.addEventListener('animationend', function handler() {
            navOverlay.style.display = 'none';
            navOverlay.removeEventListener('animationend', handler);
        }, {once: true} );
    }
}

// nav-overlayのリンクがクリックされたときに、nav-overlayを閉じる
var navLinks = document.getElementsByClassName('nav-overlay-content')[0].getElementsByTagName('a');
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function() {
        toggleNavOverlay();
    });
}

// toggle modal controller

// TODO: close modal when clicking outside of modal
function toggleModal(id) {
    // idはモーダルのidと同じ
    var modal = document.getElementById(id);
    var modalBackdrop = document.getElementById('modal-backdrop');
    if (modal.style.display === 'none' || modal.style.display === '') {
        console.log('opening modal' . id);
        modalBackdrop.style.display = 'block';
        modalBackdrop.style.animation = 'fadeIn 0.3s ease-in-out forwards';
        modal.style.display = 'grid';
        modal.style.animation = 'popIn 0.3s ease-in-out forwards';
    } else {
        console.log('closing modal' . id);
        modal.style.animation = 'popOut 0.3s ease-in-out forwards';
        modalBackdrop.style.animation = 'fadeOut 0.3s ease-in-out forwards';
        modal.addEventListener('animationend', function handler() {
            modal.style.display = 'none';
            modalBackdrop.style.display = 'none';
            modal.removeEventListener('animationend', handler);
        }, {once: true});
    }
}

// 予約カレンダーが開くときに、予約情報を取得する
function fillCalendar() {
    var calendar = document.getElementById('reservation-calendar');
    var daysOfWeek = document.getElementById('daysOfWeek');
    var week1 = document.getElementById('week-1');
    var week2 = document.getElementById('week-2');
    var week3 = document.getElementById('week-3');
    var week4 = document.getElementById('week-4');
    var week5 = document.getElementById('week-5');
    var week6 = document.getElementById('week-6');
    var days = ['日', '月', '火', '水', '木', '金', '土'];
    var date = new Date();
    var month = date.getMonth();
    document.getElementById('calendarMonth').innerText = date.toLocaleString('ja', { month: 'long' });
    // var month = 7;
    var year = date.getFullYear();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var firstDay = new Date(year, month, 1).getDay();
    var lastDay = new Date(year, month, daysInMonth).getDay();
    var day = 1;
    var dayOfWeek = 0;
    for (var i = 0; i < 6; i++) {
        var week = document.getElementById('week-' + (i + 1));
        for (var j = 0; j < 7; j++) {
            if (dayOfWeek < firstDay) {
                var empty = document.createElement('td');
                empty.innerText = '';
                week.appendChild(empty);
                dayOfWeek++;
            } else if (day <= daysInMonth) {
                var dayCell = document.createElement('td');
                dayCell.innerText = day;
                week.appendChild(dayCell);
                day++;
            } else {
                var empty = document.createElement('td');
                empty.innerText = '';
                week.appendChild(empty);
            }
        }
    }
}

function shrinkNav() {
    var hero1 = document.getElementById('hero1');
    var navbar = document.getElementById('navbar');
    var navbarTitle = document.getElementById('site-title');
    var navOverlayButton = document.getElementById('nav-overlay-button');
    // console.log('hero1 offsetTop:', hero1.getBoundingClientRect());
    if (hero1.getBoundingClientRect().top < -5) {
        navbar.style.padding = '0.5%';
        navbar.style.background = 'white';
        navbarTitle.style.fontSize = '1em';
        navbarTitle.style.color = 'black';
        navOverlayButton.style.color = 'black';
        navbarTitle.innerHTML = 'THE COCOON TOWER';
        // navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    } else {
        navbar.style.padding = '2%';
        navbarTitle.style.fontSize = '1.25em';
        // navbarTitle.style.color = 'white';
        // navbar.style.color = 'white';
        navOverlayButton.style.color = 'white';
        navbar.style.background = 'transparent';
        navbarTitle.innerHTML = '';
        // navbar.addEventListener('animationend', function handler() {
        //     console.log('navbar animation ended')
            
        //     navbar.removeEventListener('animationend', handler);
        // }, {once: true});
        // console.log('expanding navbar');
        // navbar.style.background = 'transparent';

    }
}

function draggable(id) {
    let mDown = false;
    let x, y;
    let startOfX, scrollLeft;
    let slider = document.getElementById(id);

    const startDrag = (e) => {
        mDown = true;
        x = e.pageX;
        startOfX = x - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        console.log('mousedown');
    }

    const endDrag = (e) => {
        mDown = false;
        console.log('mouseup');
    }

    const drag = (e) => {
        e.preventDefault();
        if (mDown) {
            let newX = e.pageX - startOfX;
            slider.scrollLeft = scrollLeft - newX;
        } else {
            return;
        }
    }
}

// load nav measurements AFTER DOM has loaded.
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');

    // fill the calendar
    fillCalendar();

    document.getElementById('content').onscroll = function() {
        // console.log('scrolling');
        shrinkNav();
    }
    
});

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 },
        styles: [
    {
        "elementType": "labels",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
        {
            "visibility": "off"
        }
        ]
    }
]
    });
}