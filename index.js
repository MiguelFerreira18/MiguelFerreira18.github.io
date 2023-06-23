







const wheel = document.querySelector('.wheel');
const balls = document.querySelectorAll('.ball');

const radius = 120; // Adjust this value based on your requirements
const angle = (Math.PI * 2) / balls.length;
let rotation = 0;

balls.forEach((ball, index) => {
  const x = Math.round(radius * Math.cos(rotation) - ball.offsetWidth / 2);
  const y = Math.round(radius * Math.sin(rotation) - ball.offsetHeight / 2);

  ball.style.transform = `translate(${x}px, ${y}px)`;
  rotation += angle;
});



let hamburguer = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

hamburguer.onclick = () =>{
    hamburguer.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}









let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');






window.onscroll = () =>{
    sections.forEach(section =>{
        let top = window.scrollY;
        let offset = section.offsetTop - 100;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');
        if(top >= offset && top < offset + height){
            navlinks.forEach(link =>{
                link.classList.remove('active');
                document.querySelector('header nav a[href*='+ id +']').classList.add('active');
            })
            
        }

    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    hamburguer.classList.remove('bx-x');
    navbar.classList.remove('active');

}