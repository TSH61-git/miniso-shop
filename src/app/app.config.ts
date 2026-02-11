import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core'; // פונקציית עזר לייבוא מודולים
import { ReactiveFormsModule } from '@angular/forms'; // ייבוא עבור הטפסים

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule)
  ]
};
