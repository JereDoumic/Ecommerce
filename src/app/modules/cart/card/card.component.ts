import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import pdfMake, * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Product } from '../../../core/Models';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  forms: FormGroup;
  @Input() productList: Product[] = [];
  @Input() total = 0;
  @Output() buy = new EventEmitter<boolean>;

  ngOnInit(): void {
      
  }

  constructor(private fb: FormBuilder){
    this.forms = this.fb.group({
      cardHolder: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      expirationDate: ['', [Validators.required, Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],

    })
  }

  onSubmit(){
    const card = {
      cardHolder: this.forms.value.cardHolder,
      cardNumber: this.forms.value.cardNumber,
      expirationDate: this.forms.value.expirationDate,
      cvv: this.forms.value.cvv
    }

    const date = new Date();

    const documentDefinition = {
      content: [
        { text: `\n Compra con tarjeta realizada a nombre de ${card.cardHolder}`, style: 'header' },
        { text: `Cliente: ${card.cardHolder}`, style: 'paragraph'},
        { text: `Fecha: ${date.toLocaleDateString()}`, style: 'paragraph'},
        { text: `Hora: ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`, style: 'paragraph'},
        { text: '\n Detalles de la compra: ', style: 'paragraph'},
        ...this.productList.map(product => ({text: `x${product.quantity} ${product.title} $${product.price! * product.quantity!}` , style: 'paragraph'})),
        { text: `Total: $${this.total}`, style: 'paragraph'},
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        paragraph: {
          fontSize: 12
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();

    this.forms.reset();
    this.buy.emit(true);
  }

}
