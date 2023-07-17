import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { EmailDialogComponent } from './email-dialog/email-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactParentsComponent } from './contact-parents/contact-parents.component';
import { PhoneDialogComponent } from './phone-dialog/phone-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    SidenavComponent,
    HeaderComponent,
    EmailDialogComponent,
    ContactParentsComponent,
    PhoneDialogComponent,
  ],
  imports: [
    RouterModule,
    MatSnackBarModule,
    FormsModule,
    MatMenuModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  exports: [
    SidenavComponent,
    HeaderComponent,
    EmailDialogComponent,
    PhoneDialogComponent,
  ],
})
export class SharedModule {}
