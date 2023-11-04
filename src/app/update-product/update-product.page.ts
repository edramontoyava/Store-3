import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ToastController } from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})


export class UpdateProductPage {
  public productForm:FormGroup;
  private productToEdit?: Product;
  private positionToEdit?: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute // Agrega ActivatedRoute para recibir el producto a editar
  ) { 
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: [''],
      photo: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Recibe el producto a editar de los parámetros de la ruta
this.route.paramMap.subscribe(params => {
  const productToEditParam = params.get('productToEdit');
  if (productToEditParam !== null) {
    const productToEdit = JSON.parse(productToEditParam);
    if (productToEdit) {
      this.productToEdit = productToEdit;
      const positionParam = params.get('position');
      if (positionParam !== null) {
        this.positionToEdit = +positionParam;
      }// Asignar la posición desde los parámetros de la ruta
      this.productForm.setValue({
        name: productToEdit.name,
        price: productToEdit.price,
        description: productToEdit.description,
        photo: productToEdit.photo,
        type: productToEdit.type,
      });
    }
  }
});

    
  }

  public async updateProduct() {
    const product = this.productForm.value;
    console.log('Producto a editar:', product);
    
    if (this.positionToEdit !== undefined) {
      this.productService.updateProduct(this.positionToEdit, product);
      const toast = await this.toastController.create({
        message: 'Producto actualizado',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.router.navigate(['/tabs/tab1']);
    } else {
      console.error('Posición no válida');
    }
  }
  

  

}
