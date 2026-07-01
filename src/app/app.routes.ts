import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Portfolio } from './portfolio/portfolio';
import { Details } from './details/details';
import { About } from './about/about';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: '', component: Home, title: 'Elena Marchetti Photography' },
  { path: 'portfolio', component: Portfolio, title: 'Portfolio | Elena Marchetti Photography' },
  { path: 'about', component: About, title: 'About | Elena Marchetti Photography' },
  { path: 'contact', component: Contact, title: 'Contact | Elena Marchetti Photography' },
  { path: 'details/:id', component: Details, title: 'Image Details | Elena Marchetti Photography' },
  { path: '**', redirectTo: '' },
];