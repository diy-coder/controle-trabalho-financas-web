import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { ConfirmDialogInterface } from "./confirm.interface";

@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.css"],
})
export class ConfirmDialogComponent {
  caption = "ATENÇÃO";
  subtitle = "Deseja realmente excluir o registro selecionado?";
  btnCancelLabel = "Cancelar";
  btnOkLabel = "Confirmar";

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ConfirmDialogInterface
  ) {
    dialogRef.disableClose = true;

    if (data.caption) {
      this.caption = data.caption;
    }

    if (data.subtitle) {
      this.subtitle = data.subtitle;
    }

    if (data.btnCancelLabel) {
      this.btnCancelLabel = data.btnCancelLabel;
    }

    if (data.btnOkLabel) {
      this.btnOkLabel = data.btnOkLabel;
    }
  }

  onYesClick(): void {
    if (this.data.fnOk) {
      this.data.fnOk();
    }
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    if (this.data.fnCancel) {
      this.data.fnCancel();
    }
    this.dialogRef.close(false);
  }
}
