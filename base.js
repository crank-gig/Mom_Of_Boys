/*Menu*/
const menu = document.querySelector('.menu');
const openMenu = () => {
    menu.style.right="0%"
}
const closeMenu = () => {
    menu.style.right="-100%"
}

        /*Progressive loading*/
const doStuffs = (item,observer) => {
    if (item.hasAttribute("lazy")){
        //lazy loading function here
        let imgUrl=item.getAttribute("img-src"), img = document.createElement("img")
        img.setAttribute("src", imgUrl);
        img.onload=()=>{
            item.style.backgroundImage=`url(${imgUrl})`;
            item.style.filter="blur(0px)";
        }
        //if(/^https/.test(imgUrl) !== true){}
    }
}

const lazyLoader = () => {
    const lazy=document.querySelectorAll('[lazy]');
    if ("IntersectionObserver" in window){
        //pushElements()
        const observer=new IntersectionObserver((items,observer)=>{
            items.forEach((item)=>{
            if (item.isIntersecting){
                doStuffs(item.target,observer)
                //stop observing
                observer.unobserve(item.target)
            }
            })
        })
        lazy.forEach((elem)=>{
            observer.observe(elem)
        })
    }
    else{
        lazy.forEach((item)=>{
            let imgUrl=item.getAttribute("img-src")
            item.style.backgroundImage=`url(${imgUrl})`;
        })
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    //lazy load images
    lazyLoader()
});