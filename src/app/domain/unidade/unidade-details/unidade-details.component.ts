import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { UnidadeService } from "../unidade.service";
import { Unidade } from "../unidade";
import { Observable } from 'rxjs/Observable';
import { CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR } from 'ng2-currency-mask';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-unidade-details',
  templateUrl: './unidade-details.component.html',
  styleUrls: ['./unidade-details.component.css']
})
export class UnidadeDetailsComponent implements OnInit {

  unidade: Unidade;
  unidadeForm: FormGroup;

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private imagem: FormBuilder,
    public unidadeService: UnidadeService,

  ) { }

  ngOnInit() {

    this.unidade = new Unidade();

    /* Obter o `ID` passado por parâmetro na URL */
    this.unidade.id = this.route.snapshot.params['id'];

    /* Reactive Forms */
    this.unidadeForm = this.builder.group({
      id:[],
      codigo: [null, [Validators.required, Validators.maxLength(3)]],
      nome: [null, [Validators.required, Validators.maxLength(80)]],
      numeroFiscal: [null, [Validators.required, Validators.maxLength(20)]],
      endereco: this.builder.group({
        logradouro: '',
        bairro: '',
        numero: '',
        caixaPostal: '',
        pais: '',
        provincia: '',
        municipio:''
      })
    }, {});

    this.unidadeForm.disable();

    // Se existir `ID` realiza busca para trazer os dados
    if (this.unidade.id != null) {
      this.unidadeService.findOne(this.unidade.id)
        .subscribe(unidade => {
          this.unidadeForm.patchValue(unidade);
        });
    }
  }

  /* Método para salva unidade */
  salvar(unidade: Unidade) {
    this.unidadeService.save(unidade)
      .subscribe(response => {
        /* Redireciona para lista */
        this.router.navigate(['/unidade']);
      })
  }

}
