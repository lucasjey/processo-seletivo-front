import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { UnidadeService } from "../unidade.service";
import { Unidade } from "../unidade";
import { Observable } from 'rxjs/Observable';
import { CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR } from 'ng2-currency-mask';
import { FormControl } from '@angular/forms/src/model';
import { InstituicaoService } from '../../instituicao/instituicao.service';
import { Instituicao } from '../../instituicao/instituicao';


@Component({
  selector: 'app-unidade-form',
  templateUrl: './unidade-form.component.html',
  styleUrls: ['./unidade-form.component.css']
})
export class UnidadeFormComponent implements OnInit {

  unidade: Unidade;
  unidadeForm: FormGroup;
  instituicoes: Instituicao[];

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private imagem: FormBuilder,
    public unidadeService: UnidadeService,
    public instituicaoService: InstituicaoService,

  ) { }

  ngOnInit() {

    this.instituicaoService.findAll()
      .subscribe(instituicoes => {
        this.instituicoes = instituicoes;
      });

    this.unidade = new Unidade();

    /* Obter o `ID` passado por parâmetro na URL */
    this.unidade.id = this.route.snapshot.params['id'];

    /* Reactive Forms */
    this.unidadeForm = this.builder.group({
      id: [],
      codigo: ['', [Validators.required, Validators.maxLength(3)]],
      nome: ['', [Validators.required, Validators.maxLength(80)]],
      numeroFiscal: ['', [Validators.required, Validators.maxLength(20)]],
      endereco: this.builder.group({
        logradouro: '',
        bairro: '',
        numero: '',
        caixaPostal: '',
        pais: '',
        provincia: '',
        municipio: ''
      }),
      instituicao: [null, [Validators.required]],
    }, {});

    // Se existir `ID` realiza busca para trazer os dados
    if (this.unidade.id != null) {
      this.unidadeService.findOne(this.unidade.id)
        .subscribe(unidade => {
          this.unidadeForm.patchValue(unidade);
        });
    }
  }

  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
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
