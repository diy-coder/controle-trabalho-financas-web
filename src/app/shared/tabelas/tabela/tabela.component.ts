import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-tabela",
  templateUrl: "./tabela.component.html",
  styleUrls: ["./tabela.component.css"],
})
export class TabelaComponent implements OnInit, AfterContentInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  @Input() headerTitle = "Listagem Generica.";
  @Input() displayedColumns:any[] = [];
  @Input() pageSizeOptions = [10, 20, 30, 50];
  @Input() dados: any[] | undefined;
  @Input() showHeader = true;
  @Input() showAddButtom = false;
  @Input() showFilter = true;
  @Input() marginTop = true;
  @Input() showSelect = false;

  @Output() selectedRow = new EventEmitter();
  @Output() acaoSelecionada = new EventEmitter();

  datasource!:any;
  cols:any[] = [];
  selectedRowIndex = -1;

  constructor() {}

  ngAfterContentInit(): void {
    this.datasource = new MatTableDataSource<any>(this.dados);
    this.datasource.paginator = this.paginator;
    this.cols = this.displayedColumns.map((el: any) => el.el);
  }

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
    this.selectedRowIndex = -1;
    this.selectedRow.emit(null);
  }

  highlight(row:any) {
    let newIndex = row[this.displayedColumns[0].el];
    if (newIndex == this.selectedRowIndex) {
      this.selectedRowIndex = -1;
    } else {
      this.selectedRowIndex = newIndex;
    }

    this.selectedRow.emit(row);
  }

  propagate(e: Event, acao: any, item: any) {
    this.selectedRowIndex = -1;
    e.stopImmediatePropagation();
    this.acaoSelecionada.emit({ acao, item });
  }
}
