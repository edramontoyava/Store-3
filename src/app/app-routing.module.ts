import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UpdateProductPage } from './update-product/update-product.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'update-product',
    loadChildren: () => import('./update-product/update-product.module').then( m => m.UpdateProductPageModule)
  },
  {
    path: 'update-product/:index',
    component: UpdateProductPage,
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
