import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Renderer2, ElementRef, ViewChild } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    submenu: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [  
    {
        path: '/dashboard',
        title: 'HomePage',
        icon: 'nc-bank',
        class: '',
        submenu: [
        ],
    },
    { path: '/users', title: 'App Users', icon: 'nc-single-02', class: '', submenu: [], },
    {
        path: 'cards', title: 'Cards', icon: 'nc-badge', class: '', submenu: [],
    },
    {
        path: 'playlist', title: 'Damee Competition', icon: 'nc-note-03', class: '', submenu: [
            {
                path: "/playlist",
                title: "Damee Competition",
                icon: "nc-note-03",
                class: "has-sub",
                submenu: [],
            },
            {
                path: "/maps",
                title: "Damee Live",
                icon: "nc-favourite-28",
                class: "has-sub",
                submenu: [],
            }
        ],
    },
    {
        path: 'marketplace', title: 'Marketplace', icon: 'nc-cart-simple', class: '', submenu: [
          
        ]
    },
    {
        path: '/adverts', title: 'Upload Adverts', icon: 'nc-cloud-upload-94', class: '', submenu: []
    },
    {
        path: '/search', title: 'Transactions', icon: 'nc-box', class: '', submenu: [
            {
                path: "search",
                title: "All Transactions",
                icon: 'nc-box',
                class: "has-sub",
                submenu: [],
            },
            // {
            //     path: "record-card",
            //     title: "Record Card Revenue",
            //     icon: "nc-badge",
            //     class: "has-sub",
            //     submenu: [],
            // },
            {
                path: "revenue_batch",
                title: "All Card Revenues",
                icon: 'nc-money-coins',
                class: "has-sub",
                submenu: [],
            },
            // {
            //     path: "master-wallet",
            //     title: "Damee Wallet",
            //     icon: "nc-atom",
            //     class: "has-sub",
            //     submenu: [],
            // },
            {
                path: "withdrawals",
                title: "Withdrawals",
                icon: "nc-atom",
                class: "has-sub",
                submenu: [],
            },
            
        ]

    },
    { path: '/knowledge-base', title: 'Knowledge Base', icon: 'nc-single-copy-04', class: '', submenu: [] },
    { path: '/headers', title: 'Headers On App', icon: 'nc-key-25', class: '', submenu: [] },
    // { path: '/notifications', title: 'Notifications', icon: 'nc-email-85', class: '', submenu: [] },
   
    
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit {
    @ViewChild('itemEl') hamburgerBig: ElementRef;
    public menuItems: any[];
    showSub: boolean;
    title;
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }


    showSubmenu(title) {
        // itemEl.classList.toggle("showMenu");

        this.showSub = !this.showSub
        this.title = title

        // const itemEl = <HTMLElement>document.querySelector('.dropdown-title');
        // itemEl.classList.toggle('showMenu');

        console.log("show sub Menu ", title)
        console.log("show sub showSub ", this.showSub)
    }
}

