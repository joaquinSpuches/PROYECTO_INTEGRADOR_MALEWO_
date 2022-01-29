let bannerStatus = 1;
let timer = 4000;

window.addEventListener('load', () => {
    bannerLoop()
});

let start = setInterval(() => {
    bannerLoop()
}, timer);

document.querySelector('#main-banner').onmouseenter = () => {
    clearInterval(start)
};

document.querySelector('#main-banner').onmouseleave = () => {
    start = setInterval(() => {
        bannerLoop()
    }, timer);
};

function bannerLoop () {
    if(bannerStatus === 1) {
        document.querySelector('#imgBanner2').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('#imgBanner1').style.right = '0px';
            document.querySelector('#imgBanner1').style.zIndex = '2000';
            document.querySelector('#imgBanner2').style.right = '-1250px';
            document.querySelector('#imgBanner2').style.zIndex = '100';
            document.querySelector('#imgBanner3').style.right = '1250px';
            document.querySelector('#imgBanner3').style.zIndex = '1500';
        }, 500)
        setTimeout(() => {
            document.querySelector('#imgBanner2').style.opacity = '1';
        }, 500)
        bannerStatus = 2;
    }
    else if(bannerStatus === 2) {
        document.querySelector('#imgBanner3').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('#imgBanner2').style.right = '0px';
            document.querySelector('#imgBanner2').style.zIndex = '2000';
            document.querySelector('#imgBanner3').style.right = '-1250px';
            document.querySelector('#imgBanner3').style.zIndex = '100';
            document.querySelector('#imgBanner1').style.right = '1250px';
            document.querySelector('#imgBanner1').style.zIndex = '1500';
        }, 500)
        setTimeout(() => {
            document.querySelector('#imgBanner3').style.opacity = '1';
        }, 500)
        bannerStatus = 3;
    }
    else if(bannerStatus === 3) {
        document.querySelector('#imgBanner1').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('#imgBanner3').style.right = '0px';
            document.querySelector('#imgBanner3').style.zIndex = '2000';
            document.querySelector('#imgBanner1').style.right = '-1250px';
            document.querySelector('#imgBanner1').style.zIndex = '100';
            document.querySelector('#imgBanner2').style.right = '1250px';
            document.querySelector('#imgBanner2').style.zIndex = '1500';
        }, 500)
        setTimeout(() => {
            document.querySelector('#imgBanner1').style.opacity = '1';
        }, 500)
        bannerStatus = 1;
    }
}