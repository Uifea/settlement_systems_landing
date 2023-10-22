let cardArray = document.querySelectorAll('.card');
let title = document.querySelector('.payment-services__title');
let copyright = document.querySelector('.page-footer__copyright');


window.addEventListener('resize', move);
window.addEventListener('DOMContentLoaded', move);

function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width >= 750) {
        cardArray.forEach((item) => {
            let bodyCard = item.querySelector('.card__body');
            let dropdownTitle = item.querySelector('.dropdown__title');
            dropdownTitle.classList.add('hide');
            bodyCard.classList.remove('hide');
            item.classList.remove('dropdown');
            
        });
        title.textContent = 'Здесь можно оплатить';
        copyright.innerHTML = `© 2012 – 2020<br> ООО «Название компании»`
	} else {
        cardArray.forEach((item) => {
            let bodyCard = item.querySelector('.card__body');
            let dropdownTitle = item.querySelector('.dropdown__title');
            dropdownTitle.classList.remove('hide');
            bodyCard.classList.add('hide');
            item.classList.add('dropdown');
        });
        title.textContent = 'Узнайте, как оплатить';
        copyright.innerHTML = `© 2012 – 2020 ООО «Название компании»`
	}
}