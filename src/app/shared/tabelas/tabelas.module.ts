import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PipesModule } from "./pipes/pipes.module";
import { TabelaModule } from "./tabela/tabela.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, TabelaModule],
})
export class TabelasModule {}
