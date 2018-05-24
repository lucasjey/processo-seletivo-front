import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { SharedModule } from "../../shared/shared.module";
import { Endereco } from "./endereco";
import { EnderecoService } from "./endereco.service";



@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        
        DataTablesModule,
    
        
        SharedModule
    ],

    providers: [
        EnderecoService
    ]

})
export class EnderecoModule{}