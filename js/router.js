export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }
  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, '', event.target.href);

    this.handle();
  }
  handle() {
    const {pathname} = window.location;
    const route = this.routes[pathname] || this.routes[404];
    
    const navLinks = document.querySelectorAll('.nav-link');
    Array.from(navLinks).forEach(link => {
      if (link.pathname == pathname) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
      
    })

    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html;
    });
  }
}




