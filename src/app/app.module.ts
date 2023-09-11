import { FlashcardsService } from './flashcards/services/flashcards.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Firebase Modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

// Material components 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { Header1Component } from './notUsed/header1/header1.component';
import { SidebarComponent } from './home/components/sidebar/sidebar.component';
import { Header2Component } from './notUsed/header2/header2.component';
// import { PageComponent } from './page/page.component';
import { HeadingComponent } from './page/pageComponents/heading/heading.component';
import { SubHeadingComponent } from './page/pageComponents/sub-heading/sub-heading.component';
// import { BulletPointsComponent } from './page/pageComponents/bullet-points/bullet-points.component';
// import { ToggleComponent } from './page/pageComponents/toggle/toggle.component';
// import { DividerComponent } from './page/pageComponents/divider/divider.component';
// import { ToDoListComponent } from './page/pageComponents/to-do-list/to-do-list.component';
// import { RecursiveComponent } from './page/recursive/recursive.component';
// // import { PageComponentSorterComponent } from './page/page-component-sorter/page-component-sorter.component';
// import { TextComponent } from './page/pageComponents/text/text.component';
// import { HandleComponent } from './page/smallComponents/handle/handle.component';
import { Page2Component } from './page2/page2.component';
import { Recursive2Component } from './page2/recursive2/recursive2.component';
import { Handle2Component } from './page2/smallComponents/handle2/handle2.component';
import { ComponentSorterComponent } from './page2/component-sorter/component-sorter.component';
import { PlaceholderComponent } from './page2/smallComponents/placeholder/placeholder.component';
import { SafeHtmlPipe } from './page2/component-sorter/safeHTMLPipe';
import { NotesComponent } from './notes/notes.component';
import { NotesRecurseComponent } from './notes/components/notes-recurse/notes-recurse.component';
import { NotesService } from './notes/services/notes.service';
import { RenderNoteComponent } from './notes/components/render-note/render-note.component';
import { OptionsBarComponent } from './notes/components/options-bar/options-bar.component';
import { ReplComponent } from './notes/components/repl/repl.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { LogoutGuard } from './account/guards/logout.guard';
import { AccountGuard } from './account/guards/account.guard';
import { NavigatorService } from './home/services/navigator.service';
import { SharingComponent } from './notes/components/sharing/sharing.component';
import { FlashcardsOptionsComponent } from './notes/components/flashcards-options/flashcards-options.component';
import { BreadcrumbComponent } from './notes/components/breadcrumb/breadcrumb.component';
import { DashboardComponent } from './home/components/dashboard/dashboard.component';
import { SettingsComponent } from './home/components/settings/settings.component';
import { SafeUrlPipe } from './notes/pipes/safe-url.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AccountComponent,
        Header1Component,
        SidebarComponent,
        Header2Component,
        // PageComponent,
        HeadingComponent,
        SubHeadingComponent,
        // BulletPointsComponent,
        // ToggleComponent,
        // DividerComponent,
        // ToDoListComponent,
        // RecursiveComponent,
        // PageComponentSorterComponent,
        // TextComponent,
        // HandleComponent,
        Page2Component,
        Recursive2Component,
        Handle2Component,
        ComponentSorterComponent,
        PlaceholderComponent,
        NotesComponent,
        NotesRecurseComponent,
        RenderNoteComponent,
        OptionsBarComponent,
        ReplComponent,
        FlashcardsComponent,
        SharingComponent,

        SafeHtmlPipe,
        FlashcardsOptionsComponent,
        BreadcrumbComponent,
        DashboardComponent,
        SettingsComponent,
        SafeUrlPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule, 
        ReactiveFormsModule,

        // Material components
        MatSlideToggleModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatSelectModule,
        MatTabsModule,
        MatToolbarModule,
        MatMenuModule,
        MatSidenavModule,
        DragDropModule,
        BrowserAnimationsModule,

        // Firebase Modules
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,

        // Routing
        RouterModule.forRoot([
            { path: '', component: AccountComponent, canActivate: [LogoutGuard]},
            { path: 'refresh', component: AccountComponent},
            { path: '**', component: HomeComponent, canActivate: [AccountGuard]}
        ]),
    ],
    providers: [
        NotesService,
        NavigatorService,
        FlashcardsService
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA 
    ]
})
export class AppModule { }
